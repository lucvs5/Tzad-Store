document.addEventListener('DOMContentLoaded', () => {
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const cartIcon = document.querySelector('.cart-icon');

    // Abre o carrinho ao clicar no ícone do topo
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            loginWindow.style.display = 'block';
        });
    }

    // Fecha/Minimiza a janela
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none';
        });
    }
});
