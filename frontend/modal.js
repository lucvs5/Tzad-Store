// Modal Zoom/Carrossel (corrigido)
window.abrirModalZoom = function(product) {
    // Cria/verifica modal zoom
    let modalZoom = document.getElementById('modal-zoom');
    if (!modalZoom) {
        modalZoom = document.createElement('div');
        modalZoom.id = 'modal-zoom';
        modalZoom.className = 'modal-overlay';
        document.body.appendChild(modalZoom);
    }

    // Carrossel de imagens (suporte múltiplas imgs)
    const imagens = product.images || [product.img]; // fallback pra 1 imagem
    
    modalZoom.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" onclick="fecharModalZoom()">&times;</button>
            
            <!-- Carrossel -->
            <div class="carousel-container">
                <button class="carousel-prev" onclick="mudarImagem(-1)">&#8249;</button>
                <div class="carousel-imagens" id="carousel-imagens">
                    ${imagens.map((img, index) => 
                        `<img src="${img}" class="carousel-img ${index === 0 ? 'active' : ''}" alt="${product.name}">`
                    ).join('')}
                </div>
                <button class="carousel-next" onclick="mudarImagem(1)">&#8250;</button>
            </div>

            <h3>${product.name}</h3>
            <p class="price">R$ ${product.price}</p>
            
            <!-- Seleção de tamanho -->
            <div class="tamanho-container">
                <label>Tamanho:</label>
                <select id="select-tamanho">
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                </select>
            </div>

            <button id="btn-adicionar-carrinho" class="btn-add-carrinho">
                Adicionar ao Carrinho
            </button>
        </div>
    `;

    modalZoom.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evita scroll
    
    // Event listener do botão (MELHOR que onclick global)
    document.getElementById('btn-adicionar-carrinho').onclick = function() {
        adicionarAoCarrinho(product);
    };
};

// Fecha modal zoom
window.fecharModalZoom = function() {
    const modal = document.getElementById('modal-zoom');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Carrossel navegação
let currentImageIndex = 0;
window.mudarImagem = function(direction) {
    const imgs = document.querySelectorAll('.carousel-img');
    const total = imgs.length;
    
    imgs[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + direction + total) % total;
    imgs[currentImageIndex].classList.add('active');
};

// Adiciona ao carrinho (verifica login)
window.adicionarAoCarrinho = function(product) {
    const tamanho = document.getElementById('select-tamanho').value;
    
    // Verifica se usuário está logado
    if (!window.usuarioLogado) {
        // Abre modal carrinho com login
        abrirModalCarrinho(product, tamanho);
        return;
    }
    
    // Já logado: adiciona direto
    finalizarPedido(product.id, tamanho);
};

// Modal Carrinho/Login (próximo passo)
window.abrirModalCarrinho = function(product, tamanho) {
    // TODO: implementar modal carrinho com login aqui
    alert(`Faça login para adicionar ${product.name} (tamanho ${tamanho}) ao carrinho`);
};
