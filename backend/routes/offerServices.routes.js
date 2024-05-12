const express = require("express")
const { createOfferService, getAllOfferServices, updateOfferService, deleteOfferService } = require("../controllers/offerService.controller")

const offerServicesRoute = express.Router()

// create new service
offerServicesRoute.post("/newServices", createOfferService)

// get all offer service
offerServicesRoute.get("/newServices", getAllOfferServices)

// to update the services
offerServicesRoute.patch("/newServices/:id", updateOfferService)

// to delets the services
offerServicesRoute.delete("/newServices/:id", deleteOfferService)

module.exports = {
    offerServicesRoute
}