const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

async function getSaved() {
    document.getElementById("saved-products").innerHTML = '';
    const response = await fetch(`http://localhost:5045/saved/${userId}`)
    let products = await response.json()
    products.forEach(product => {
        document.getElementById("saved-products").innerHTML +=
        `
            <div class="card product" style="padding:12px;">
            <div class="media">
                <img src="http://localhost:5045${product.photoPath}" alt="Product photo placeholder" />
              </div>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:10px;">
              <div>
                <strong>${product.name}</strong>
                <div class="price">${product.price}</div>
              </div>
              <div style="display:flex; gap:8px;">
                <a class="btn btn-outline" href="./product.html?id=${product.id}">View</a>
              </div>
            </div>
          </div>
        `
    })
}
getSaved()