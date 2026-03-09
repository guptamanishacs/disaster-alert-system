const express = require("express");
const router = express.Router();
let disasters = [
  {id:1,type:"Flood",severity:"high",lat:19,lng:78,probability:80}
];

router.get("/",(req,res)=>res.json(disasters));

router.post("/",(req,res)=>{
  const newDisaster={...req.body,id:disasters.length+1};
  disasters.push(newDisaster);
  res.json(newDisaster);
});

module.exports = router;