const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");

// Summary
router.get("/summary", async (req, res) => {
  try {
    const totalAlerts = await Alert.countDocuments();
    const activeAlerts = await Alert.countDocuments({ status: "Active" });
    const highCritical = await Alert.countDocuments({ level: { $in: ["High","Critical"] } });
    res.json({ totalAlerts, activeAlerts, highCritical });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Alerts by Type
router.get("/byType", async (req, res) => {
  try {
    const data = await Alert.aggregate([
      { $group: { _id: "$type", total: { $sum: 1 } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Active vs Resolved
router.get("/byStatus", async (req, res) => {
  try {
    const data = await Alert.aggregate([
      { $group: { _id: "$status", total: { $sum: 1 } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Alerts over time
router.get("/overTime", async (req, res) => {
  try {
    const data = await Alert.aggregate([
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, total: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Location-wise Alerts
router.get("/byLocation", async (req, res) => {
  try {
    const data = await Alert.aggregate([
      { $group: { _id: "$location.city", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;