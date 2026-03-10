/**
 * SCRIPT.JS - Lógica de Interface e Controle do Carrinho/Login
 */

document.addEventListener('DOMContentLoaded', () => {
    // Selecionamos os elementos necessários
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');

    // 1. FUNÇÃO PARA ABRIR O CARRINHO
    if (cartIcon && loginWindow) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault(); // Impede qualquer comportamento indesejado
            loginWindow.style.display = 'block'; // Mostra a janela
        });
    }

    // 2. FUNÇÃO PARA MINIMIZAR (_)
    if (minimizeBtn && loginWindow) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none'; // Esconde a janela
        });
    }

    // 3. FECHAR AO CLICAR FORA (OPCIONAL)
    // Se o usuário clicar no fundo escuro, a janela também pode fechar
    window.addEventListener('click', (e) => {
        if (e.target === loginWindow) {
            loginWindow.style.display = 'none';
        }
    });
});
    }

    // FECHAR AO CLICAR FORA (Opcional, para melhorar a experiência)
    window.addEventListener('click', (e) => {
        if (e.target === loginWindow) {
            loginWindow.style.display = 'none';
        }
    });
});
