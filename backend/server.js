const express=require("express");
const cors=require("cors");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

require("./database");

const User=require("../models/User");
const Cart=require("../models/Cart");

const app=express();

app.use(cors());
app.use(express.json());

const SECRET="supersecretkey";


// LOGIN

app.post("/login",async(req,res)=>{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user) return res.json({error:"user not found"});

const valid=await bcrypt.compare(password,user.password);

if(!valid) return res.json({error:"wrong password"});

const token=jwt.sign({id:user._id},SECRET);

res.json({token,name:user.name});

});


// REGISTER

app.post("/register",async(req,res)=>{

const hash=await bcrypt.hash(req.body.password,10);

const user=new User({

name:req.body.name,
email:req.body.email,
password:hash

});

await user.save();

res.json({status:"ok"});

});


// ADD CART

app.post("/cart/add",async(req,res)=>{

const item=new Cart(req.body);

await item.save();

res.json({status:"added"});

});


// GET CART

app.get("/cart/:userId",async(req,res)=>{

const cart=await Cart.find({userId:req.params.userId});

res.json(cart);

});


app.listen(3000,()=>{

console.log("server running");

});
