window.abrirZoomV2 = function(nome, preco, img) {
    const overlay = document.getElementById('zoom-v2-overlay');
    
    // Preenche os dados básicos
    document.getElementById('zoom-v2-titulo').innerText = nome;
    document.getElementById('zoom-v2-img').src = img;
    document.getElementById('zoom-v2-tamanho').value = "";

    // Abre o modal
    overlay.style.display = 'flex';
    console.log("Modal Zoom V2 aberto para: " + nome);
};

window.fecharZoomV2 = function() {
    document.getElementById('zoom-v2-overlay').style.display = 'none';
};

// Fecha ao clicar fora da caixa preta
window.onclick = function(event) {
    const overlay = document.getElementById('zoom-v2-overlay');
    if (event.target == overlay) {
        fecharZoomV2();
    }
};
