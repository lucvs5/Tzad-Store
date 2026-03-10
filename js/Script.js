// TZAD STORE - AUTOMACÃO ATO 2

function abrirCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        // Altera o estilo diretamente para garantir visibilidade
        janela.style.display = 'block';
        console.log("Carrinho aberto.");
    }
}

function fecharCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'none';
        console.log("Carrinho fechado.");
    }
}

// Log para confirmar que o script carregou no navegador
console.log("script.js carregado com sucesso.");
