const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  capacity: Number
});

module.exports = mongoose.model("Shelter", shelterSchema);