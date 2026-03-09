const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔥 LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // 1️⃣ Find user by username & role
    const user = await User.findOne({ username, role });
    if (!user) {
      return res.status(400).json({ error: "User not found or role mismatch" });
    }

    // 2️⃣ Check password (plain text for now)
    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // 3️⃣ Success → send user info + message
    res.json({
      user: {
        username: user.username,
        role: user.role
      },
      message: "Login successful!",
      token: "dummy-token-123" // Replace with JWT if needed
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;