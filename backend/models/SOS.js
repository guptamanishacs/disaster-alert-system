const mongoose = require("mongoose");

const SOSSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  emergencyType: String,
  message: String,

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SOS", SOSSchema);