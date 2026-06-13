const express = require("express");
const DigiDB = require("./DigiDB");
const User = require("./Digiuser")
const validuser = require("./DigiValidator");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cookieparser());
// Routes -
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");


// CREATE USER (REGISTER) , LOGIN
app.use("/",authRouter);
// READ ALL , Read Specific , UPDATE , DELETE
app.use("/",userRouter);


DigiDB().then(()=>{

   app.listen(3434,()=>{
   console.log("DigiLocker server Started");})
})

