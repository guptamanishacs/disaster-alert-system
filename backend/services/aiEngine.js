function calculateRisk(temp, rain, wind, magnitude) {

  let floodRisk = rain > 50 ? "High" : rain > 20 ? "Medium" : "Low";
  let cycloneRisk = wind > 20 ? "High" : wind > 10 ? "Medium" : "Low";
  let heatwaveRisk = temp > 40 ? "High" : temp > 35 ? "Medium" : "Low";
  let earthquakeRisk = magnitude > 5 ? "High" : magnitude > 3 ? "Medium" : "Low";

  return {
    floodRisk,
    cycloneRisk,
    heatwaveRisk,
    earthquakeRisk
  };
}

module.exports = { calculateRisk };