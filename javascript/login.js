async function login(){
    const fd = new FormData()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    if(email.trim() == ""|| password.trim() ==""){
        console.log("Nu ai scris nimic, imi pare rau :(")
        return;
    }
    fd.append("email",email)
    fd.append("password",password)
    const response = await fetch("http://localhost:5045/login",{
        method:"POST",
        body:fd
    })
    let data = await response.json()
    localStorage.setItem("user", JSON.stringify(data))
    localStorage.setItem("loggedIn", JSON.stringify(true))
    location.href = "index.html"
}


document.getElementById("login").onclick = login;