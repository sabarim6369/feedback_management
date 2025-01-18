const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const db = require("./config/db");
const collegerouter = require("./routers/collegerouter");
const feedbackrouter = require("./routers/feedbackrouter");
const tutorrouter = require("./routers/tutor");
const feedbackmodel = require("./models/feedbackschema"); // Import feedback schema for cron
const cron = require("node-cron");
const cors = require("cors"); // Import the CORS package

const app = express();
app.use(cors());
app.use(express.json());

db(); 
cron.schedule("0 0 * * *", async () => {
  console.log("Running cron job to update feedback statuses...");
  try {
    const currentDate = new Date();

    const result = await feedbackmodel.updateMany(
      {
        status: "Active",
        enddate: { $lt: currentDate },
      },
      {
        $set: { status: "completed" },
      }
    );

    console.log(`Updated ${result.modifiedCount} feedback records to 'completed'.`);
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});

app.use("/api/college", collegerouter);
app.use("/api/feedback", feedbackrouter);
app.use("/api/tutor", tutorrouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
