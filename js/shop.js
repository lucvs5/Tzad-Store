// shop.js

// Produtos do site
const products = {
  promo: [
    { id: "bape1", name: "Conjunto BAPE Laranja", price: 250, img: "img/cjbl.jpg" },
    { id: "colarImperial", name: "Colar Imperial", price: 120, img: "img/ColarImperial.jpg" },
    { id: "colarPrestige", name: "Colar Prestige", price: 200, img: "img/ColarPrestige.jpg" }
    // Adicione mais produtos aqui
  ],
  nocta: [
    { id: "nntc", name: "Conjunto Nike x Nocta NNT Cinza", price: 450, img: "img/nntc.png" },
    { id: "nkcv", name: "Corta Vento Nike x Nocta Preto", price: 400, img: "img/nkcv.png" }
    // Adicione mais produtos Nocta aqui
  ],
  stussy: [
    { id: "stmtb", name: "STÜSSY METALHEADZ (refletiva)", price: 150, img: "img/stmtb.jpg" },
    { id: "stlpp", name: "Stüssy Logo Padrão P.", price: 150, img: "img/stlpp.jpg" }
    // Adicione mais produtos Stüssy aqui
  ]
};

// Função para criar HTML de cada produto
function createProductHTML(product) {
  const div = document.createElement("div");
  div.className = "produto";
  div.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h4>R$${product.price}</h4>
    <p>${product.name}</p>
    <button onclick="addToCart('${product.id}', '${product.name}', ${product.price})">Adicionar ao carrinho</button>
  `;
  return div;
}

// Função para injetar produtos nos containers
function loadProducts() {
  const promoContainer = document.getElementById("promo-products");
  const noctaContainer = document.getElementById("nocta-products");
  const stussyContainer = document.getElementById("stussy-products");

  products.promo.forEach(p => promoContainer.appendChild(createProductHTML(p)));
  products.nocta.forEach(p => noctaContainer.appendChild(createProductHTML(p)));
  products.stussy.forEach(p => stussyContainer.appendChild(createProductHTML(p)));
}

// Função de adicionar ao carrinho (simples)
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} adicionado ao carrinho!`);
}

// Carregar produtos ao iniciar a página
window.onload = loadProducts;
