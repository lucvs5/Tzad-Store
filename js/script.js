// 1. BANCO DE DADOS OFICIAL TZAD
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

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa as vitrines
    renderizarVitrines();

    // Lógica de Login e Painel
    const formLogin = document.getElementById('form-executa-login');
    const loginWindow = document.getElementById('login-window');
    
    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            document.getElementById('estado-login').style.display = 'none';
            const painel = document.getElementById('estado-painel');
            painel.style.display = 'block';
            
            // Forçar cores para evitar o "fundo preto" sem texto
            painel.style.background = "#0c0c0c";
            painel.style.color = "#ffffff";
            
            document.getElementById('titulo-janela').innerText = "MINHA CONTA / CARRINHO";
            window.atualizarCarrinhoVisual();
        };
    }

    // Abrir/Fechar Janela
    const cartIcon = document.querySelector('.cart-icon');
    const minimizeBtn = document.querySelector('.minimize-btn');
    if (cartIcon) cartIcon.onclick = () => loginWindow.style.display = 'block';
    if (minimizeBtn) minimizeBtn.onclick = () => loginWindow.style.display = 'none';
});

function renderizarVitrines() {
    const sessoes = {
        'promocoes': document.getElementById('vitrine-promocoes'),
        'nocta': document.getElementById('vitrine-nocta'),
        'stussy': document.getElementById('vitrine-stussy')
    };

    for (let cat in sessoes) {
        if (sessoes[cat]) {
            const produtosFiltrados = produtosLoja.filter(p => p.categoria === cat);
            sessoes[cat].innerHTML = produtosFiltrados.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}">
                    <h4>R$ ${p.price}</h4>
                    <p>${p.name}</p>
                    <button onclick="window.abrirDetalhes(${p.id})">Adicionar ao carrinho</button>
                </div>
            `).join('');
        }
    }
}

// --- FUNÇÕES GLOBAIS ---

window.abrirDetalhes = function(id) {
    const produto = produtosLoja.find(p => p.id === id);
    const modal = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');

    if (!produto || !modal) return;

    modalContent.innerHTML = `
        <button class="close-modal" onclick="window.fecharDetalhes()">X</button>
        <div style="text-align: center; color: white;">
            <img src="${produto.img}" style="width: 100%; max-width: 180px; border-radius: 8px;">
            <h3 style="color: #DAA520; margin: 15px 0;">${produto.name}</h3>
            <p style="font-size: 1.2rem;">R$ ${produto.price}</p>
            <label style="display:block; margin-top:10px;">TAMANHO:</label>
            <select id="select-tamanho" style="width: 100%; padding: 10px; margin-top: 5px; background: #000; color: #fff; border: 1px solid #DAA520;">
                <option value="P">P</option>
                <option value="M" selected>M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
            </select>
            <button class="login-button" onclick="window.confirmarCompra(${produto.id})" style="background:#28a745; margin-top:20px;">CONFIRMAR</button>
        </div>
    `;
    modal.style.display = 'flex';
};

window.fecharDetalhes = function() {
    document.querySelector('.modal-overlay').style.display = 'none';
};

window.confirmarCompra = function(id) {
    const produto = produtosLoja.find(p => p.id === id);
    const tam = document.getElementById('select-tamanho').value;
    if (produto) {
        itensNoCarrinho.push({ ...produto, tamanho: tam });
        window.fecharDetalhes();
        window.atualizarCarrinhoVisual();
        
        // Abre o painel e garante que não fique preto
        document.getElementById('login-window').style.display = 'block';
        document.getElementById('estado-login').style.display = 'none';
        document.getElementById('estado-painel').style.display = 'block';
    }
};

window.atualizarCarrinhoVisual = function() {
    const lista = document.getElementById('carrinho-lista');
    const totalElement = document.getElementById('total-carrinho');
    if (!lista) return;

    if (itensNoCarrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:#888; padding:20px;">Carrinho vazio.</p>';
        if (totalElement) totalElement.innerText = "R$ 0,00";
        return;
    }

    lista.innerHTML = itensNoCarrinho.map((item, index) => `
        <div class="item-carrinho-demo" style="display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #222;">
            <img src="${item.img}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;">
            <div style="flex:1; color:#fff;">
                <p style="margin:0; font-size:12px;">${item.name} (${item.tamanho})</p>
                <strong style="color:#DAA520;">R$ ${item.price}</strong>
            </div>
            <button onclick="window.removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">X</button>
        </div>
    `).join('');

    const soma = itensNoCarrinho.reduce((acc, item) => acc + parseFloat(item.price.replace('.', '').replace(',', '.')), 0);
    if (totalElement) totalElement.innerText = `R$ ${soma.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
};

window.removerItem = function(index) {
    itensNoCarrinho.splice(index, 1);
    window.atualizarCarrinhoVisual();
};
