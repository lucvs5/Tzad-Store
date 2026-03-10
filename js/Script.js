/**
 * TZAD STORE - SCRIPT.JS (COMPLETO E DEFINITIVO)
 * Gerencia a interatividade da interface (Carrinho, Login e Modais)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. A Janela que deve aparecer
    const janelaLogin = document.getElementById('login-window');
    
    // 2. O Botão do Carrinho (que contém a img/carrinho.png)
    const botaoCarrinho = document.querySelector('.cart-icon');
    
    // 3. O Botão de fechar (_)
    const botaoMinimizar = document.querySelector('.minimize-btn');

    // LÓGICA DE ABRIR: Focada no ícone do carrinho
    if (botaoCarrinho && janelaLogin) {
        botaoCarrinho.onclick = function(e) {
            e.preventDefault();
            janelaLogin.style.display = 'block';
            console.log("Carrinho aberto com sucesso!");
        };
    }

    // LÓGICA DE FECHAR: Focada no botão _
    if (botaoMinimizar && janelaLogin) {
        botaoMinimizar.onclick = function() {
            janelaLogin.style.display = 'none';
        };
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
