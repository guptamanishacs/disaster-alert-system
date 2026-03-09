// AdminDashboard.js
import React, { useState } from "react";
import OverviewCards from "./OverviewCards";
import SensorCards from "./SensorCards";
import AlertsTable from "./AlertsTable";
import AnalyticsCharts from "./AnalyticsCharts";
import SOSMap from "./SOSMap"; // ⚡ Admin SOS live
import AISimulation from "./AISimulation";
import AdminSettings from "./AdminSettings"; // ⚙ Settings

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewCards />;
      case "sensor": return <SensorCards />;
      case "alerts": return <AlertsTable />;
      case "analytics": return <AnalyticsCharts />;
      case "sos": return <SOSMap />; 
      case "ai": return <AISimulation />;
      case "settings": return <AdminSettings />;
      default: return <OverviewCards />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>🌐 Disaster AI Admin</h2>
        <ul>
          <li
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >🏠 Overview</li>
          <li
            className={activeTab === "sensor" ? "active" : ""}
            onClick={() => setActiveTab("sensor")}
          >📡 Sensor</li>
          <li
            className={activeTab === "alerts" ? "active" : ""}
            onClick={() => setActiveTab("alerts")}
          >🚨 Alerts</li>
          <li
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >📊 Analytics</li>
          <li
            className={activeTab === "sos" ? "active" : ""}
            onClick={() => setActiveTab("sos")}
          >🆘 SOS</li>
          <li
            className={activeTab === "ai" ? "active" : ""}
            onClick={() => setActiveTab("ai")}
          >🧪 AI Simulation</li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >⚙ Settings</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;