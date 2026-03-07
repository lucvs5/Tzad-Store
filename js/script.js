// -----------------------------
// MODAL DE LOGIN AO CLICAR NO CARRINHO
// -----------------------------

// Seleciona elementos
const modal = document.getElementById("cart-modal");
const cartBtn = document.querySelector(".cart-icon");
const closeBtn = document.querySelector(".close-modal");

// Abre o modal ao clicar no carrinho
cartBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Fecha o modal ao clicar no X
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fecha o modal ao clicar fora da janela
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
