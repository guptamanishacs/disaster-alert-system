import React from "react";
import "../styles/Home.css";

function Home() {
  const disasters = [
    { title: "Flood Prediction", image: "https://imgcdn.stablediffusionweb.com/2024/3/13/1b811cf9-10f9-4d74-9d28-5bfc2bcda2b3.jpg" },
    { title: "Cyclone Monitoring", image: "https://thumbs.dreamstime.com/z/formation-movement-huge-cyclone-above-earth-s-surface-meteorological-satellites-guard-safety-people-timely-warning-300928559.jpg" },
    { title: "Heatwave Detection", image: "https://th.bing.com/th/id/OIP.V29JJUEMBXsqVMbTeOxk_gHaEH?w=284&h=180" },
    { title: "Earthquake Anomaly Detection", image: "https://www.mdpi.com/sensors/sensors-23-05335/article_deploy/html/images/sensors-23-05335-g001.png" },
  ];

  return (
    <div className="home">
      <header className="header">
        <div className="header-text">
          <h1>Predict Natural Disasters Before They Strike</h1>
          <p>AI-based platform for early disaster prediction & safety alerts</p>
          <div className="header-buttons">
            <button className="btn red">Check Risk Now</button>
            <button className="btn white">Get Started</button>
          </div>
        </div>
        <div className="header-image">
          <img
            src="https://i.ytimg.com/vi/o1HkRG4kGb0/maxresdefault.jpg"
            alt="Earthquake Anomaly Detection"
            style={{ width: "400px", height: "250px", objectFit: "cover" }}
          />
        </div>
      </header>

      <section className="disasters">
        <h2>Disaster Types We Monitor</h2>
        <div className="disaster-cards">
          {disasters.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.image} alt={item.title} className="disaster-image" />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="system-work">
        <h2>How The System Works</h2>
        <div className="work-cards">
          <div className="card">
            <img src="https://researchgraduate.com/wp-content/uploads/2022/03/March_DataCollection_1000px.jpg" alt="Data Collection" />
            <p>Data Collection</p>
          </div>
          <div className="card">
            <img src="https://miro.medium.com/v2/resize:fit:1358/1*fZsOOTFSFpBcc9DEApeLow.png" alt="AI Processing" />
            <p>AI Processing</p>
          </div>
          <div className="card">
            <img src="https://img.freepik.com/premium-vector/vector-illustration-about-risk-assessment-concept-with-speedometer-risk-management_675567-8562.jpg?w=2000" alt="Risk Prediction" />
            <p>Risk Prediction</p>
          </div>
          <div className="card">
            <img src="https://img.freepik.com/premium-vector/sos-notification-screen-phone-sos-emergency-call-phone-911-call-screen-smartphone-cry-help-calling-help-vector-stock-illustration_435184-1302.jpg" alt="Alerts & SOS" />
            <p>Alerts & SOS</p>
          </div>
        </div>
      </section>

      <section className="live-alert">
        <h3>Live Alert: Delhi | Heatwave</h3>
        <p>
          Risk Level: <span className="high">HIGH – Warning Issued</span>
        </p>
      </section>

      <section className="emergency">
        <h2>Your Safety Is Our Priority</h2>
        <p>One-click SOS for instant emergency response.</p>
        <button className="btn red">SOS Emergency</button>
      </section>
    </div>
  );
}

export default Home;
