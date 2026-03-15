// FUNÇÃO PRINCIPAL: ABRIR MODAL V2
window.abrirZoomV2 = function(idProduto) {
    // 1. Encontra o produto na lista pelo ID
    const produto = produtosLoja.find(p => p.id === idProduto);
    if (!produto) return; // Segurança caso o ID não exista

    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
    const btnAdd = document.getElementById('zoom-v2-btn-add');
    const selectTamanho = document.getElementById('zoom-v2-tamanho');

    // 2. Preenche os textos e a imagem principal
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    imgPrincipal.src = produto.img;

    // 3. Cria o Carrossel de Miniaturas
    containerMiniaturas.innerHTML = ""; // Limpa fotos antigas
    if (produto.fotos && Array.isArray(produto.fotos)) {
        produto.fotos.forEach(foto => {
            const mini = document.createElement('img');
            mini.src = foto;
            mini.onclick = () => window.trocarImagemPrincipal(foto, mini);
            mini.style.cssText = "width:60px; height:60px; cursor:pointer; border:2px solid #333; object-fit:cover; border-radius:5px; flex-shrink:0;";
            containerMiniaturas.appendChild(mini);
        });
    }

    // Limpa o evento de clique antigo para não adicionar duplicado
    btnAdd.onclick = null;

    // 4. Lógica do Botão Adicionar (INTEGRAÇÃO COM LOGIN E CARRINHO)
    btnAdd.onclick = function() {
        const tamanho = selectTamanho.value;
        const painelUsuario = document.getElementById('estado-painel'); 

        // Validação de Tamanho (Sombra amarela)
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
            return; // Para a execução até o usuário logar
        }

        // ADICIONAR AO CARRINHO
        if (typeof window.adicionarAoCarrinho === 'function') {
            window.adicionarAoCarrinho(produto.name, produto.price, produto.img, tamanho);
            window.fecharZoomV2(); // Fecha o modal
            
            // Abre a janela do carrinho automaticamente
            setTimeout(() => {
                const loginWindow = document.getElementById('login-window');
                if (loginWindow) loginWindow.style.display = 'block';
                window.alternarTela('painel');
                window.abrirSubPagina('carrinho');
            }, 500);
        } else {
            console.error("Erro: Função 'adicionarAoCarrinho' não encontrada!");
        }
    };

    // 5. Exibe o modal na tela
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
