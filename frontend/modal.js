/**
 * MODAL.JS - Interface Nobre de Produto
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
        <div class="modal-content" style="position: relative;">
            <button class="close-modal" onclick="fecharModal()">&times;</button>
            
            <div class="carousel-container">
                <img src="${product.img}" class="modal-img" id="img-principal" 
                     style="width:100%; max-height:300px; object-fit:contain; border-radius:10px;">
            </div>

            <h3 class="modal-title" style="margin-top:15px; font-size:22px; color:#DAA520;">${product.name}</h3>
            <p class="modal-price" style="color:#ffffff; font-weight:bold; font-size:20px; margin:10px 0;">R$ ${product.price}</p>
            
            <div class="variant-group" style="text-align:left; margin-top:15px;">
                <label style="font-weight:bold; display:block; margin-bottom:5px; color:#DAA520;">Tamanho:</label>
                <select id="var-tamanho" style="width:100%; padding:12px; border-radius:5px; border:1px solid #DAA520; background:#000; color:#fff;">
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                </select>
            </div>

            <button class="btn-confirmar-pedido" onclick="finalizarPedido('${product.id}')" 
                    style="width:100%; padding:15px; background:#DAA520; color:#000; border:none; border-radius:8px; font-weight:bold; cursor:pointer; margin-top:20px; text-transform:uppercase;">
                Adicionar ao Carrinho
            </button>
        </div>
    `;

    modal.style.display = 'flex';
};

window.fecharModal = function() {
    document.getElementById('modal-compra').style.display = 'none';
};

window.finalizarPedido = function(productId) {
    alert("Produto adicionado ao carrinho!");
    fecharModal();
};
