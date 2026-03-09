const express = require("express");
const router = express.Router();

// Temporary in-memory alerts array
let alerts = [];

// GET all alerts
router.get("/", (req, res) => {
  res.json(alerts);
});

// POST create alert
router.post("/", (req, res) => {
  const newAlert = { ...req.body, _id: Date.now().toString(), createdAt: new Date(), status: "Active" };
  alerts.push(newAlert);
  res.json(newAlert);
});

// PUT resolve alert
router.put("/:id", (req, res) => {
  alerts = alerts.map(a => a._id === req.params.id ? { ...a, ...req.body } : a);
  const updated = alerts.find(a => a._id === req.params.id);
  res.json(updated);
});

// DELETE alert
router.delete("/:id", (req, res) => {
  alerts = alerts.filter(a => a._id !== req.params.id);
  res.json({ message: "Alert deleted" });
});

module.exports = router;