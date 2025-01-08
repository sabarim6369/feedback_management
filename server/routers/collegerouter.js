const express = require("express");
const router = express.Router();
const{ addcollege, updatecollege, deletecollege}=require("../controllers/college");
router.post("/addcollege",addcollege);
router.post("/updatecollege",updatecollege);
router.post("/deletecollege",deletecollege)
module.exports=router;