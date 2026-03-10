// 1. ADICIONE ISSO AQUI (Logo no topo, fora do DOMContentLoaded)
let itensNoCarrinho = []; 

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELETORES PRINCIPAIS ---
    const cartIcon = document.querySelector('.cart-icon');
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    
    const estadoLogin = document.getElementById('estado-login');
    const estadoCadastro = document.getElementById('estado-cadastro');
    const estadoPainel = document.getElementById('estado-painel');
    const tituloJanela = document.getElementById('titulo-janela');

    // --- 2. CONTROLE DE ABERTURA/FECHAMENTO ---
    if (cartIcon && loginWindow) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            loginWindow.style.display = 'block';
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            loginWindow.style.display = 'none';
        });
    }

    // --- 3. NAVEGAÇÃO ENTRE TELAS (LOGIN / CADASTRO) ---
    const btnIrCadastro = document.getElementById('btn-ir-cadastro');
    const btnIrLogin = document.getElementById('btn-ir-login');

    if (btnIrCadastro) {
        btnIrCadastro.onclick = () => {
            estadoLogin.style.display = 'none';
            estadoCadastro.style.display = 'block';
            tituloJanela.innerText = "CRIAR CONTA";
        };
    }

    if (btnIrLogin) {
        btnIrLogin.onclick = () => {
            estadoCadastro.style.display = 'none';
            estadoLogin.style.display = 'block';
            tituloJanela.innerText = "LOGIN / CARRINHO";
        };
    }

    // --- 4. LÓGICA DE LOGIN (ENTRAR NO PAINEL) ---
    const formLogin = document.getElementById('form-executa-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            estadoLogin.style.display = 'none';
            estadoCadastro.style.display = 'none';
            estadoPainel.style.display = 'block';
            tituloJanela.innerText = "MINHA CONTA";
            document.getElementById('user-name-display').innerText = "João";
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            estadoPainel.style.display = 'none';
            estadoLogin.style.display = 'block';
            tituloJanela.innerText = "LOGIN / CARRINHO";
        };
    }

    // --- 5. GERENCIAMENTO DE PRODUTOS ---
    const produtosPromocao = [
        { id: 1, name: "Camiseta Nocta Gold", price: "189,90", img: "img/produto1.png" },
        { id: 2, name: "Shorts Stüssy Black", price: "159,00", img: "img/produto2.png" },
        { id: 3, name: "Nike Air Force 1 Rep", price: "349,00", img: "img/produto3.png" },
        { id: 4, name: "Moletom Essential", price: "220,00", img: "img/produto4.png" }
    ];

    function renderizarVitrine(lista, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = lista.map(p => `
            <div class="produto">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>R$ ${p.price}</p>
                <button class="btn-comprar" onclick="window.abrirDetalhes('${p.id}')">
                    Adicionar ao Carrinho
                </button>
            </div>
        `).join('');
    }

    renderizarVitrine(produtosPromocao, 'vitrine-promocoes');
});

// --- 6. FUNÇÕES GLOBAIS ATUALIZADAS (AUTOMAÇÃO DO CARRINHO) ---

// 2. SUBSTITUA SUA window.abrirDetalhes POR ESTA:
window.abrirDetalhes = function(produtoId) {
    // Lista para o script achar os dados do produto clicado
    const bancoDeDados = [
        { id: 1, name: "Camiseta Nocta Gold", price: "189,90", img: "img/produto1.png" },
        { id: 2, name: "Shorts Stüssy Black", price: "159,00", img: "img/produto2.png" },
        { id: 3, name: "Nike Air Force 1 Rep", price: "349,00", img: "img/produto3.png" },
        { id: 4, name: "Moletom Essential", price: "220,00", img: "img/produto4.png" }
    ];

    const produto = bancoDeDados.find(p => p.id == produtoId);

    if (produto) {
        itensNoCarrinho.push(produto); // Adiciona na lista
        atualizarCarrinhoVisual();     // Chama a função de desenho
        
        // Abre o modal do carrinho
        document.getElementById('login-window').style.display = 'block';
    }
};

// 3. ADICIONE ESTA NOVA FUNÇÃO PARA DESENHAR OS ITENS
function atualizarCarrinhoVisual() {
    const listaHtml = document.getElementById('carrinho-lista');
    const totalHtml = document.getElementById('total-carrinho');
    
    if (!listaHtml) return;

    // Gera o HTML com a foto à esquerda, nome e preço
    listaHtml.innerHTML = itensNoCarrinho.map(item => `
        <div class="item-carrinho-demo">
            <img src="${item.img}" style="width:45px; height:45px; object-fit:cover; border-radius:4px;">
            <div class="item-info">
                <span>${item.name}</span>
                <strong>R$ ${item.price}</strong>
            </div>
        </div>
    `).join('');

    // Soma o Total
    const soma = itensNoCarrinho.reduce((acc, item) => acc + parseFloat(item.price.replace(',', '.')), 0);
    if (totalHtml) totalHtml.innerText = `R$ ${soma.toFixed(2).replace('.', ',')}`;
}

window.fecharDetalhes = function() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.style.display = 'none';
};
