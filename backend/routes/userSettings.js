const express = require("express");
const router = express.Router();
const UserSettings = require("../models/UserSettings");

// GET user settings
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const settings = await UserSettings.findOne({ userId });
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (save/update) user settings
router.post("/", async (req, res) => {
  try {
    const { userId, ...data } = req.body;
    let settings = await UserSettings.findOne({ userId });

    if (settings) {
      Object.assign(settings, data);
    } else {
      settings = new UserSettings({ userId, ...data });
    }

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;