// TZAD STORE - SCRIPT UNIFICADO (ATÉ ATO 3)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONTROLE DA JANELA DE LOGIN/CARRINHO ---
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');

    // Abre a janela
    if (cartIcon && loginWindow) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            loginWindow.style.display = 'block';
            console.log("Interface de login/carrinho ativada.");
        });
    }

    // Minimiza a janela
    if (minimizeBtn && loginWindow) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none';
        });
    }

    // --- 2. TROCA DE TELAS (LOGIN <-> CADASTRO) ---
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');
    const btnIrCadastro = document.getElementById('btn-ir-cadastro');
    const btnIrLogin = document.getElementById('btn-ir-login');

    if (btnIrCadastro && btnIrLogin) {
        // Mudar para Cadastro
        btnIrCadastro.addEventListener('click', (e) => {
            e.preventDefault();
            formLogin.style.display = 'none';
            formCadastro.style.display = 'block';
            console.log("Mudando para tela de Cadastro.");
        });

        // Voltar para Login
        btnIrLogin.addEventListener('click', (e) => {
            e.preventDefault();
            formCadastro.style.display = 'none';
            formLogin.style.display = 'block';
            console.log("Voltando para tela de Login.");
        });
    }

    // --- 3. GERENCIAMENTO DE PRODUTOS (VITRINES) ---
    // Você pode adicionar mais produtos aqui seguindo o mesmo padrão
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

    // Carrega a vitrine inicial
    renderizarVitrine(produtosPromocao, 'vitrine-promocoes');
});

// --- 4. FUNÇÕES GLOBAIS (MODAL DE DETALHES) ---
// Definidas no objeto window para garantir que o 'onclick' do HTML as encontre
window.abrirDetalhes = function(produtoId) {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.display = 'flex';
        console.log("Abrindo detalhes do produto: " + produtoId);
    }
};

window.fecharDetalhes = function() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.display = 'none';
    }
};

console.log("Tzad Store Engine: Online e atualizada para o Ato 3.");
