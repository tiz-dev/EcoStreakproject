const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Login API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@eco.com" && password === "1234") {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});