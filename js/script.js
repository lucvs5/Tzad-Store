// -----------------------------
// JANELA DE LOGIN AO CLICAR NO CARRINHO
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
  if (body.style.display === "none") {
    body.style.display = "block";
  } else {
    body.style.display = "none";
  }
});
