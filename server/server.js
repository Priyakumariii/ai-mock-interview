const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();


// ROUTES

const userRoutes = require("./routes/userRoutes");

const jobRoutes = require("./routes/jobRoutes");

const interviewRoutes = require("./routes/interviewRoutes");


const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected");

})

.catch((err) => {

  console.log(err);

});


// API ROUTES

app.use("/api/users", userRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/interview", interviewRoutes);


// TEST ROUTE

app.get("/", (req, res) => {

  res.send("Backend Running 🚀");

});


// SERVER

app.listen(5000, () => {

  console.log("Server Started on Port 5000");

});