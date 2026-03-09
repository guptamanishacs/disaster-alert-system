const express = require("express");
const router = express.Router();
const { getWeather } = require("../services/weatherService");

router.get("/:city", async (req, res) => {
  const data = await getWeather(req.params.city);
  res.json(data);
});

module.exports = router;