const mongoose = require("mongoose");

const userSettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // user identifier
  name: { type: String, default: "User" },
  email: { type: String, default: "user@example.com" },
  contact: { type: String, default: "" },
  theme: { type: String, default: "light" },
  notifications: { type: Boolean, default: true },
  sidebarCollapsed: { type: Boolean, default: false },
  defaultCity: { type: String, default: "Mumbai" },
  emailAlerts: { type: Boolean, default: true },
  smsAlerts: { type: Boolean, default: true },
  severityLevel: { type: String, default: "High" },
}, { timestamps: true });

module.exports = mongoose.model("UserSettings", userSettingsSchema);