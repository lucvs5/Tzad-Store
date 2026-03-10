/**
 * TZAD STORE - SCRIPT.JS (COMPLETO E DEFINITIVO)
 * Gerencia a interatividade da interface (Carrinho, Login e Modais)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos principais da interface
    const loginWindow = document.getElementById('login-window');
    const modalOverlay = document.querySelector('.modal-overlay');

    // --- GESTÃO GLOBAL DE CLIQUES (Método infalível por delegação) ---
    document.addEventListener('click', (e) => {
        
        // 1. ABRIR CARRINHO / LOGIN (Detecta clique no ícone ou na imagem do carrinho)
        if (e.target.closest('.cart-icon')) {
            e.preventDefault(); // Impede que a página recarregue
            if (loginWindow) {
                loginWindow.style.display = 'block';
                console.log("Carrinho aberto com sucesso!");
            }
        }

        // 2. MINIMIZAR CARRINHO (Detecta clique no botão _)
        if (e.target.closest('.minimize-btn')) {
            e.preventDefault();
            if (loginWindow) {
                loginWindow.style.display = 'none';
            }
        }

        // 3. FECHAR MODAL DE DETALHES (Detecta clique no X preto e grosso)
        if (e.target.closest('.close-modal')) {
            e.preventDefault();
            if (modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        }
    });

    // --- FECHAR MODAL CLICANDO FORA ---
    // Se o usuário clicar no fundo escuro (fora da caixa de detalhes), o modal fecha
    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

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
