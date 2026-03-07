// -----------------------------
// 1️⃣ JANELA DE LOGIN AO CLICAR NO CARRINHO
// -----------------------------
const loginWindow = document.getElementById("login-window");
const cartBtn = document.querySelector(".cart-icon");
const closeBtn = document.querySelector(".close-btn");
const minimizeBtn = document.querySelector(".minimize-btn");

// Abre a janela ao clicar no carrinho
cartBtn.addEventListener("click", () => {
  loginWindow.style.display = "block";
});

// Fecha a janela
closeBtn.addEventListener("click", () => {
  loginWindow.style.display = "none";
});

// Minimiza a janela (apenas esconde o corpo)
minimizeBtn.addEventListener("click", () => {
  const body = loginWindow.querySelector(".login-body");
  body.style.display = body.style.display === "none" ? "block" : "none";
});

// -----------------------------
// 2️⃣ TOPO FIXO COM SCROLL
// -----------------------------
const topo = document.querySelector('.topo');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    topo.style.transform = 'translateY(-80px)';
    topo.style.transition = 'transform 0.3s ease';
  } else {
    topo.style.transform = 'translateY(0)';
  }
});

// -----------------------------
// 3️⃣ OUTROS EVENTOS (menu, carousel, etc.)
// -----------------------------
// Aqui você pode adicionar código adicional
