/**
 * TZAD STORE - SCRIPT.JS (COMPLETO E DEFINITIVO)
 * Gerencia a interatividade da interface (Carrinho, Login e Modais)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Localiza a janela de login/carrinho
    const loginWindow = document.getElementById('login-window');
    
    // 2. Localiza o botão do carrinho (que está lá no topo do seu HTML)
    const cartBtn = document.querySelector('.cart-icon');
    
    // 3. Localiza o botão de minimizar (_)
    const minimizeBtn = document.querySelector('.minimize-btn');

    // --- LÓGICA DE ABRIR ---
    if (cartBtn && loginWindow) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita qualquer comportamento padrão
            loginWindow.style.display = 'block'; // Força a exibição
            console.log("Comando recebido: Abrindo carrinho.");
        });
    } else {
        console.error("Erro: Botão .cart-icon não encontrado no topo do index.html");
    }

    // --- LÓGICA DE MINIMIZAR ---
    if (minimizeBtn && loginWindow) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none'; // Esconde a janela
        });
    }
});

/**
 * FUNÇÃO GLOBAL: ABRIR MODAL DE DETALHES
 * Esta função é chamada pelos botões "Comprar" ou "Ver Produto" gerados na vitrine (shop.js)
 */
function abrirModal(dadosProduto) {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.display = 'flex'; // Usamos flex para centralizar o conteúdo na tela
        console.log("Modal aberto para o produto:", dadosProduto);
    }
}
