const express = require("express");
const router = express.Router();

// POST: Run simulation
router.post("/simulate", (req, res) => {
  const { type, location, rainfall, waterLevel, windSpeed } = req.body;

  // Simple simulation logic (replace with real AI later)
  let probability = 0;
  let risk = "Low";

  if (type === "Flood") {
    probability = Math.min((rainfall * 0.5 + waterLevel * 10 + windSpeed * 0.2), 100);
    risk = probability > 70 ? "High" : probability > 40 ? "Medium" : "Low";
  } else if (type === "Storm") {
    probability = Math.min(windSpeed * 0.8, 100);
    risk = probability > 70 ? "High" : probability > 40 ? "Medium" : "Low";
  } else if (type === "Earthquake") {
    probability = Math.random() * 100;
    risk = probability > 70 ? "High" : probability > 40 ? "Medium" : "Low";
  } else if (type === "Air Pollution") {
    probability = Math.min(rainfall * 0.3 + 50, 100);
    risk = probability > 70 ? "High" : probability > 40 ? "Medium" : "Low";
  }

  res.json({
    type,
    location,
    probability: Math.round(probability),
    risk
  });
});

// GET: fetch all AI predictions (dummy data for now)
router.get("/predictions", (req, res) => {
  res.json({
    success: true,
    data: [
      { _id: 1, type: "Flood", location: { city: "Kerala" }, probability: 75, confidence: 80 },
      { _id: 2, type: "Storm", location: { city: "Mumbai" }, probability: 40, confidence: 60 },
      { _id: 3, type: "Earthquake", location: { city: "Delhi" }, probability: 55, confidence: 70 },
    ]
  });
});

module.exports = router;