const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema({
    name : {
      type : String,
      required : [true, "Name is required"]
    },
    description : {
      type : String,
      required : [true, "Description is required"]
    },
    isActive : {
      type : Boolean,
      default : true
    },
    registeredOn : {
      type : Date,
      default : Date.now()
    }
});

module.exports = 
