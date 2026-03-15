// 1. BANCO DE DADOS COMPLETO (Preservado)
const produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/bape-2.jpg"] },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/bape-2.jpg"] },
    { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/extra.jpg"] },
    { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },

    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta", fotos: ["img/nntc.png"] },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta", fotos: ["img/nkcv.png"] },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: "450,00", img: "img/nktc.jpg", categoria: "nocta", fotos: ["img/nktc.jpg"] },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta", fotos: ["img/PulseiraClassic.jpg"] },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta", fotos: ["img/PulseiraGoldLine.jpg"] },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta", fotos: ["img/PulseiraDeluxe.jpg"] },

    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy", fotos: ["img/stmtb.jpg"] },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy", fotos: ["img/stlpp.jpg"] },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy", fotos: ["img/stvlb.jpg"] },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy", fotos: ["img/stvlp.jpg"] },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy", fotos: ["img/stlpb.jpg"] },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy", fotos: ["img/stbdb.jpg"] }
];

let itensNoCarrinho = [];

document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    configurarInterface();
});

// Renderização das Vitrines
function renderizarVitrines() {
    const categorias = ['promocoes', 'nocta', 'stussy'];
    categorias.forEach(cat => {
        const elemento = document.getElementById(`vitrine-${cat}`);
        if (elemento) {
            const produtosFiltrados = produtosLoja.filter(p => p.categoria === cat);
            elemento.innerHTML = produtosFiltrados.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}">
                    <h4>R$ ${p.price}</h4>
                    <p>${p.name}</p>
                    <button class="btn-comprar" onclick="abrirZoomV2(${p.id})">Ver Detalhes</button>
                </div>
            `).join('');
        }
    });
}

// Lógica de Adicionar ao Carrinho (Sincronizada)
window.adicionarAoCarrinho = function(id, tamanho) {
    const produto = produtosLoja.find(p => p.id === id);
    if (!produto) return;

    const precoNum = parseFloat(produto.price.replace('.', '').replace(',', '.'));

    const item = {
        id: produto.id,
        nome: produto.name,
        preco: precoNum,
        img: produto.img,
        tamanho: tamanho
    };

    itensNoCarrinho.push(item);
    
    // Atualiza a tela imediatamente
    atualizarCarrinhoVisual();
    
    // Abre o painel do carrinho
    window.alternarTela('painel');
    window.abrirSubPagina('carrinho');
};

// Atualização Visual do Carrinho
window.atualizarCarrinhoVisual = function() {
    const lista = document.getElementById('carrinho-lista');
    const precoBrutoEl = document.getElementById('preco-bruto');
    const totalEl = document.getElementById('total-carrinho');
    
    if (!lista) return;

    if (itensNoCarrinho.length === 0) {
        lista.innerHTML = "<p style='text-align:center; padding:20px;'>Carrinho vazio.</p>";
        if(precoBrutoEl) precoBrutoEl.innerText = "R$ 0,00";
        if(totalEl) totalEl.innerText = "R$ 0,00";
        return;
    }

    let subtotal = 0;
    lista.innerHTML = itensNoCarrinho.map((item, index) => {
        subtotal += item.preco;
        return `
            <div class="item-carrinho" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #333;">
                <img src="${item.img}" style="width:50px; border-radius:5px;">
                <div style="flex:1">
                    <p style="margin:0; font-size:13px;">${item.nome}</p>
                    <p style="margin:0; font-size:11px; color:#DAA520;">Tam: ${item.tamanho} - R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">&times;</button>
            </div>
        `;
    }).join('');

    if(precoBrutoEl) precoBrutoEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if(totalEl) totalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
};

window.removerItem = function(index) {
    itensNoCarrinho.splice(index, 1);
    atualizarCarrinhoVisual();
};

// Funções de Interface (Login/Telas)
function configurarInterface() {
    const loginWindow = document.getElementById('login-window');
    document.addEventListener('click', (e) => {
        if (e.target.closest('.cart-icon')) {
            e.preventDefault();
            if (loginWindow) loginWindow.style.display = 'block';
        }
    });
}

window.alternarTela = function(tela) {
    const secoes = ['estado-login', 'estado-cadastro', 'estado-painel'];
    secoes.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = 'none';
    });
    
    const destino = tela === 'painel' ? 'estado-painel' : (tela === 'cadastro' ? 'estado-cadastro' : 'estado-login');
    const elDestino = document.getElementById(destino);
    if (elDestino) elDestino.style.display = 'block';

    if (tela === 'painel') atualizarCarrinhoVisual();
};

window.abrirSubPagina = function(abaId) {
    const abas = ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'];
    abas.forEach(aba => {
        const el = document.getElementById(`aba-${aba}`);
        if (el) el.style.display = 'none';
    });
    const elAtiva = document.getElementById(`aba-${abaId}`);
    if (elAtiva) elAtiva.style.display = 'block';
};
