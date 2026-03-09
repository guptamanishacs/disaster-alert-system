import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from '../config';

export default function SOSHistory({ user }) {
  const [sosList, setSosList] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`${API_URL}/sos/${user._id}`)
      .then((res) => setSosList(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div>
      <h2>SOS History</h2>
      {sosList.map((s) => (
        <div key={s._id}>
          <p>Type: {s.emergencyType}</p>
          <p>Status: {s.status}</p>
        </div>
      ))}
    </div>
  );
}