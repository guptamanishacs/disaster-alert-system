import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Alert.css";

export default function Alert() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.log("Error fetching alerts:", err);
    }
  };

  const markSafe = async (alertId) => {
    try {
      await axios.post("http://localhost:5000/api/alerts/safe", {
        alertId: alertId
      });

      alert("✅ Your safety status has been recorded.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmergency = () => {
    alert(
      "🚨 Emergency Numbers\n\n" +
      "🚑 Ambulance: 108\n" +
      "🚓 Police: 100\n" +
      "🚒 Fire: 101\n" +
      "🌊 Disaster Helpline: 1070"
    );
  };

  const getIcon = (type) => {
    if (type === "Flood") return "🌊";
    if (type === "AQI") return "🌫️";
    if (type === "Fire") return "🔥";
    return "⚡";
  };

  const getInstruction = (type) => {
    if (type === "Flood") return "Move to higher ground immediately.";
    if (type === "AQI") return "Wear a mask and avoid outdoor activity.";
    if (type === "Fire") return "Evacuate the area immediately.";
    return "Follow instructions from local authorities.";
  };

  return (
    <div className="alerts-page">

      <h2 className="alerts-title">🚨 Live Disaster Alerts</h2>

      <div className="alerts-grid">

        {alerts.map((a) => (

          <div key={a._id} className="alert-card">

            <div className="alert-header">
              <span className="alert-icon">{getIcon(a.type)}</span>
              <h3>{a.title}</h3>
            </div>

            <div className="alert-body">

              <p><b>Type:</b> {a.type}</p>

              <p>
                <b>Severity:</b>
                <span className={`severity ${a.severity?.toLowerCase()}`}>
                  {a.severity}
                </span>
              </p>

              <p><b>Location:</b> {a.location || "Unknown"}</p>

              <p><b>Status:</b> {a.status}</p>

              <p className="alert-desc">{a.description}</p>

              <p className="alert-time">
                ⏰ {new Date(a.triggered).toLocaleString()}
              </p>

              <div className="safety-box">
                ⚠ Safety Instruction:
                <br />
                {getInstruction(a.type)}
              </div>

            </div>

            <div className="alert-buttons">

              <button
                className="safe-btn"
                onClick={() => markSafe(a._id)}
              >
                ✅ I Am Safe
              </button>

              <button
                className="help-btn"
                onClick={handleEmergency}
              >
                📞 Emergency Help
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}