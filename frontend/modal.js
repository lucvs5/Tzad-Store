window.abrirZoomV2 = function(idProduto) {
    // 1. Busca o produto no array global que está no script.js
    const produto = produtosLoja.find(p => p.id === idProduto);
    
    // Se o produto não for encontrado, o código para aqui e não dá erro "vermelho"
    if (!produto) {
        console.error("Produto não encontrado ID:", idProduto);
        return;
    }

    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
    const selectTamanho = document.getElementById('zoom-v2-tamanho');

    // 2. Preenche os dados usando o objeto encontrado
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    imgPrincipal.src = produto.img;
    selectTamanho.value = ""; 
    selectTamanho.style.boxShadow = "none";

    // 3. Carrossel de Miniaturas (Verifica se fotos existem para não quebrar)
    let fotos = (produto.fotos && produto.fotos.length > 0) ? produto.fotos : [produto.img];
    
    containerMiniaturas.innerHTML = fotos.map((f, index) => `
        <img src="${f}" onclick="trocarImagemPrincipal('${f}', this)" 
             class="${index === 0 ? 'thumb-ativa' : ''}" 
             style="width: 60px; height: 60px; cursor: pointer; border: 2px solid #333; object-fit: cover; border-radius: 5px;">
    `).join('');

    // 4. Configura o botão de Adicionar ao Carrinho dentro do Modal
    const btnAdd = document.getElementById('zoom-v2-btn-add');
    if (btnAdd) {
        btnAdd.onclick = function() {
            if (!selectTamanho.value) {
                selectTamanho.style.boxShadow = "0 0 10px #DAA520";
                return;
            }
            // Chama a função de adicionar que já funciona no seu script.js
            window.adicionarAoCarrinho(produto.name, produto.price, produto.img, selectTamanho.value);
            window.fecharZoomV2();
        };
    }

    overlay.style.display = 'flex';
};

window.fecharModal = function() {
    document.getElementById('modal-compra').style.display = 'none';
};

window.finalizarPedido = function(productId) {
    alert("Produto adicionado com sucesso!");
    fecharModal();
};
