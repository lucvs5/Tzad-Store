document.addEventListener('DOMContentLoaded', () => {
    // Seleção robusta
    const btnCarrinho = document.querySelector('.cart-icon');
    const janelaCarrinho = document.getElementById('login-window');
    const btnMinimizar = document.querySelector('.minimize-btn');

    // Função de abrir
    if (btnCarrinho && janelaCarrinho) {
        btnCarrinho.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Garante que o clique não se perca
            janelaCarrinho.style.display = 'block';
            console.log("Carrinho aberto!");
        });
    }

    // Função de minimizar
    if (btnMinimizar && janelaCarrinho) {
        btnMinimizar.addEventListener('click', function() {
            janelaCarrinho.style.display = 'none';
        });
    }
});
