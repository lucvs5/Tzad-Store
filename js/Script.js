/**
 * TZAD STORE - SCRIPT PRINCIPAL
 * Foco: Ato 2 - Automação do Carrinho/Login
 */

// 1. Função para ABRIR o Modal (chamada pelo clique na imagem do carrinho)
function abrirCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        // Usamos style.display para garantir a abertura imediata
        janela.style.display = 'block';
        console.log("Ato 2: Modal aberto com sucesso.");
    } else {
        console.error("Erro: Elemento 'login-window' não encontrado no HTML.");
    }
}

// 2. Função para FECHAR o Modal (chamada pelo botão _)
function fecharCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'none';
        console.log("Ato 2: Modal minimizado.");
    }
}

// 3. Funções para o Modal de Detalhes dos Produtos (Ato 5)
function abrirModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function fecharModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fecha o modal de detalhes se clicar fora da caixa branca
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
