
namespace Models;


public class Saved
{
    public int Id { get; set; }


     public int userId { get; set; }
    public User User { get; set; } = new User();
     public int productId { get; set; }
    public Product Product { get; set; } = new Product();
}
