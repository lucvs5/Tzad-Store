/**
 * SCRIPT.JS - Lógica de Interface e Controle do Carrinho/Login
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos do DOM
    const loginWindow = document.getElementById('login-window');
    const cartIcon = document.querySelector('.cart-icon');
    const minimizeBtn = document.querySelector('.minimize-btn');

    // 1. FUNÇÃO PARA ABRIR O CARRINHO
    // Ao clicar no ícone do carrinho no topo, a janela aparece
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamento padrão de link
            if (loginWindow) {
                loginWindow.style.display = 'block';
                console.log("Carrinho TZAD aberto com sucesso.");
            }
        });
    }

    // 2. FUNÇÃO PARA MINIMIZAR / FECHAR (_)
    // Ao clicar no botão de sublinhado, a janela é ocultada
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            if (loginWindow) {
                loginWindow.style.display = 'none';
            }
        });
    }

    // FECHAR AO CLICAR FORA (Opcional, para melhorar a experiência)
    window.addEventListener('click', (e) => {
        if (e.target === loginWindow) {
            loginWindow.style.display = 'none';
        }
    });
});
