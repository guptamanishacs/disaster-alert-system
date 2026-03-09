import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analytics.css";
import API_URL from '../config';

export default function Analytics() {

  const [summary, setSummary] = useState({
    totalSOS: 0,
    totalAlerts: 0,
    pendingSOS: 0,
    resolvedSOS: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const res = await axios.get(
          `${API_URL}/analytics/user/64ab1234`
        );

        console.log("API Data:", res.data);

        setSummary(res.data);

      } catch (err) {

        console.log("Error:", err);

      }

      setLoading(false);

    };

    fetchAnalytics();

  }, []);


  if (loading) {
    return <h3>Loading analytics...</h3>;
  }

  return (
    <div className="analytics-page">

      <h2>User Analytics</h2>

      <div className="analytics-cards">

        <div className="analytics-card blue">
          <h3>Total SOS</h3>
          <p>{summary.totalSOS}</p>
        </div>

        <div className="analytics-card red">
          <h3>Total Alerts</h3>
          <p>{summary.totalAlerts}</p>
        </div>

        <div className="analytics-card orange">
          <h3>Pending SOS</h3>
          <p>{summary.pendingSOS}</p>
        </div>

        <div className="analytics-card green">
          <h3>Resolved SOS</h3>
          <p>{summary.resolvedSOS}</p>
        </div>

      </div>

    </div>
  );
}