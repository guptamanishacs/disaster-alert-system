const express = require("express");
const router = express.Router();
const Sensor = require("../models/Sensor");

// Overview API for dashboard
router.get("/", async (req, res) => {
  try {
    const sensors = await Sensor.find();
    const activeSensors = sensors.filter(s => s.status === "Online").length;
    const offlineSensors = sensors.filter(s => s.status === "Offline").length;
    const aiSummary = sensors.map(s => s.risk === "High" ? "⚠ Flood Risk High" : "✅ Environment Safe");
    res.json({
      activeSensors,
      offlineSensors,
      activeAlerts: Math.floor(Math.random()*5),
      activeSOS: Math.floor(Math.random()*3),
      aiSummary
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;