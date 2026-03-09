// shop.js

// ============================
// LISTA DE PRODUTOS
// ============================
const products = {
  promo: [
    { name: "Conjunto BAPE Laranja", price: 250, img: "img/cjbl.jpg" },
    { name: "Colar Imperial", price: 150, img: "img/ColarImperial.jpg" },
    { name: "Colar Prestige", price: 200, img: "img/ColarPrestige.jpg" },
    { name: "Colar Royal", price: 180, img: "img/ColarRoyal.jpg" },
    { name: "Colar Diamond Touch", price: 220, img: "img/ColarDiamondTouch.jpg" },
    { name: "Colar Golden Line", price: 190, img: "img/ColarGoldenLine.jpg" }
  ],
  nocta: [
    { name: "Conjunto Nike x Nocta NNT Cinza", price: 450, img: "img/nntc.png" },
    { name: "Corta Vento Nike x Nocta Preto", price: 400, img: "img/nkcv.png" },
    { name: "Conjunto Nike Nocta Tech Fleece Preto", price: 450, img: "img/nktc.jpg" },
    { name: "Pulseira Classic", price: 50, img: "img/PulseiraClassic.jpg" },
    { name: "Pulseira Gold Line", price: 60, img: "img/PulseiraGoldLine.jpg" },
    { name: "Pulseira Deluxe", price: 80, img: "img/PulseiraDeluxe.jpg" }
  ],
  stussy: [
    { name: "STÜSSY METALHEADZ (refletiva)", price: 150, img: "img/stmtb.jpg" },
    { name: "Stüssy Logo Padrão P.", price: 150, img: "img/stlpp.jpg" },
    { name: "Stüssy Veludo B", price: 150, img: "img/stvlb.jpg" },
    { name: "Stüssy Veludo P", price: 150, img: "img/stvlp.jpg" },
    { name: "Stüssy Logo Padrão B.", price: 150, img: "img/stlpb.jpg" },
    { name: "Stüssy Bordada B", price: 150, img: "img/stbdb.jpg" }
  ]
};

// ============================
// FUNÇÃO PARA ADICIONAR PRODUTO AO CARRINHO
// ============================
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} adicionado ao carrinho!`);
}

// ============================
// FUNÇÃO PARA RENDERIZAR PRODUTOS
// ============================
function renderProducts(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  products[category].forEach(product => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h4>R$${product.price}</h4>
      <p>${product.name}</p>
      <button onclick="addToCart('${product.name}', ${product.price})">Adicionar ao carrinho</button>
    `;
    container.appendChild(div);
  });
}

// ============================
// CHAMADAS PARA RENDERIZAR TODAS AS CATEGORIAS
// ============================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("promo", "promo-products");
  renderProducts("nocta", "nocta-products");
  renderProducts("stussy", "stussy-products");
});
