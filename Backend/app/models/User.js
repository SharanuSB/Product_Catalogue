const mongoose = require("mongoose")
const validator = require("validator")

const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(value){
                return {
                    error:"Provide a Valid Email Id"
                }
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128
    },
    role:{
        type:String,
        default:"customer"
    }
}, {timestamps:true})

userSchema.pre("save", async function(next){
    try {
        if(await User.collection.countDocuments()==0){
            this.role = "admin"
            next()
        }
        next()
    } catch (error) {
       res.json(error) 
    }

})

const User = mongoose.model("User", userSchema)

module.exports = User