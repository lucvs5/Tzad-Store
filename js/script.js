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
    console.log("TZAD Store: Carregando sistema...");
    renderizarVitrines();
    configurarInterface();
});

// --- RENDERIZAR OS PRODUTOS NAS 3 SEÇÕES ---
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

// --- CONFIGURAÇÃO DA JANELA DE LOGIN E CARRINHO ---
function configurarInterface() {
    const loginWindow = document.getElementById('login-window');
    const cartIcon = document.querySelector('.cart-icon');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const formLogin = document.getElementById('form-executa-login');

    // Abrir/Fechar
    if (cartIcon) cartIcon.onclick = () => loginWindow.style.display = 'block';
    if (minimizeBtn) minimizeBtn.onclick = () => loginWindow.style.display = 'none';

    // Lógica do Login (Muda da tela de E-mail para o Carrinho)
    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            
            // Esconde o formulário de login
            document.getElementById('estado-login').style.display = 'none';
            
            // Mostra o painel do carrinho
            const painel = document.getElementById('estado-painel');
            painel.style.display = 'block';
            
            // Força o título e cores para evitar "tela preta"
            document.getElementById('titulo-janela').innerText = "MINHA CONTA / CARRINHO";
            painel.style.color = "#ffffff";
            
            atualizarCarrinhoVisual();
        };
    }

    // Logout
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            document.getElementById('estado-painel').style.display = 'none';
            document.getElementById('estado-login').style.display = 'block';
            document.getElementById('titulo-janela').innerText = "LOGIN / CARRINHO";
        };
    }
}

// --- FUNÇÕES GLOBAIS DO CARRINHO ---
window.adicionarAoCarrinho = function(id) {
    const p = produtosLoja.find(item => item.id === id);
    if (p) {
        itensNoCarrinho.push(p);
        alert(`Sucesso! ${p.name} foi para o seu carrinho.`);
        
        // Abre o carrinho e já pula para o painel se necessário
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
        lista.innerHTML = '<p style="text-align:center; padding:30px; color:#888;">Seu carrinho está vazio.</p>';
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
            <button onclick="removerItem(${index})" style="background:none; border:none; color:#ff4444; font-weight:bold; cursor:pointer; padding:5px;">X</button>
        </div>
    `).join('');

    // Cálculo do Total
    const soma = itensNoCarrinho.reduce((acc, p) => {
        let valor = parseFloat(p.price.replace('.', '').replace(',', '.'));
        return acc + valor;
    }, 0);
    
    if (totalTxt) {
        totalTxt.innerText = `R$ ${soma.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    }
                                        }
