window.abrirZoomV2 = function(id) {
    const produto = produtosLoja.find(p => p.id === id);
    if (!produto) return;

    const modal = document.getElementById('zoom-v2-overlay');
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    document.getElementById('zoom-v2-img').src = produto.img;
    document.getElementById('zoom-v2-tamanho').value = "";
    document.getElementById('zoom-v2-qtd').value = 1;

    // Gerar Carrossel
    const fotos = [produto.img, ...(produto.fotos || [])];
    const fotosUnicas = [...new Set(fotos)];
    
    document.getElementById('zoom-v2-miniaturas').innerHTML = fotosUnicas.map((f, i) => `
        <img src="${f}" class="${i === 0 ? 'thumb-ativa' : ''}" onclick="window.trocarThumb('${f}', this)">
    `).join('');

    // Botão Adicionar
    document.getElementById('zoom-v2-btn-add').onclick = () => {
        const tam = document.getElementById('zoom-v2-tamanho').value;
        const qtd = parseInt(document.getElementById('zoom-v2-qtd').value);
        if (!tam) { alert("Selecione um tamanho!"); return; }
        window.adicionarAoCarrinho(produto.id, tam, qtd);
        window.fecharZoomV2();
    };

    modal.style.display = 'flex';
};

window.trocarThumb = (src, el) => {
    document.getElementById('zoom-v2-img').src = src;
    document.querySelectorAll('#zoom-v2-miniaturas img').forEach(img => img.classList.remove('thumb-ativa'));
    el.classList.add('thumb-ativa');
};

window.fecharZoomV2 = () => document.getElementById('zoom-v2-overlay').style.display = 'none';

window.alterarQtd = (v) => {
    const input = document.getElementById('zoom-v2-qtd');
    let n = (parseInt(input.value) || 1) + v;
    input.value = n < 1 ? 1 : n;
};
