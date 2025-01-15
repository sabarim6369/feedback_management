const express = require("express");
const router = express.Router();
const { addfeedback, updatefeedback, deletefeedback, getFeedbacks } = require("../controllers/feedback");

router.post("/addfeedback", addfeedback);
router.get("/feedbacks", getFeedbacks);
router.post("/updatefeedback/:feedbackId", updatefeedback);
router.post("/deletefeedback/:feedbackId", deletefeedback);

module.exports = router;
