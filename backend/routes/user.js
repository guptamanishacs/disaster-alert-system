const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    console.log("👉 Register request:", email);

    // check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("❌ User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    // create new user
    const user = new User({
      name,
      email,
      password,
      isAdmin: isAdmin || false,
    });

    await user.save();

    console.log("✅ User registered:", email);

    res.status(201).json({
      msg: "User registered successfully",
      user,
    });

  } catch (error) {
    console.log("❌ Register error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("👉 Login request:", email, password);

    // find user by email
    const user = await User.findOne({ email });

    // user not found
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ msg: "User not found" });
    }

    // check password
    if (user.password !== password) {
      console.log("❌ Wrong password");
      return res.status(401).json({ msg: "Wrong password" });
    }

    console.log("✅ Login success:", user.email);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

  } catch (error) {
    console.log("❌ Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= PROFILE =================
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.log("❌ Profile error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;