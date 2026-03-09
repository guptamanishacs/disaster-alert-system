import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Simulation.css"; // Make sure this file exists or remove this line

export default function Simulation() {
  const [aiData, setAiData] = useState([]); // always an array
  const [loading, setLoading] = useState(false);

  // Fetch AI predictions from backend
  const fetchAI = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/ai/predictions");
      console.log("AI API response:", res.data); // debug
      // If API returns { success: true, data: [...] }
      if (res.data && Array.isArray(res.data.data)) {
        setAiData(res.data.data);
      } else if (Array.isArray(res.data)) {
        setAiData(res.data);
      } else {
        setAiData([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching AI predictions:", err);
      setAiData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAI();
  }, []);

  return (
    <div className="simulation-container">
      <h2>🧪 Disaster Risk Overview</h2>

      {/* Prediction Table */}
      <div className="prediction-table">
        <h3>AI Predictions</h3>
        <button onClick={fetchAI}>Refresh Predictions</button>

        {loading ? (
          <p>Loading predictions...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Disaster</th>
                <th>Location</th>
                <th>Probability (%)</th>
                <th>Risk Level</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(aiData) && aiData.length > 0 ? (
                aiData.map((a) => (
                  <tr key={a._id}>
                    <td>{a.type}</td>
                    <td>{a.location?.city || a.location}</td>
                    <td>{a.probability}</td>
                    <td>{a.risk}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No AI predictions available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}