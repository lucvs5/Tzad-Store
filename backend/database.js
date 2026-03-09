const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/tzadstore");

module.exports=mongoose;

