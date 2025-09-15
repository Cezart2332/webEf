async function register(){
    console.log("pressed")
    const fd = new FormData()
    let username = document.getElementById("user").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    if(username.trim() == "" || email.trim() == "" || password.trim() ==""){
        console.log("Nu ai scris nimic, imi pare rau :(")
        return;
    }
    fd.append("username", username)
    fd.append("email", email)
    fd.append("password",password )
    fd.append("isAdmin", false)

    const response = await fetch("http://localhost:5045/register",{
        method:"POST",
        body:fd
    })
    let data = await response.json();
    localStorage.setItem("user", JSON.stringify(data))
    localStorage.setItem("loggedIn", JSON.stringify(true))
    location.href = "index.html"
}


document.getElementById("register").onclick = register;
