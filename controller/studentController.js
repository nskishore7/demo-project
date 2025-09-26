
const STUDENT = require("../model/studentSchema.js");
const passwordValidation = require("../validation/passwordValidation.js")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");

const handleSignup = async(req,res)=>{
    if(req.body == undefined)return res.status(400).json({success:false,message:"data mandatory"})
    const {name,email,phone,password} = req.body;
    if(!name || !email || !phone){
        return res.status(400).json({success:false,message:"provide all field"})
    }
    if(!passwordValidation(password)){
        return res.status(400).json({success:false,message:"for statisfy all condition"})
    }
    try {
        const hashedpassword=await bcrypt.hash(password,10)
        const student =await STUDENT.create({...req.body,password:hashedpassword})
         return res.status(201).json({success:true,message:"student register successfully"})
        
    } catch (error) {
         return res.status(409).json({success:false,message:error.message})
    }
}


const handleLogin = async(req,res)=>{
     if(req.body == undefined)return res.status(400).json({success:false,message:"data mandatory"})
        const {email,password} = req.body
    if(!email || !password){
     return res.status(400).json({success:false,message:"provide all field"})   
    }

       try {
    
                const islogin =await STUDENT.findOne({email})
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


const handlestdAccDel = async(req,res)=>{
    const {email} = req.payload;
    

    const{password} = req.body;

            try {
               const isStudent = await STUDENT.findOne({email});

              const isMatched = await bcrypt.compare(password,isStudent.password)
              if(!isMatched){
                 return res.status(401).json({success:false,message:"password not matched"})
              }
              const isDel = await STUDENT.deleteOne({email})
              return res.sendStatus(204)
            } catch (error) {
                console.log(error.message)
                return res.status(500).json({ success: false, message: "Server error" });
            }
}


module.exports = {handleSignup,handleLogin,handlestdAccDel}