const mongoose = require("mongoose");


const mongoschema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        enum : ["Female","Male","Other"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String
    }

})

const User = mongoose.model("User",mongoschema);
module.exports = User;