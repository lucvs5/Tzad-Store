/**
 * TZAD STORE - SCRIPT.JS (COMPLETO E DEFINITIVO)
 * Gerencia a interatividade da interface (Carrinho, Login e Modais)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Identifica os elementos exatamente como estão no seu HTML
    const botaoCarrinho = document.querySelector('.cart-icon'); // O botão com o carrinho.png
    const janelaLogin = document.getElementById('login-window');
    const botaoMinimizar = document.querySelector('.minimize-btn');

    // 2. Ação de ABRIR (Ao clicar no ícone do topo)
    if (botaoCarrinho && janelaLogin) {
        botaoCarrinho.onclick = function(e) {
            e.preventDefault(); // Evita que a página recarregue ou suba
            janelaLogin.style.display = 'block'; // Mostra a janela
            console.log("Carrinho aberto com sucesso.");
        };
    } else {
        console.error("Erro: Ícone do carrinho ou Janela de Login não encontrados.");
    }

    // 3. Ação de MINIMIZAR (Ao clicar no _ )
    if (botaoMinimizar && janelaLogin) {
        botaoMinimizar.onclick = function() {
            janelaLogin.style.display = 'none'; // Esconde a janela
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
