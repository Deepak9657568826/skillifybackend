require("dotenv").config();
const jwt = require("jsonwebtoken");
const { blacklistModel } = require("../models/blacklist.model");

const auth=async(req,res,next)=>{
    const token=req.headers["authorization"].split(" ")[1];
    if(!token){
     return res.status(401).json({msg:"token is not provided"});
    }
    const blackList=await blacklistModel.findOne({token});
    if(blackList){
       return res.status(401).json({msg:"user is already logout please login again"});
    }
    jwt.verify(token,"masai",(err,decoded)=>{
     if(err) throw new Error(err);
     if(decoded){
          req.userId=decoded.userId;
        
          req.role=decoded.role;
          console.log(decoded.role);
          console.log("auth")
         next();
     }
    })
 }
 
 
 module.exports={auth};
 
 