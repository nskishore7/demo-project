
const jwt = require("jsonwebtoken")

const studentAuth = (req,res,next)=>{
    const {authorization} = req.headers;
    

    if(!authorization){
        return res.status(400).json({success:false,message:"token is not there"})
    }
    const token = authorization.split(" ")[1]

        jwt.verify(token,"project1",(err,payload)=>{
            if(err){
                 return res.status(400).json({success:false,message:"token is not there"})
            }
            req.payload = payload
            next()
        })
}

module.exports = studentAuth;