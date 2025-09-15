function logOut(){
    localStorage.clear()
    location.reload()
}

let userData = JSON.parse(localStorage.getItem("user"))
let loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
console.log(userData)
if(loggedIn){
    document.getElementById("nav-bar").innerHTML =`
        <a href="./products.html" class="active">Products</a>
        <a>${userData.username}</a>
        <a href="#" id="log-out">Log Out</a>
    `
    document.getElementById("log-out").style.display = "block"
    document.getElementById("log-out").onclick = logOut;
}



async function products()
{
    document.getElementById("product-grid").innerHTML = ''
    const response = await fetch("http://localhost:5045/products")
    let products = await response.json()
    console.log(products)

    products.forEach(product => {
        document.getElementById("product-grid").innerHTML += `
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
