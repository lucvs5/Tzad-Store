document.addEventListener('DOMContentLoaded', () => {
    // Gerenciamento da Janela de Login
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');

    if (minimizeBtn && loginWindow) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none';
        });
    }

    // Menu Icon (Placeholder para futuras expansões)
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            console.log("Menu lateral acionado");
        });
    }

    // Carrinho Icon (Placeholder para abrir o modal do carrinho)
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            console.log("Carrinho acionado");
            // A lógica de abrir o carrinho será integrada aqui futuramente
        });
    }
});
