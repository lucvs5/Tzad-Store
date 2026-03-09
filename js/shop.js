/**
 * SHOP.JS - Motor de Vitrine da Tzad Store
 */

const catalog = {
    promocoes: [
        { id: "p1_1", name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg" },
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
        { id: "n1_rep", name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png" },
        { id: "n2_rep", name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png" },
        { id: "n3_rep", name: "Conjunto Nike Nocta Tech Fleece", price: "450,00", img: "img/nktc.jpg" }
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

function renderVitrines() {
    for (const category in catalog) {
        const container = document.getElementById(`vitrine-${category}`);
        if (container) {
            container.innerHTML = catalog[category].map(product => `
                <div class="produto">
                    <div class="img-container">
                        <img src="${product.img}" alt="${product.name}">
                    </div>
                    <h4>R$ ${product.price}</h4>
                    <p>${product.name}</p>
                    <button class="btn-comprar" onclick="abrirModalCompra('${product.id}', '${category}')">
                        Comprar
                    </button>
                </div>
            `).join('');
        }
    }
}

function abrirModalCompra(productId, category) {
    const product = catalog[category].find(p => p.id === productId);
    if (window.abrirModal) {
        window.abrirModal(product);
    }
}

window.addEventListener('load', renderVitrines);
