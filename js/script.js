// 1. BANCO DE DADOS (Seus produtos reais)
const produtosLoja = [
    // PROMOÇÕES
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },

    // NOCTA
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta" },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta" },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: "450,00", img: "img/nktc.jpg", categoria: "nocta" },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta" },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta" },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta" },

    // STÜSSY
    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy" },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy" },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy" },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy" },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy" },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy" }
];

let carrinho = [];

// 2. INICIALIZAÇÃO AO CARREGAR A PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    configurarEventos();
});

function renderizarVitrines() {
    const ids = {
        'promocoes': document.getElementById('vitrine-promocoes'),
        'nocta': document.getElementById('vitrine-nocta'),
        'stussy': document.getElementById('vitrine-stussy')
    };

    for (const [cat, elemento] of Object.entries(ids)) {
        if (elemento) {
            const produtos = produtosLoja.filter(p => p.categoria === cat);
            elemento.innerHTML = produtos.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150'">
                    <h4>R$ ${p.price}</h4>
                    <p>${p.name}</p>
                    <button onclick="adicionarAoCarrinho(${p.id})">Adicionar ao carrinho</button>
                </div>
            `).join('');
        }
    }
}

function configurarEventos() {
    const loginWindow = document.getElementById('login-window');
    const formLogin = document.getElementById('form-executa-login');
    
    // Abrir/Fechar Janela
    document.querySelector('.cart-icon').onclick = () => loginWindow.style.display = 'block';
    document.querySelector('.minimize-btn').onclick = () => loginWindow.style.display = 'none';

    // Login (Troca de estado)
    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            document.getElementById('estado-login').style.display = 'none';
            document.getElementById('estado-painel').style.display = 'block';
            document.getElementById('titulo-janela').innerText = "MEU CARRINHO";
            atualizarCarrinhoVisual();
        };
    }

    // Botão de Logout
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            document.getElementById('estado-painel').style.display = 'none';
            document.getElementById('estado-login').style.display = 'block';
            document.getElementById('titulo-janela').innerText = "LOGIN / CARRINHO";
        };
    }
}

// 3. FUNÇÕES DO CARRINHO (GLOBAIS)
window.adicionarAoCarrinho = function(id) {
    const p = produtosLoja.find(item => item.id === id);
    if (p) {
        carrinho.push(p);
        alert(`${p.name} adicionado!`);
        atualizarCarrinhoVisual();
        document.getElementById('login-window').style.display = 'block';
    }
};

window.removerItem = function(index) {
    carrinho.splice(index, 1);
    atualizarCarrinhoVisual();
};

function atualizarCarrinhoVisual() {
    const lista = document.getElementById('carrinho-lista');
    const totalTxt = document.getElementById('total-carrinho');
    
    if (!lista) return;

    if (carrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding:20px; color:#999;">Vazio.</p>';
        if (totalTxt) totalTxt.innerText = "R$ 0,00";
        return;
    }

    lista.innerHTML = carrinho.map((p, i) => `
        <div style="display:flex; align-items:center; gap:10px; border-bottom:1px solid #222; padding:10px 0;">
            <img src="${p.img}" style="width:40px; border-radius:4px;">
            <div style="flex:1; color:white; font-size:12px;">
                ${p.name}<br><strong>R$ ${p.price}</strong>
            </div>
            <button onclick="removerItem(${i})" style="color:red; background:none; border:none;">X</button>
        </div>
    `).join('');

    const soma = carrinho.reduce((acc, p) => acc + parseFloat(p.price.replace(',', '.')), 0);
    if (totalTxt) totalTxt.innerText = `R$ ${soma.toFixed(2).replace('.', ',')}`;
                                              }
