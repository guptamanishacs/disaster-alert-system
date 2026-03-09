const express = require("express");
const router = express.Router();

const Alert = require("../models/Alert");
const Shelter = require("../models/Shelter");
const Sensor = require("../models/Sensor");
const SOS = require("../models/SOS");

// Alerts
router.get("/alerts", async (req, res) => {
  const data = await Alert.find().sort({ time: -1 }).limit(5);
  res.json(data);
});

// Shelters
router.get("/shelters", async (req, res) => {
  const data = await Shelter.find();
  res.json(data);
});

// Sensors
router.get("/sensors", async (req, res) => {
  const data = await Sensor.find().sort({ time: -1 }).limit(1);
  res.json(data[0]);
});

// SOS Save
router.post("/sos", async (req, res) => {
  const { user, lat, lng } = req.body;
  const newSOS = new SOS({ user, lat, lng });
  await newSOS.save();
  res.json({ message: "SOS Sent Successfully" });
});

module.exports = router;