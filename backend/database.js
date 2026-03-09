// Simulação de Banco de Dados local (Local Storage ou Objeto em memória)
const database = {
    saveOrder: (orderData) => {
        const orders = JSON.parse(localStorage.getItem('tzad_orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('tzad_orders', JSON.stringify(orders));
        console.log("Pedido salvo no banco de dados:", orderData);
    },
    
    getOrders: () => {
        return JSON.parse(localStorage.getItem('tzad_orders') || '[]');
    }
};

export default database;
