import React from "react";
import "./LandingPage.css";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <div className="landing">

      {/* Navbar */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero">
        <h1>
          AI-Based Disaster Prediction <br />
          & Human Safety Alert System
        </h1>

        <p>Predict • Prepare • Protect Lives using Artificial Intelligence</p>

        <div className="hero-buttons">
          <button className="btn red">Check Live Risk</button>
          <button className="btn blue">View National Risk Map</button>
          <button className="btn green">AI Prediction Demo</button>
        </div>
      </section>

      {/* ================= WHY SECTION ================= */}
      <section className="section">
        <h2>Why This System is Needed</h2>

        <div className="grid-4">
          <div className="card red-border">❌ Late Alerts</div>
          <div className="card red-border">❌ Manual Analysis</div>
          <div className="card yellow-border">❌ No Explainability</div>
          <div className="card green-border">✅ Explainable Decisions</div>
        </div>
      </section>

      {/* ================= AI ENGINE ================= */}
      <section className="section">
        <h2>AI Intelligence Engine</h2>

        <div className="grid-3">
          <div className="card">
            <h3>Machine Learning Models</h3>
            <p>LSTM, Bayesian Inference, Real-time Predictions</p>
          </div>

          <div className="card">
            <h3>Satellite Intelligence</h3>
            <p>Rainfall, Cloud Density, Flood Zone Mapping</p>
          </div>

          <div className="card">
            <h3>Risk Probability Engine</h3>
            <p>Low • Medium • High Risk Analysis</p>
          </div>
        </div>
      </section>

      {/* ================= AI WORKFLOW ================= */}
      <section className="section">
        <h2>AI Workflow Architecture</h2>

        <div className="workflow">
          <div className="workflow-box">📡 Data Collection</div>
          <div className="arrow">➡</div>
          <div className="workflow-box">🧠 ML Model Processing</div>
          <div className="arrow">➡</div>
          <div className="workflow-box">📊 Risk Prediction</div>
          <div className="arrow">➡</div>
          <div className="workflow-box">🚨 Alert Generation</div>
        </div>
      </section>

      {/* ================= MODEL ACCURACY ================= */}
      <section className="section">
        <h2>Model Accuracy & Performance</h2>

        <p>Flood Prediction Model</p>
        <div className="accuracy-bar">
          <div className="progress" style={{ width: "92%" }}>92%</div>
        </div>

        <p>Cyclone Detection Model</p>
        <div className="accuracy-bar">
          <div className="progress" style={{ width: "89%" }}>89%</div>
        </div>

        <p>Earthquake Risk Model</p>
        <div className="accuracy-bar">
          <div className="progress" style={{ width: "85%" }}>85%</div>
        </div>
      </section>

      {/* ================= LIVE RISK TYPES ================= */}
      <section className="section">
        <h2>Live Risk Visualization</h2>

        <div className="grid-4">
          <div className="card">🌊 Floods</div>
          <div className="card">🌪 Cyclones</div>
          <div className="card">🌍 Earthquake</div>
          <div className="card">☀ Heatwaves</div>
        </div>
      </section>

      {/* ================= REAL TIME METER ================= */}
      <section className="section">
        <h2>Real-Time Risk Meter</h2>

        <div className="meter-container">
          <div className="meter">
            <span>HIGH</span>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="section map-section">
        <div className="map-left">
          <h2>Live National Risk Map</h2>
          <p><span className="high">Mumbai – High Risk</span></p>
          <p>Chennai – Moderate</p>
        </div>

        <div className="map-right">
          <div className="control-panel">
            <h3>Admin Control Panel</h3>
            <p>Chennai – Medium</p>
            <p>Jaipur – Low</p>

            <div className="panel-buttons">
              <button className="btn small red">Send Alerts</button>
              <button className="btn small blue">Generate SOS</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HUMAN SAFETY ================= */}
      <section className="section">
        <h2>Human Safety & Alert System</h2>

        <div className="grid-2">
          <div className="card">
            <h3>User Module</h3>
            <p>Check Risk • Receive Alerts • Send SOS</p>
          </div>

          <div className="card">
            <h3>Admin Dashboard</h3>
            <p>Manage Alerts • Track SOS • Analytics</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section">
        <h2>Join the Future of Disaster Management</h2>
        <button className="btn green">Get Started</button>
        <button className="btn blue">View Demo</button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © 2026 AI-Based Disaster Prediction & Human Safety Alert System
      </footer>

    </div>
  );
}