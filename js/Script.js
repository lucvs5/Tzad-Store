document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONTROLE DA JANELA DE LOGIN/CARRINHO ---
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');

    // Abre a janela ao clicar no ícone do carrinho
    if (cartIcon && loginWindow) {
        cartIcon.onclick = (e) => {
            e.preventDefault();
            loginWindow.style.display = 'block';
            console.log("Interface de login/carrinho ativada.");
        };
    }

    // Minimiza a janela ao clicar no botão (_)
    if (minimizeBtn && loginWindow) {
        minimizeBtn.onclick = () => {
            loginWindow.style.display = 'none';
        };
    }

    // --- 2. GERENCIAMENTO DE PRODUTOS (VITRINE) ---
    // Exemplo de dados para teste (você pode expandir esta lista)
    const produtosPromocao = [
        { id: 1, name: "Camiseta Nocta Gold", price: "189,90", img: "img/produto1.png" },
        { id: 2, name: "Shorts Stüssy Black", price: "159,00", img: "img/produto2.png" },
        { id: 3, name: "Nike Air Force 1 Rep", price: "349,00", img: "img/produto3.png" },
        { id: 4, name: "Moletom Essential", price: "220,00", img: "img/produto4.png" }
    ];

    /**
     * Função para carregar produtos nas vitrines
     * Mantém a estrutura compatível com o fundo dourado unificado (.categoria)
     */
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

    // Executa a renderização inicial
    renderizarVitrine(produtosPromocao, 'vitrine-promocoes');
    // Adicione chamadas para 'vitrine-nocta' ou 'vitrine-stussy' conforme necessário
});

/**
 * Função global para abrir o Modal de Detalhes (Ato 5)
 * Chamada pelo atributo onclick dos botões da vitrine
 */
function abrirDetalhes(produtoId) {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.display = 'flex';
        console.log("Abrindo detalhes do produto: " + produtoId);
    }
}
