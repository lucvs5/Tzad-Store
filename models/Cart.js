const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

userId:String,

productId:String,

name:String,

image:String,

price:Number,

quantity:Number

});

module.exports = mongoose.model("Cart",CartSchema);

