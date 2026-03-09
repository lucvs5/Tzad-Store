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
            <button onclick="fecharModal()" style="float:right; background:none; border:none; color:#DAA520; font-size:20px; cursor:pointer;">&times;</button>
            <img src="${product.img}" style="width:100%; border-radius:10px; margin-bottom:15px;">
            <h3 style="color:#DAA520;">${product.name}</h3>
            <p style="font-size:20px; margin:10px 0;">R$ ${product.price}</p>
            
            <div style="margin:15px 0; text-align:left;">
                <label>Tamanho:</label>
                <select id="var-tamanho" style="width:100%; padding:10px; background:#333; color:white; border:1px solid #DAA520; border-radius:5px;">
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                </select>
            </div>

            <button onclick="finalizarPedido()" style="width:100%; padding:15px; background:#DAA520; color:black; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">
                ADICIONAR AO CARRINHO
            </button>
        </div>
    `;
    modal.style.display = 'flex';
};

window.fecharModal = function() {
    document.getElementById('modal-compra').style.display = 'none';
};

window.finalizarPedido = function() {
    alert("Adicionado ao carrinho! Seguindo para integração com o Bot.");
    fecharModal();
};
