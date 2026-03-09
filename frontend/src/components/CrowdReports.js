import React, { useState } from "react";

export default function CrowdReports(){

  const [msg,setMsg]=useState("");

  const sendReport=()=>{
    alert("Report Sent: "+msg);
  };

  return(
    <div>
      <h2>Report Disaster</h2>

      <textarea onChange={(e)=>setMsg(e.target.value)} />

      <button onClick={sendReport}>Submit</button>
    </div>
  );
}