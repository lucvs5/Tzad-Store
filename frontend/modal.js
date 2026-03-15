// FUNÇÃO PRINCIPAL: ABRIR MODAL V2
window.abrirZoomV2 = function(idProduto) {
    const produto = produtosLoja.find(p => p.id === idProduto);
    if (!produto) return;

    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
    const selectTamanho = document.getElementById('zoom-v2-tamanho');

    // CORREÇÃO: Resetar o select para a primeira opção (Selecione o tamanho)
    selectTamanho.selectedIndex = 0;
    selectTamanho.style.boxShadow = "none";

    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    imgPrincipal.src = produto.img;

    // CORREÇÃO: Adicionar a foto principal JUNTO com as extras no scroll
    const todasAsFotos = [produto.img, ...(produto.fotos || [])];
    
    containerMiniaturas.innerHTML = ""; 
    todasAsFotos.forEach(foto => {
        const mini = document.createElement('img');
        mini.src = foto;
        mini.onclick = () => window.trocarImagemPrincipal(foto, mini);
        // Estilo inline para garantir que apareçam
        mini.style.cssText = "width:60px; height:60px; cursor:pointer; border:2px solid #333; object-fit:cover; border-radius:5px; flex-shrink:0;";
        containerMiniaturas.appendChild(mini);
    });

    // Reconfigura o clique do botão adicionar
    const btnAdd = document.getElementById('zoom-v2-btn-add');
    btnAdd.onclick = function() {
        const tamanho = selectTamanho.value;
        const painelUsuario = document.getElementById('estado-painel'); 

        if (!tamanho) {
            selectTamanho.style.boxShadow = "0 0 12px #DAA520";
            return;
        }

        if (!painelUsuario || painelUsuario.style.display !== 'block') {
            const loginWindow = document.getElementById('login-window');
            if (loginWindow) loginWindow.style.display = 'block';
            return;
        }

        // CHAMA A FUNÇÃO CORRIGIDA DO SCRIPT.JS
        window.adicionarAoCarrinho(produto.name, produto.price, produto.img, tamanho);
        window.fecharZoomV2();
    };

    overlay.style.display = 'flex';
};

// ==========================================
// FUNÇÕES AUXILIARES DO MODAL
// ==========================================

// Função para Trocar Imagem Principal ao clicar na miniatura
window.trocarImagemPrincipal = function(src, elemento) {
    document.getElementById('zoom-v2-img').src = src;
    document.querySelectorAll('.zoom-v2-miniaturas img').forEach(img => {
        img.style.borderColor = '#333';
    });
    elemento.style.borderColor = '#DAA520';
};

// Função para as setinhas amarelas do carrossel
window.scrollCarrossel = function(direcao) {
    const container = document.getElementById('zoom-v2-miniaturas');
    const larguraItem = 70; // Tamanho da miniatura + gap
    container.scrollLeft += direcao * larguraItem;
};

// Função para fechar o modal
window.fecharZoomV2 = function() {
    document.getElementById('zoom-v2-overlay').style.display = 'none';
};

// Fechar ao clicar fora da caixa do modal
window.onclick = function(event) {
    const overlay = document.getElementById('zoom-v2-overlay');
    const loginWindow = document.getElementById('login-window');
    
    if (event.target == overlay && (!loginWindow || loginWindow.style.display !== 'block')) {
        window.fecharZoomV2();
    }
};
