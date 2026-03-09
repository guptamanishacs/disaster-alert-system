import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from '../config';

const Settings = () => {

  // 🔹 Simulated login data (replace with real login later)
  const role = localStorage.getItem("role") || "admin"; 
  const userId = localStorage.getItem("userId") || "user123";

  const [settings, setSettings] = useState({
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
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        let res;

        if (role === "admin") {
          res = await axios.get(`${API_URL}/admin-settings`);

          if (res.data.length > 0) {
            setSettings(res.data[0]);
          }
        } else {
          res = await axios.get(
            `${API_URL}/user-settings?userId=${userId}`
          );

          if (res.data) {
            setSettings(res.data);
          }
        }
      } catch (err) {
        console.error("Error loading settings:", err);
      }
    };

    fetchSettings();
  }, [role, userId]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 Save settings
  const handleSave = async () => {
    try {
      setLoading(true);

      if (role === "admin") {
        await axios.post(`${API_URL}/admin-settings`, settings);
      } else {
        await axios.post(`${API_URL}/user-settings`, {
          userId,
          ...settings,
        });
      }

      alert("✅ Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset settings
  const handleReset = () => {
    setSettings({
      name: "",
      email: "",
      contact: "",
      theme: "light",
      notifications: true,
      sidebarCollapsed: false,
      defaultCity: "Mumbai",
      emailAlerts: true,
      smsAlerts: true,
      severityLevel: "High",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>⚙ Admin Settings</h2>

      <h3>👤 Profile</h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={settings.name}
        onChange={handleChange}
      />

      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={settings.email}
        onChange={handleChange}
      />

      <br />

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={settings.contact}
        onChange={handleChange}
      />

      <h3>🖥 Dashboard Preferences</h3>

      <label>Theme:</label>
      <select name="theme" value={settings.theme} onChange={handleChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <br />

      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={handleChange}
        />
        Enable Notifications
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          name="sidebarCollapsed"
          checked={settings.sidebarCollapsed}
          onChange={handleChange}
        />
        Collapse Sidebar
      </label>

      <h3>📍 Location</h3>

      <input
        type="text"
        name="defaultCity"
        placeholder="City"
        value={settings.defaultCity}
        onChange={handleChange}
      />

      <h3>🔔 System Notifications</h3>

      <label>
        <input
          type="checkbox"
          name="emailAlerts"
          checked={settings.emailAlerts}
          onChange={handleChange}
        />
        Email Alerts
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          name="smsAlerts"
          checked={settings.smsAlerts}
          onChange={handleChange}
        />
        SMS Alerts
      </label>

      <br />

      <label>Severity Level:</label>

      <select
        name="severityLevel"
        value={settings.severityLevel}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <br />
      <br />

      <button onClick={handleSave} disabled={loading}>
        💾 {loading ? "Saving..." : "Save"}
      </button>

      <button onClick={handleReset} style={{ marginLeft: "10px" }}>
        ♻ Reset
      </button>
    </div>
  );
};

export default Settings;