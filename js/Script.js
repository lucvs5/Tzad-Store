/**
 * SCRIPT.JS - Lógica de Interface e Controle do Carrinho/Login
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referências dos elementos
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');

    // 1. ABRIR CARRINHO (Ato 2)
    if (cartIcon && loginWindow) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            loginWindow.style.display = 'block';
            console.log("Carrinho visualizado.");
        });
    }

    // 2. MINIMIZAR CARRINHO (_) (Ato 2)
    if (minimizeBtn && loginWindow) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none';
        });
    }

    // Fechar ao clicar fora da janela (Opcional)
    window.addEventListener('click', (e) => {
        if (e.target === loginWindow) {
            loginWindow.style.display = 'none';
        }
    });
});
