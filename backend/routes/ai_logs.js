const express = require("express");
const router = express.Router();

let ai_logs = [
  {id:1,model_version:"v1.0",accuracy:85},
  {id:2,model_version:"v1.1",accuracy:90}
];

router.get("/",(req,res)=>res.json(ai_logs));

module.exports = router;