const axios = require("axios");

exports.getWeather = async (city) => {

  const apiKey = process.env.WEATHER_KEY;

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );

  return res.data;
};