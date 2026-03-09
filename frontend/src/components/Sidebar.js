import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/dashboard">🏠 Overview</Link></li>
        <li><Link to="/sensors">📡 Sensor</Link></li>
        <li><Link to="/environment">🌦 Environment</Link></li>
        <li><Link to="/alerts">🚨 Alerts</Link></li>
        <li><Link to="/analytics">📊 Analytics</Link></li>
        <li><Link to="/sos">🆘 SOS</Link></li>
        <li><Link to="/aisimulation">🧪 AI Simulation</Link></li>
        <li><Link to="/settings">⚙ Settings</Link></li>
      </ul>
    </div>
  );
}