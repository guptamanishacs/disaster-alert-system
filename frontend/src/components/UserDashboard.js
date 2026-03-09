import React, { useState } from "react";
import "./UserDashboard.css";

import Overview from "./Overview";
import Sensor from "./Sensor";
import Environment from "./Environment";
import Alert from "../components/Alert";
import Analytics from "./Analytics";
import SOS from "./SOS";
import Simulation from "./Simulation";
import UserSettings from "./UserSettings"; // ✅ Settings component

export default function UserDashboard() {

  const [active, setActive] = useState("overview");

  const renderComponent = () => {

    switch (active) {

      case "overview":
        return <Overview />;

      case "sensor":
        return <Sensor />;

      case "environment":
        return <Environment />;

      case "alerts":
        return <Alert />;

      case "analytics":
        return <Analytics />;

      case "sos":
        return <SOS />;

      case "simulation":
        return <Simulation />;

      case "settings":
        return <UserSettings />; // ⚙ Settings page open

      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">

        <h2>🌍 Disaster AI</h2>

        <ul>

          <li onClick={() => setActive("overview")}>
            🏠 Overview
          </li>

          <li onClick={() => setActive("sensor")}>
            📡 Sensor
          </li>

          <li onClick={() => setActive("environment")}>
            🌦 Environment
          </li>

          <li onClick={() => setActive("alerts")}>
            🚨 Alerts
          </li>

          <li onClick={() => setActive("analytics")}>
            📊 Analytics
          </li>

          <li onClick={() => setActive("sos")}>
            🆘 SOS
          </li>

          <li onClick={() => setActive("simulation")}>
            🧪 Simulation
          </li>

          <li onClick={() => setActive("settings")}>
            ⚙ Settings
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className="content">
        {renderComponent()}
      </div>

    </div>
  );
}