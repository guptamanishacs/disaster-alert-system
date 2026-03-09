import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Environment.css";
import API_URL from '../config';

export default function Environment() {

  const [sensors,setSensors] = useState([]);

  useEffect(()=>{

    loadSensors();

  },[]);


  const loadSensors = async () =>{

    try{

      const res = await axios.get(`${API_URL}/sensors`);

      if(res.data.success){
        setSensors(res.data.data);
      }

    }catch(err){
      console.log("Failed to load sensors",err);
    }

  };


  // ---------- GROUP BY CITY ----------

  const cities = {};

  sensors.forEach(s=>{

    if(!cities[s.location]){
      cities[s.location] = {
        temperature:null,
        waterLevel:null,
        aqi:null,
        risk:"Low"
      };
    }

    if(s.type === "Temp" || s.temperature){
      cities[s.location].temperature = s.temperature || s.value;
    }

    if(s.type === "Water" || s.waterLevel){
      cities[s.location].waterLevel = s.waterLevel || s.value;
    }

    if(s.type === "AQI" || s.aqi){
      cities[s.location].aqi = s.aqi || s.value;
    }

    // risk logic
    if(s.value > s.threshold){
      cities[s.location].risk = "High";
    }

  });


  return(

    <div className="environment-page">

      <h2>🌦 Environment Conditions</h2>

      <div className="env-grid">

        {Object.keys(cities).map(city=>{

          const env = cities[city];

          return(

            <div key={city} className="env-card">

              <h3>📍 {city}</h3>

              <p>🌡 Temperature: {env.temperature ?? "--"}°C</p>

              <p>🌊 Water Level: {env.waterLevel ?? "--"} m</p>

              <p>🌫 AQI: {env.aqi ?? "--"}</p>

              <p className={`risk ${env.risk.toLowerCase()}`}>
                ⚠ Risk Level: {env.risk}
              </p>

            </div>

          );

        })}

      </div>

    </div>

  );

}