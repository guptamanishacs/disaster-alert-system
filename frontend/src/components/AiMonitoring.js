import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

export default function AiMonitoring() {
  const [aiLogs, setAiLogs] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/ai_logs")
      .then(res => setAiLogs(res.data));
  },[]);

  const chartData = {
    labels: aiLogs.map(l=>l.model_version),
    datasets:[{
      label:"Accuracy %",
      data: aiLogs.map(l=>l.accuracy),
      backgroundColor:"#e63946"
    }]
  };

  return (
    <div style={{padding:20}}>
      <h2>AI Monitoring Panel</h2>
      <Bar data={chartData}/>
    </div>
  );
}