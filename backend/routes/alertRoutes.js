const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ================= ALERT SCHEMA =================
const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  severity: { type: String, default: "Low" },
  location: { type: String, required: true },
  status: { type: String, default: "Active" },
  triggered: { type: Date, default: Date.now },
  resolved: { type: Date, default: null },
  team: String,
  description: String,
});

const Alert = mongoose.model("Alert", alertSchema);

// ================= ROUTES =================

// GET all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ triggered: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new alert
router.post("/", async (req, res) => {
  try {
    const newAlert = new Alert(req.body);
    await newAlert.save();
    res.json(newAlert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update alert by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE alert by ID
router.delete("/:id", async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: "Alert deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// BULK UPDATE alerts
router.put("/bulk", async (req, res) => {
  try {
    const { ids, update } = req.body;
    await Alert.updateMany({ _id: { $in: ids } }, update);
    res.json({ message: "Bulk update done" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// BULK DELETE alerts
router.post("/bulk-delete", async (req, res) => {
  try {
    const { ids } = req.body;
    await Alert.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Bulk delete done" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;