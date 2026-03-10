// 1. BANCO DE DADOS DA LOJA
const produtosLoja = [
    { id: 1, name: "Camiseta Nocta Gold", price: "189,90", img: "img/produto1.png" },
    { id: 2, name: "Shorts Stüssy Black", price: "159,00", img: "img/produto2.png" },
    { id: 3, name: "Nike Air Force 1 Rep", price: "349,00", img: "img/produto3.png" },
    { id: 4, name: "Moletom Essential", price: "220,00", img: "img/produto4.png" }
];

let itensNoCarrinho = []; 

// 2. INICIALIZAÇÃO DO SISTEMA
document.addEventListener('DOMContentLoaded', () => {
    console.log("TZAD Store: Sistema Carregado.");

    // Elementos de Interface
    const loginWindow = document.getElementById('login-window');
    const cartIcon = document.querySelector('.cart-icon');
    const minimizeBtn = document.querySelector('.minimize-btn');
    
    const estadoLogin = document.getElementById('estado-login');
    const estadoCadastro = document.getElementById('estado-cadastro');
    const estadoPainel = document.getElementById('estado-painel');
    const tituloJanela = document.getElementById('titulo-janela');

    // --- CONTROLE DE JANELAS ---
    if (cartIcon) cartIcon.onclick = () => loginWindow.style.display = 'block';
    if (minimizeBtn) minimizeBtn.onclick = () => loginWindow.style.display = 'none';

    // --- LOGICA DE LOGIN (CORREÇÃO DO TRAVAMENTO) ---
    const formLogin = document.getElementById('form-executa-login');
    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault(); // Impede o refresh da página
            const email = document.getElementById('login-email').value;
            const nomeUser = email.split('@')[0];

            // Troca de tela: sai login, entra painel
            estadoLogin.style.display = 'none';
            estadoPainel.style.display = 'block';
            tituloJanela.innerText = "MINHA CONTA";
            
            const displayNome = document.getElementById('user-name-display');
            if (displayNome) displayNome.innerText = nomeUser;
            
            console.log("Login efetuado!");
        };
    }

    // --- NAVEGAÇÃO ENTRE LOGIN E CADASTRO ---
    const btnIrCadastro = document.getElementById('btn-ir-cadastro');
    const btnIrLogin = document.getElementById('btn-ir-login');

    if (btnIrCadastro) {
        btnIrCadastro.onclick = () => {
            estadoLogin.style.display = 'none';
            estadoCadastro.style.display = 'block';
            tituloJanela.innerText = "CRIAR CONTA";
        };
    }

    if (btnIrLogin) {
        btnIrLogin.onclick = () => {
            estadoCadastro.style.display = 'none';
            estadoLogin.style.display = 'block';
            tituloJanela.innerText = "LOGIN";
        };
    }

    // --- LOGOUT ---
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            estadoPainel.style.display = 'none';
            estadoLogin.style.display = 'block';
            tituloJanela.innerText = "LOGIN / CARRINHO";
        };
    }

    // --- RENDERIZAR VITRINE ---
    const vitrine = document.getElementById('vitrine-promocoes');
    if (vitrine) {
        vitrine.innerHTML = produtosLoja.map(p => `
            <div class="produto">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150'">
                <h3>${p.name}</h3>
                <p>R$ ${p.price}</p>
                <button class="btn-comprar" onclick="window.abrirDetalhes(${p.id})">COMPRAR</button>
            </div>
        `).join('');
    }
});

// 3. FUNÇÕES GLOBAIS (ACESSO VIA ONCLICK NO HTML)

window.abrirDetalhes = function(id) {
    const produto = produtosLoja.find(p => p.id === id);
    if (!produto) return;

    const modal = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');

    modalContent.innerHTML = `
        <button class="close-modal" onclick="window.fecharDetalhes()">X</button>
        <div style="text-align: center; color: white;">
            <img src="${produto.img}" style="width: 100%; max-width: 180px; border-radius: 8px; margin-bottom: 10px;">
            <h3 style="color: #DAA520;">${produto.name}</h3>
            <p style="font-weight: bold; margin-bottom: 15px;">R$ ${produto.price}</p>
            
            <label style="display:block; font-size: 11px; color:#aaa; margin-bottom: 5px;">TAMANHO:</label>
            <select id="select-tamanho" style="width: 100%; padding: 10px; background: #000; color: #fff; border: 1px solid #DAA520; margin-bottom: 20px;">
                <option value="P">P</option>
                <option value="M" selected>M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
            </select>

            <button class="login-button" onclick="window.confirmarCompra(${produto.id})" style="background: #28a745;">
                CONFIRMAR ITEM
            </button>
        </div>
    `;
    modal.style.display = 'flex';
};

window.fecharDetalhes = function() {
    document.querySelector('.modal-overlay').style.display = 'none';
};

window.confirmarCompra = function(id) {
    const produto = produtosLoja.find(p => p.id === id);
    const select = document.getElementById('select-tamanho');
    const tamanho = select ? select.value : 'M';

    if (produto) {
        itensNoCarrinho.push({ ...produto, tamanho: tamanho });
        
        window.fecharDetalhes();
        window.atualizarCarrinhoVisual();
        
        // Abre o painel automaticamente após adicionar
        document.getElementById('login-window').style.display = 'block';
        document.getElementById('estado-login').style.display = 'none';
        document.getElementById('estado-painel').style.display = 'block';
        document.getElementById('titulo-janela').innerText = "MEU CARRINHO";
    }
};

window.atualizarCarrinhoVisual = function() {
    const listaHtml = document.getElementById('carrinho-lista');
    const totalHtml = document.getElementById('total-carrinho');

    if (!listaHtml) return;

    if (itensNoCarrinho.length === 0) {
        listaHtml.innerHTML = '<p style="text-align:center; color:#666; padding:20px;">Seu carrinho está vazio.</p>';
        if (totalHtml) totalHtml.innerText = "R$ 0,00";
        return;
    }

    // Desenha os itens
    listaHtml.innerHTML = itensNoCarrinho.map((item, index) => `
        <div class="item-carrinho-demo" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; border-bottom: 1px solid #222; padding-bottom: 10px;">
            <img src="${item.img}" style="width: 45px; height: 45px; border-radius: 4px; object-fit: cover;">
            <div class="item-info" style="flex: 1;">
                <div style="font-size: 13px; color: #fff;">${item.name} <span style="color: #DAA520;">(${item.tamanho})</span></div>
                <div style="font-weight: bold; font-size: 14px; color: #fff;">R$ ${item.price}</div>
            </div>
            <button onclick="window.removerItem(${index})" style="background: none; border: none; color: #ff4444; font-weight: bold; cursor: pointer;">X</button>
        </div>
    `).join('');

    // Cálculo do Total
    const soma = itensNoCarrinho.reduce((acc, item) => acc + parseFloat(item.price.replace(',', '.')), 0);
    if (totalHtml) totalHtml.innerText = `R$ ${soma.toFixed(2).replace('.', ',')}`;
};

window.removerItem = function(index) {
    itensNoCarrinho.splice(index, 1);
    window.atualizarCarrinhoVisual();
};
