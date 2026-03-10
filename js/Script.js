document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');

    // ABRIR CARRINHO (Ato 2)
    if (cartIcon && loginWindow) {
        cartIcon.onclick = function(e) {
            e.preventDefault();
            loginWindow.style.display = 'block';
        };
    }

    // MINIMIZAR CARRINHO (Ato 2)
    if (minimizeBtn && loginWindow) {
        minimizeBtn.onclick = function() {
            loginWindow.style.display = 'none';
        };
    }

    // NOTA: Para o Ato 3 (Criar conta), o link apenas redireciona. 
    // Caso queira que ele abra um novo formulário futuramente, me avise!
});
