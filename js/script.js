// 1. BANCO DE DADOS
const produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: ["img/cjbl.jpg"] },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta", galeria: [] },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta", galeria: [] },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: "450,00", img: "img/nktc.jpg", categoria: "nocta", galeria: [] },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta", galeria: [] },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta", galeria: [] },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta", galeria: [] },
    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy", galeria: [] },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy", galeria: [] },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy", galeria: [] },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy", galeria: [] },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy", galeria: [] },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy", galeria: [] }
];

let itensNoCarrinho = [];
let meusEnderecos = [];

// 2. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    configurarInterface();
});

// 3. RENDERIZAR VITRINES
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
                    <button class="btn-comprar" onclick="abrirModalZoom(${p.id})">
                        Ver Detalhes
                    </button>
                </div>
            `).join('');
        }
    });
}

// 4. INTERFACE E CARRINHO
function configurarInterface() {
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const formLogin = document.getElementById('form-executa-login');
    const btnLogout = document.getElementById('btn-logout');

    document.addEventListener('click', (e) => {
        if (e.target.closest('.cart-icon')) {
            e.preventDefault();
            if (loginWindow) loginWindow.style.display = 'block';
        }
    });

    if (minimizeBtn && loginWindow) {
        minimizeBtn.onclick = () => loginWindow.style.display = 'none';
    }

    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const nomeUser = email.split('@')[0].toUpperCase();
            document.getElementById('user-name-display').innerText = nomeUser;
            alternarTela('painel');
        };
    }

    if (btnLogout) {
        btnLogout.onclick = () => alternarTela('login');
    }
}

// 5. TELAS E NAVEGAÇÃO
window.alternarTela = function(tela) {
    ['estado-login', 'estado-cadastro', 'estado-painel'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });
    const ativa = document.getElementById(`estado-${tela}`);
    if(ativa) ativa.style.display = 'block';
    if(tela === 'painel') atualizarCarrinhoVisual();
};

window.abrirSubPagina = function(abaId) {
    ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'].forEach(aba => {
        const el = document.getElementById(`aba-${aba}`);
        if(el) el.style.display = (aba === abaId) ? 'block' : 'none';
    });
    const menu = document.getElementById('menu-navegacao-painel');
    if(menu) menu.style.display = (abaId === 'carrinho') ? 'grid' : 'none';
};

// 6. LÓGICA DO CARRINHO (COM CÁLCULO DE DESCONTO)
function atualizarCarrinhoVisual() {
    const lista = document.getElementById('carrinho-lista');
    const precoBrutoTxt = document.getElementById('preco-bruto');
    const valorDescTxt = document.getElementById('valor-desconto');
    const percDescTxt = document.getElementById('txt-perc-desc');
    const totalTxt = document.getElementById('total-carrinho');
    
    if (!lista) return;

    if (itensNoCarrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Vazio</p>';
        [precoBrutoTxt, valorDescTxt, totalTxt].forEach(t => { if(t) t.innerText = "R$ 0,00"; });
        return;
    }

    lista.innerHTML = itensNoCarrinho.map((item, index) => `
        <div style="display:flex; align-items:center; gap:10px; border-bottom:1px solid #333; padding:10px 0;">
            <img src="${item.img}" style="width:40px; height:40px; border-radius:4px;">
            <div style="flex:1; color:white; font-size:11px;">
                ${item.name} <span style="color:#888;">(${item.size})</span><br>
                <strong style="color:#DAA520;">R$ ${item.price}</strong>
            </div>
            <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">X</button>
        </div>
    `).join('');

    const somaBruta = itensNoCarrinho.reduce((acc, p) => acc + parseFloat(p.price.replace(/\./g, '').replace(',', '.')), 0);
    let qtdStussy = itensNoCarrinho.filter(item => item.name.includes("Stüssy")).length;
    let perc = (itensNoCarrinho.length >= 2) ? 5 : 0;
    if (qtdStussy === 2) perc = 16.67;
    else if (qtdStussy === 3) perc = 21.67;
    else if (qtdStussy === 4) perc = 28.33;
    else if (qtdStussy >= 5) perc = 30.00;

    const desc = somaBruta * (perc / 100);
    if(precoBrutoTxt) precoBrutoTxt.innerText = `R$ ${somaBruta.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
    if(percDescTxt) percDescTxt.innerText = perc.toFixed(2);
    if(valorDescTxt) valorDescTxt.innerText = `- R$ ${desc.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
    if(totalTxt) totalTxt.innerText = `R$ ${(somaBruta - desc).toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
}

window.removerItem = function(index) {
    itensNoCarrinho.splice(index, 1);
    atualizarCarrinhoVisual();
};

// 7. MODAL DE ZOOM PROFISSIONAL
window.abrirModalZoom = function(id) {
    const p = produtosLoja.find(i => i.id === id);
    if (!p) return;
    const modal = document.getElementById('modal-produto');
    document.getElementById('img-principal-zoom').src = p.img;
    document.getElementById('zoom-nome-produto').innerText = p.name;

    let fotos = (p.galeria && p.galeria.length > 0) ? p.galeria : Array(6).fill(p.img);
    document.getElementById('miniaturas-container').innerHTML = fotos.map((f, i) => `
        <img src="${f}" class="thumb-item ${i===0?'thumb-active':''}" onclick="trocarImagemZoom('${f}', this)">
    `).join('');

    document.getElementById('btn-add-zoom').onclick = () => {
        const tam = document.getElementById('zoom-tamanho').value;
        itensNoCarrinho.push({ ...p, size: tam });
        fecharModalZoom();
        document.getElementById('login-window').style.display = 'block';
        abrirSubPagina('carrinho');
        atualizarCarrinhoVisual();
    };
    modal.style.display = 'flex';
};

window.fecharModalZoom = () => { document.getElementById('modal-produto').style.display = 'none'; };
window.trocarImagemZoom = (src, el) => {
    document.getElementById('img-principal-zoom').src = src;
    document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('thumb-active'));
    el.classList.add('thumb-active');
};

// 8. MÁSCARAS E DADOS DO PERFIL
window.mascaraCPF = i => {
    let v = i.value.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
};
window.mascaraTel = i => {
    let v = i.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    i.value = v;
};
window.salvarDadosPerfil = () => {
    alert("Dados salvos com sucesso! ✓");
};
