import React from "react";
import "./Overview.css";

function RiskMap({ zones }) {
  return (
    <div className="map-container">
      {zones.map((zone, index) => (
        <div
          key={index}
          className={`zone-card zone-${zone.risk.toLowerCase()}`}
        >
          📍 {zone.name} - {zone.risk} Risk
        </div>
      ))}
    </div>
  );
}

export default RiskMap;