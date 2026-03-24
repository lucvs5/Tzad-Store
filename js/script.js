// 1. BANCO DE DADOS COMPLETO (18 Itens)
const produtosLoja = [
    // PROMOÇÕES
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/bape-2.jpg"] },
    { id: 102, name: "Conjunto BAPE Azul", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 103, name: "Conjunto BAPE Verde", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 104, name: "Conjunto BAPE Preto", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 105, name: "Conjunto BAPE Branco", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 106, name: "Conjunto BAPE Camo", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },

    // NOCTA
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta", fotos: ["img/nntc.png"] },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta", fotos: ["img/nkcv.png"] },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece", price: "450,00", img: "img/nktc.jpg", categoria: "nocta", fotos: ["img/nktc.jpg"] },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta", fotos: ["img/PulseiraClassic.jpg"] },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta", fotos: ["img/PulseiraGoldLine.jpg"] },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta", fotos: ["img/PulseiraDeluxe.jpg"] },

    // STÜSSY
    { id: 301, name: "STÜSSY METALHEADZ", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy", fotos: ["img/stmtb.jpg"] },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy", fotos: ["img/stlpp.jpg"] },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy", fotos: ["img/stvlb.jpg"] },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy", fotos: ["img/stvlp.jpg"] },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy", fotos: ["img/stlpb.jpg"] },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy", fotos: ["img/stbdb.jpg"] }
];

let itensNoCarrinho = [];

// 2. RENDERIZAÇÃO AUTOMÁTICA
function carregarVitrines() {
    const secoes = ['promocoes', 'nocta', 'stussy'];
    
    secoes.forEach(cat => {
        const container = document.getElementById(`vitrine-${cat}`);
        if (!container) return;

        // Filtra os produtos daquela categoria
        const produtos = produtosLoja.filter(p => p.categoria === cat);
        
        // Gera o HTML (Note que passamos apenas o p.id para evitar erro de aspas)
        container.innerHTML = produtos.map(p => `
            <div class="produto">
                <img src="${p.img}" alt="${p.name}">
                <h4>R$ ${p.price}</h4>
                <p>${p.name}</p>
                <button class="btn-comprar" onclick="abrirZoomV2(${p.id})">Ver Detalhes</button>
            </div>
        `).join('');
    });
}

// 3. LOGICA DO CARRINHO (Sincronizada)
window.adicionarAoCarrinho = function(id, tamanho) {
    const produto = produtosLoja.find(p => p.id === id);
    if (!produto) return;

    itensNoCarrinho.push({
        ...produto,
        tamanho: tamanho,
        precoNum: parseFloat(produto.price.replace('.', '').replace(',', '.'))
    });

    window.atualizarCarrinhoVisual();
    window.alternarTela('painel');
    window.abrirSubPagina('carrinho');
};

window.atualizarCarrinhoVisual = function() {
    const lista = document.getElementById('carrinho-lista');
    const totalEl = document.getElementById('total-carrinho');
    if (!lista) return;

    let subtotal = 0;
    lista.innerHTML = itensNoCarrinho.map((item, index) => {
        subtotal += item.precoNum;
        return `
            <div class="item-carrinho" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #222;">
                <img src="${item.img}" style="width:45px;">
                <div style="flex:1">
                    <p style="margin:0; font-size:12px;">${item.name}</p>
                    <p style="margin:0; font-size:11px; color:#DAA520;">Tam: ${item.tamanho} - R$ ${item.price}</p>
                </div>
                <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">&times;</button>
            </div>
        `;
    }).join('');

    if (totalEl) totalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
};

window.removerItem = function(i) {
    itensNoCarrinho.splice(i, 1);
    window.atualizarCarrinhoVisual();
};

// 4. FUNÇÕES DE TELA
window.alternarTela = function(tela) {
    ['estado-login', 'estado-cadastro', 'estado-painel'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });
    const destino = tela === 'painel' ? 'estado-painel' : (tela === 'cadastro' ? 'estado-cadastro' : 'estado-login');
    document.getElementById(destino).style.display = 'block';
};

window.abrirSubPagina = function(abaId) {
    ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'].forEach(aba => {
        const el = document.getElementById(`aba-${aba}`);
        if(el) el.style.display = 'none';
    });
    document.getElementById(`aba-${abaId}`).style.display = 'block';
};

// Inicia tudo ao carregar
document.addEventListener('DOMContentLoaded', carregarVitrines);
