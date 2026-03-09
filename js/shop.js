// Catálogo de Dados (Sem links de agentes, apenas info para o Bot)
const catalog = {
    promocoes: [
        { id: "p1", name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg" },
        { id: "p2", name: "Colar Imperial", price: "---", img: "img/ColarImperial.jpg" },
        { id: "p3", name: "Colar Prestige", price: "---", img: "img/ColarPrestige.jpg" },
        { id: "p4", name: "Colar Royal", price: "---", img: "img/ColarRoyal.jpg" },
        { id: "p5", name: "Colar Diamond Touch", price: "---", img: "img/ColarDiamondTouch.jpg" },
        { id: "p6", name: "Colar Golden Line", price: "---", img: "img/ColarGoldenLine.jpg" }
    ],
    nocta: [
        { id: "n1", name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png" },
        { id: "n2", name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png" },
        { id: "n3", name: "Conjunto Nike Nocta Tech Fleece", price: "450,00", img: "img/nktc.jpg" },
        // Adicione mais para testar a subpágina depois
    ],
    stussy: [
        { id: "s1", name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg" },
        { id: "s2", name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg" },
        { id: "s3", name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg" },
        { id: "s4", name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg" },
        { id: "s5", name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg" },
        { id: "s6", name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg" }
    ]
};

// Função para renderizar apenas os 6 primeiros na página inicial
function renderVitrine() {
    console.log("Renderizando vitrines...");
    
    for (let category in catalog) {
        const container = document.getElementById(`vitrine-${category}`);
        
        if (container) {
            // Pega os 6 primeiros itens de cada categoria
            const itensVitrine = catalog[category].slice(0, 6);
            
            container.innerHTML = itensVitrine.map(prod => `
                <div class="produto">
                    <img src="${prod.img}" alt="${prod.name}">
                    <h4>R$ ${prod.price}</h4>
                    <p>${prod.name}</p>
                    <button onclick="abrirModalProduto('${prod.id}', '${category}')">Adicionar ao carrinho</button>
                </div>
            `).join('');
        }
    }
}

// Executa quando o site carrega
window.addEventListener('DOMContentLoaded', renderVitrine);

// Função que chamará o modal.js para coletar tamanho/cor antes de mandar pro Telegram
function abrirModalProduto(id, categoria) {
    const produto = catalog[categoria].find(p => p.id === id);
    console.log("Abrindo modal para:", produto.name);
    // Aqui chamaremos a função do modal.js em breve
}
