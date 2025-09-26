const express = require("express");
const { handleTrainersignup, handleTrainerLogin, getAllStudentDetails, updateDetail } = require("../controller/trainercontroller.js");
const studentAuth = require("../auth/studentAuth.js");
const authorization = require("../authorization/authorization.js");

const trainerRouter = express.Router()

trainerRouter.post("/signup",handleTrainersignup)
trainerRouter.post("/login",handleTrainerLogin)
trainerRouter.get("/allStudent",studentAuth,authorization,getAllStudentDetails)

trainerRouter.put("/update",studentAuth,updateDetail)

module.exports = trainerRouter