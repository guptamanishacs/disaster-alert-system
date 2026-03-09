import React from "react";

export default function RegisterPage() {
  return (
    <div className="section">
      <h2>User Registration</h2>

      <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
        <input type="text" placeholder="Full Name" /><br /><br />
        <input type="email" placeholder="Email" /><br /><br />
        <input type="password" placeholder="Password" /><br /><br />
        <button className="btn blue">Register</button>
      </div>
    </div>
  );
}