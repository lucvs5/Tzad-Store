window.abrirZoomV2 = function(idProduto) {
    // 1. Encontra o produto na lista pelo ID
    const produto = produtosLoja.find(p => p.id === idProduto);
    
    if (!produto) return; // Segurança

    const overlay = document.getElementById('zoom-v2-overlay');
    const imgPrincipal = document.getElementById('zoom-v2-img');
    const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');

    // 2. Preenche os textos e a imagem principal
    document.getElementById('zoom-v2-titulo').innerText = produto.name;
    imgPrincipal.src = produto.img;

    // 3. Cria o Carrossel de Miniaturas
    // Usamos as fotos que você cadastrou (fotos: ["img1", "img2"])
    if (produto.fotos && produto.fotos.length > 0) {
        containerMiniaturas.innerHTML = produto.fotos.map(f => `
            <img src="${f}" onclick="trocarImagemPrincipal('${f}', this)" 
                 style="width: 60px; height: 60px; cursor: pointer; border: 2px solid #333; object-fit: cover; border-radius: 5px;">
        `).join('');
    }

    // Dentro da função abrirZoomV2
const containerMiniaturas = document.getElementById('zoom-v2-miniaturas');
containerMiniaturas.innerHTML = ""; // Limpa antes de começar

if (produto.fotos && Array.isArray(produto.fotos)) {
    produto.fotos.forEach(foto => {
        const mini = document.createElement('img');
        mini.src = foto;
        mini.onclick = () => trocarImagemPrincipal(foto, mini);
        mini.style.cssText = "width:60px; height:60px; cursor:pointer; border:2px solid #333; object-fit:cover; border-radius:5px; flex-shrink:0;";
        containerMiniaturas.appendChild(mini);
    });
}

    // 4. Configura o botão de ADICIONAR AO CARRINHO (que está dentro do modal)
    const btnAdd = document.getElementById('zoom-v2-btn-add');
    btnAdd.onclick = function() {
        const tamanho = document.getElementById('zoom-v2-tamanho').value;
        
        if (!tamanho) {
            alert("Por favor, selecione um tamanho!");
            return;
        }

        // Chama a função de adicionar ao carrinho de verdade
        if (typeof adicionarAoCarrinho === 'function') {
            adicionarAoCarrinho(produto.name, produto.price, produto.img, tamanho);
            fecharZoomV2();
        }
    };

    overlay.style.display = 'flex';
};

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
// Função para as setinhas amarelas rolarem o scroll natural
window.scrollCarrossel = function(direcao) {
    const container = document.getElementById('zoom-v2-miniaturas');
    const larguraItem = 70; // Tamanho da miniatura + gap
    container.scrollLeft += direcao * larguraItem;
};

// Certifique-se que a função trocarImagemPrincipal também existe
window.trocarImagemPrincipal = function(src, elemento) {
    document.getElementById('zoom-v2-img').src = src;
    // Opcional: destaque a miniatura clicada
    document.querySelectorAll('.zoom-v2-miniaturas img').forEach(img => img.style.borderColor = '#333');
    elemento.style.borderColor = '#DAA520';
};
