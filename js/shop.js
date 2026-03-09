// Array de produtos
const products = [
  // Promoções
  { id:"cjbl", name:"Conjunto BAPE Laranja", price:250, img:"cjbl.jpg" },
  { id:"colarImperial", name:"Colar Imperial", price:150, img:"ColarImperial.jpg" },
  { id:"colarPrestige", name:"Colar Prestige", price:150, img:"ColarPrestige.jpg" },
  { id:"colarRoyal", name:"Colar Royal", price:150, img:"ColarRoyal.jpg" },
  { id:"colarDiamond", name:"Colar Diamond Touch", price:150, img:"ColarDiamondTouch.jpg" },
  { id:"colarGolden", name:"Colar Golden Line", price:150, img:"ColarGoldenLine.jpg" },
  
  // Nocta
  { id:"nntc", name:"Conjunto Nike x Nocta NNT Cinza", price:450, img:"nntc.png" },
  { id:"nkcv", name:"Corta Vento Nike x Nocta Preto", price:400, img:"nkcv.png" },
  { id:"nktc", name:"Conjunto Nike Nocta Tech Fleece Preto", price:450, img:"nktc.jpg" },
  
  // Stüssy
  { id:"stmtb", name:"STÜSSY METALHEADZ (refletiva)", price:150, img:"stmtb.jpg" },
  { id:"stlpp", name:"Stüssy Logo Padrão P", price:150, img:"stlpp.jpg" },
  { id:"stvlb", name:"Stüssy Veludo B", price:150, img:"stvlb.jpg" },
  { id:"stvlp", name:"Stüssy Veludo P", price:150, img:"stvlp.jpg" },
  { id:"stlpb", name:"Stüssy Logo Padrão B", price:150, img:"stlpb.jpg" },
  { id:"stbdb", name:"Stüssy Bordada B", price:150, img:"stbdb.jpg" },
  
  // Anéis
  { id:"a1", name:"Anel Elegance", price:100, img:"a1.jpg" },
  { id:"a2", name:"Anel Royal", price:120, img:"a2.jpg" },
  { id:"a3", name:"Anel Prestige", price:130, img:"a3.jpg" },
  { id:"a4", name:"Anel Classic", price:110, img:"a4.jpg" },
  { id:"a5", name:"Anel Golden", price:140, img:"a5.jpg" },
  { id:"a6", name:"Anel Deluxe", price:150, img:"a6.jpg" }
];

// Função para renderizar produtos
const productGrid = document.getElementById("productGrid");
products.forEach(prod => {
  const div = document.createElement("div");
  div.className = "produto";
  div.innerHTML = `
    <img src="img/${prod.img}" alt="${prod.name}">
    <h4>${prod.name}</h4>
    <p>R$${prod.price}</p>
    <button onclick="addProduct('${prod.id}', ${prod.price})">Adicionar ao carrinho</button>
  `;
  productGrid.appendChild(div);
});
