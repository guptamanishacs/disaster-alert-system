// src/api.js
const BASE_URL = "http://localhost:5000/api";

// ================= OVERVIEW =================

// Get latest overview data (dashboard live data)
export const getOverview = async () => {
  const res = await fetch(`${BASE_URL}/overview`);
  return res.json();
};

// Generate new AI overview data
export const generateOverview = async () => {
  const res = await fetch(`${BASE_URL}/overview/generate`);
  return res.json();
};

// Fetch summary data for overview cards (dummy or real backend)
export const fetchSummary = async () => {
  // If backend API exists:
  // const res = await fetch(`${BASE_URL}/analytics/summary`);
  // return res.json();

  // Dummy data for now:
  return [
    { title: "Total Alerts", value: 120 },
    { title: "Active Alerts", value: 32 },
    { title: "High/Critical Alerts", value: 15 },
    { title: "Resolved Alerts", value: 73 },
  ];
};

// ================= SENSORS =================

// Simulate sensor POST data
export const simulateSensors = async (data) => {
  return fetch(`${BASE_URL}/sensors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// Fetch sensor cards (dummy or real backend)
export const fetchSensors = async () => {
  // Dummy data
  return [
    { title: "Temperature", value: "25°C" },
    { title: "Humidity", value: "53%" },
    { title: "AQI", value: 132 },
    { title: "River Level", value: "2.45 m" },
    { title: "Flood Risk", value: "Safe" },
    { title: "Satellite Status", value: "Active" },
  ];
};

// ================= ENVIRONMENT =================
export const saveEnvironment = async (data) => {
  return fetch(`${BASE_URL}/environment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// ================= ALERT =================
export const generateAlert = async (data) => {
  return fetch(`${BASE_URL}/alerts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// Fetch alerts for AlertsTable component
export const fetchAlerts = async () => {
  // Dummy data
  return [
    { type: "Flood", city: "Mumbai", level: "High", status: "Active" },
    { type: "Cyclone", city: "Goa", level: "Critical", status: "Active" },
    { type: "Earthquake", city: "Delhi", level: "Medium", status: "Resolved" },
  ];
};

// ================= SOS =================
export const sendSOS = async (data) => {
  return fetch(`${BASE_URL}/sos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// Fetch SOS alerts for SOSMap component
export const fetchSOS = async () => {
  // Dummy data
  return [
    { id: 1, city: "Mumbai", type: "Flood", level: "High" },
    { id: 2, city: "Goa", type: "Cyclone", level: "Critical" },
  ];
};

// ================= PREDICTION =================
export const runPrediction = async (data) => {
  return fetch(`${BASE_URL}/predictions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// ================= SETTINGS =================
export const saveSettings = async (data) => {
  return fetch(`${BASE_URL}/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};