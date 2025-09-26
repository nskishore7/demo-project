const express = require("express")

const { handleSignup, handleLogin, handlestdAccDel } = require("../controller/studentController.js")
const studentAuth = require("../auth/studentAuth.js")

const studentRouter = express.Router()


studentRouter.post('/signup',handleSignup)

studentRouter.post("/login",handleLogin)

studentRouter.delete("/delete",studentAuth,handlestdAccDel)

module.exports = studentRouter