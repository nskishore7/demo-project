


const authorization = (req,res,next)=>{
        const {role} = req.payload
        
        if(role == "student"){
            return res.status(400).json({success:false,message:"student can't see the all details"})
        }
        next()
}


module.exports = authorization;