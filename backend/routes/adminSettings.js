// routes/adminSettings.js
const express = require("express");
const router = express.Router();
const AdminSettings = require("../models/AdminSettings");

// GET all settings (latest first)
router.get("/", async (req, res) => {
  try {
    const settings = await AdminSettings.find().sort({ createdAt: -1 });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new settings
router.post("/", async (req, res) => {
  try {
    const newSettings = new AdminSettings(req.body);
    await newSettings.save();
    res.json({ success: true, message: "Settings saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;