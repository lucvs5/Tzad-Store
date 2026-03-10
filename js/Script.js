// FUNÇÕES DE AUTOMAÇÃO - ATO 2
function abrirCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'block';
    } else {
        console.error("Janela não encontrada!");
    }
}

function fecharCarrinho() {
    const janela = document.getElementById('login-window');
    if (janela) {
        janela.style.display = 'none';
    }
}
