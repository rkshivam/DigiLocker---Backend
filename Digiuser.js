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
        enum : ["Female","Male","Other"]  // gender isme se hona hoga wrna validation error aayega
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,   // remove faltu spaces from email to protect it form duplicacy
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String
    }

},{timestamps:true})

const User = mongoose.model("User",mongoschema);
module.exports = User;