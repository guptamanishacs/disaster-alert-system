import { useState, useEffect } from "react";
import axios from "axios";
import "./DisasterManagement.css";
import API_URL from '../config';

export default function DisasterManagement() {
  const [disasters, setDisasters] = useState([]);
  const [newDisaster, setNewDisaster] = useState({type:'',severity:'low',lat:'',lng:'',probability:0});

  useEffect(()=>{
    axios.get(`${API_URL}/disasters`)
      .then(res => setDisasters(res.data));
  },[]);

  const handleAdd = () => {
    axios.post(`${API_URL}/disasters`, newDisaster)
      .then(res => setDisasters([...disasters,res.data]));
  };

  return (
    <div className="disaster-management-page">
      <h2>Disaster Management</h2>
      <div className="form">
        <input placeholder="Type" onChange={e=>setNewDisaster({...newDisaster,type:e.target.value})}/>
        <select onChange={e=>setNewDisaster({...newDisaster,severity:e.target.value})}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input placeholder="Lat" type="number" onChange={e=>setNewDisaster({...newDisaster,lat:e.target.value})}/>
        <input placeholder="Lng" type="number" onChange={e=>setNewDisaster({...newDisaster,lng:e.target.value})}/>
        <input placeholder="Probability" type="number" onChange={e=>setNewDisaster({...newDisaster,probability:e.target.value})}/>
        <button onClick={handleAdd}>Add Disaster</button>
      </div>
      <table>
        <thead>
          <tr><th>Type</th><th>Severity</th><th>Lat</th><th>Lng</th><th>Probability</th></tr>
        </thead>
        <tbody>
          {disasters.map(d=>(
            <tr key={d.id}>
              <td>{d.type}</td>
              <td>{d.severity}</td>
              <td>{d.lat}</td>
              <td>{d.lng}</td>
              <td>{d.probability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}