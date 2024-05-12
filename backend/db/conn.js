
const mongoose = require('mongoose');

const connectToDb = async (url) => {
    await mongoose.connect(url)
}


module.exports = {
    connectToDb
}