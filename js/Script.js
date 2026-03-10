// TZAD STORE - SOLUÇÃO FINAL ATO 2
console.log("Sistema Tzad Store Iniciado...");

// 1. Forçamos a escuta de cliques em toda a página
document.addEventListener('click', function (event) {
    
    // 2. Verifica se o que foi clicado é o botão do carrinho (ou a imagem dentro dele)
    if (event.target.closest('.cart-icon')) {
        event.preventDefault();
        const janela = document.getElementById('login-window');
        if (janela) {
            janela.style.setProperty('display', 'block', 'important');
            console.log("Sucesso: Janela aberta!");
        } else {
            console.error("Erro: A div #login-window não existe no HTML.");
        }
    }

    // 3. Verifica se o que foi clicado é o botão de minimizar (_)
    if (event.target.closest('.minimize-btn')) {
        const janela = document.getElementById('login-window');
        if (janela) {
            janela.style.display = 'none';
        }
    }
}, false);
