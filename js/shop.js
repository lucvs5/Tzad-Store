const catalog = {
    promocoes: [
        { id: "p1", name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg" },
        { id: "p1_2", name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg" },
        { id: "p1_3", name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg" },
        { id: "p1_4", name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg" },
        { id: "p1_5", name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg" },
        { id: "p1_6", name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg" }
    ],
    nocta: [
        { id: "n1", name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png" },
        { id: "n2", name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png" },
        { id: "n3", name: "Conjunto Nike Nocta Tech Fleece", price: "450,00", img: "img/nktc.jpg" },
        { id: "n1_b", name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png" },
        { id: "n2_b", name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png" },
        { id: "n3_b", name: "Conjunto Nike Nocta Tech Fleece", price: "450,00", img: "img/nktc.jpg" }
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

function renderVitrine() {
    for (const category in catalog) {
        const container = document.getElementById(`vitrine-${category}`);
        if (container) {
            container.innerHTML = catalog[category].map(prod => `
                <div class="produto">
                    <img src="${prod.img}" alt="${prod.name}">
                    <h4>R$ ${prod.price}</h4>
                    <p>${prod.name}</p>
                    <button onclick="abrirCompra('${prod.id}', '${category}')">Adicionar ao carrinho</button>
                </div>
            `).join('');
        }
    }
}

// Rodar a função
window.addEventListener('load', renderVitrine);

function abrirCompra(id, cat) {
    console.log("Produto selecionado:", id, cat);
    // Aqui entrará a lógica do Modal.js
}
