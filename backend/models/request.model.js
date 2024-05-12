const mongoose  =require("mongoose")

const requestSchema = mongoose.Schema({
    userName: { type: String },
    categories: { type: String },
    description: { type: String },
    image: { type: String },
    willingToPay: { type: Number },
    virtuallyOrNot: { type: String }
});


const RequestModel = mongoose.model("request", requestSchema)


module.exports ={
    RequestModel
}