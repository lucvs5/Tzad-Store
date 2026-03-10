// AUTOMACÃO ATO 2 - CONEXÃO DIRETA
document.addEventListener('click', function(e) {
    // 1. PROCURA O CLIQUE NO CARRINHO
    if (e.target.closest('.cart-icon')) {
        const janela = document.getElementById('login-window');
        if (janela) {
            janela.style.display = 'block';
            console.log("Link de abertura ativado.");
        }
    }

    // 2. PROCURA O CLIQUE NO MINIMIZAR (_)
    if (e.target.closest('.minimize-btn')) {
        const janela = document.getElementById('login-window');
        if (janela) {
            janela.style.display = 'none';
            console.log("Link de fechamento ativado.");
        }
    }
});
