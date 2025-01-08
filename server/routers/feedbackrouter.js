const express = require("express");
const router = express.Router();
const{addfeedback,updatefeedback,deletefeedback,addFeedbackContent}=require("../controllers/feedback");
router.post("/addfeedback",addfeedback);
router.post("/updatefeedback",updatefeedback);
router.post("/deletefeedback",deletefeedback);
router.post("/addfeedbackcontent",addFeedbackContent)
module.exports=router;