// ========================================================
// 1. BANCO DE DADOS E ESTADO GLOBAL
// ========================================================
const produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: ["img/cjbl.jpg"] },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta", galeria: [] },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta", galeria: [] },
    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy", galeria: [] },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy", galeria: [] },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy", galeria: [] }
    // Adicione os demais conforme necessário...
];

let itensNoCarrinho = [];

// ========================================================
// 2. INICIALIZAÇÃO E EVENTOS
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    configurarInterface();
});

function configurarInterface() {
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const formLogin = document.getElementById('form-executa-login');
    const btnLogout = document.getElementById('btn-logout');

    // Abre o carrinho ao clicar no ícone da sacola
    document.querySelector('.cart-icon').onclick = (e) => {
        e.preventDefault();
        loginWindow.style.display = 'block';
    };

    if (minimizeBtn) minimizeBtn.onclick = () => loginWindow.style.display = 'none';

    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const nomeUser = email.split('@')[0].toUpperCase();
            document.getElementById('user-name-display').innerText = nomeUser;
            document.getElementById('perfil-nome').innerText = nomeUser;
            document.getElementById('perfil-email').innerText = email;
            alternarTela('painel');
        };
    }

    if (btnLogout) btnLogout.onclick = () => alternarTela('login');
}

// ========================================================
// 3. RENDERIZAÇÃO DA VITRINE
// ========================================================
function renderizarVitrines() {
    const categorias = ['promocoes', 'nocta', 'stussy'];
    categorias.forEach(cat => {
        const elemento = document.getElementById(`vitrine-${cat}`);
        if (elemento) {
            const produtosFiltrados = produtosLoja.filter(p => p.categoria === cat);
            elemento.innerHTML = produtosFiltrados.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>R$ ${p.price}</p>
                    <button class="btn-comprar" onclick="abrirModalZoom(${p.id})">
                        Ver Detalhes
                    </button>
                </div>
            `).join('');
        }
    });
}

// ========================================================
// 4. LÓGICA DO MODAL DE ZOOM (CARROSSEL)
// ========================================================
window.abrirModalZoom = function(id) {
    const p = produtosLoja.find(i => i.id === id);
    if (!p) return;

    const modal = document.getElementById('modal-produto');
    document.getElementById('img-principal-zoom').src = p.img;
    document.getElementById('zoom-nome-produto').innerText = p.name;

    // Se não houver galeria, cria 6 slots com a imagem principal para o carrossel não quebrar
    let fotos = (p.galeria && p.galeria.length > 0) ? p.galeria : Array(6).fill(p.img);
    
    document.getElementById('miniaturas-container').innerHTML = fotos.map((f, i) => `
        <img src="${f}" class="thumb-item ${i === 0 ? 'thumb-active' : ''}" 
             onclick="trocarImagemZoom('${f}', this)">
    `).join('');

    // Configura o botão de adicionar dentro do modal
    document.getElementById('btn-add-zoom').onclick = () => {
        const tam = document.getElementById('zoom-tamanho').value;
        itensNoCarrinho.push({ ...p, size: tam });
        
        fecharModalZoom();
        
        // Abre o carrinho automaticamente para mostrar o item
        document.getElementById('login-window').style.display = 'block';
        abrirSubPagina('carrinho');
        atualizarCarrinhoVisual();
    };

    modal.style.display = 'flex';
};

window.fecharModalZoom = () => {
    document.getElementById('modal-produto').style.display = 'none';
};

window.trocarImagemZoom = (src, el) => {
    document.getElementById('img-principal-zoom').src = src;
    document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('thumb-active'));
    el.classList.add('thumb-active');
};

// ========================================================
// 5. NAVEGAÇÃO INTERNA (TELAS E ABAS)
// ========================================================
window.alternarTela = function(tela) {
    ['estado-login', 'estado-cadastro', 'estado-painel'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });
    const ativa = document.getElementById(`estado-${tela}`);
    if(ativa) {
        ativa.style.display = 'block';
        if(tela === 'painel') {
            abrirSubPagina('carrinho');
        }
    }
};

window.abrirSubPagina = function(abaId) {
    const abas = ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'];
    abas.forEach(aba => {
        const el = document.getElementById(`aba-${aba}`);
        if(el) el.style.display = (aba === abaId) ? 'block' : 'none';
    });
    
    // O menu de botões do painel só aparece na aba carrinho
    const menu = document.getElementById('menu-navegacao-painel');
    if(menu) menu.style.display = (abaId === 'carrinho') ? 'grid' : 'none';
    
    if(abaId === 'carrinho') atualizarCarrinhoVisual();
};

// ========================================================
// 6. GESTÃO DO CARRINHO E PREÇOS
// ========================================================
function atualizarCarrinhoVisual() {
    const lista = document.getElementById('carrinho-lista');
    if (!lista) return;

    if (itensNoCarrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding:20px; color:#555;">Seu carrinho está vazio.</p>';
        atualizarTotais(0, 0);
        return;
    }

    lista.innerHTML = itensNoCarrinho.map((item, index) => `
        <div style="display:flex; align-items:center; gap:10px; border-bottom:1px solid #222; padding:10px 0;">
            <img src="${item.img}" style="width:45px; height:45px; border-radius:4px; object-fit:cover;">
            <div style="flex:1;">
                <p style="font-size:12px; margin:0;">${item.name}</p>
                <small style="color:#888;">Tam: ${item.size}</small><br>
                <strong style="color:#DAA520;">R$ ${item.price}</strong>
            </div>
            <button onclick="removerItem(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer; font-weight:bold;">✕</button>
        </div>
    `).join('');

    calcularValores();
}

function calcularValores() {
    const somaBruta = itensNoCarrinho.reduce((acc, p) => acc + parseFloat(p.price.replace('.', '').replace(',', '.')), 0);
    
    // Lógica de Descontos
    let qtdStussy = itensNoCarrinho.filter(item => item.name.includes("Stüssy") || item.name.includes("STÜSSY")).length;
    let perc = (itensNoCarrinho.length >= 2) ? 5 : 0;
    
    // Descontos Progressivos Stüssy
    if (qtdStussy === 2) perc = 16.67;
    else if (qtdStussy === 3) perc = 21.67;
    else if (qtdStussy === 4) perc = 28.33;
    else if (qtdStussy >= 5) perc = 30.00;

    const valorDesc = somaBruta * (perc / 100);
    atualizarTotais(somaBruta, valorDesc, perc);
}

function atualizarTotais(bruto, desconto, perc) {
    document.getElementById('preco-bruto').innerText = `R$ ${bruto.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
    document.getElementById('txt-perc-desc').innerText = perc.toFixed(2);
    document.getElementById('valor-desconto').innerText = `- R$ ${desconto.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
    document.getElementById('total-carrinho').innerText = `R$ ${(bruto - desconto).toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
}

window.removerItem = function(index) {
    itensNoCarrinho.splice(index, 1);
    atualizarCarrinhoVisual();
};

// ========================================================
// 7. UTILITÁRIOS (MÁSCARAS E PERFIL)
// ========================================================
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
    alert("Dados do perfil atualizados com sucesso! ✓");
};

window.toggleDetalhes = (id) => {
    const el = document.getElementById(`detalhe-compra-${id}`);
    const btn = document.getElementById(`btn-ver-${id}`);
    if(el.style.display === 'none') {
        el.style.display = 'block';
        btn.innerText = '[ ver menos ]';
    } else {
        el.style.display = 'none';
        btn.innerText = '[ ver mais ]';
    }
};
