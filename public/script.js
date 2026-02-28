async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
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
async function loadData() {
    const userRes = await fetch("/api/user");
    const user = await userRes.json();

    const taskRes = await fetch("/api/task");
    const task = await taskRes.json();

    document.getElementById("username").innerText =
        "Hello, " + user.name + " 👋";

    document.getElementById("streak").innerText =
        "🔥 " + user.streak + " Day Streak | XP " + user.xp;

    const button = document.getElementById("completeBtn");

    if (task.completed) {
        button.innerText = "Streak Completed ✅";
        button.disabled = true;
    } else {
        button.innerText = "Mark as Complete";
        button.disabled = false;
    }
}
async function completeTask() {
    const res = await fetch("/api/complete", {
        method: "POST"
    });

    const data = await res.json();

    alert(data.message);

    loadData();
}