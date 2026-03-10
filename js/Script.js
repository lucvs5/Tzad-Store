// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // Referência da Janela (ID fixo)
    const loginWindow = document.getElementById('login-window');

    // 1. ESCUTA DE CLIQUES GLOBAL (Mais seguro para botões/imagens)
    document.addEventListener('click', (e) => {
        
        // Verifica se clicou no botão do carrinho ou em qualquer imagem dentro dele
        if (e.target.closest('.cart-icon')) {
            e.preventDefault();
            if (loginWindow) {
                loginWindow.style.display = 'block';
                console.log("Carrinho aberto via delegação.");
            }
        }

        // Verifica se clicou no botão de minimizar (_)
        if (e.target.closest('.minimize-btn')) {
            if (loginWindow) {
                loginWindow.style.display = 'none';
            }
        }
        
        // Ato 5: Fechar o Modal Principal (o X grosso)
        if (e.target.closest('.close-modal')) {
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.style.display = 'none';
        }
    });

    // 2. RENDERIZAÇÃO AUTOMÁTICA DA VITRINE
    // (Exemplo para manter os produtos ativos no fundo dourado)
    const produtos = [
        { id: 1, name: "Produto Tzad 1", price: "199,90", img: "img/produto1.png" },
        { id: 2, name: "Produto Tzad 2", price: "249,90", img: "img/produto2.png" }
    ];

    function carregarVitrine(lista, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = lista.map(p => `
            <div class="produto">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>R$ ${p.price}</p>
                <button class="btn-comprar" onclick="abrirModalDetalhes('${p.id}')">
                    Comprar
                </button>
            </div>
        `).join('');
    }

    carregarVitrine(produtos, 'vitrine-promocoes');
});

// Função Global para o Modal de Detalhes
function abrirModalDetalhes(id) {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.style.display = 'flex';
}
