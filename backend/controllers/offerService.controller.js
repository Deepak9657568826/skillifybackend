const mongoose = require("mongoose");
const { OfferServiceModel } = require("../models/offerService.model");

// Create operation
const createOfferService = async (req, res) => {
    const payload = req.body;
    try {
        const newOfferService = new OfferServiceModel(payload);
        await newOfferService.save();
        res.status(200).json({ msg: "New service added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read operation (Get all)
const getAllOfferServices = async (req, res) => {
    try {
        const offerServices = await OfferServiceModel.find();
        res.status(200).json({mag:"All services", offerServices});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update operation
const updateOfferService = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const updatedOfferService = await OfferServiceModel.findByIdAndUpdate({_id:id}, payload);
        res.status(200).json({msg:`service with id ${id} is updated`, updatedOfferService});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete operation
const deleteOfferService = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await OfferServiceModel.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({ msg: `Service with id ${id} not found` });
        }
        res.status(200).json({ msg: `Service with id ${id} is deleted`, service });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createOfferService,
    getAllOfferServices,
    updateOfferService,
    deleteOfferService
};
