const produtosLoja = [
    // PROMOÇÕES
    { id: 101, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/bape-2.jpg"] },
    { id: 102, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 103, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 104, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 105, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 106, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },

    // NOCTA
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: 450.00, img: "img/nntc.png", categoria: "nocta", fotos: ["img/nntc.png"] },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: 400.00, img: "img/nkcv.png", categoria: "nocta", fotos: ["img/nkcv.png"] },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: 450.00, img: "img/nktc.jpg", categoria: "nocta", fotos: ["img/nktc.jpg"] },
    { id: 204, name: "Pulseira Classic", price: 150.00, img: "img/PulseiraClassic.jpg", categoria: "nocta", fotos: ["img/PulseiraClassic.jpg"] },
    { id: 205, name: "Pulseira Gold Line", price: 150.00, img: "img/PulseiraGoldLine.jpg", categoria: "nocta", fotos: ["img/PulseiraGoldLine.jpg"] },
    { id: 206, name: "Pulseira Deluxe", price: 150.00, img: "img/PulseiraDeluxe.jpg", categoria: "nocta", fotos: ["img/PulseiraDeluxe.jpg"] },

    // STÜSSY
    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: 150.00, img: "img/stmtb.jpg", categoria: "stussy", fotos: ["img/stmtb.jpg"] },
    { id: 302, name: "Stüssy Logo Padrão P.", price: 150.00, img: "img/stlpp.jpg", categoria: "stussy", fotos: ["img/stlpp.jpg"] },
    { id: 303, name: "Stüssy Veludo B", price: 150.00, img: "img/stvlb.jpg", categoria: "stussy", fotos: ["img/stvlb.jpg"] },
    { id: 304, name: "Stüssy Veludo P", price: 150.00, img: "img/stvlp.jpg", categoria: "stussy", fotos: ["img/stvlp.jpg"] },
    { id: 305, name: "Stüssy Logo Padrão B.", price: 150.00, img: "img/stlpb.jpg", categoria: "stussy", fotos: ["img/stlpb.jpg"] },
    { id: 306, name: "Stüssy Bordada B", price: 150.00, img: "img/stbdb.jpg", categoria: "stussy", fotos: ["img/stbdb.jpg"] }
];

let itensNoCarrinho = [];

document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    configurarInterface();
    carregarDadosSalvos();
});

function renderizarVitrines() {
    ['promocoes', 'nocta', 'stussy'].forEach(cat => {
        const container = document.getElementById(`vitrine-${cat}`);
        if (!container) return;
        const filtrados = produtosLoja.filter(p => p.categoria === cat);
        container.innerHTML = filtrados.map(p => `
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
    const produto = produtosLoja.find(p => p.id === id);
    if (!produto) return;
    for(let i=0; i<quantidade; i++) {
        const item = new window.CartItem(produto.id, produto.name, produto.price, produto.img, tamanho, "Padrão");
        itensNoCarrinho.push(item);
    }
    atualizarCarrinhoVisual();
    window.alternarTela('painel');
    window.abrirSubPagina('carrinho');
};

function calcularTotais() {
    const somaBruta = itensNoCarrinho.reduce((acc, p) => acc + p.price, 0);
    const qtdStussy = itensNoCarrinho.filter(i => i.name.toLowerCase().includes("stüssy")).length;
    let perc = (itensNoCarrinho.length >= 2) ? 5 : 0;
    if (qtdStussy === 2) perc = 16.67;
    else if (qtdStussy === 3) perc = 21.67;
    else if (qtdStussy >= 4) perc = 30.00;

    const valorDesc = somaBruta * (perc / 100);
    const total = somaBruta - valorDesc;

    document.getElementById('preco-bruto').innerText = `R$ ${somaBruta.toFixed(2).replace('.', ',')}`;
    document.getElementById('txt-perc-desc').innerText = perc.toFixed(2);
    document.getElementById('valor-desconto').innerText = `- R$ ${valorDesc.toFixed(2).replace('.', ',')}`;
    document.getElementById('total-carrinho').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function atualizarCarrinhoVisual() {
    const lista = document.getElementById('carrinho-lista');
    if (!lista) return;
    lista.innerHTML = itensNoCarrinho.length === 0 ? '<p style="text-align:center; padding:20px; color:#666;">Carrinho vazio.</p>' :
    itensNoCarrinho.map((item, idx) => `
        <div class="carrinho-item">
            <img src="${item.img}" style="width:40px; height:40px; border-radius:4px;">
            <div style="flex:1; font-size:11px;">${item.name}<br><span style="color:#DAA520;">Tam: ${item.size}</span></div>
            <button onclick="removerItem(${idx})" style="color:red; background:none; border:none; cursor:pointer;">✕</button>
        </div>
    `).join('');
    calcularTotais();
}

window.removerItem = (idx) => { itensNoCarrinho.splice(idx, 1); atualizarCarrinhoVisual(); };

function configurarInterface() {
    const loginWin = document.getElementById('login-window');
    document.addEventListener('click', e => { if (e.target.closest('.cart-icon')) loginWin.style.display = 'block'; });
    document.querySelector('.minimize-btn').onclick = () => loginWin.style.display = 'none';
    document.getElementById('form-executa-login').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        document.getElementById('user-name-display').innerText = email.split('@')[0].toUpperCase();
        alternarTela('painel');
    };
    document.getElementById('btn-logout').onclick = () => { alternarTela('login'); document.getElementById('form-executa-login').reset(); };
}

window.alternarTela = function(tela) {
    ['estado-login', 'estado-cadastro', 'estado-painel'].forEach(s => document.getElementById(s).style.display = 'none');
    const alvo = tela === 'painel' ? 'estado-painel' : (tela === 'cadastro' ? 'estado-cadastro' : 'estado-login');
    document.getElementById(alvo).style.display = 'block';
};

window.abrirSubPagina = function(abaId) {
    ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'].forEach(aba => {
        const el = document.getElementById(`aba-${aba}`);
        if (el) el.style.display = (aba === abaId) ? 'block' : 'none';
    });
};

function carregarDadosSalvos() {
    const cpf = localStorage.getItem('user_cpf');
    const tel = localStorage.getItem('user_tel');
    if (cpf) document.getElementById('perfil-cpf').value = cpf;
    if (tel) document.getElementById('perfil-tel').value = tel;
}

window.salvarDadosPerfil = function() {
    localStorage.setItem('user_cpf', document.getElementById('perfil-cpf').value);
    localStorage.setItem('user_tel', document.getElementById('perfil-tel').value);
    alert("✅ Dados salvos!");
};

window.mascaraCPF = i => { let v = i.value.replace(/\D/g, "").slice(0, 11); i.value = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); };
window.mascaraTel = i => { let v = i.value.replace(/\D/g, "").slice(0, 11); i.value = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"); };
