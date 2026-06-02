const validator = require("validator");
function ValidatorUser(data){

    // console.log("Data recivied",data);

    const mandatoryfield = ["firstName","lastName","email","password"];
    const allowed = mandatoryfield.every((k)=>Object.keys(data).includes(k));
    
    // console.log("I reach here 2");
    
    if(!allowed){
          throw new Error("Missing Fields");
    };
    if(!validator.isEmail(data.email)){
          throw new Error("Invalid Email");
    }
    // console.log("I reach here 4");
    
    if(!validator.isStrongPassword(data.password)){
          throw new Error("Weak Password");
    }
    if(!(data.firstName.length>=3 && data.lastName.length<=20)){
          throw new Error("First Name should be greater then 3 and Last Name Should be less then 20");
    }

    // console.log("I reach here 3");
};


module.exports = ValidatorUser;