const mongoose = require("mongoose");
const offerServiceSchema = mongoose.Schema({
    profilePhoto: { type: String },
    backgroundPhoto: { type: String },
    nameOfUser: { type: String },
    virtualOrNot: { type: String },
    categoriesOfHelp: { type: String },
    detailsDescription: { type: String },
    trainingAndQualification: { type: String },
    address: { type: String },
    timeAvailable: { type: String },
    timePreference: { type: String } 
});
const OfferServiceModel = mongoose.model("services", offerServiceSchema);

module.exports = {
    OfferServiceModel
};
