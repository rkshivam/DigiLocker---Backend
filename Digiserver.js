const express = require("express");
const DigiDB = require("./DigiDB");
const User = require("./Digiuser")
const app = express();

app.use(express.json());

// CREATE
app.post("/register",async (req,res)=>{

    try{
        await User.create(req.body);
        res.send("User Registered Successfully")
    }
    catch(error){
        res.send("Error Ocuured in User Registeration",error)
    }
})

// READ ALL
app.get("/userinfo",async(req,res)=>{
    try{
        const result = await User.find();
        res.send(result); 
    }
    catch(error){
        res.send("Eroor"+error.msg)
    }
})

// Read Specific
app.get("/userinfo/:id",async(req,res)=>{
    try{
        const result = await User.findById(req.params.id);
        res.send(result);
    }
    catch(error){
        res.send("Error: "+ error.msg);
    }
})
// UPDATE

app.patch("/userupdate",async(req,res)=>{
    try{
        const {_id, ...update} = req.body;
        await User.findByIdAndUpdate(_id,update);
        res.send("User Details Upadted");
    }
    catch(error){
        res.send("Eroor "+error.msg)

    }
         
})

//  Delete
app.delete("/userdelete/:id",async(req,res)=>{
    try{
    await User.findByIdAndDelete(req.params.id);
    res.send("User Delted Successfully");
    }
    catch(error){
        res.send("Error: "+ error.msg);
    }
})



// DELETE

DigiDB().then(()=>{

   app.listen(3434,()=>{
   console.log("DigiLocker server Started");})
})

