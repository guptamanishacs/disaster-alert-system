import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AISimulation.css";
import API_URL from '../config';

export default function AISimulation() {
  const [aiData, setAiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [simulation, setSimulation] = useState({
    type: "Flood",
    location: "",
    rainfall: "",
    waterLevel: "",
    windSpeed: ""
  });

  const [result, setResult] = useState(null);

  // Fetch AI predictions
  const fetchAI = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/ai/predictions`);
      setAiData(res.data.data || []); // ✅ use res.data.data if backend sends {success,data}
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAI();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSimulation({
      ...simulation,
      [name]: value
    });
  };

  // Run simulation
  const runSimulation = async () => {
    try {
      const res = await axios.post(`${API_URL}/ai/simulate`, {
        ...simulation,
        rainfall: Number(simulation.rainfall),
        waterLevel: Number(simulation.waterLevel),
        windSpeed: Number(simulation.windSpeed)
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ai-container">
      <h2>🧪 AI Prediction & Simulation</h2>

      {/* Simulation Form */}
      <div className="simulation-form">
        <h3>Run Disaster Simulation</h3>

        <select name="type" value={simulation.type} onChange={handleChange}>
          <option>Flood</option>
          <option>Storm</option>
          <option>Earthquake</option>
          <option>Air Pollution</option>
        </select>

        <input name="location" value={simulation.location} placeholder="Location" onChange={handleChange} />
        <input name="rainfall" value={simulation.rainfall} placeholder="Rainfall (mm)" onChange={handleChange} />
        <input name="waterLevel" value={simulation.waterLevel} placeholder="Water Level (m)" onChange={handleChange} />
        <input name="windSpeed" value={simulation.windSpeed} placeholder="Wind Speed (km/h)" onChange={handleChange} />

        <button onClick={runSimulation}>Run Simulation</button>
      </div>

      {/* Simulation Result */}
      {result && (
        <div className="simulation-result">
          <h3>Simulation Result</h3>
          <p><strong>Disaster:</strong> {result.type}</p>
          <p><strong>Location:</strong> {result.location}</p>
          <p><strong>Probability:</strong> {result.probability}%</p>
          <p><strong>Risk Level:</strong> {result.risk}</p>
        </div>
      )}

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
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {aiData.map((a) => (
                <tr key={a._id}>
                  <td>{a.type}</td>
                  <td>{a.location?.city || a.location}</td>
                  <td>{a.probability}</td>
                  <td>{a.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}