const mongoose = require("mongoose")

const configureDb = async(req, res)=>{
    try {
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/product-catalouge")
        console.log("Connected to the DB")
    } catch (error) {
        console.log("Erroe While connecting to the Db")
    }
}

module.exports = configureDb