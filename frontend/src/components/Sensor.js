import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sensor.css";
import API_URL from '../config';

export default function Sensor() {

  const role = "User";   // 🔒 Only user access

  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sensors from backend
  const fetchSensors = async () => {
    try {
      const res = await axios.get(`${API_URL}/sensors`);

if (res.data.success) {
  setSensors(res.data.data);
}
      setLoading(false);

    } catch (err) {
      console.error("Sensor fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensors();
  }, []);

  if (loading) {
    return <p>⏳ Loading sensor data...</p>;
  }

  return (
    <div className="sensor-page">

      <h2>🛰️ User Sensor Dashboard</h2>

      {/* REFRESH BUTTON */}
      <div className="btn-group">
        <button onClick={fetchSensors}>🔄 Refresh</button>
      </div>

      {/* SENSOR GRID */}
      <div className="sensor-grid">

        {sensors.map((sensor) => (
          <div key={sensor._id} className="sensor-card">

            <h3>{sensor.sensorId || sensor.name}</h3>

            <p><b>📍 Location:</b> {sensor.location}</p>

            {sensor.temperature && (
              <p>🌡 Temperature: {sensor.temperature} °C</p>
            )}

            {sensor.waterLevel && (
              <p>🌊 Water Level: {sensor.waterLevel} m</p>
            )}

            {sensor.aqi && (
              <p>🌫 AQI: {sensor.aqi}</p>
            )}

            {sensor.humidity && (
              <p>💧 Humidity: {sensor.humidity}%</p>
            )}

            {sensor.windSpeed && (
              <p>🌬 Wind Speed: {sensor.windSpeed} km/h</p>
            )}

            {sensor.floodRisk && (
              <p>⚠ Flood Risk: {sensor.floodRisk}</p>
            )}

            {sensor.aiPrediction && (
              <p>🤖 AI Prediction: {sensor.aiPrediction}</p>
            )}

            <p>
              📡 Status: 
              <span className={sensor.status === "Online" ? "online" : "offline"}>
                {sensor.status}
              </span>
            </p>

            <p>⏰ Updated: {sensor.lastUpdated || "--"}</p>

          </div>
        ))}

      </div>

    </div>
  );
}