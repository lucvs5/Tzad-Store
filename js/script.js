// 1. BANCO DE DADOS (Certifique-se que os IDs batem com os da vitrine)
const produtosLoja = [
    { id: 1, name: "Camiseta Nocta Gold", price: "189,90", img: "img/produto1.png" },
    { id: 2, name: "Shorts Stüssy Black", price: "159,00", img: "img/produto2.png" },
    { id: 3, name: "Nike Air Force 1 Rep", price: "349,00", img: "img/produto3.png" },
    { id: 4, name: "Moletom Essential", price: "220,00", img: "img/produto4.png" }
];

let itensNoCarrinho = []; 

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema TZAD iniciado...");

    // Configuração básica de abrir/fechar janelas
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');

    if (cartIcon) cartIcon.onclick = () => loginWindow.style.display = 'block';
    if (minimizeBtn) minimizeBtn.onclick = () => loginWindow.style.display = 'none';

    // Renderiza a Vitrine automaticamente
    const vitrine = document.getElementById('vitrine-promocoes');
    if (vitrine) {
        vitrine.innerHTML = produtosLoja.map(p => `
            <div class="produto">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>R$ ${p.price}</p>
                <button class="btn-comprar" onclick="abrirDetalhes(${p.id})">Comprar</button>
            </div>
        `).join('');
    }
});

// --- FUNÇÕES GLOBAIS (FORA DO DOMCONTENTLOADED PARA O HTML ENXERGAR) ---

window.abrirDetalhes = function(id) {
    console.log("Abrindo produto ID:", id);
    const produto = produtosLoja.find(p => p.id === id);
    
    if (!produto) {
        console.error("Erro: Produto não encontrado no array produtosLoja");
        return;
    }

    const modal = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');

    modalContent.innerHTML = `
        <button class="close-modal" onclick="fecharDetalhes()">X</button>
        <div style="text-align: center; color: white;">
            <img src="${produto.img}" style="width: 100%; max-width: 200px; border-radius: 8px; border: 1px solid #DAA520;">
            <h3 style="color: #DAA520; margin: 15px 0;">${produto.name}</h3>
            <p style="font-size: 1.2rem; margin-bottom: 15px;">R$ ${produto.price}</p>
            
            <label style="display:block; margin-bottom: 5px; font-size: 12px; color: #888;">TAMANHO:</label>
            <select id="select-tamanho" style="width: 100%; padding: 10px; margin-bottom: 20px; background: #000; color: #fff; border: 1px solid #DAA520;">
                <option value="P">P</option>
                <option value="M" selected>M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
            </select>

            <button class="login-button" onclick="confirmarCompra(${produto.id})" style="background: #28a745; width: 100%;">
                ADICIONAR AO CARRINHO
            </button>
        </div>
    `;
    modal.style.display = 'flex';
};

window.fecharDetalhes = function() {
    document.querySelector('.modal-overlay').style.display = 'none';
};

window.confirmarCompra = function(id) {
    const produto = produtosLoja.find(p => p.id === id);
    const tamanho = document.getElementById('select-tamanho').value;

    if (produto) {
        // ADICIONA O ITEM
        itensNoCarrinho.push({ ...produto, tamanho: tamanho });
        console.log("Item adicionado! Total no carrinho:", itensNoCarrinho.length);

        fecharDetalhes();
        atualizarCarrinhoVisual();
        
        // MOSTRA O CARRINHO
        document.getElementById('login-window').style.display = 'block';
        document.getElementById('estado-login').style.display = 'none';
        document.getElementById('estado-painel').style.display = 'block';
        document.getElementById('titulo-janela').innerText = "MEU CARRINHO";
    }
};

function atualizarCarrinhoVisual() {
    const listaHtml = document.getElementById('carrinho-lista');
    const totalHtml = document.getElementById('total-carrinho');

    if (!listaHtml) {
        console.error("Erro: Não achei a div 'carrinho-lista' no HTML");
        return;
    }

    // Limpa tudo e desenha do zero
    listaHtml.innerHTML = "";

    if (itensNoCarrinho.length === 0) {
        listaHtml.innerHTML = '<p style="text-align:center; color:#666; padding:20px;">Vazio</p>';
        totalHtml.innerText = "R$ 0,00";
        return;
    }

    itensNoCarrinho.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-carrinho-demo';
        div.innerHTML = `
            <img src="${item.img}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;">
            <div class="item-info">
                <span style="color:#fff; font-size:14px;">${item.name} (${item.tamanho})</span>
                <strong style="color:#DAA520;">R$ ${item.price}</strong>
            </div>
            <button onclick="removerItem(${index})" style="background:none; border:none; color:#ff4444; margin-left:auto; cursor:pointer; font-weight:bold;">X</button>
        `;
        listaHtml.appendChild(div);
    });

    // SOMA TOTAL
    const soma = itensNoCarrinho.reduce((acc, item) => acc + parseFloat(item.price.replace(',', '.')), 0);
    totalHtml.innerText = `R$ ${soma.toFixed(2).replace('.', ',')}`;
}

window.removerItem = function(index) {
    itensNoCarrinho.splice(index, 1);
    atualizarCarrinhoVisual();
};
