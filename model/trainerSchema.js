const mongoose = require("mongoose");


const trainerSchema = new mongoose.Schema({
    name:{type:"string",required:true},
    email:{type:"string",required:true,unique:true},
    password:{type:"string",required:true},
    role:{type:"string",default:"trainer"}
})


const TRAINER = mongoose.model('trainer',trainerSchema) 

module.exports = TRAINER;