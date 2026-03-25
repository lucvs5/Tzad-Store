// js/script.js
window.produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 102, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 103, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 104, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 105, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 106, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes" },
    
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: 450.00, img: "img/nntc.png", categoria: "nocta" },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: 400.00, img: "img/nkcv.png", categoria: "nocta" },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: 450.00, img: "img/nktc.jpg", categoria: "nocta" },
    { id: 204, name: "Pulseira Classic", price: 150.00, img: "img/PulseiraClassic.jpg", categoria: "nocta" },
    { id: 205, name: "Pulseira Gold Line", price: 150.00, img: "img/PulseiraGoldLine.jpg", categoria: "nocta" },
    { id: 206, name: "Pulseira Deluxe", price: 150.00, img: "img/PulseiraDeluxe.jpg", categoria: "nocta" },
    
    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: 150.00, img: "img/stmtb.jpg", categoria: "stussy" },
    { id: 302, name: "Stüssy Logo Padrão P.", price: 150.00, img: "img/stlpp.jpg", categoria: "stussy" },
    { id: 303, name: "Stüssy Veludo B", price: 150.00, img: "img/stvlb.jpg", categoria: "stussy" },
    { id: 304, name: "Stüssy Veludo P", price: 150.00, img: "img/stvlp.jpg", categoria: "stussy" },
    { id: 305, name: "Stüssy Logo Padrão B.", price: 150.00, img: "img/stlpb.jpg", categoria: "stussy" },
    { id: 306, name: "Stüssy Bordada B", price: 150.00, img: "img/stbdb.jpg", categoria: "stussy" }
];

window.itensNoCarrinho = [];

document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    inicializarInterface();
});

function renderizarVitrines() {
    ['promocoes', 'nocta', 'stussy'].forEach(cat => {
        const container = document.getElementById(`vitrine-${cat}`);
        if (!container) return;
        container.innerHTML = window.produtosLoja
            .filter(p => p.categoria === cat)
            .map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}">
                    <h4>R$ ${p.price.toFixed(2).replace('.', ',')}</h4>
                    <p>${p.name}</p>
                    <button class="btn-comprar" onclick="window.abrirZoomV2(${p.id})">Ver Detalhes</button>
                </div>
            `).join('');
    });
}

window.adicionarAoCarrinho = function(id, tamanho, quantidade) {
    const produto = window.produtosLoja.find(p => p.id === id);
    if (!produto) return;

    for (let i = 0; i < quantidade; i++) {
        const item = new window.CartItem(produto.id, produto.name, produto.price, produto.img, tamanho, "Padrão");
        window.itensNoCarrinho.push(item);
    }
    atualizarUI();
    window.alternarTela('painel');
    window.abrirSubPagina('carrinho');
};

function atualizarUI() {
    const lista = document.getElementById('carrinho-lista');
    const totalEl = document.getElementById('total-carrinho');
    if (!lista) return;

    lista.innerHTML = window.itensNoCarrinho.map((item, idx) => `
        <div class="carrinho-item" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #222;">
            <img src="${item.img}" width="40">
            <div style="flex:1; font-size:12px;">${item.name}<br><small>Tam: ${item.size}</small></div>
            <button onclick="removerItem(${idx})" style="color:red; background:none; border:none; cursor:pointer;">✕</button>
        </div>
    `).join('');

    const total = window.itensNoCarrinho.reduce((acc, i) => acc + i.price, 0);
    if (totalEl) totalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

window.removerItem = (idx) => { window.itensNoCarrinho.splice(idx, 1); atualizarUI(); };

function inicializarInterface() {
    const win = document.getElementById('login-window');
    document.querySelector('.cart-icon').onclick = () => win.style.display = 'block';
    document.querySelector('.minimize-btn').onclick = () => win.style.display = 'none';
}

window.alternarTela = (t) => {
    ['estado-login', 'estado-painel'].forEach(id => document.getElementById(id).style.display = 'none');
    document.getElementById(t === 'painel' ? 'estado-painel' : 'estado-login').style.display = 'block';
};

window.abrirSubPagina = (aba) => {
    ['carrinho', 'perfil'].forEach(id => {
        const el = document.getElementById(`aba-${id}`);
        if(el) el.style.display = (id === aba ? 'block' : 'none');
    });
};
