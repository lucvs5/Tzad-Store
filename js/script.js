// 1. BANCO DE DADOS COMPLETO
const produtosLoja = [
    // PROMOÇÕES (BAPE)
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

// 2. FUNÇÃO RENDERIZAR (Gera a vitrine sem erros de aspas)
function renderizarVitrines() {
    const categorias = ['promocoes', 'nocta', 'stussy'];
    
    categorias.forEach(cat => {
        const grid = document.getElementById(`vitrine-${cat}`);
        if (!grid) return;

        const produtosFiltrados = produtosLoja.filter(p => p.categoria === cat);
        
        grid.innerHTML = produtosFiltrados.map(p => `
            <div class="produto">
                <img src="${p.img}" alt="${p.name}">
                <h4>R$ ${p.price}</h4>
                <p>${p.name}</p>
                <button class="btn-comprar" onclick="abrirZoomV2(${p.id})">Ver Detalhes</button>
            </div>
        `).join('');
    });
}

// 3. CARRINHO (Sincronizado)
window.adicionarAoCarrinho = function(id, tamanho) {
    const produto = produtosLoja.find(p => p.id === id);
    if (!produto) return;

    const novoItem = {
        ...produto,
        tamanho: tamanho,
        precoNum: parseFloat(produto.price.replace('.', '').replace(',', '.'))
    };

    itensNoCarrinho.push(novoItem);
    window.atualizarCarrinhoHTML();
    
    // Abre o painel automaticamente
    window.alternarTela('painel');
    window.abrirSubPagina('carrinho');
};

window.atualizarCarrinhoHTML = function() {
    const listaUI = document.getElementById('carrinho-lista');
    const totalUI = document.getElementById('total-carrinho');
    if (!listaUI) return;

    let total = 0;
    listaUI.innerHTML = itensNoCarrinho.map((item, index) => {
        total += item.precoNum;
        return `
            <div class="item-carrinho" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #222;">
                <img src="${item.img}" style="width:50px; border-radius:5px;">
                <div style="flex:1;">
                    <p style="margin:0; font-size:13px;">${item.name}</p>
                    <p style="margin:0; font-size:11px; color:#DAA520;">Tam: ${item.tamanho} - R$ ${item.price}</p>
                </div>
                <button onclick="removerDoCarrinho(${index})" style="background:none; border:none; color:red; cursor:pointer;">&times;</button>
            </div>
        `;
    }).join('');

    if (totalUI) totalUI.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
};

window.removerDoCarrinho = function(index) {
    itensNoCarrinho.splice(index, 1);
    window.atualizarCarrinhoHTML();
};

// 4. NAVEGAÇÃO DE TELAS
window.alternarTela = function(tela) {
    const IDs = ['estado-login', 'estado-cadastro', 'estado-painel'];
    IDs.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });

    const destino = tela === 'painel' ? 'estado-painel' : (tela === 'cadastro' ? 'estado-cadastro' : 'estado-login');
    const elDestino = document.getElementById(destino);
    if(elDestino) elDestino.style.display = 'block';
};

window.abrirSubPagina = function(abaId) {
    const abas = ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'];
    abas.forEach(aba => {
        const el = document.getElementById(`aba-${aba}`);
        if(el) el.style.display = 'none';
    });
    const elAtiva = document.getElementById(`aba-${abaId}`);
    if(elAtiva) elAtiva.style.display = 'block';
};

document.addEventListener('DOMContentLoaded', renderizarVitrines);
