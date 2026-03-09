const express = require("express");
const router = express.Router();

const Alert = require("../models/Alert");

// GET alerts
router.get("/", async (req, res) => {
  const alerts = await Alert.find().sort({ time: -1 });
  res.json(alerts);
});

// POST alert
router.post("/", async (req, res) => {
  const alert = new Alert(req.body);
  await alert.save();
  res.json(alert);
});

module.exports = router;