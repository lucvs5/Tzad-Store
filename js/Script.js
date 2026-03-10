// TZAD STORE - AUTOMACÃO ATO 2

// Função que a IMAGEM chama para abrir o modal
function abrirCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        // Força o estilo diretamente para evitar bloqueios de CSS
        janela.style.display = 'block';
        console.log("Sistema: Modal aberto via toque na imagem.");
    }
}

// Função que o botão _ chama para fechar
function fecharCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'none';
        console.log("Sistema: Modal minimizado.");
    }
}

// Prevenção para garantir que o modal não feche sozinho sem comando
document.addEventListener('DOMContentLoaded', () => {
    console.log("Tzad Store pronta.");
});
