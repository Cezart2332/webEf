using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Models;
using Data;

var builder = WebApplication.CreateBuilder(args);

//Sa nu faceti asa ceva in productie :))
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();



app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "poze")
    ),
    RequestPath = "/files"
});


app.UseCors("AllowAll");


app.MapGet("/health", () =>
{
    var health = new { status = "healthy" };
    return health;
});
app.MapPost("/register", async (HttpRequest request, AppDbContext db) =>
{
    var form = await request.ReadFormAsync();
    var username = form["username"].ToString();
    var email = form["email"].ToString();
    var password = BCrypt.Net.BCrypt.HashPassword(form["password"]);
    var isAdmin = form["isAdmin"].ToString();

    bool exists = await db.Users.AnyAsync(u => u.Email == email);
    if (exists)
    {
        return Results.BadRequest(new { message = "Exista deja un utilizator cu acest mail!" });
    }

    User user = new User();
    user.Username = username;
    user.Email = email;
    user.Password = password;
    user.isAdmin = Boolean.Parse(isAdmin);
    db.Users.Add(user);
    await db.SaveChangesAsync();
    UserResponse response = new UserResponse();
    response.Email = user.Email;
    response.Username = user.Username;
    response.isAdmin = user.isAdmin;
    return Results.Ok(response);
});

app.MapPost("/login", async (HttpRequest request, AppDbContext db) =>
{
    var form = await request.ReadFormAsync();
    var email = form["email"].ToString();
    var password = form["password"].ToString();
    var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);
    if (user == null) return Results.BadRequest(new { message = "Utilizatorul nu a fost gasit!" });
    if (!BCrypt.Net.BCrypt.Verify(password, user.Password)) return Results.BadRequest(new { message = "Parola gresita!" });
    UserResponse response = new UserResponse();
    response.Id = user.Id;
    response.Email = user.Email;
    response.Username = user.Username;
    response.isAdmin = user.isAdmin;

    return Results.Ok(response);
});

app.MapPost("/upload", async (HttpRequest request, AppDbContext db) =>
{
    var form = await request.ReadFormAsync();
    var name = form["name"].ToString();
    var description = form["description"].ToString();
    var price = form["price"].ToString();
    var file = form.Files["file"];

    var fileName = $"{Guid.NewGuid()}_{file.FileName}";
    var filePath = Path.Combine("C:\\Users\\Cezar\\Desktop\\webEF\\backend\\poze", fileName);
    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }
    var url = $"/files/{fileName}";

    Product product = new Product();
    product.Name = name;
    product.Description = description;
    product.Price = price;
    product.PhotoPath = url;
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return Results.Ok();
});
app.MapGet("/products", async (HttpRequest request, AppDbContext db) =>
{
    var products = await db.Products.ToListAsync();
    return Results.Ok(products);
});
app.MapGet("/product/{id}", async (int id, AppDbContext db) =>
{

    var product = db.Products.FindAsync(id);
    return Results.Ok(product);
});
app.MapPost("/save", async (HttpRequest request, AppDbContext db) =>
{
    var form = await request.ReadFormAsync();
    var userId = Int32.Parse(form["userid"]);
    var productId = Int32.Parse(form["productid"]);
    var user = await db.Users.FindAsync(userId);
    var product = await db.Products.FindAsync(productId);
    Saved saved = new Saved();
    saved.Product = product;
    saved.User = user;
    db.Saves.Add(saved);
    await db.SaveChangesAsync();
    return Results.Ok();
});


app.MapGet("/saved/{id}", async (int id, AppDbContext db) =>
{
    var products = await db.Saves
                .Where(s => s.userId == id)
                .Include(s => s.Product)
                .Select(s => new
                {
                    s.Product.Id,
                    s.Product.Name,
                    s.Product.Description,
                    s.Product.Price,
                    s.Product.PhotoPath
                })
                .ToListAsync();
    return Results.Ok(products);


});

app.Run();
