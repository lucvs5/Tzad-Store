const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

name:String,

email:{type:String,unique:true},

password:String,

cpf:String,

phone:String,

created:{type:Date,default:Date.now}

});

module.exports = mongoose.model("User",UserSchema);

Localização: models/Order.js

Javascript              Copiar código

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

userId:String,

product:String,

sku:String,

price:Number,

status:String,

tracking:String,

created:{type:Date,default:Date.now}

});

module.exports = mongoose.model("Order",OrderSchema);

