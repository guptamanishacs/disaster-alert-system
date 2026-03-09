import { useState, useEffect } from "react";
import axios from "axios";
import "./DisasterManager.css";

function DisasterManager() {
  const [disasters, setDisasters] = useState([]);
  const [form, setForm] = useState({
    type: "",
    severity: "",
    region: "",
    guidelines: "",
    datasetName: ""
  });

  // Fetch disasters from backend
  const fetchDisasters = async () => {
    const res = await axios.get("http://localhost:5000/api/disasters");
    setDisasters(res.data);
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add disaster
  const handleAdd = async () => {
    if (!form.type || !form.severity || !form.region) return alert("Fill all required fields!");
    await axios.post("http://localhost:5000/api/disasters/add", form);
    setForm({ type: "", severity: "", region: "", guidelines: "", datasetName: "" });
    fetchDisasters();
  };

  // Delete disaster
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/disasters/${id}`);
    fetchDisasters();
  };

  return (
    <div className="dm-container">
      <h2>🌋 Admin Disaster Data Management</h2>

      <div className="dm-form">
        <input placeholder="Type" name="type" value={form.type} onChange={handleChange} />
        <select name="severity" value={form.severity} onChange={handleChange}>
          <option value="">Severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input placeholder="Region" name="region" value={form.region} onChange={handleChange} />
        <input placeholder="Safety Guidelines" name="guidelines" value={form.guidelines} onChange={handleChange} />
        <input placeholder="Dataset Name (CSV/JSON)" name="datasetName" value={form.datasetName} onChange={handleChange} />
        <button onClick={handleAdd}>Add Disaster</button>
      </div>

      <table className="dm-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Severity</th>
            <th>Region</th>
            <th>Guidelines</th>
            <th>Dataset</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {disasters.map((d) => (
            <tr key={d._id}>
              <td>{d.type}</td>
              <td>{d.severity}</td>
              <td>{d.region}</td>
              <td>{d.guidelines}</td>
              <td>{d.datasetName || "-"}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(d._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisasterManager;
