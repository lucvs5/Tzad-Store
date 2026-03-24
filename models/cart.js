/**
 * Modelo de Dados para Itens do Pedido/Carrinho
 * Garante que todos os itens sigam o mesmo padrão para o Bot do Telegram
 */
class CartItem {
    constructor(id, name, price, img, size, color) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.size = size;
        this.color = color;
        this.timestamp = new Date().toISOString();
    }

    // Formata o item para uma mensagem legível que o Bot pode usar
    formatToTelegram() {
        return `
📦 *NOVO PEDIDO*
---------------------------
*Produto:* ${this.name}
*Preço:* R$ ${this.price}
*Tamanho:* ${this.size}
*Cor:* ${this.color}
---------------------------
ID: #${this.id}
        `;
    }
}

// Exporta para ser usado globalmente no sistema
window.CartItem = CartItem;
