const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensor");

// GET all sensors
router.get("/", async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json({ success: true, data: sensors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST add sensor
router.post("/", async (req, res) => {
  try {
    const { name, type, location, status, battery, temperature, waterLevel, aqi, humidity, threshold } = req.body;

    // generate unique sensorId
    const sensorId = "S-" + Date.now();

    const sensor = new Sensor({
      sensorId,
      name,
      type,
      location,
      status,
      battery,
      temperature,
      waterLevel,
      aqi,
      humidity,
      threshold,
      lastUpdated: new Date().toLocaleTimeString()
    });

    await sensor.save();
    res.json({ success: true, data: sensor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update sensor
router.put("/:id", async (req, res) => {
  try {
    const sensor = await Sensor.findOneAndUpdate(
      { sensorId: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ success: true, data: sensor });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE sensor
router.delete("/:id", async (req, res) => {
  try {
    await Sensor.findOneAndDelete({ sensorId: req.params.id });
    res.json({ success: true, message: "Sensor deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;