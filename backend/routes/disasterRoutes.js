const express = require("express");
const router = express.Router();
const axios = require("axios");

// LIVE RISK using FREE Open-Meteo API (no key needed)
router.get("/live-risk", async (req, res) => {
  try {
    // Mumbai coordinates
    const lat = 19.0760;
    const lon = 72.8777;

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const weather = response.data.current_weather;

    // simple risk logic
    let risk = "Low";
    if (weather.windspeed > 40) risk = "High";
    else if (weather.windspeed > 20) risk = "Medium";

    res.json({
      location: "Mumbai",
      temperature: weather.temperature,
      windspeed: weather.windspeed,
      riskLevel: risk
    });

  } catch (err) {
    console.log("LIVE RISK ERROR:", err.message);
    res.status(500).json({ msg: "Weather API error" });
  }
});

module.exports = router;