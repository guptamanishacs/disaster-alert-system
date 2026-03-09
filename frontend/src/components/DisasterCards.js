import React from "react";

function DisasterCards() {
  const disasters = [
    { title: "Flood", description: "Flood prediction and alerts" },
    { title: "Cyclone", description: "Cyclone monitoring system" },
    { title: "Earthquake", description: "Earthquake detection and alerts" },
    { title: "Heatwave", description: "Heatwave early warning system" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
      {disasters.map((disaster, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "20px", margin: "10px", width: "200px" }}>
          <h3>{disaster.title}</h3>
          <p>{disaster.description}</p>
        </div>
      ))}
    </div>
  );
}

export default DisasterCards;
