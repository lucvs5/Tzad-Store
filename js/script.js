// --- DADOS GLOBAIS ---
let itensNoCarrinho = []; 
const produtosLoja = [
    { id: 1, name: "Camiseta Nocta Gold", price: "189,90", img: "img/produto1.png" },
    { id: 2, name: "Shorts Stüssy Black", price: "159,00", img: "img/produto2.png" },
    { id: 3, name: "Nike Air Force 1 Rep", price: "349,00", img: "img/produto3.png" },
    { id: 4, name: "Moletom Essential", price: "220,00", img: "img/produto4.png" }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELETORES PRINCIPAIS ---
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    
    const estadoLogin = document.getElementById('estado-login');
    const estadoCadastro = document.getElementById('estado-cadastro');
    const estadoPainel = document.getElementById('estado-painel');
    const tituloJanela = document.getElementById('titulo-janela');

    // --- 2. CONTROLE DE ABERTURA/FECHAMENTO ---
    if (cartIcon && loginWindow) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            loginWindow.style.display = 'block';
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none';
        });
    }

    // --- 3. NAVEGAÇÃO ENTRE TELAS (LOGIN / CADASTRO) ---
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
            tituloJanela.innerText = "LOGIN / CARRINHO";
        };
    }

    // --- 4. LÓGICA DE LOGIN (ENTRAR NO PAINEL) ---
    const formLogin = document.getElementById('form-executa-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            estadoLogin.style.display = 'none';
            estadoCadastro.style.display = 'none';
            estadoPainel.style.display = 'block';
            tituloJanela.innerText = "MINHA CONTA";
            document.getElementById('user-name-display').innerText = "João";
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            estadoPainel.style.display = 'none';
            estadoLogin.style.display = 'block';
            tituloJanela.innerText = "LOGIN / CARRINHO";
        };
    }

    // --- 5. GERENCIAMENTO DE PRODUTOS (VITRINE) ---
    function renderizarVitrine(lista, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = lista.map(p => `
            <div class="produto">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>R$ ${p.price}</p>
                <button class="btn-comprar" onclick="window.abrirDetalhes(${p.id})">
                    Comprar
                </button>
            </div>
        `).join('');
    }

    renderizarVitrine(produtosLoja, 'vitrine-promocoes');
});

// --- 6. FUNÇÕES DO MODAL (ESCOLHER TAMANHO) ---
window.abrirDetalhes = function(produtoId) {
    // Busca garantindo que o ID seja tratado como número
    const produto = produtosLoja.find(p => Number(p.id) === Number(produtoId));
    
    if (!produto) {
        console.error("Produto não encontrado!");
        return;
    }

    const modal = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');

    if (modal && modalContent) {
        modalContent.innerHTML = `
            <button class="close-modal" onclick="window.fecharDetalhes()">X</button>
            <div style="text-align: center;">
                <img src="${produto.img}" style="width: 100%; max-width: 220px; border-radius: 10px; margin-bottom: 15px; border: 1px solid #333;">
                <h3 style="color: #DAA520; margin-bottom: 5px; font-family: serif;">${produto.name}</h3>
                <p style="font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #fff;">R$ ${produto.price}</p>
                
                <label style="display: block; text-align: left; font-size: 13px; margin-bottom: 8px; color: #888; text-transform: uppercase;">Selecione o Tamanho:</label>
                <select id="select-tamanho" style="width: 100%; padding: 12px; margin-bottom: 20px; background: #000; color: #fff; border: 1px solid #DAA520; border-radius: 5px; font-size: 16px; outline: none;">
                    <option value="P">Tamanho P</option>
                    <option value="M" selected>Tamanho M</option>
                    <option value="G">Tamanho G</option>
                    <option value="GG">Tamanho GG</option>
                </select>

                <button class="login-button" onclick="window.confirmarCompra(${produto.id})" style="background: #28a745; color: white; font-weight: bold;">
                    ADICIONAR AO CARRINHO
                </button>
            </div>
        `;
        modal.style.display = 'flex';
    }
};

window.fecharDetalhes = function() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.style.display = 'none';
};

// --- 7. FINALIZAR COMPRA E ENVIAR AO CARRINHO ---
window.confirmarCompra = function(produtoId) {
    const produto = produtosLoja.find(p => Number(p.id) === Number(produtoId));
    const selectTamanho = document.getElementById('select-tamanho');
    const tamanhoEscolhido = selectTamanho ? selectTamanho.value : 'M';

    if (produto) {
        // Adiciona ao array global com o tamanho
        itensNoCarrinho.push({
            ...produto,
            tamanho: tamanhoEscolhido
        });

        // 1. Fecha o modal de escolha
        window.fecharDetalhes(); 
        
        // 2. Atualiza a lista visual do carrinho lateral
        atualizarCarrinhoVisual(); 
        
        // 3. Força a abertura do painel lateral no estado correto
        const loginWindow = document.getElementById('login-window');
        const estadoLogin = document.getElementById('estado-login');
        const estadoPainel = document.getElementById('estado-painel');
        const tituloJanela = document.getElementById('titulo-janela');
        
        if(loginWindow) loginWindow.style.display = 'block';
        if(estadoLogin) estadoLogin.style.display = 'none';
        if(estadoPainel) estadoPainel.style.display = 'block';
        if(tituloJanela) tituloJanela.innerText = "MEU CARRINHO";

        console.log("Sucesso: Item adicionado!");
    }
};

// --- 8. DESENHAR OS ITENS NO CARRINHO ---
function atualizarCarrinhoVisual() {
    const listaHtml = document.getElementById('carrinho-lista');
    const totalHtml = document.getElementById('total-carrinho');
    
    if (!listaHtml) return;

    listaHtml.innerHTML = itensNoCarrinho.map(item => `
        <div class="item-carrinho-demo">
            <img src="${item.img}" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid #DAA520;">
            <div class="item-info">
                <span>${item.name} <strong style="color:#aaa;">(Tam: ${item.tamanho})</strong></span>
                <strong>R$ ${item.price}</strong>
            </div>
        </div>
    `).join('');

    const soma = itensNoCarrinho.reduce((acc, item) => acc + parseFloat(item.price.replace(',', '.')), 0);
    if (totalHtml) totalHtml.innerText = `R$ ${soma.toFixed(2).replace('.', ',')}`;
}
