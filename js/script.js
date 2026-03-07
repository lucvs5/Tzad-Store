// MODAL DE LOGIN AO CLICAR NO CARRINHO
const modal = document.getElementById("cart-modal");
const cartBtn = document.querySelector(".cart-icon");
const closeBtn = document.querySelector(".close-modal");

cartBtn.addEventListener("click", () => {
  modal.style.display = "flex"; // mostra o modal
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none"; // fecha o modal
});

window.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.style.display = "none"; // fecha ao clicar fora
  }
});
