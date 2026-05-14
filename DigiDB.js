const mongoose = require("mongoose");

async function DigiDB() {
    try{
    await mongoose.connect("mongodb+srv://rkshivam2004:satyam2004@climate.9edxsbh.mongodb.net/DigiLocker");
    console.log("DB CONNECTION SUCCESSFULLY");
    }
    catch(err){
        console.log("Error in DB Connection",err)
    }
}

module.exports = DigiDB;