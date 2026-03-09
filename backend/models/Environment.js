const mongoose = require("mongoose");

const environmentSchema = new mongoose.Schema({
  location: { type: String, default: "Mumbai" },
  temperature: Number,
  humidity: Number,
  waterLevel: Number,
  windSpeed: Number,
  aqi: Number,
  weather: String,

  floodRisk: String,
  cycloneRisk: String,
  airRisk: String,

  prediction: String,
  confidence: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Environment", environmentSchema);