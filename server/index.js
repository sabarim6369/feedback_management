const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const db = require("./config/db");
const authenticationschema=require("./models/authentication")
const collegerouter=require("./routers/collegerouter")
const feedbackrouter=require("./routers/feedbackrouter")
const tutorrouter=require("./routers/tutor")
const app = express();
const cors = require("cors");  // Import the CORS package
app.use(cors());

app.use(express.json()); 
db(); 
app.use("/api/college",collegerouter);
app.use("/api/feedback",feedbackrouter)
app.use("/api/tutor",tutorrouter)
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
