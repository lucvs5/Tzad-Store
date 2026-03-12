window.abrirZoomV2 = function(nome, preco, img, fotosExtras = []) {
    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const selectTamanho = document.getElementById('zoom-v2-tamanho');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
    const btnAdd = document.getElementById('zoom-v2-btn-add');

    // Reset de estilos e dados
    document.getElementById('zoom-v2-titulo').innerText = nome;
    imgPrincipal.src = img;
    selectTamanho.value = "";
    selectTamanho.style.boxShadow = "none"; 
    
    // 1. Miniaturas (Fotos extras)
    let fotos = fotosExtras.length > 0 ? fotosExtras : [img, img, img, img];
    containerMiniaturas.innerHTML = fotos.map(f => `
        <img src="${f}" onclick="document.getElementById('zoom-v2-img').src='${f}'" 
             style="width: 50px; height: 50px; cursor: pointer; border-radius: 4px; border: 1px solid #333; object-fit: cover; transition: 0.3s;"
             onmouseover="this.style.borderColor='#DAA520'" onmouseout="this.style.borderColor='#333'">
    `).join('');

    // 2. Lógica do Botão Adicionar
    btnAdd.onclick = function() {
        const tamanho = selectTamanho.value;
        const painelUsuario = document.getElementById('estado-painel'); 

        // Validação de Tamanho (Sombra amarela sofisticada)
        if (!tamanho) {
            selectTamanho.style.boxShadow = "0 0 12px #DAA520";
            selectTamanho.focus();
            return;
        } else {
            selectTamanho.style.boxShadow = "none";
        }

        // Validação de Login SEM ALERT
        if (!painelUsuario || painelUsuario.style.display !== 'block') {
            const loginWindow = document.getElementById('login-window');
            if (loginWindow) {
                // Abre o painel de login silenciosamente sobre o modal
                loginWindow.style.display = 'block';
                loginWindow.style.zIndex = "20000000"; // Acima do Zoom V2
            }
            return;
        }

        // Se logado, segue o fluxo normal
        if (typeof adicionarAoCarrinho === 'function') {
            adicionarAoCarrinho(nome, preco, img, tamanho);
            fecharZoomV2();
        }
    };

    overlay.style.display = 'flex';
};


window.fecharZoomV2 = function() {
    document.getElementById('zoom-v2-overlay').style.display = 'none';
};

// FECHAR AO CLICAR NO FUNDO PRETO (OPCIONAL, MAS RECOMENDADO)
window.onclick = function(event) {
    const overlay = document.getElementById('zoom-v2-overlay');
    if (event.target == overlay) {
        fecharZoomV2();
    }
};
