const express = require("express");



const { loginUser, registerUser, logoutUser } = require("../controllers/user.controller");
const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");

const userRouter = express.Router();

userRouter.post("/register",registerUser)

userRouter.post("/login",loginUser)

userRouter.post("/logout",auth,logoutUser);

userRouter.get("/",auth,access("user"),async(req,res)=>{
    res.send("user")
    console.log("only user");
})

module.exports={
    userRouter
}