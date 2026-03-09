const express = require("express");
const router = express.Router();
const Shelter = require("../models/Shelter");

// get shelters
router.get("/", async (req, res) => {
  const data = await Shelter.find();
  res.json(data);
});

// add shelter
router.post("/", async (req, res) => {
  const shelter = new Shelter(req.body);
  await shelter.save();
  res.json(shelter);
});

module.exports = router;