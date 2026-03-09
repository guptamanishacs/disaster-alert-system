// src/components/AlertsTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./AlertsTable.css";
import API_URL from '../config';

export default function AlertsTable() {
  const [alerts, setAlerts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null); // null for add, object for edit
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Fetch all alerts from backend
  const fetchAlerts = async () => {
    try {
      const res = await axios.get(`${API_URL}/alerts`);
      setAlerts(res.data);
    } catch (err) {
      console.error("Fetch alerts error:", err);
    }
  };

  // Open modal for Add or Edit
  const openAddModal = () => {
    setEditingAlert({
      title: "",
      type: "",
      severity: "Low",
      location: "",
      team: "",
      description: "",
    });
    setShowModal(true);
  };

  const openEditModal = (alert) => {
    setEditingAlert({
      ...alert,
      resolved: alert.resolved || null, // maintain resolved
    });
    setShowModal(true);
  };

  // Input change handler for modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAlert({ ...editingAlert, [name]: value });
  };

  // Save alert (Add or Update)
  const handleSave = async () => {
    if (!editingAlert.title || !editingAlert.type || !editingAlert.location) {
      return alert("Fill required fields!");
    }

    try {
      if (editingAlert._id) {
        // Update existing alert
        await axios.put(`${API_URL}/alerts/${editingAlert._id}`, editingAlert);
      } else {
        // Add new alert
        await axios.post(`${API_URL}/alerts`, editingAlert);
      }
      setShowModal(false);
      setEditingAlert(null);
      fetchAlerts();
    } catch (err) {
      console.error("Save alert failed:", err);
    }
  };

  // Delete alert
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this alert?")) {
      try {
        await axios.delete(`${API_URL}/alerts/${id}`);
        fetchAlerts();
      } catch (err) {
        console.error("Delete alert failed:", err);
      }
    }
  };

  // Acknowledge / Resolve
  const handleStatusChange = async (alert, newStatus) => {
    try {
      await axios.put(`${API_URL}/alerts/${alert._id}`, {
        ...alert,
        status: newStatus,
        resolved: newStatus === "Resolved" ? new Date() : alert.resolved,
      });
      fetchAlerts();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // Bulk selection
  const toggleSelect = (id) => {
    setSelectedAlerts(selectedAlerts.includes(id) ? selectedAlerts.filter((x) => x !== id) : [...selectedAlerts, id]);
  };

  const bulkResolve = async () => {
    await axios.put(`${API_URL}/alerts/bulk`, {
      ids: selectedAlerts,
      update: { status: "Resolved", resolved: new Date() },
    });
    setSelectedAlerts([]);
    fetchAlerts();
  };

  const bulkDelete = async () => {
    await axios.post(`${API_URL}/alerts/bulk-delete`, { ids: selectedAlerts });
    setSelectedAlerts([]);
    fetchAlerts();
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = "ID,Title,Type,Severity,Location,Status,Triggered,Resolved,Team\n";
    alerts.forEach((a) => {
      csv += `${a._id},${a.title},${a.type},${a.severity},${a.location},${a.status},${new Date(a.triggered).toLocaleString()},${a.resolved ? new Date(a.resolved).toLocaleString() : "--"},${a.team}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "alerts.csv");
  };

  // Dummy Share
  // Share Dashboard
const handleShare = () => {
  try {

    const dashboardLink = window.location.href;

    // Create alert summary
    const alertSummary = alerts
      .map(
        (a, i) =>
          `${i + 1}. ${a.title} | ${a.type} | ${a.severity} | ${a.location} | Status: ${a.status}`
      )
      .join("\n");

    const message =
      `🚨 Disaster Alert Dashboard\n\n` +
      `Total Alerts: ${alerts.length}\n\n` +
      `${alertSummary}\n\n` +
      `Dashboard Link:\n${dashboardLink}`;

    // Copy to clipboard
    navigator.clipboard.writeText(message);

    alert(
      "Dashboard info copied to clipboard.\n\n" +
      "You can now paste it in WhatsApp, Email, or Teams."
    );

  } catch (error) {
    console.error("Share error:", error);
  }
};

  return (
    <div className="alerts-container">
      {/* Filters + Buttons */}
      <div className="alerts-filters">
        <input placeholder="Search by ID, title, location..." />
        <select>
          <option>All Severities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <select>
          <option>All Types</option>
          <option>Flood</option>
          <option>AQI</option>
          <option>Fire</option>
          <option>Sensor</option>
        </select>
        <select>
          <option>All Status</option>
          <option>Active</option>
          <option>Resolved</option>
          <option>Acknowledged</option>
        </select>
        <input placeholder="Filter by location..." />
        <button className="btn-export" onClick={handleExportCSV}>📤 Export CSV</button>
        <button className="btn-share" onClick={handleShare}>🔗 Share Dashboard</button>
        <button className="btn-add" onClick={openAddModal}>➕ Add Alert</button>
      </div>

      {/* Bulk actions */}
      {selectedAlerts.length > 0 && (
        <div className="alerts-bulk-actions">
          <button onClick={bulkResolve}>Bulk Resolve</button>
          <button className="delete-btn" onClick={bulkDelete}>Bulk Delete</button>
        </div>
      )}

      {/* Alerts Table */}
      <table className="alerts-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Location</th>
            <th>Status</th>
            <th>Triggered</th>
            <th>Resolved</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr key={a._id}>
              <td><input type="checkbox" checked={selectedAlerts.includes(a._id)} onChange={() => toggleSelect(a._id)} /></td>
              <td>{a._id}</td>
              <td>{a.title}</td>
              <td>{a.type === "Flood" ? "🌊 Flood" : a.type === "AQI" ? "🌫️ AQI" : a.type === "Fire" ? "🔥 Fire" : "⚡ Sensor"}</td>
              <td className={a.severity.toLowerCase()}>{a.severity}</td>
              <td>{a.location}</td>
              <td>{a.status}</td>
              <td>{new Date(a.triggered).toLocaleString()}</td>
              <td>{a.resolved ? new Date(a.resolved).toLocaleString() : "--"}</td>
              <td>{a.team}</td>
              <td>
                <button onClick={() => handleStatusChange(a, "Acknowledged")}>Acknowledge</button>
                <button onClick={() => handleStatusChange(a, "Resolved")}>Resolve</button>
                <button onClick={() => openEditModal(a)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(a._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingAlert._id ? "Edit Alert" : "Add New Alert"}</h3>
            <div className="modal-content">
              <input type="text" placeholder="Title" name="title" value={editingAlert.title} onChange={handleChange} />
              <select name="type" value={editingAlert.type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Flood">Flood 🌊</option>
                <option value="AQI">AQI 🌫️</option>
                <option value="Fire">Fire 🔥</option>
                <option value="Sensor">Sensor ⚡</option>
              </select>
              <select name="severity" value={editingAlert.severity} onChange={handleChange}>
                <option value="Low">Low 🟢</option>
                <option value="Medium">Medium 🟡</option>
                <option value="High">High 🟠</option>
                <option value="Critical">Critical 🔴</option>
              </select>
              <input type="text" placeholder="Location" name="location" value={editingAlert.location} onChange={handleChange} />
              <input type="text" placeholder="Assigned Team" name="team" value={editingAlert.team} onChange={handleChange} />
              <textarea placeholder="Description" name="description" value={editingAlert.description} onChange={handleChange} />
            </div>
            <div className="modal-buttons">
              <button className="btn-add-alert" onClick={handleSave}>{editingAlert._id ? "Update Alert" : "Add Alert"}</button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}