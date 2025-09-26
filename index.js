const express = require("express");
const connectToMangoDB = require("./connection/mongoconnect.js");
const studentRouter = require("./routes/studentrouter.js");
const trainerRouter = require("./routes/trainerrouter.js");


const app = express();

app.use(express.json())

app.use('/jsp/student',studentRouter)

app.use("/jsp/trainer",trainerRouter)

connectToMangoDB()

app.listen(7000,()=>{
    console.log("server started at http://localhost:7000")
})