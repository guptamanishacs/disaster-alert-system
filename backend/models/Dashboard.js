const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  aqi: { type: Number, required: true },
  riverLevel: { type: Number, required: true },

  floodRisk: { type: String },
  satelliteStatus: { type: String },
  riskLevel: { type: String },

  iotSensors: { type: Number },
  aiPrediction: { type: String },

  trends24hr: [{ type: Number }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Dashboard", DashboardSchema);