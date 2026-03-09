// src/components/OverviewCard.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Line } from "react-chartjs-2";
import "./OverviewCard.css";

// ===== Helper: Change Map View when location selected =====
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// ===== Create a grid for AI prediction across the region =====
const gridCells = [];
for (let lat = 17; lat <= 30; lat += 0.5) {
  for (let lng = 72; lng <= 80; lng += 0.5) {
    gridCells.push({ lat: parseFloat(lat.toFixed(2)), lng: parseFloat(lng.toFixed(2)) });
  }
}

// ===== Helper: Generate AI Prediction =====
const generatePrediction = () => {
  const temp = Math.floor(Math.random() * 15) + 25;
  const humidity = Math.floor(Math.random() * 40) + 40;
  const aqi = Math.floor(Math.random() * 100) + 50;
  const waterLevel = parseFloat((Math.random() * 3 + 0.5).toFixed(2));

  let risk = "Low";
  if (temp > 40 || waterLevel > 3 || aqi > 150) risk = "High";
  else if (temp > 35 || waterLevel > 2 || aqi > 100) risk = "Medium";

  const aiConfidence = Math.floor(Math.random() * 20) + 70;

  return { temp, humidity, aqi, waterLevel, risk, aiConfidence };
};

export default function OverviewCard() {
  const [gridPredictions, setGridPredictions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    temperature: 25,
    humidity: 53,
    aqi: 132,
    waterLevel: 2.45,
    floodRisk: "Safe",
    riskLevel: "Medium",
    sensorsActive: 11,
    sensorsTotal: 15,
    aiPrediction: "Conditions unstable",
    aiConfidence: 87
  });
  const [alerts, setAlerts] = useState([]);
  const [sosRequests, setSosRequests] = useState([]);

  // ===== Initialize grid predictions & panels =====
  useEffect(() => {
    const predictions = gridCells.map(cell => ({ ...cell, ...generatePrediction() }));
    setGridPredictions(predictions);

    setAlerts([{ location: "Near 22.5, 77.5", type: "Flood", timestamp: "5 min ago" }]);
    setSosRequests([{ location: "Near 23, 78", timestamp: "10 min ago" }]);
  }, []);

  // ===== Live Update Simulation =====
  useEffect(() => {
    const interval = setInterval(() => {
      setGridPredictions(prev => prev.map(g => ({ ...g, ...generatePrediction() })));

      setDashboardData(prev => ({
        ...prev,
        temperature: 20 + Math.floor(Math.random() * 15),
        humidity: 40 + Math.floor(Math.random() * 30),
        aqi: 50 + Math.floor(Math.random() * 150),
        waterLevel: parseFloat((0.5 + Math.random() * 3).toFixed(2)),
        floodRisk: Math.random() > 0.8 ? "High" : "Safe",
        riskLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        aiPrediction: Math.random() > 0.7 ? "⚠ Flood risk high" : "Conditions stable",
        aiConfidence: 70 + Math.floor(Math.random() * 30)
      }));

      // Random alerts
      if (Math.random() > 0.7)
        setAlerts(prev => [...prev.slice(-4), { location: "Near 24, 76", type: "Flood", timestamp: "Now" }]);
      if (Math.random() > 0.8)
        setSosRequests(prev => [...prev.slice(-4), { location: "Near 21, 79", timestamp: "Now" }]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // ===== Trend Graph =====
  const trendData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
    datasets: [
      { label: "Temperature (°C)", data: Array.from({length:24}, ()=>20+Math.random()*15), borderColor:"red", fill:false },
      { label: "Humidity (%)", data: Array.from({length:24}, ()=>40+Math.random()*30), borderColor:"blue", fill:false },
      { label: "Water Level (m)", data: Array.from({length:24}, ()=>0.5+Math.random()*3), borderColor:"green", fill:false }
    ]
  };

  return (
    <div className="overview-container">
      <h2>🏠 Admin Dashboard — Dynamic Overview</h2>

      {/* ===== Selected Location Metrics ===== */}
      {selectedLocation && (
        <div className="selected-location">
          <h3>📍 Selected Location Metrics</h3>
          <p>Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}</p>
          <p>🌡 Temp: {selectedLocation.temp}°C</p>
          <p>💧 Humidity: {selectedLocation.humidity}%</p>
          <p>🌊 Water Level: {selectedLocation.waterLevel} m</p>
          <p>🌫 AQI: {selectedLocation.aqi}</p>
          <p>⚠ Risk: {selectedLocation.risk}</p>
          <p>⚡ AI Confidence: {selectedLocation.aiConfidence}%</p>
        </div>
      )}

      {/* ===== Live Metrics ===== */}
      <div className="live-metrics">
        <p>🌡️ Temperature: {dashboardData.temperature}°C</p>
        <p>💧 Humidity: {dashboardData.humidity}%</p>
        <p>🌫️ AQI: {dashboardData.aqi}</p>
        <p>🌊 River Level: {dashboardData.waterLevel} m</p>
        <p>⚠️ Flood Risk: {dashboardData.floodRisk}</p>
        <p>🛰️ Satellite Status: Active</p>
        <p>⚠️ Risk Level: {dashboardData.riskLevel}</p>
        <p>📡 IoT Sensors: {dashboardData.sensorsActive} / {dashboardData.sensorsTotal}</p>
        <p>🤖 AI Prediction: {dashboardData.aiPrediction}</p>
        <p>⚡ AI Confidence: {dashboardData.aiConfidence}%</p>
      </div>

      {/* ===== Alerts ===== */}
      <div className="alerts-panel">
        <h3>🚨 Active Alerts</h3>
        {alerts.length ? alerts.map((a, i) => <p key={i}>{a.type} – {a.location} – {a.timestamp}</p>) : <p>No alerts</p>}
      </div>

      {/* ===== SOS Requests ===== */}
      <div className="sos-panel">
        <h3>🆘 Active SOS Requests</h3>
        {sosRequests.length ? sosRequests.map((s, i) => <p key={i}>{s.location} – {s.timestamp}</p>) : <p>No SOS requests</p>}
      </div>

      {/* ===== Trend Graph ===== */}
      <div className="trend-chart">
        <h3>📊 24hr Trend Graph</h3>
        <Line data={trendData} />
      </div>

      {/* ===== Live Map with Risk Zones ===== */}
      <div className="map-view">
        <h3>📍 Live Map & AI Predicted Risk Zones</h3>
        <MapContainer center={[20, 78]} zoom={5} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {gridPredictions.map((g, idx) => (
            <Circle
              key={idx}
              center={[g.lat, g.lng]}
              radius={5000}
              color={g.risk === "High" ? "red" : g.risk === "Medium" ? "orange" : "green"}
              fillOpacity={0.2}
              eventHandlers={{
                click: () => setSelectedLocation(g)
              }}
            >
              <Popup>
                🌡 Temp: {g.temp}°C<br/>
                💧 Humidity: {g.humidity}%<br/>
                🌊 Water Level: {g.waterLevel} m<br/>
                🌫 AQI: {g.aqi}<br/>
                ⚠ Risk: {g.risk}<br/>
                ⚡ AI Confidence: {g.aiConfidence}%
              </Popup>
            </Circle>
          ))}

          {selectedLocation && <ChangeView center={[selectedLocation.lat, selectedLocation.lng]} zoom={7} />}
        </MapContainer>
      </div>
    </div>
  );
}