import React from "react";
import DisasterCards from "./DisasterCards";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h2>Disaster Overview</h2>
      <DisasterCards />
    </div>
  );
}

export default Home;
