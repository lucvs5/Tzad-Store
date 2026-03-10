// 1. BANCO DE DADOS
const produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },

    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta" },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta" },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: "450,00", img: "img/nktc.jpg", categoria: "nocta" },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta" },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta" },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta" },

    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy" },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy" },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy" },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy" },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy" },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy" }
];

let itensNoCarrinho = [];

// 2. INICIALIZAÇÃO SEGURA
window.onload = () => {
    console.log("TZAD: Iniciando...");
    renderizarVitrines();
    configurarInterface();
};

// 3. RENDERIZAR VITRINES (Proteção contra IDs errados)
function renderizarVitrines() {
    const categorias = ['promocoes', 'nocta', 'stussy'];
    
    categorias.forEach(cat => {
        const container = document.getElementById(`vitrine-${cat}`);
        if (container) {
            const produtos = produtosLoja.filter(p => p.categoria === cat);
            container.innerHTML = produtos.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200'">
                    <h4>R$ ${p.price}</h4>
                    <p>${p.name}</p>
                    <button class="btn-comprar" onclick="adicionarAoCarrinho(${p.id})">Adicionar ao carrinho</button>
                </div>
            `).join('');
        } else {
            console.error(`Aviso: Container 'vitrine-${cat}' não encontrado no HTML.`);
        }
    });
}

// 4. INTERFACE (Abrir/Fechar/Login)
function configurarInterface() {
    const loginWindow = document.getElementById('login-window');
    const cartIcon = document.querySelector('.cart-icon');
    const minimizeBtn = document.querySelector('.minimize-btn');

    // Forçar abertura ao clicar no ícone do carrinho
    if (cartIcon) {
        cartIcon.onclick = (e) => {
            e.preventDefault();
            loginWindow.style.display = 'block';
        };
    }

    if (minimizeBtn) {
        minimizeBtn.onclick = () => loginWindow.style.display = 'none';
    }

    // Formulário de Login
    const formLogin = document.getElementById('form-executa-login');
    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            alternarTela('painel');
        };
    }
}

// 5. ALTERNAR TELAS (Login / Cadastro / Painel)
window.alternarTela = function(tela) {
    const login = document.getElementById('estado-login');
    const cadastro = document.getElementById('estado-cadastro');
    const painel = document.getElementById('estado-painel');
    const titulo = document.getElementById('titulo-janela');

    if (login) login.style.display = 'none';
    if (cadastro) cadastro.style.display = 'none';
    if (painel) painel.style.display = 'none';

    if (tela === 'cadastro' && cadastro) {
        cadastro.style.display = 'block';
        titulo.innerText = "CRIAR CONTA";
    } else if (tela === 'login' && login) {
        login.style.display = 'block';
        titulo.innerText = "LOGIN / CARRINHO";
    } else if (tela === 'painel' && painel) {
        painel.style.display = 'block';
        titulo.innerText = "MEU CARRINHO";
        atualizarCarrinhoVisual();
    }
};

// 6. CARRINHO
window.adicionarAoCarrinho = function(id) {
    const p = produtosLoja.find(item => item.id === id);
    if (p) {
        itensNoCarrinho.push(p);
        alert(`${p.name} adicionado!`);
        document.getElementById('login-window').style.display = 'block';
        atualizarCarrinhoVisual();
    }
};

window.removerItem = function(index) {
    itensNoCarrinho.splice(index, 1);
    atualizarCarrinhoVisual();
};

function atualizarCarrinhoVisual() {
    const lista = document.getElementById('carrinho-lista');
    const totalTxt = document.getElementById('total-carrinho');
    if (!lista) return;

    if (itensNoCarrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Vazio.</p>';
        if (totalTxt) totalTxt.innerText = "R$ 0,00";
        return;
    }

    lista.innerHTML = itensNoCarrinho.map((item, index) => `
        <div style="display:flex; align-items:center; gap:10px; border-bottom:1px solid #333; padding:10px 0;">
            <img src="${item.img}" style="width:40px;">
            <div style="flex:1; font-size:12px; color:white;">
                ${item.name}<br><strong style="color:#DAA520;">R$ ${item.price}</strong>
            </div>
            <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">X</button>
        </div>
    `).join('');

    const soma = itensNoCarrinho.reduce((acc, p) => acc + parseFloat(p.price.replace(',', '.')), 0);
    if (totalTxt) totalTxt.innerText = `R$ ${soma.toFixed(2).replace('.', ',')}`;
}
