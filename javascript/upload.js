async function upload(){
    const fd = new FormData()
    let input = document.getElementById("p-file")
    let name = document.getElementById("p-name").value
    let description = document.getElementById("p-desc").value
    let price = document.getElementById("p-price").value
    fd.append("name",name)
    fd.append("description",description)
    fd.append("price",price)
    fd.append("file", input.files[0]);

    const response = await fetch("http://localhost:5045/upload",{
        method:"POST",
        body:fd
    })
    let data = await response.json()
    console.log(data)
}

document.getElementById("publish-product").onclick = upload