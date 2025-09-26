const STUDENT = require("../model/studentSchema");
const TRAINER = require("../model/trainerSchema");
const jwt = require("jsonwebtoken");
const passwordValidation = require("../validation/passwordValidation.js");
const bcrypt = require("bcrypt");   



const handleTrainersignup = async(req,res)=>{
        if(req.body == undefined)return res.status(400).json({success:false,message:"data mandatory"})
    const {name,email,password} = req.body;
    if(!name || !email){
        return res.status(400).json({success:false,message:"provide all field"})
    }
    if(!passwordValidation(password)){
        return res.status(400).json({success:false,message:"for statisfy all condition"})
    }
    try {
        const hashedpassword=await bcrypt.hash(password,10)
        const trainer =await TRAINER.create({...req.body,password:hashedpassword})
         return res.status(201).json({success:true,message:"trainer register successfully"})
        
    } catch (error) {
         return res.status(409).json({success:false,message:error.message})
    }
}

const handleTrainerLogin = async(req,res)=>{
       if(req.body == undefined)return res.status(400).json({success:false,message:"data mandatory"})
        const {email,password} = req.body
    if(!email || !password){
     return res.status(400).json({success:false,message:"provide all field"})   
    }

       try {
    
                const islogin =await TRAINER.findOne({email})
                if(!islogin){
                      return res.status(401).json({success:false,message:"invalid email"})
                }
                const isMatched=await bcrypt.compare(password,islogin.password)
                if(!isMatched){
                    return res.status(401).json({success:false,message:"password not matched"})
                }
                let token = jwt.sign({email:islogin.email,role:islogin.role},"project1",{expiresIn:"1d"})
               
                 return res.status(200).json({success:true,message:"login successfully",token})

       } catch (error) {
        return res.status(400).json({success:false,message:"Register first and login"})
       }
}


const getAllStudentDetails = async(req,res)=>{

    try {
        const isTrainer = await STUDENT.find({},{password:0,_id:0})
        return res.status(200).json({success:true,message:"data recieved",isTrainer})
    } catch (error) {
        return res.status(500).json({success:false,message:"server side error"})
    }
}


const updateDetail = async(req,res)=>{
            const {email}=req.payload;
            const {password,newPassword} = req.body
            

            try {

                const isTrainer =await TRAINER.findOne({email})
                const isMatched = await bcrypt.compare(password,isTrainer.password)
                if(!isMatched){
                     return res.status(500).json({success:false,message:"enter correct password"})
                }
                const hashedpassword = await bcrypt.hash(newPassword,10)
                const update = await TRAINER.updateOne({email},{$set : {password:hashedpassword}})
                 return res.status(200).json({success:true,message:"password update successfully"})

            } catch (error) {
                
            }
}

module.exports = {handleTrainersignup,handleTrainerLogin,getAllStudentDetails,updateDetail}