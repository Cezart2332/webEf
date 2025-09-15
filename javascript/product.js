const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

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
}




async function save(){
    console.log("apasat")
    const fd = new FormData()
    fd.append("userid",userData.id);
    fd.append("productid",productId);
    const result = await fetch("http://localhost:5045/save",{
        method:"POST",
        body:fd
    })
    let data = await result.json()
    console.log(data)
}


async function product(){
    const response = await fetch(`http://localhost:5045/product/${productId}`)
    let data = await response.json()
    let product = data.result
    console.log(data.result)
    document.getElementById("product").innerHTML = `
        <div class="product-media card">
            <div class="media" style="height:360px">
              <img src="http://localhost:5045${product.photoPath}" alt="Minimal Tee photo" />
            </div>
          </div>
          <div class="product-info">
            <h1 class="page-title">${product.name}</h1>
            <p class="price" style="font-size:22px;">${product.price}</p>
            <p class="muted">
              ${product.description}
            </p>
            <div style="display:flex; gap:10px; margin-top:14px;">
              <a class="btn btn-primary" id="save-button">Save</a>
              <a class="btn btn-outline" href="./products.html">Continue shopping</a>
        </div>
    `
    if(!loggedIn) document.getElementById("save-button").style.display = "none";

    document.getElementById("save-button").onclick = save;
}
product()
function logOut(){
    localStorage.clear()
    location.reload()
}

document.getElementById("log-out").onclick = logOut;
