const express = require("express");
const router = express.Router();

function getRandom(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

router.get("/", (req, res) => {
  const labels = Array.from({length: 24}, (_, i) => `${i}h`);
  const datasets = [
    { label: "Temperature", data: labels.map(() => getRandom(25, 40)), borderColor: "red", fill: false },
    { label: "Water Level", data: labels.map(() => getRandom(1, 5)), borderColor: "blue", fill: false },
    { label: "AQI", data: labels.map(() => getRandom(50, 200)), borderColor: "green", fill: false }
  ];
  res.json({ labels, datasets });
});

module.exports = router;