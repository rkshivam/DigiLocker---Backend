const express = require("express");
const DigiDB = require("./DigiDB");
const User = require("./Digiuser")
const validuser = require("./DigiValidator");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

// CREATE
app.post("/register",async (req,res)=>{

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

// READ ALL
app.get("/userinfo",async(req,res)=>{
    try{
        const result = await User.find();
        res.send(result); 
    }
    catch(error){
        res.send("Eroor"+error.message)
    }
})

// Read Specific
app.get("/userinfo/:id",async(req,res)=>{
    try{
        const result = await User.findById(req.params.id);
        res.send(result);
    }
    catch(error){
        res.send("Error: "+ error.message);
    }
})
// UPDATE

app.patch("/userupdate",async(req,res)=>{
    try{
        const {_id, ...update} = req.body;
        await User.findByIdAndUpdate(_id,update,{runValidators:true});
        res.send("User Details Upadted");
    }
    catch(error){
        res.send("Eroor "+error.message)

    }
         
})

//  Delete
app.delete("/userdelete/:id",async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id);
    res.send("User Delted Successfully");
    }
    catch(error){
        res.send("Error: "+ error.message);
    }
})



// Login
app.post("/login",async(req,res)=>{

    try{
      const id = req.body._id;
      const myuser = await User.findById(id);

      if(!(req.body.email===myuser.email)){
         throw new Error("Invalid credentials: ")
      }
      const Isallowed = await bcrypt.compare(req.body.password,myuser.password);
      if(!Isallowed){
        throw new Error("Invalid credentials: ")
      }
      res.send("Login Successfully: ")
    }catch(error){
        res.send("Error: "+error.message);
    }
})

DigiDB().then(()=>{

   app.listen(3434,()=>{
   console.log("DigiLocker server Started");})
})

