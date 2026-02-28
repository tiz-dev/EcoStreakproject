async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://tiz-dev.github.io/EcoStreakproject/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
        window.location.href = "/dashboard.html";
    } else {
        alert(data.message);
    }
}
