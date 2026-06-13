const express = require("express");
const authRouter = express.Router();
const User = require("../Digiuser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


authRouter.post("/register",async (req,res)=>{

    try{
        validuser(req.body);

        // Hash the password
        req.body.password = await bcrypt.hash(req.body.password,10);

        await User.create(req.body);
        res.send("User Registered Successfully")
    }
    catch(error){
        res.send("Error Ocuured in User Registeration "+error.message)
    }
})



authRouter.post("/login",async(req,res)=>{

    try{
    //   const id = req.body._id;
      const myuser = await User.findOne({email:req.body.email});

      if(!(req.body.email===myuser.email)){
         throw new Error("Invalid credentials: ")
      }
      const Isallowed = await bcrypt.compare(req.body.password,myuser.password);
      if(!Isallowed){
        throw new Error("Invalid credentials: ")
      }

      // Also sending the JWT token after successfully credentials verification
                             // payload and key only {header include automatically}
      const token = jwt.sign({_id:myuser._id,emailid:myuser.email},process.env.SECRET_KEY,{expiresIn:100});
      res.cookie("MyToken",token);
      res.send("Login Successfully: ")
    }catch(error){
        res.send("Error: "+error.message);
    }
})

module.exports = authRouter;