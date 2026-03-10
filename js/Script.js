// TZAD STORE - GLOBAL CONTROL
window.abrirCarrinho = function() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'block';
        janela.style.zIndex = "10000";
    }
};

window.fecharCarrinho = function() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'none';
    }
};

console.log("Script de controle carregado.");
