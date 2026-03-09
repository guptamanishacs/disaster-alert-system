import React, { useState } from "react";
import "./Settings.css";

function UserSettings() {

  const [settings, setSettings] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    area: "",
    floodAlerts: true,
    earthquakeAlerts: true,
    stormAlerts: true,
    airQualityAlerts: false,
    appNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    emergencyContact: "",
    theme: "light",
    language: "English"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = () => {
    console.log("User Settings Saved:", settings);
    alert("User Settings Saved");
  };

  return (
    <div className="settings-container">

      <h2>⚙ User Settings</h2>

      <h3>👤 Profile</h3>

      <input name="name" placeholder="Name" onChange={handleChange}/>
      <input name="email" placeholder="Email" onChange={handleChange}/>
      <input name="phone" placeholder="Phone Number" onChange={handleChange}/>

      <h3>📍 Location</h3>

      <input name="city" placeholder="City" onChange={handleChange}/>
      <input name="area" placeholder="Area / Zone" onChange={handleChange}/>

      <h3>🚨 Disaster Alerts</h3>

      <label>
        <input type="checkbox" name="floodAlerts" onChange={handleChange}/>
        Flood Alerts
      </label>

      <label>
        <input type="checkbox" name="earthquakeAlerts" onChange={handleChange}/>
        Earthquake Alerts
      </label>

      <label>
        <input type="checkbox" name="stormAlerts" onChange={handleChange}/>
        Storm Alerts
      </label>

      <label>
        <input type="checkbox" name="airQualityAlerts" onChange={handleChange}/>
        Air Quality Alerts
      </label>

      <h3>🔔 Notifications</h3>

      <label>
        <input type="checkbox" name="appNotifications" onChange={handleChange}/>
        App Notifications
      </label>

      <label>
        <input type="checkbox" name="emailAlerts" onChange={handleChange}/>
        Email Alerts
      </label>

      <label>
        <input type="checkbox" name="smsAlerts" onChange={handleChange}/>
        SMS Alerts
      </label>

      <h3>🆘 SOS</h3>

      <input
        name="emergencyContact"
        placeholder="Emergency Contact"
        onChange={handleChange}
      />

      <h3>🎨 App Preferences</h3>

      <select name="theme" onChange={handleChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <select name="language" onChange={handleChange}>
        <option>English</option>
        <option>Hindi</option>
      </select>

      <div className="settings-buttons">
        <button className="save-btn" onClick={handleSave}>💾 Save</button>
        <button className="reset-btn">♻ Reset</button>
      </div>

    </div>
  );
}

export default UserSettings;