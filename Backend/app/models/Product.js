const mongoose = require("mongoose")

const {Schema} = mongoose

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        min:10,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    lastUpdatedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

}, {timestamps:true})

const Product = mongoose.model("Product", productSchema)

module.exports = Product