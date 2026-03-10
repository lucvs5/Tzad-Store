document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELETORES PRINCIPAIS ---
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    
    // Seletores de Estados (Telas internas do modal)
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
            
            // Simulação de transição para o Painel
            estadoLogin.style.display = 'none';
            estadoCadastro.style.display = 'none';
            estadoPainel.style.display = 'block';
            
            tituloJanela.innerText = "MINHA CONTA";
            document.getElementById('user-name-display').innerText = "João"; // Nome mockado
            
            console.log("Usuário logado com sucesso.");
        });
    }

    // Botão Sair (Logout)
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            estadoPainel.style.display = 'none';
            estadoLogin.style.display = 'block';
            tituloJanela.innerText = "LOGIN / CARRINHO";
        };
    }

    // --- 5. GERENCIAMENTO DE PRODUTOS (VITRINE) ---
    const produtosPromocao = [
        { id: 1, name: "Camiseta Nocta Gold", price: "189,90", img: "img/produto1.png" },
        { id: 2, name: "Shorts Stüssy Black", price: "159,00", img: "img/produto2.png" },
        { id: 3, name: "Nike Air Force 1 Rep", price: "349,00", img: "img/produto3.png" },
        { id: 4, name: "Moletom Essential", price: "220,00", img: "img/produto4.png" }
    ];

    function renderizarVitrine(lista, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = lista.map(p => `
            <div class="produto">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>R$ ${p.price}</p>
                <button class="btn-comprar" onclick="window.abrirDetalhes('${p.id}')">
                    Adicionar ao Carrinho
                </button>
            </div>
        `).join('');
    }

    renderizarVitrine(produtosPromocao, 'vitrine-promocoes');
});

// --- 6. FUNÇÕES GLOBAIS (MODAIS DE DETALHES) ---
window.abrirDetalhes = function(produtoId) {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.display = 'flex';
        console.log("Detalhes do produto: " + produtoId);
    }
};

window.fecharDetalhes = function() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.display = 'none';
    }
};
