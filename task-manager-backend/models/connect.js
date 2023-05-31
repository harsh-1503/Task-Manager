const mongoose = require("mongoose");
require('dotenv').config()
const connectString = process.env.CONNECTSTRING;
  ;

  const connectDB = (url)=>{
    return mongoose
    .connect(connectString).then(()=>{
        console.log("Connected to MongoDB...")
    }).catch((error)=>{
        console.log(error);
    })
  }
 

  module.exports = connectDB


  
