import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./Overview.css";

export default function Overview() {
  const [data, setData] = useState({
    temperature: 32,
    humidity: 65,
    aqi: 95,
    riverLevel: 4.5,
    satellite: "Active",
    trend: [32, 33, 31, 34, 32, 33, 32],
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        temperature: prev.temperature + Math.floor(Math.random() * 3 - 1),
        humidity: prev.humidity + Math.floor(Math.random() * 2 - 1),
        aqi: prev.aqi + Math.floor(Math.random() * 2 - 1),
        riverLevel: Math.max(0, prev.riverLevel + (Math.random() * 0.2 - 0.1)),
        trend: [...prev.trend.slice(1), prev.temperature + Math.floor(Math.random() * 3 - 1)],
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const riskLevel = data.riverLevel > 4 ? "High" : data.riverLevel > 2 ? "Moderate" : "Low";
  const riskColor = riskLevel === "High" ? "red" : riskLevel === "Moderate" ? "orange" : "green";

  return (
    <div className="overview">
      <h2>🌡 Live Dashboard</h2>
      <div className="dashboard-card">🌡 Temperature: {data.temperature}°C</div>
      <div className="dashboard-card">💧 Humidity: {data.humidity}%</div>
      <div className="dashboard-card">🌫 AQI: {data.aqi}</div>
      <div className="dashboard-card">🌊 River Water Level: {data.riverLevel.toFixed(2)} m</div>
      <div className="dashboard-card" style={{ color: riskColor }}>⚠ Flood Risk: {riskLevel}</div>
      <div className="dashboard-card">🛰 Satellite Status: {data.satellite}</div>

      <div className="trend-chart">
        <h3>📈 Last 24hr Trends</h3>
        <Line
          data={{
            labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],
            datasets: [
              {
                label: "Temperature (°C)",
                data: data.trend,
                borderColor: "red",
                fill: false,
                tension: 0.3,
              },
            ],
          }}
          options={{ responsive: true, plugins: { legend: { display: true } } }}
        />
      </div>
    </div>
  );
}