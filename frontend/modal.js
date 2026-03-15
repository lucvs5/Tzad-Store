window.abrirZoomV2 = function(idProduto) {
    // 1. Busca o produto no Banco de Dados global
    const produto = produtosLoja.find(p => p.id === idProduto);
    if (!produto) return;

    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
    const selectTamanho = document.getElementById('zoom-v2-tamanho');

    // 2. Reset de Estado (Limpa seleções anteriores)
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    imgPrincipal.src = produto.img;
    selectTamanho.value = "";
    selectTamanho.style.boxShadow = "none"; 

    // 3. Gerar Miniaturas (Foto Principal + Extras)
    // Garantimos que a foto principal seja a primeira da lista
    const fotos = [produto.img, ...(produto.fotos || [])].filter((v, i, a) => a.indexOf(v) === i);
    
    containerMiniaturas.innerHTML = fotos.map((f, index) => `
        <img src="${f}" onclick="trocarImagemPrincipal('${f}', this)" 
             class="${index === 0 ? 'thumb-ativa' : ''}"
             style="width: 60px; height: 60px; cursor: pointer; border: 2px solid #333; object-fit: cover; border-radius: 5px;">
    `).join('');

    // 4. Configura o Botão de Adicionar
    const btnAdd = document.getElementById('zoom-v2-btn-add');
    btnAdd.onclick = function() {
        const tamanho = selectTamanho.value;
        const painelUsuario = document.getElementById('estado-painel'); 

        // Validação de Tamanho
        if (!tamanho) {
            selectTamanho.style.boxShadow = "0 0 12px #DAA520";
            return;
        }

        // Validação de Login (Joga o login para a frente)
        if (!painelUsuario || painelUsuario.style.display !== 'block') {
            const loginWin = document.getElementById('login-window');
            if (loginWin) {
                loginWin.style.display = 'block';
                loginWin.style.zIndex = "30000000"; // Maior que o overlay
            }
            return;
        }

        // Se logado, adiciona ao carrinho e fecha
        window.adicionarAoCarrinho(produto.id, tamanho);
        window.fecharZoomV2();
    };

    overlay.style.display = 'flex';
};

window.trocarImagemPrincipal = function(src, elemento) {
    document.getElementById('zoom-v2-img').src = src;
    document.querySelectorAll('#zoom-v2-miniaturas img').forEach(img => img.classList.remove('thumb-ativa'));
    elemento.classList.add('thumb-ativa');
};

window.fecharZoomV2 = function() {
    document.getElementById('zoom-v2-overlay').style.display = 'none';
};

window.scrollCarrossel = function(direcao) {
    const container = document.getElementById('zoom-v2-miniaturas');
    container.scrollLeft += direcao * 70;
};
