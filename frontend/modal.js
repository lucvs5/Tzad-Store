window.abrirZoomV2 = function(idProduto) {
    const produto = produtosLoja.find(p => p.id === idProduto);
    if (!produto) return;

    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
    const selectTamanho = document.getElementById('zoom-v2-tamanho');

    // Reset
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    imgPrincipal.src = produto.img;
    selectTamanho.value = "";
    selectTamanho.style.boxShadow = "none";

    // Fotos (Principal + Extras)
    const todasFotos = [produto.img, ...(produto.fotos || [])];
    const fotosUnicas = [...new Set(todasFotos)]; // Remove duplicadas

    containerMiniaturas.innerHTML = fotosUnicas.map((foto, index) => `
        <img src="${foto}" onclick="trocarImagemPrincipal('${foto}', this)" 
             class="${index === 0 ? 'thumb-ativa' : ''}"
             style="width:60px; height:60px; cursor:pointer; border:2px solid #333; object-fit:cover; border-radius:5px;">
    `).join('');

    // Configurar Botão de Compra
    const btnAdd = document.getElementById('zoom-v2-btn-add');
    btnAdd.onclick = function() {
        if (!selectTamanho.value) {
            selectTamanho.style.boxShadow = "0 0 10px #DAA520";
            return;
        }

        const painelAtivo = document.getElementById('estado-painel');
        if (!painelAtivo || painelAtivo.style.display !== 'block') {
            const loginWin = document.getElementById('login-window');
            if (loginWin) {
                loginWin.style.display = 'block';
                loginWin.style.zIndex = "999999";
            }
            return;
        }

        window.adicionarAoCarrinho(produto.id, selectTamanho.value);
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
