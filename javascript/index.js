async function test(){
    let response = await fetch("http://localhost:5045/health")
    let data = await response.json()
    console.log(data.status)
}
test()

function logOut(){
    localStorage.clear()
    location.reload()
}

let userData = JSON.parse(localStorage.getItem("user"))
let loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
console.log(userData)
if(loggedIn){

    if(userData.isAdmin)
    {
        document.getElementById("nav-bar").innerHTML =`
        <a href="#features">Features</a>
        <a href="#categories">Categories</a>
        <a href="./products.html">Products</a>
        <a href="./upload.html">Upload</a>
        <a>${userData.username}</a>
        <a href="./saved.html?id=${userData.id}">Saved</a>
        <a href="#" id="log-out">Log Out</a>
    `
    }
    else
    {
        document.getElementById("nav-bar").innerHTML =`
        <a href="#features">Features</a>
        <a href="#categories">Categories</a>
        <a href="./products.html">Products</a>
        <a>${userData.username}</a>
        <a href="./saved.html?id=${userData.id}">Saved</a>
        <a href="#" id="log-out">Log Out</a>
    `
    }
    document.getElementById("log-out").style.display = "block"
}

async function products()
{
    document.getElementById("products-grid").innerHTML = ''
    const response = await fetch("http://localhost:5045/products")
    let products = await response.json()
    console.log(products)

    products.forEach(product => {
        document.getElementById("products-grid").innerHTML += `
            <a class="card product" href="./product.html?id=${product.id}">
              <div class="media">
                <img src="http://localhost:5045${product.photoPath}" alt="Product photo placeholder" />
              </div>
              <h3>${product.name}</h3>
              <p class="price">${product.price}</p>
            </a>
        `
    })
    
}
products()

document.getElementById("log-out").onclick = logOut;