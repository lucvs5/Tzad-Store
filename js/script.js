// 1. BANCO DE DADOS (Preços agora são números para evitar erros de cálculo)
const produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: 250.00, img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/bape-2.jpg"] },
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: 450.00, img: "img/nntc.png", categoria: "nocta", fotos: ["img/nntc.png"] },
    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: 150.00, img: "img/stmtb.jpg", categoria: "stussy", fotos: ["img/stmtb.jpg"] },
    { id: 302, name: "Stüssy Logo Padrão P.", price: 150.00, img: "img/stlpp.jpg", categoria: "stussy", fotos: ["img/stlpp.jpg"] },
    { id: 303, name: "Stüssy Veludo B", price: 150.00, img: "img/stvlb.jpg", categoria: "stussy", fotos: ["img/stvlb.jpg"] },
    { id: 304, name: "Stüssy Veludo P", price: 150.00, img: "img/stvlp.jpg", categoria: "stussy", fotos: ["img/stvlp.jpg"] }
];

let itensNoCarrinho = [];

// 2. INICIALIZAÇÃO ÚNICA
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

// 3. LÓGICA DE CARRINHO E DESCONTOS (ALGORITMO STÜSSY)
window.adicionarAoCarrinho = function(id, tamanho, quantidade) {
    const produto = produtosLoja.find(p => p.id === id);
    if (!produto) return;

    for (let i = 0; i < quantidade; i++) {
        // Criando instância usando sua classe CartItem (do cart.js)
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
    
    let perc = 0;
    if (qtdStussy >= 2) {
        if (qtdStussy === 2) perc = 16.67;
        else if (qtdStussy === 3) perc = 21.67;
        else perc = 30.00;
    } else if (itensNoCarrinho.length >= 2) {
        perc = 5.00;
    }

    const valorDesc = somaBruta * (perc / 100);
    const totalFinal = somaBruta - valorDesc;

    document.getElementById('preco-bruto').innerText = `R$ ${somaBruta.toFixed(2).replace('.', ',')}`;
    document.getElementById('txt-perc-desc').innerText = perc.toFixed(2);
    document.getElementById('valor-desconto').innerText = `- R$ ${valorDesc.toFixed(2).replace('.', ',')}`;
    document.getElementById('total-carrinho').innerText = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
}

function atualizarCarrinhoVisual() {
    const lista = document.getElementById('carrinho-lista');
    if (!lista) return;

    if (itensNoCarrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">Carrinho vazio.</p>';
        return;
    }

    lista.innerHTML = itensNoCarrinho.map((item, idx) => `
        <div class="carrinho-item" style="display:flex; align-items:center; gap:10px; border-bottom:1px solid #222; padding:10px 0;">
            <img src="${item.img}" style="width:45px; height:45px; object-fit:cover; border-radius:4px;">
            <div style="flex:1; font-size:11px;">
                ${item.name} <br> <span style="color:#DAA520;">Tam: ${item.size}</span>
            </div>
            <button onclick="removerItem(${idx})" style="background:none; border:none; color:#ff4444; cursor:pointer; font-weight:bold;">✕</button>
        </div>
    `).join('');
    calcularTotais();
}

window.removerItem = (idx) => { itensNoCarrinho.splice(idx, 1); atualizarCarrinhoVisual(); };

// 4. INTERFACE E PAINEL
function configurarInterface() {
    const loginWin = document.getElementById('login-window');
    document.addEventListener('click', e => {
        if (e.target.closest('.cart-icon')) loginWin.style.display = 'block';
    });
    document.querySelector('.minimize-btn').onclick = () => loginWin.style.display = 'none';
    
    document.getElementById('form-executa-login').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        document.getElementById('user-name-display').innerText = email.split('@')[0].toUpperCase();
        window.alternarTela('painel');
    };
}

window.alternarTela = (tela) => {
    ['estado-login', 'estado-cadastro', 'estado-painel'].forEach(id => document.getElementById(id).style.display = 'none');
    const alvo = tela === 'painel' ? 'estado-painel' : (tela === 'cadastro' ? 'estado-cadastro' : 'estado-login');
    document.getElementById(alvo).style.display = 'block';
    if(tela === 'painel') atualizarCarrinhoVisual();
};

window.abrirSubPagina = (aba) => {
    ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'].forEach(id => {
        const el = document.getElementById(`aba-${id}`);
        if(el) el.style.display = (id === aba ? 'block' : 'none');
    });
};

function carregarDadosSalvos() {
    const cpf = localStorage.getItem('user_cpf');
    const tel = localStorage.getItem('user_tel');
    if(cpf) document.getElementById('perfil-cpf').value = cpf;
    if(tel) document.getElementById('perfil-tel').value = tel;
}

window.salvarDadosPerfil = () => {
    localStorage.setItem('user_cpf', document.getElementById('perfil-cpf').value);
    localStorage.setItem('user_tel', document.getElementById('perfil-tel').value);
    alert("✅ Dados salvos!");
};
