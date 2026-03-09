


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
