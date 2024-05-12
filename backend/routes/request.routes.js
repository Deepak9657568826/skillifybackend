const express  = require("express");
const { newRequest, getAllrequest } = require("../controllers/request.controller");

const requestRouter = express.Router();

// routes for create new request
requestRouter.post("/newRequest", newRequest)

// routes for get all request
requestRouter.get("/allRequest", getAllrequest)


module.exports ={
    requestRouter
}