// FUNÇÃO PRINCIPAL: ABRIR MODAL
window.abrirZoomV2 = function(idProduto) {
    // Busca o produto no array global do script.js
    const produto = produtosLoja.find(p => p.id === idProduto);
    if (!produto) return;

    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
    const selectTamanho = document.getElementById('zoom-v2-tamanho');

    // 1. Reset de Estado (Limpa seleções anteriores)
    selectTamanho.selectedIndex = 0;
    selectTamanho.style.boxShadow = "none";
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    imgPrincipal.src = produto.img;

    // 2. Gerar Carrossel (Foto Principal + Fotos Extras)
    const todasAsFotos = [produto.img, ...(produto.fotos || [])];
    containerMiniaturas.innerHTML = "";
    
    todasAsFotos.forEach((foto, index) => {
        const mini = document.createElement('img');
        mini.src = foto;
        mini.classList.toggle('thumb-ativa', index === 0);
        mini.onclick = () => window.trocarImagemPrincipal(foto, mini);
        containerMiniaturas.appendChild(mini);
    });

    // 3. Lógica do Botão Adicionar
    const btnAdd = document.getElementById('zoom-v2-btn-add');
    btnAdd.onclick = function() {
        const tamanho = selectTamanho.value;
        const painelUsuario = document.getElementById('estado-painel'); 

        if (!tamanho) {
            selectTamanho.style.boxShadow = "0 0 12px #DAA520";
            selectTamanho.focus();
            return;
        }

        // Validação de Login (Abre na frente do modal)
        if (!painelUsuario || painelUsuario.style.display !== 'block') {
            const loginWindow = document.getElementById('login-window');
            if (loginWindow) {
                loginWindow.style.display = 'block';
                loginWindow.style.zIndex = "3000"; // Acima do Overlay do Zoom
            }
            return;
        }

        // Adiciona ao carrinho e atualiza interface imediatamente
        window.adicionarAoCarrinho(produto.name, produto.price, produto.img, tamanho);
        window.fecharZoomV2();
    };

    overlay.style.display = 'flex';
};

// AUXILIARES
window.trocarImagemPrincipal = function(src, elemento) {
    document.getElementById('zoom-v2-img').src = src;
    document.querySelectorAll('.zoom-v2-miniaturas img').forEach(img => img.classList.remove('thumb-ativa'));
    elemento.classList.add('thumb-ativa');
};

window.scrollCarrossel = function(direcao) {
    const container = document.getElementById('zoom-v2-miniaturas');
    container.scrollLeft += direcao * 80;
};

window.fecharZoomV2 = function() {
    document.getElementById('zoom-v2-overlay').style.display = 'none';
};
