// Função simples para abrir
function abrirCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'block';
    }
}

// Função simples para fechar
function fecharCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'none';
    }
}

// Vincula os botões assim que a página carregar
window.onload = function() {
    const btnAbrir = document.querySelector('.cart-icon');
    const btnFechar = document.querySelector('.minimize-btn');

    if (btnAbrir) {
        btnAbrir.onclick = abrirCarrinho;
    }

    if (btnFechar) {
        btnFechar.onclick = fecharCarrinho;
    }
};
