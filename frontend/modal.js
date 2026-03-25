// frontend/modal.js
window.abrirZoomV2 = function(id) {
    const produto = window.produtosLoja.find(p => p.id === id);
    if (!produto) return;

    const modal = document.getElementById('zoom-v2-overlay');
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    document.getElementById('zoom-v2-img').src = produto.img;
    document.getElementById('zoom-v2-qtd').value = 1;
    document.getElementById('zoom-v2-tamanho').value = "";

    // Botão Adicionar
    document.getElementById('zoom-v2-btn-add').onclick = () => {
        const tam = document.getElementById('zoom-v2-tamanho').value;
        const qtd = parseInt(document.getElementById('zoom-v2-qtd').value);
        if(!tam) { alert("Selecione o tamanho!"); return; }
        
        window.adicionarAoCarrinho(produto.id, tam, qtd);
        window.fecharZoomV2();
    };

    modal.style.display = 'flex';
};

window.fecharZoomV2 = () => {
    document.getElementById('zoom-v2-overlay').style.display = 'none';
};

window.alterarQtd = (v) => {
    const input = document.getElementById('zoom-v2-qtd');
    let n = parseInt(input.value) + v;
    if (n >= 1) input.value = n;
};
