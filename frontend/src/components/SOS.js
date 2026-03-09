import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SOS.css";
import API_URL from '../config';

export default function SOS() {

const [form,setForm] = useState({
 name:"",
 phone:"",
 location:"",
 emergencyType:"Medical",
 message:""
});

const [sosList,setSosList] = useState([]);
const [loading,setLoading] = useState(false);


// FETCH SOS HISTORY
const fetchSOS = async () => {
 try{
  const res = await axios.get(`${API_URL}/sos`);
  setSosList(res.data);
 }catch(err){
  console.log(err);
 }
};


// SEND SOS
const sendSOS = async () => {

 if(!form.name || !form.phone || !form.location){
  alert("⚠ Please fill all required fields");
  return;
 }

 try{

  setLoading(true);

  await axios.post(`${API_URL}/sos`,{
   ...form,
   status:"Active"
  });

  alert("🚨 SOS Sent Successfully!");

  setForm({
   name:"",
   phone:"",
   location:"",
   emergencyType:"Medical",
   message:""
  });

  fetchSOS();

 }catch(err){
  console.log(err);
 }

 setLoading(false);

};


// AUTO LOCATION
const detectLocation = () => {

 if(navigator.geolocation){

  navigator.geolocation.getCurrentPosition((pos)=>{

   const lat = pos.coords.latitude;
   const lng = pos.coords.longitude;

   setForm({
    ...form,
    location:`Lat:${lat}, Lng:${lng}`
   });

  });

 }

};


// UPDATE STATUS (ADMIN ACTION)
const updateStatus = async(id,status)=>{
 await axios.put(`${API_URL}/sos/${id}`,{status});
 fetchSOS();
};


// LOAD HISTORY
useEffect(()=>{
 fetchSOS();
},[]);



return (

<div className="sos-page">

<h2>🆘 Emergency SOS</h2>


{/* ===== SOS FORM ===== */}

<div className="sos-form">

<input
placeholder="Your Name"
value={form.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
/>


<input
placeholder="Phone Number"
value={form.phone}
onChange={(e)=>setForm({...form,phone:e.target.value})}
/>


<div className="location-box">

<input
placeholder="Location"
value={form.location}
onChange={(e)=>setForm({...form,location:e.target.value})}
/>

<button onClick={detectLocation}>
📍 Detect
</button>

</div>


<select
value={form.emergencyType}
onChange={(e)=>setForm({...form,emergencyType:e.target.value})}
>

<option>Medical</option>
<option>Fire</option>
<option>Flood</option>
<option>Accident</option>
<option>Earthquake</option>

</select>


<textarea
placeholder="Emergency Message"
value={form.message}
onChange={(e)=>setForm({...form,message:e.target.value})}
/>


<button
className="sos-btn"
onClick={sendSOS}
disabled={loading}
>

{loading ? "Sending..." : "🚨 Send SOS"}

</button>

</div>



{/* ===== SOS HISTORY ===== */}

<h3>📜 Your SOS Requests</h3>


<div className="sos-list">

{sosList.length === 0 && <p>No SOS Requests Yet</p>}

{sosList.map((sos)=>(

<div key={sos._id} className="sos-card">

<p><b>Name:</b> {sos.name}</p>

<p><b>Phone:</b> {sos.phone}</p>

<p><b>Location:</b> {sos.location}</p>

<p><b>Type:</b> {sos.emergencyType}</p>

<p><b>Message:</b> {sos.message}</p>

<p>

<b>Status:</b>

<span className={`status ${sos.status}`}>
 {sos.status}
</span>

</p>

<p>

<b>Time:</b>

{new Date(sos.createdAt).toLocaleString()}

</p>


{/* Admin buttons (optional) */}

<div className="status-buttons">

<button
onClick={()=>updateStatus(sos._id,"Responding")}
>

🚑 Responding

</button>

<button
onClick={()=>updateStatus(sos._id,"Resolved")}
>

✅ Resolved

</button>

</div>

</div>

))}

</div>

</div>

);

}