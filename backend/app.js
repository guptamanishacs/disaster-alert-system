import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Analytics from "./components/Analytics";
import SOS from "./components/SOS";

// USER PROTECTED ROUTE
const UserRoute = ({ children }) => {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) return <Navigate to="/" />;
  if (user.isAdmin) return <Navigate to="/admin" />;

  return children;
};

// ADMIN PROTECTED ROUTE
const AdminRoute = ({ children }) => {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) return <Navigate to="/" />;
  if (!user.isAdmin) return <Navigate to="/dashboard" />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* User Dashboard with nested routing */}
        <Route
          path="/dashboard/*"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Admin Analytics */}
        <Route
          path="/analytics"
          element={
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          }
        />

        {/* Direct SOS page */}
        <Route
          path="/sos"
          element={
            <UserRoute>
              <SOS />
            </UserRoute>
          }
        />

        {/* Catch-all → redirect to login */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;