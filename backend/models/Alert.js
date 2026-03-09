const mongoose = require("mongoose");

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

// Check if model exists, otherwise create
const Alert = mongoose.models.Alert || mongoose.model("Alert", alertSchema);

module.exports = Alert;