// TZAD STORE - SCRIPT DE AUTOMAÇÃO (ATO 2)

function abrirCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        // Mostra a janela forçando prioridade
        janela.style.display = 'block';
    }
}

function fecharCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'none';
    }
}

// Log para confirmar que o arquivo carregou
console.log("Automação de Carrinho carregada.");
