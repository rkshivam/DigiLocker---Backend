const express = require("express");
const userRouter = express.Router();

const User = require("../Digiuser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



userRouter.get("/userinfo",async(req,res)=>{
    try{
        console.log(req.cookies);
        const payload =  jwt.verify(req.cookies.MyToken,process.env.SECRET_KEY);
        // console.log(payload);
        const result = await User.find();
        res.send(result); 
    }
    catch(error){
        res.send("Eroor "+error.message)
    }
})

userRouter.get("/userinfo/specific",async(req,res)=>{
    try{
    // Validate user with JWT
        const payload =  jwt.verify(req.cookies.MyToken,process.env.SECRET_KEY);
        // console.log(payload);

        const result = await User.findById(payload._id);
        res.send(result);
        // console.log(req.cookies);
    }
    catch(error){
        res.send("Error: "+ error.message);
    }
})

userRouter.patch("/userupdate",async(req,res)=>{
    try{
        const {_id, ...update} = req.body;
        await User.findByIdAndUpdate(_id,update,{runValidators:true});
        res.send("User Details Upadted");
    }
    catch(error){
        res.send("Eroor "+error.message)

    }
         
})

userRouter.delete("/userdelete/:id",async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id);
    res.send("User Delted Successfully");
    }
    catch(error){
        res.send("Error: "+ error.message);
    }
})



module.exports = userRouter;