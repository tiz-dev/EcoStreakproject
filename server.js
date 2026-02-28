const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Temporary user data (in-memory)
let user = {
    name: "Haniya",
    streak: 5,
    xp: 120
};

let todayTask = {
    task: "Carry your reusable water bottle",
    completed: false
};

// Login endpoint
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Demo credentials — replace with real DB auth later
    if (email === "haniya@eco.com" && password === "eco123") {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.json({ success: false, message: "Invalid email or password." });
    }
});

// Get user data
app.get("/api/user", (req, res) => {
    res.json(user);
});

// Get today's task
app.get("/api/task", (req, res) => {
    res.json(todayTask);
});

// Mark task complete
app.post("/api/complete", (req, res) => {
    if (!todayTask.completed) {
        todayTask.completed = true;
        user.streak += 1;
        user.xp += 20;
    }

    res.json({
        message: "Task completed!",
        user,
        task: todayTask
    });
});

// Leaderboard — returns a sorted list including the current user
app.get("/api/leaderboard", (req, res) => {
    const mockUsers = [
        { name: "Aria S.", xp: 980, streak: 21 },
        { name: "Ravi K.", xp: 870, streak: 18 },
        { name: "Priya M.", xp: 760, streak: 15 },
        { name: user.name, xp: user.xp, streak: user.streak, isMe: true },
        { name: "Zoe L.", xp: 510, streak: 10 },
        { name: "Arjun R.", xp: 430, streak: 8 },
        { name: "Mei C.", xp: 310, streak: 6 }
    ];
    mockUsers.sort((a, b) => b.xp - a.xp);
    // attach rank
    mockUsers.forEach((u, i) => { u.rank = "#" + (i + 1); });
    // set rank on actual user object too
    const myEntry = mockUsers.find(u => u.isMe);
    if (myEntry) user.rank = myEntry.rank;
    res.json(mockUsers);
});

// Logout
app.post("/api/logout", (req, res) => {
    res.json({ success: true });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});