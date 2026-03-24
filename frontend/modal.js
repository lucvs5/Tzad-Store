window.abrirZoomV2 = function(idProduto) {
    // Busca o produto no banco de dados que está no script.js
    const produto = produtosLoja.find(p => p.id === idProduto);
    if (!produto) return;

    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
    const selectTamanho = document.getElementById('zoom-v2-tamanho');

    // Preenche os dados
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    imgPrincipal.src = produto.img;
    selectTamanho.value = ""; 
    selectTamanho.style.boxShadow = "none";

    // Cria as miniaturas (Foto principal + extras)
    const fotos = [produto.img, ...(produto.fotos || [])];
    const fotosUnicas = [...new Set(fotos)]; // Remove duplicatas

    containerMiniaturas.innerHTML = fotosUnicas.map((f, i) => `
        <img src="${f}" onclick="trocarImagemPrincipal('${f}', this)" 
             class="${i === 0 ? 'thumb-ativa' : ''}" 
             style="width:60px; height:60px; object-fit:cover; border-radius:5px; cursor:pointer; border:2px solid #333;">
    `).join('');

    // Configura o botão de Adicionar
    const btnAdd = document.getElementById('zoom-v2-btn-add');
    btnAdd.onclick = function() {
        if (!selectTamanho.value) {
            selectTamanho.style.boxShadow = "0 0 10px #DAA520";
            return;
        }

        const painelUsuario = document.getElementById('estado-painel');
        if (!painelUsuario || painelUsuario.style.display !== 'block') {
            document.getElementById('login-window').style.display = 'block';
            document.getElementById('login-window').style.zIndex = "99999";
            return;
        }

        window.adicionarAoCarrinho(produto.id, selectTamanho.value);
        window.fecharZoomV2();
    };

    overlay.style.display = 'flex';
};

window.trocarImagemPrincipal = function(src, el) {
    document.getElementById('zoom-v2-img').src = src;
    document.querySelectorAll('#zoom-v2-miniaturas img').forEach(img => img.classList.remove('thumb-ativa'));
    el.classList.add('thumb-ativa');
};

window.fecharZoomV2 = function() {
    document.getElementById('zoom-v2-overlay').style.display = 'none';
};
