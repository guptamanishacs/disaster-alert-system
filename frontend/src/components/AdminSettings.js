// AdminSettings.js
import React, { useState, useEffect } from "react";

export default function AdminSettings() {
  // Default settings
  const defaultSettings = {
    name: "Admin",
    email: "admin@example.com",
    contact: "",
    theme: "light",
    notifications: true,
    sidebarCollapsed: false,
    defaultCity: "Mumbai",
    emailAlerts: true,
    smsAlerts: true,
    severityLevel: "High",
  };

  const [settings, setSettings] = useState(defaultSettings);

  // Load saved settings from localStorage (simulate backend)
  useEffect(() => {
    const savedSettings = localStorage.getItem("adminSettings");
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Update a setting
  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  // Save settings
  const handleSave = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    alert("✅ Settings saved successfully!");
  };

  // Reset settings to default
  const handleReset = () => {
    setSettings(defaultSettings);
    alert("⚠ Settings reset to default!");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "700px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        margin: "20px auto",
      }}
    >
      <h2>⚙ Admin Settings</h2>

      {/* Admin Profile */}
      <section style={{ marginBottom: "20px" }}>
        <h3>👤 Admin Profile</h3>
        <input
          style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%" }}
          type="text"
          placeholder="Name"
          value={settings.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%" }}
          type="email"
          placeholder="Email"
          value={settings.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          style={{ display: "block", margin: "5px 0", padding: "8px", width: "100%" }}
          type="text"
          placeholder="Contact Number"
          value={settings.contact}
          onChange={(e) => handleChange("contact", e.target.value)}
        />
      </section>

      {/* Dashboard Preferences */}
      <section style={{ marginBottom: "20px" }}>
        <h3>🖥 Dashboard Preferences</h3>
        <label>
          Theme:{" "}
          <select
            style={{ margin: "5px 0", padding: "5px" }}
            value={settings.theme}
            onChange={(e) => handleChange("theme", e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => handleChange("notifications", e.target.checked)}
          />{" "}
          Enable Notifications
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={settings.sidebarCollapsed}
            onChange={(e) => handleChange("sidebarCollapsed", e.target.checked)}
          />{" "}
          Collapse Sidebar
        </label>
      </section>

      {/* Location / City Settings */}
      <section style={{ marginBottom: "20px" }}>
        <h3>📍 Location / City</h3>
        <select
          style={{ padding: "5px", width: "200px" }}
          value={settings.defaultCity}
          onChange={(e) => handleChange("defaultCity", e.target.value)}
        >
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </section>

      {/* System Notifications */}
      <section style={{ marginBottom: "20px" }}>
        <h3>🔔 System Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={settings.emailAlerts}
            onChange={(e) => handleChange("emailAlerts", e.target.checked)}
          />{" "}
          Email Alerts
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={settings.smsAlerts}
            onChange={(e) => handleChange("smsAlerts", e.target.checked)}
          />{" "}
          SMS Alerts
        </label>
        <br />
        Severity Level:{" "}
        <select
          style={{ margin: "5px 0", padding: "5px" }}
          value={settings.severityLevel}
          onChange={(e) => handleChange("severityLevel", e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </section>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSave}
          style={{ marginRight: "10px", padding: "8px 12px", cursor: "pointer" }}
        >
          💾 Save
        </button>
        <button onClick={handleReset} style={{ padding: "8px 12px", cursor: "pointer" }}>
          ♻ Reset
        </button>
      </div>
    </div>
  );
}