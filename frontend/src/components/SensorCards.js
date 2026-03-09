import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SensorCard.css";
import API_URL from '../config';

export default function SensorCards() {

  const role = "Admin";   // Admin → full access | User → read only

  const [sensors,setSensors] = useState([]);
  const [alerts,setAlerts] = useState([]);  // eslint-disable-line no-unused-vars
  const [search,setSearch] = useState("");
  const [selected,setSelected] = useState(null);  // eslint-disable-line no-unused-vars
  const [showModal,setShowModal] = useState(false);
  const [editIndex,setEditIndex] = useState(null);

  const [form,setForm] = useState({
    name:"",
    location:"",
    type:"Water",
    battery:100,
    threshold:100
  });

  // ---------------- LOAD FROM DATABASE ----------------

  const loadSensors = async () => {
    try{
      const res = await axios.get(`${API_URL}/sensors`);
      if(res.data.success){
        setSensors(res.data.data);
      }
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    loadSensors();
  },[]);

  // ---------------- ADD / UPDATE SENSOR ----------------

  const handleSubmit = async () => {

    if(!form.name || !form.location) return;

    try{

      if(editIndex !== null){

        const sensor = sensors[editIndex];

        await axios.put(
          `${API_URL}/sensors/${sensor.sensorId}`,
          form
        );

      }else{

        await axios.post(
          `${API_URL}/sensors`,
          form
        );

      }

      setShowModal(false);
      setEditIndex(null);

      setForm({
        name:"",
        location:"",
        type:"Water",
        battery:100,
        threshold:100
      });

      loadSensors();

    }catch(err){
      console.log(err);
    }
  };

  // ---------------- DELETE SENSOR ----------------

  const deleteSensor = async (i) => {

    if(role !== "Admin") return;

    const sensor = sensors[i];

    try{

      await axios.delete(
        `${API_URL}/sensors/${sensor.sensorId}`
      );

      loadSensors();

    }catch(err){
      console.log(err);
    }

  };

  // ---------------- TOGGLE STATUS ----------------

  const toggleStatus = async (i) => {

    const sensor = sensors[i];

    const newStatus =
      sensor.status === "Online"
      ? "Offline"
      : "Online";

    try{

      await axios.put(
        `${API_URL}/sensors/${sensor.sensorId}`,
        { status:newStatus }
      );

      loadSensors();

    }catch(err){
      console.log(err);
    }
  };

  // ---------------- SIMULATE SENSOR VALUE ----------------

  const simulate = async (i) => {

    const sensor = sensors[i];

    const random = Math.floor(Math.random()*300);

    try{

      await axios.put(
        `${API_URL}/sensors/${sensor.sensorId}`,
        {
          value:random,
          lastUpdated:new Date().toLocaleTimeString()
        }
      );

      loadSensors();

      if(random > sensor.threshold){

        setAlerts(prev=>[
          ...prev,
          {
            id:Date.now(),
            sensor:sensor.name,
            value:random,
            threshold:sensor.threshold,
            time:new Date().toLocaleTimeString(),
            status:"Active"
          }
        ]);

      }

    }catch(err){
      console.log(err);
    }

  };

  // ---------------- RISK ENGINE ----------------

  const riskLevel = (s)=>{

    if(s.battery < 20) return "Faulty";
    if(s.value > s.threshold) return "High";
    return "Low";

  };

  // ---------------- SEARCH ----------------

  const data = sensors.filter(s=>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.location?.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- SUMMARY ----------------

  const total = sensors.length;
  const online = sensors.filter(s=>s.status==="Online").length;
  const offline = sensors.filter(s=>s.status==="Offline").length;
  const faulty = sensors.filter(s=>riskLevel(s)==="Faulty").length;
  const high = sensors.filter(s=>riskLevel(s)==="High").length;

  return(

  <div className="sensor-page">

  <h2>📡 Sensor Management</h2>

  {/* SUMMARY */}

  <div className="summary-grid">

  <div className="card">📊 Total<br/><span>{total}</span></div>
  <div className="card online-card">🟢 Online<br/><span>{online}</span></div>
  <div className="card offline-card">🔴 Offline<br/><span>{offline}</span></div>
  <div className="card warn-card">⚠ Faulty<br/><span>{faulty}</span></div>
  <div className="card danger-card">🚨 High Risk<br/><span>{high}</span></div>

  </div>

  {/* SEARCH */}

  <div className="controls">

  <input
  placeholder="🔍 Search name or location..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  />

  {role==="Admin" &&
  <button
  className="add-btn"
  onClick={()=>setShowModal(true)}
  >
  ➕ Add Sensor
  </button>
  }

  </div>

  {/* TABLE */}

  <div className="table">

  <div className="table-header">

  <span>ID</span>
  <span>Name</span>
  <span>Type</span>
  <span>Location</span>
  <span>Status</span>
  <span>Battery</span>
  <span>Value</span>
  <span>Threshold</span>
  <span>Risk</span>
  <span>Updated</span>
  <span>Actions</span>

  </div>

  {data.map((s,i)=>(

  <div
  key={s.sensorId}
  className="table-row"
  onClick={()=>setSelected(s)}
  >

  <span>{s.sensorId}</span>
  <span>{s.name}</span>
  <span>{s.type}</span>
  <span>{s.location}</span>

  <span className={s.status==="Online"?"online":"offline"}>
  {s.status}
  </span>

  <span>{s.battery}%</span>

  <span>{s.value}</span>

  <span>{s.threshold}</span>

  <span className={`risk ${riskLevel(s).toLowerCase()}`}>
  {riskLevel(s)}
  </span>

  <span>{s.lastUpdated}</span>

  <span className="actions">

  <button onClick={(e)=>{e.stopPropagation();simulate(i)}}>🔄</button>

  <button onClick={(e)=>{e.stopPropagation();toggleStatus(i)}}>🔌</button>

  {role==="Admin" &&
  <>
  <button
  onClick={(e)=>{
  e.stopPropagation();
  setForm(s);
  setEditIndex(i);
  setShowModal(true);
  }}
  >
  ⚙
  </button>

  <button
  onClick={(e)=>{
  e.stopPropagation();
  deleteSensor(i);
  }}
  >
  🗑
  </button>
  </>
  }

  </span>

  </div>

  ))}

  </div>

  {/* MODAL */}

  {showModal &&

  <div className="modal">

  <div className="modal-content">

  <h3>{editIndex!==null ? "Edit Sensor":"Add Sensor"}</h3>

  <input
  placeholder="Name"
  value={form.name}
  onChange={(e)=>setForm({...form,name:e.target.value})}
  />

  <input
  placeholder="Location"
  value={form.location}
  onChange={(e)=>setForm({...form,location:e.target.value})}
  />

  <input
  type="number"
  placeholder="Battery"
  value={form.battery}
  onChange={(e)=>setForm({...form,battery:e.target.value})}
  />

  <input
  type="number"
  placeholder="Threshold"
  value={form.threshold}
  onChange={(e)=>setForm({...form,threshold:e.target.value})}
  />

  <select
  value={form.type}
  onChange={(e)=>setForm({...form,type:e.target.value})}
  >

  <option>Water</option>
  <option>Temp</option>
  <option>AQI</option>
  <option>Humidity</option>

  </select>

  <button onClick={handleSubmit}>Save</button>

  <button onClick={()=>setShowModal(false)}>Cancel</button>

  </div>

  </div>

  }

  </div>

  );

}