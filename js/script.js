// -----------------------------
// 1️⃣ JANELA DE LOGIN AO CLICAR NO CARRINHO
// -----------------------------
const loginWindow = document.getElementById("login-window");
const cartBtn = document.querySelector(".cart-icon");
const minimizeBtn = document.querySelector(".minimize-btn");

// Abre a janela ao clicar no carrinho
cartBtn.addEventListener("click", (event) => {
  event.preventDefault(); // impede a página de subir
  loginWindow.style.display = "block";
});

// Minimiza a janela
minimizeBtn.addEventListener("click", () => {
  loginWindow.style.display = "none";
});
