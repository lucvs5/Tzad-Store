/**
 * MODAL.JS - Interface Nobre de Produto e Lightbox
 */

window.abrirModal = function(product) {
    let modal = document.getElementById('modal-compra');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-compra';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" onclick="fecharModal()" style="position:absolute; top:15px; right:15px; border:none; background:none; font-size:24px; cursor:pointer;">&times;</button>
            
            <div class="carousel-container">
                <button class="nav-arrow arrow-left" onclick="mudarImagem(-1)">&#10094;</button>
                <img src="${product.img}" class="modal-img" id="img-principal" onclick="abrirImagemCheia(this.src)" style="width:100%; max-height:300px; object-fit:contain; cursor:zoom-in; border-radius:10px;">
                <button class="nav-arrow arrow-right" onclick="mudarImagem(1)">&#10095;</button>
            </div>

            <h3 class="modal-title" style="margin-top:15px; font-size:22px;">${product.name}</h3>
            <p class="modal-price" style="color:#27ae60; font-weight:bold; font-size:20px; margin:10px 0;">R$ ${product.price}</p>
            
            <div class="variant-group" style="text-align:left; margin-top:15px;">
                <label style="font-weight:bold; display:block; margin-bottom:5px;">Selecione o Tamanho:</label>
                <select id="var-tamanho" style="width:100%; padding:10px; border-radius:5px; border:1px solid #ccc;">
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                </select>
            </div>

            <button class="btn-confirmar-pedido" onclick="finalizarPedido('${product.id}')">
                Adicionar ao Carrinho
            </button>
        </div>
    `;

    modal.style.display = 'flex';
};

window.fecharModal = function() {
    document.getElementById('modal-compra').style.display = 'none';
};

// Função Lightbox: Imagem em tela cheia
window.abrirImagemCheia = function(src) {
    let overlay = document.getElementById('full-image-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'full-image-overlay';
        overlay.className = 'full-image-overlay';
        overlay.innerHTML = `
            <span class="close-full-img" onclick="fecharImagemCheia()">&times;</span>
            <img id="img-zoom" style="max-width:90%; max-height:90%; border-radius:5px;">
        `;
        document.body.appendChild(overlay);
    }
    document.getElementById('img-zoom').src = src;
    overlay.style.display = 'flex';
};

window.fecharImagemCheia = function() {
    document.getElementById('full-image-overlay').style.display = 'none';
};

// Placeholder para o Carrossel (Lógica de troca de imagem)
window.mudarImagem = function(direcao) {
    console.log("Trocar imagem para direção:", direcao);
    // Aqui no futuro adicionaremos o array de imagens extras do produto
};

window.finalizarPedido = async function(productId) {
    const tamanho = document.getElementById('var-tamanho').value;
    // Lógica de envio para o server.js e depois Telegram
    alert("Produto adicionado! Enviando pedido ao Telegram...");
    fecharModal();
};
