
const mongoose = require("mongoose");

const connectToMangoDB = async () => {
    try {
       await mongoose.connect("mongodb://localhost:27017/jsp")
        console.log("mongodb connected")
    } catch (error) {
        console.log("mongodb not connected")
    }

}


module.exports = connectToMangoDB