// --- RESPOSTA DE AUTOMAÇÃO (ATO 2) ---

// Esta função é o link que a imagem procura ao ser clicada
function abrirCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        // Força a exibição imediata
        janela.style.display = 'block';
        console.log("Link vinculado com sucesso: Abrindo Modal.");
    }
}

function fecharCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'none';
    }
}

// O restante do seu código (como o shop.js ou outras funções) deve vir abaixo daqui
