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
    
    // 1. Lógica de Miniaturas (Carrossel Dinâmico)
    // Se não houver fotos extras, usamos apenas a principal
    let fotos = fotosExtras.length > 0 ? fotosExtras : [img];
    
    // Se tiver mais de uma foto, criamos o carrossel
    if (fotos.length > 1) {
        document.querySelector('.zoom-v2-carrossel-container').style.display = 'flex';
        containerMiniaturas.innerHTML = fotos.map((f, index) => `
            <img src="${f}" onclick="trocarImagemPrincipal('${f}', this)" 
                 class="${index === 0 ? 'thumb-ativa' : ''}"
                 alt="Miniatura ${index + 1}">
        `).join('');
    } else {
        // Se for só uma foto, esconde o container do carrossel
        document.querySelector('.zoom-v2-carrossel-container').style.display = 'none';
    }

    // 2. Lógica do Botão Adicionar (INTEGRAÇÃO COM CARRINHO)
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
                loginWindow.style.display = 'block';
                loginWindow.style.zIndex = "20000000"; 
            }
            return;
        }

        // SE CHEGOU AQUI, ESTÁ LOGADO E COM TAMANHO SELECIONADO.
        // ADICIONAR AO CARRINHO DE VERDADE:
        if (typeof adicionarAoCarrinho === 'function') {
            // Chamamos a função do carrinho que está no seu script.js
            adicionarAoCarrinho(nome, preco, img, tamanho);
            fecharZoomV2(); // Fecha o modal após adicionar
            
            // Opcional: Abre o carrinho para mostrar o item
            setTimeout(() => {
                abrirCarrinho();
            }, 500);
        } else {
            console.error("Erro: A função 'adicionarAoCarrinho' não foi encontrada!");
            alert("Erro ao adicionar ao carrinho. Tente novamente.");
        }
    };

    overlay.style.display = 'flex';
};

// FUNÇÃO PARA TROCAR A IMAGEM PRINCIPAL
window.trocarImagemPrincipal = function(src, thumb) {
    document.getElementById('zoom-v2-img').src = src;
    
    // Remove classe ativa de todas as thumbs e adiciona na clicada
    document.querySelectorAll('.zoom-v2-miniaturas img').forEach(img => {
        img.classList.remove('thumb-ativa');
    });
    thumb.classList.add('thumb-ativa');
}

// FUNÇÃO PARA SCROLL DAS SETAS
window.scrollCarrossel = function(direcao) {
    const container = document.getElementById('zoom-v2-miniaturas');
    const scrollAmount = 70; // Largura da imagem + gap
    container.scrollLeft += direcao * scrollAmount;
}

// FUNÇÃO FECHAR MODAL
window.fecharZoomV2 = function() {
    document.getElementById('zoom-v2-overlay').style.display = 'none';
};

// Fecha ao clicar fora da caixa preta
window.onclick = function(event) {
    const overlay = document.getElementById('zoom-v2-overlay');
    const loginWindow = document.getElementById('login-window');
    
    // Se clicou no overlay do Zoom e o login NÃO está aberto
    if (event.target == overlay && (!loginWindow || loginWindow.style.display !== 'block')) {
        fecharZoomV2();
    }
};
