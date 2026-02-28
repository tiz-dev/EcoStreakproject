async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

     if (email === "haniya@eco.com" && password === "eco123") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password.");
    }
}
