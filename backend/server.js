// O server.js coordena a comunicação entre o Frontend e a Automação
const server = {
    processOrder: async (product, variants) => {
        const orderId = `TZAD-${Date.now()}`;
        
        const pedidoCompleto = {
            id: orderId,
            produto: product.name,
            preco: product.price,
            foto: product.img,
            tamanho: variants.tamanho,
            cor: variants.cor,
            status: "Pedido Recebido",
            data: new Date().toLocaleString('pt-BR')
        };

        console.log("Servidor processando pedido...", pedidoCompleto);

        // Aqui será o gatilho futuro para o Bot do Telegram enviar a mensagem
        // enviarParaTelegram(pedidoCompleto);

        return pedidoCompleto;
    }
};

// Exportando para ser usado pelo modal.js
window.server = server;
