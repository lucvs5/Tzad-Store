// TZAD STORE - AUTOMAÇÃO ATO 2

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleção de Elementos com IDs e Classes do seu HTML
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');

    console.log("Script carregado. Verificando elementos...");

    // 2. Abre a janela ao clicar no ícone do carrinho
    if (cartIcon && loginWindow) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            loginWindow.style.display = 'block';
            console.log("Interface de login/carrinho ativada.");
        });
    } else {
        console.error("Erro: .cart-icon ou #login-window não encontrados no HTML.");
    }

    // 3. Minimiza a janela ao clicar no botão (_)
    if (minimizeBtn && loginWindow) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none';
            console.log("Interface minimizada.");
        });
    }

    // --- GERENCIAMENTO DE PRODUTOS ---
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
                <button class="btn-comprar" onclick="abrirDetalhes('${p.id}')">
                    Adicionar ao Carrinho
                </button>
            </div>
        `).join('');
    }

    renderizarVitrine(produtosPromocao, 'vitrine-promocoes');
});

// 4. Função Global para o Modal de Detalhes (Ato 5)
window.abrirDetalhes = function(produtoId) {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.display = 'flex';
        console.log("Abrindo detalhes do produto: " + produtoId);
    }
};
