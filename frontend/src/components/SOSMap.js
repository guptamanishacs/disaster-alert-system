import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from '../config';

export default function AdminSOSTable() {
  const [sosList, setSosList] = useState([]);
  const [teamAssignment, setTeamAssignment] = useState({}); // track team for each SOS

  // FETCH SOS HISTORY
  const fetchSOS = async () => {
    try {
      const res = await axios.get(`${API_URL}/sos`);
      setSosList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/sos/${id}`, { status });
      fetchSOS();
    } catch (err) {
      console.log(err);
    }
  };

  // ASSIGN TEAM
  const assignTeam = async (id, team) => {
    try {
      await axios.put(`${API_URL}/sos/${id}`, { team });
      fetchSOS();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE SOS
  const deleteSOS = async (id) => {
    try {
      await axios.delete(`${API_URL}/sos/${id}`);
      fetchSOS();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSOS();
  }, []);

  return (
    <div>
      <h2>🆘 Admin SOS Dashboard</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
            <th>Location</th>
            <th>Level</th>
            <th>Status</th>
            <th>Team</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sosList.length === 0 && (
            <tr>
              <td colSpan="8">No SOS Requests</td>
            </tr>
          )}
          {sosList.map((sos) => (
            <tr key={sos._id} style={{ backgroundColor: sos.status === "Pending" ? "#ffe6e6" : "#fff" }}>
              <td>{sos.name || "Unknown"}</td>
              <td>{sos.message}</td>
              <td>{sos.location}</td>
              <td>{sos.emergencyType}</td>
              <td>{sos.status}</td>
              <td>
                <input
                  type="text"
                  placeholder="Assign Team"
                  value={teamAssignment[sos._id] || sos.team || ""}
                  onChange={(e) =>
                    setTeamAssignment({ ...teamAssignment, [sos._id]: e.target.value })
                  }
                  style={{ width: "100px" }}
                />
                <button
                  onClick={() =>
                    assignTeam(sos._id, teamAssignment[sos._id] || sos.team || "")
                  }
                >
                  Assign
                </button>
              </td>
              <td>{new Date(sos.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => updateStatus(sos._id, "Responding")}>🚑 Responding</button>
                <button onClick={() => updateStatus(sos._id, "Resolved")}>✔ Resolved</button>
                {sos.phone && (
                  <a href={`tel:${sos.phone}`}>
                    <button>📞 Call</button>
                  </a>
                )}
                <button onClick={() => deleteSOS(sos._id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}