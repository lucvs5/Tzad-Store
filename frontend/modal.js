// Função global para abrir o modal (chamada pelo shop.js)
window.abrirModal = function(product) {
    // Cria a estrutura do modal se não existir
    let modal = document.getElementById('modal-compra');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-compra';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" onclick="fecharModal()">×</button>
            <img src="${product.img}" class="modal-img">
            <h3 class="modal-title">${product.name}</h3>
            <p class="modal-price">R$ ${product.price}</p>
            
            <div class="variant-group">
                <label>Selecione o Tamanho:</label>
                <select id="var-tamanho">
                    <option value="P">P (Small)</option>
                    <option value="M">M (Medium)</option>
                    <option value="G">G (Large)</option>
                    <option value="GG">GG (Extra Large)</option>
                </select>
            </div>

            <div class="variant-group">
                <label>Selecione a Cor/Modelo:</label>
                <select id="var-cor">
                    <option value="Padrão">Cor da Foto</option>
                    <option value="Preto">Preto</option>
                    <option value="Branco">Branco</option>
                </select>
            </div>

            <button class="btn-confirmar-pedido" onclick="finalizarPedido('${product.id}')">
                ENVIAR PEDIDO AO TELEGRAM
            </button>
        </div>
    `;

    modal.style.display = 'flex';
};

window.fecharModal = function() {
    const modal = document.getElementById('modal-compra');
    if (modal) modal.style.display = 'none';
};

window.finalizarPedido = async function(productId) {
    const tamanho = document.getElementById('var-tamanho').value;
    const cor = document.getElementById('var-cor').value;
    
    // Busca o produto no catálogo (que está no shop.js)
    // Nota: Como o catalog é global, podemos acessá-lo aqui
    let produtoEncontrado = null;
    for(let cat in catalog) {
        let p = catalog[cat].find(item => item.id === productId);
        if(p) { produtoEncontrado = p; break; }
    }

    if (produtoEncontrado) {
        const variantes = { tamanho, cor };
        
        // Envia para o server.js processar
        const resultado = await window.server.processOrder(produtoEncontrado, variantes);
        
        alert(`Pedido de ${resultado.produto} enviado com sucesso!\nVerifique o grupo da loja Tzad no Telegram.`);
        fecharModal();
    }
};
