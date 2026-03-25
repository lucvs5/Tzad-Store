// js/cart.js
class CartItem {
    constructor(id, name, price, img, size, color) {
        this.id = id;
        this.name = name;
        this.price = parseFloat(price);
        this.img = img;
        this.size = size;
        this.color = color;
        this.timestamp = new Date().toISOString();
    }
}
window.CartItem = CartItem; // Garante acesso global
