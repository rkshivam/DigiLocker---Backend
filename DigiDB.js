const mongoose = require("mongoose");

async function DigiDB() {
    try{
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("DB CONNECTION SUCCESSFULLY");
    }
    catch(err){
        console.log("Error in DB Connection",err)
    }
}

module.exports = DigiDB;