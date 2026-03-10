// 1. BANCO DE DADOS OFICIAL TZAD (PRODUTOS ORIGINAIS)
const produtosLoja = [
    // --- VITRINE 1: PROMOÇÕES (CONJUNTO BAPE 6X) ---
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },

    // --- VITRINE 2: NOCTA ---
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta" },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta" },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: "450,00", img: "img/nktc.jpg", categoria: "nocta" },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta" },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta" },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta" },

    // --- VITRINE 3: STÜSSY ---
    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy" },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy" },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy" },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy" },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy" },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy" }
];

let itensNoCarrinho = [];

// 2. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    console.log("TZAD Store: Sistema Iniciado.");
    renderizarVitrines();
    configurarInterface();
});

// --- RENDERIZAR OS PRODUTOS ---
function renderizarVitrines() {
    const sessoes = {
        'promocoes': document.getElementById('vitrine-promocoes'),
        'nocta': document.getElementById('vitrine-nocta'),
        'stussy': document.getElementById('vitrine-stussy')
    };

    for (let cat in sessoes) {
        let divDestino = sessoes[cat];
        if (divDestino) {
            const listaProdutos = produtosLoja.filter(p => p.categoria === cat);
            divDestino.innerHTML = listaProdutos.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200?text=TZAD+REPS'">
                    <h4>R$ ${p.price}</h4>
                    <p>${p.name}</p>
                    <button class="btn-comprar" onclick="adicionarAoCarrinho(${p.id})">Adicionar ao carrinho</button>
                </div>
            `).join('');
        }
    }
}

// --- CONTROLE DA JANELA (LOGIN / CADASTRO / PAINEL) ---
function configurarInterface() {
    const loginWindow = document.getElementById('login-window');
    const cartIcon = document.querySelector('.cart-icon');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const formLogin = document.getElementById('form-executa-login');

    // Abrir/Fechar Janela
    if (cartIcon) cartIcon.onclick = () => loginWindow.style.display = 'block';
    if (minimizeBtn) minimizeBtn.onclick = () => loginWindow.style.display = 'none';

    // Lógica do Login
    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            document.getElementById('user-name-display').innerText = email.split('@')[0];
            alternarTela('painel');
            atualizarCarrinhoVisual();
        };
    }

    // Botão Logout
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => alternarTela('login');
    }
}

// --- FUNÇÃO PARA ALTERNAR TELAS (CHAMADA NO HTML) ---
function alternarTela(tela) {
    const login = document.getElementById('estado-login');
    const cadastro = document.getElementById('estado-cadastro');
    const painel = document.getElementById('estado-painel');
    const titulo = document.getElementById('titulo-janela');

    if (!login || !cadastro || !painel) return;

    login.style.display = 'none';
    cadastro.style.display = 'none';
    painel.style.display = 'none';

    if (tela === 'cadastro') {
        cadastro.style.display = 'block';
        titulo.innerText = "CRIAR CONTA";
    } else if (tela === 'login') {
        login.style.display = 'block';
        titulo.innerText = "LOGIN / CARRINHO";
    } else if (tela === 'painel') {
        painel.style.display = 'block';
        titulo.innerText = "MINHA CONTA / CARRINHO";
    }
}

// --- FUNÇÕES GLOBAIS DO CARRINHO ---
window.adicionarAoCarrinho = function(id) {
    const p = produtosLoja.find(item => item.id === id);
    if (p) {
        itensNoCarrinho.push(p);
        alert(`Sucesso! ${p.name} adicionado.`);
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
        lista.innerHTML = '<p style="text-align:center; padding:30px; color:#888; font-size:12px;">Seu carrinho está vazio.</p>';
        if (totalTxt) totalTxt.innerText = "R$ 0,00";
        return;
    }

    lista.innerHTML = itensNoCarrinho.map((item, index) => `
        <div style="display:flex; align-items:center; gap:12px; border-bottom:1px solid #333; padding:10px 0;">
            <img src="${item.img}" style="width:45px; height:45px; border-radius:4px; object-fit:cover;">
            <div style="flex:1;">
                <p style="margin:0; font-size:12px; color:#fff;">${item.name}</p>
                <strong style="color:#DAA520;">R$ ${item.price}</strong>
            </div>
            <button onclick="removerItem(${index})" style="background:none; border:none; color:#ff4444; font-weight:bold; cursor:pointer;">X</button>
        </div>
    `).join('');

    const soma = itensNoCarrinho.reduce((acc, p) => acc + parseFloat(p.price.replace('.', '').replace(',', '.')), 0);
    if (totalTxt) totalTxt.innerText = `R$ ${soma.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

// --- FINALIZAR NO WHATSAPP ---
document.addEventListener('click', function(e) {
    if(e.target && e.target.id == 'btn-finalizar'){
        if(itensNoCarrinho.length === 0) {
            alert("Carrinho vazio!");
            return;
        }
        
        let msg = "Olá TZAD Store! Gostaria de finalizar meu pedido:%0A%0A";
        itensNoCarrinho.forEach(i => msg += `• ${i.name} - R$ ${i.price}%0A`);
        const total = document.getElementById('total-carrinho').innerText;
        msg += `%0A*Total: ${total}*`;
        
        const tel = "5511999999999"; // COLOQUE SEU NUMERO AQUI
        window.open(`https://wa.me/${tel}?text=${msg}`, '_blank');
    }
});
