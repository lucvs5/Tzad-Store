// -----------------------------
// 1️⃣ JANELA DE LOGIN AO CLICAR NO CARRINHO
// -----------------------------
const loginWindow = document.getElementById("login-window");
const cartBtn = document.querySelector(".cart-icon");
const minimizeBtn = document.querySelector(".minimize-btn");

// Abre a janela ao clicar no carrinho (sempre)
cartBtn.addEventListener("click", () => {
  loginWindow.style.display = "block";
});

// Minimiza a janela (esconde toda a janela)
minimizeBtn.addEventListener("click", () => {
  loginWindow.style.display = "none";
});

// -----------------------------
// 2️⃣ TOPO FIXO COM SCROLL
// -----------------------------
const topo = document.querySelector('.topo');
window.addEventListener('scroll', () => {
    topo.style.transition = 'transform 0.3s ease';
  } else {
    topo.style.transform = 'translateY(0)';
  }
});

// -----------------------------
// 3️⃣ OUTROS EVENTOS (menu, carousel, etc.)
// -----------------------------
