// sensor.js (Mongoose Model)
const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  sensorId: { type: String, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["Online","Offline"], default: "Online" },
  battery: { type: Number, required: true },
  temperature: { type: Number },
  waterLevel: { type: Number },
  aqi: { type: Number },
  humidity: { type: Number },
  value: { type: Number, default: 0 },
  threshold: { type: Number, default: 0 },
  lastUpdated: { type: String, default: "--" }
});

module.exports = mongoose.models.Sensor || mongoose.model("Sensor", SensorSchema);