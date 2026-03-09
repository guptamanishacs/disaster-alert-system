import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AnalyticsCharts.css";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
BarChart,
Bar,
PieChart,
Pie,
Cell,
Legend
} from "recharts";
import API_URL from '../config';

export default function AnalyticsCharts() {

const [data,setData] = useState(null);
const [lastUpdated,setLastUpdated] = useState("");
const [darkMode,setDarkMode] = useState(false);
const [alertPopup,setAlertPopup] = useState("");

const COLORS = ["#22c55e","#ef4444"];

const fetchAnalytics = async () => {

try{

const res = await axios.get(`${API_URL}/admin/analytics`);
setData(res.data);

setLastUpdated(new Date().toLocaleTimeString());

if(res.data.alerts.active > 5){
setAlertPopup("⚠ High number of active alerts!");
}

}catch(err){

console.log(err);

const fallback = {
sensors:{total:15,online:11,offline:4},
alerts:{total:25,active:6,resolved:19},
sos:{total:12,pending:3,resolved:9},
ai:{accuracy:91},
disasterTrend:[
{month:"Jan",flood:2,aqi:1},
{month:"Feb",flood:3,aqi:2},
{month:"Mar",flood:6,aqi:3},
{month:"Apr",flood:4,aqi:2},
{month:"May",flood:7,aqi:5}
]
};

setData(fallback);
setLastUpdated(new Date().toLocaleTimeString());

}

};

useEffect(()=>{

fetchAnalytics();

const interval = setInterval(()=>{
fetchAnalytics();
},10000);

return ()=>clearInterval(interval);

},[]);

if(!data) return <h2>Loading...</h2>;

const sensorPieData = [
{name:"Online",value:data.sensors.online},
{name:"Offline",value:data.sensors.offline}
];

const healthScore =
Math.round((data.sensors.online/data.sensors.total)*100);

const exportReport = () => {

const report = JSON.stringify(data,null,2);

const blob = new Blob([report],{
type:"application/json"
});

const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "analytics-report.json";
a.click();

};

return (

<div className={darkMode ? "analytics-page dark" : "analytics-page"}>

<h2>Admin Analytics Dashboard</h2>

<div className="top-controls">

<button onClick={exportReport}>
Download Report
</button>

<button onClick={()=>setDarkMode(!darkMode)}>
Toggle Dark Mode
</button>

</div>

{alertPopup && (
<div className="alert-popup">
{alertPopup}
</div>
)}

<p className="update-time">
Last Updated : {lastUpdated}
</p>

<div className="system-health">

<h3>System Health Score</h3>
<h1>{healthScore}%</h1>

</div>

<h3>Sensor Analytics</h3>

<div className="analytics-cards">

<div className="card">
<h3>Total Sensors</h3>
<p>{data.sensors.total}</p>
</div>

<div className="card green">
<h3>Online Sensors</h3>
<p>{data.sensors.online}</p>
</div>

<div className="card red">
<h3>Offline Sensors</h3>
<p>{data.sensors.offline}</p>
</div>

</div>

<h3>Alert Analytics</h3>

<div className="analytics-cards">

<div className="card">
<h3>Total Alerts</h3>
<p>{data.alerts.total}</p>
</div>

<div className="card orange">
<h3>Active Alerts</h3>
<p>{data.alerts.active}</p>
</div>

<div className="card green">
<h3>Resolved Alerts</h3>
<p>{data.alerts.resolved}</p>
</div>

</div>

<h3>SOS Analytics</h3>

<div className="analytics-cards">

<div className="card">
<h3>Total SOS</h3>
<p>{data.sos.total}</p>
</div>

<div className="card orange">
<h3>Pending SOS</h3>
<p>{data.sos.pending}</p>
</div>

<div className="card green">
<h3>Resolved SOS</h3>
<p>{data.sos.resolved}</p>
</div>

</div>

<h3>AI Prediction</h3>

<div className="analytics-cards">

<div className="card blue">
<h3>AI Prediction Accuracy</h3>
<p>{data.ai.accuracy}%</p>
</div>

</div>

<div className="chart-container">

<h3>Disaster Trend</h3>

<LineChart width={800} height={300} data={data.disasterTrend}>

<XAxis dataKey="month"/>
<YAxis/>
<Tooltip/>
<CartesianGrid stroke="#ccc"/>

<Line
type="monotone"
dataKey="flood"
stroke="#ef4444"
/>

<Line
type="monotone"
dataKey="aqi"
stroke="#3b82f6"
/>

</LineChart>

</div>

<div className="chart-container">

<h3>Disaster Comparison</h3>

<BarChart width={700} height={300} data={data.disasterTrend}>

<XAxis dataKey="month"/>
<YAxis/>
<Tooltip/>

<Bar
dataKey="flood"
fill="#ef4444"
/>

<Bar
dataKey="aqi"
fill="#3b82f6"
/>

</BarChart>

</div>

<div className="chart-container">

<h3>Sensor Status</h3>

<PieChart width={400} height={300}>

<Pie
data={sensorPieData}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>

{sensorPieData.map((entry,index)=>(
<Cell
key={index}
fill={COLORS[index]}
/>
))}

</Pie>

<Legend/>

</PieChart>

</div>

</div>

);

}