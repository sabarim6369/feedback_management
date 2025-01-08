const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const db = require("./config/db");
const authenticationschema=require("./models/authentication")
const app = express();
db(); 
authenticationschema.create({email:"sabarim6369@gmail.com",password:"123",role:"admin",username:"sabari"})
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
