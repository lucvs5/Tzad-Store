let cart=[];

function openCart(){

document.getElementById("cartModal").style.display="block";

renderCart();

}

function addProduct(id,price){

let item=cart.find(p=>p.id===id);

if(item){

item.quantity++;

}else{

cart.push({id,price,quantity:1});

}

}

function renderCart(){

let total=0;

let html="";

cart.forEach(p=>{

total+=p.price*p.quantity;

html+=`<div>${p.quantity}x Produto - R$${p.price}</div>`;

});

let discount=0;

cart.forEach(p=>{

if(p.quantity>=2){

discount+=p.price*0.1;

}

});

total-=discount;

document.getElementById("cartItems").innerHTML=html;

document.getElementById("discount").innerText="Desconto: "+discount;

document.getElementById("total").innerText="Total: "+total;

}

async function login(){

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

const res=await fetch("http://localhost:3000/login",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({email,password})

});

const data=await res.json();

if(data.token){

document.getElementById("loginPage").style.display="none";

document.getElementById("cartPage").style.display="block";

}

}
