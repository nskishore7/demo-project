const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
    name:{type:"string",required:true},
    email:{type:"string",required:true,unique:true},
    phone:{type:"string",required:true,unique:true},
    password:{type:"string",required:true},
    role:{type:"string",default:"student"}
})


const STUDENT = mongoose.model('student',studentSchema) 

module.exports = STUDENT;