// 1. BANCO DE DADOS (Base para a Vitrine)
const produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },
    { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes" },

    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta" },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta" },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: "450,00", img: "img/nktc.jpg", categoria: "nocta" },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta" },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta" },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta" },

    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy" },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy" },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy" },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy" },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy" },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy" }
];

let itensNoCarrinho = [];

// 2. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    configurarInterface();
    renderizarEnderecos();
});

// 3. RENDERIZAR VITRINES (Atualizado para o novo Modal)
function renderizarVitrines() {
    const categorias = ['promocoes', 'nocta', 'stussy'];
    categorias.forEach(cat => {
        const elemento = document.getElementById(`vitrine-${cat}`);
        if (elemento) {
            const produtosFiltrados = produtosLoja.filter(p => p.categoria === cat);
            elemento.innerHTML = produtosFiltrados.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}">
                    <h4>R$ ${p.price}</h4>
                    <p>${p.name}</p>
                    <button class="btn-comprar" onclick="abrirModalZoom('${p.name}', '${p.price}', '${p.img}')">Ver Detalhes</button>
                </div>
            `).join('');
        }
    });
}

// 3.1. FUNÇÃO DO MODAL DE ZOOM COM CARROSSEL
window.abrirModalZoom = function(nome, preco, imgPrincipal, fotosExtras = []) {
    const modal = document.getElementById('modal-produto');
    const imgMain = document.getElementById('img-principal-zoom');
    const nomeTxt = document.getElementById('zoom-nome-produto');
    const containerThumbs = document.getElementById('miniaturas-container');
    const btnAdd = document.getElementById('btn-add-zoom');

    // Preenche os textos básicos
    nomeTxt.innerText = nome;
    imgMain.src = imgPrincipal;

    // LÓGICA DO CARROSSEL: 
    // Se não houver fotos extras, repetimos a principal 6x para o design ficar bonito.
    let listaDeFotos = fotosExtras.length > 0 ? fotosExtras : Array(6).fill(imgPrincipal);

    containerThumbs.innerHTML = listaDeFotos.map((foto, index) => `
        <img src="${foto}" 
             class="thumb-item ${index === 0 ? 'thumb-active' : ''}" 
             onclick="trocarImagemZoom('${foto}', this)">
    `).join('');
// Configura o botão de adicionar ao carrinho de dentro do modal
    btnAdd.onclick = () => {
        const tamanhoSelecionado = document.getElementById('zoom-tamanho').value;
        
        // Adiciona ao array do carrinho
        itensNoCarrinho.push({
            name: nome,
            price: preco,
            img: imgPrincipal,
            size: tamanhoSelecionado
        });

        fecharModalZoom(); // Fecha o zoom

        // Abre o Carrinho/Painel automaticamente para mostrar o item
        const loginWin = document.getElementById('login-window');
        if(loginWin) loginWin.style.display = 'block';
        
        abrirSubPagina('carrinho'); // Garante que caia na aba do carrinho
        atualizarCarrinhoVisual();  // Atualiza preços e lista
    };

    modal.style.display = 'flex'; // Mostra o modal
};
// 3. RENDERIZAR VITRINES
function renderizarVitrines() {
    const categorias = ['promocoes', 'nocta', 'stussy'];
    categorias.forEach(cat => {
        const elemento = document.getElementById(`vitrine-${cat}`);
        if (elemento) {
            const produtosFiltrados = produtosLoja.filter(p => p.categoria === cat);
            elemento.innerHTML = produtosFiltrados.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}">
                    <h4>R$ ${p.price}</h4>
                    <p>${p.name}</p>
                    <button class="btn-comprar" onclick="abrirModalZoom('${p.name}', '${p.price}', '${p.img}')">Ver Detalhes</button>
                </div>
            `).join('');
        }
    });
}

// 3.1. MODAL DE ZOOM (LIMPO E COM VALIDAÇÕES DE LOGIN/TAMANHO)
window.abrirModalZoom = function(nome, preco, imgPrincipal, fotosExtras = []) {
    const modal = document.getElementById('modal-produto');
    const imgMain = document.getElementById('img-principal-zoom');
    const nomeTxt = document.getElementById('zoom-nome-produto');
    const containerThumbs = document.getElementById('miniaturas-container');
    const btnAdd = document.getElementById('btn-add-zoom');
    const selectTamanho = document.getElementById('zoom-tamanho');

    // Preenche os textos básicos e imagem principal
    nomeTxt.innerText = nome;
    imgMain.src = imgPrincipal;

    // Gera o Carrossel (Repete a foto se não houver extras)
    let listaDeFotos = fotosExtras.length > 0 ? fotosExtras : Array(6).fill(imgPrincipal);
    containerThumbs.innerHTML = listaDeFotos.map((foto, index) => `
        <img src="${foto}" 
             class="thumb-item ${index === 0 ? 'thumb-active' : ''}" 
             onclick="trocarImagemZoom('${foto}', this)">
    `).join('');

    // Reseta o botão e o select toda vez que a janela abre
    btnAdd.innerText = "ADICIONAR AO CARRINHO";
    btnAdd.style.background = "#DAA520";
    if (selectTamanho) selectTamanho.value = "";

    // Lógica do botão Adicionar (Filtro de Login e Tamanho)
    btnAdd.onclick = () => {
        const tamanho = selectTamanho ? selectTamanho.value : "";
        const painelUsuario = document.getElementById('estado-painel');
        
        // REGRA 1: Validar se selecionou o tamanho
        if (!tamanho || tamanho === "") {
            alert("⚠️ Selecione o tamanho antes de adicionar!");
            return;
        }

        // REGRA 2: Validar se está logado (Se o painel não estiver aberto, não está logado)
        if (painelUsuario && painelUsuario.style.display !== 'block') {
            const loginWin = document.getElementById('login-window');
            if(loginWin) loginWin.style.display = 'block';
            alternarTela('login');
            alert("🔒 Por favor, faça login ou crie uma conta para adicionar itens.");
            return; 
        }

        // REGRA 3: Tudo certo! Adiciona ao carrinho
        itensNoCarrinho.push({ name: nome, price: preco, img: imgPrincipal, size: tamanho });
        
        // Feedback visual animado
        btnAdd.innerText = "ADICIONADO! ✓";
        btnAdd.style.background = "#4CAF50";
        setTimeout(() => {
            fecharModalZoom();
            atualizarCarrinhoVisual();
        }, 800);
    };

    modal.style.display = 'flex'; 
};

// 3.2. FUNÇÕES AUXILIARES DO ZOOM
window.fecharModalZoom = function() {
    document.getElementById('modal-produto').style.display = 'none';
};

window.trocarImagemZoom = function(src, elemento) {
    document.getElementById('img-principal-zoom').src = src;
    document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('thumb-active'));
    elemento.classList.add('thumb-active');
};

// 4. INTERFACE E ABERTURA DA JANELA (CARRINHO)
function configurarInterface() {
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const formLogin = document.getElementById('form-executa-login');
    const btnLogout = document.getElementById('btn-logout');

    document.addEventListener('click', (e) => {
        if (e.target.closest('.cart-icon')) {
            e.preventDefault();
            if (loginWindow) loginWindow.style.display = 'block';
        }
    });

    if (minimizeBtn) {
        minimizeBtn.onclick = () => loginWindow.style.display = 'none';
    }

    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const nomeUser = email.split('@')[0].toUpperCase();
            document.getElementById('user-name-display').innerText = nomeUser;
            document.getElementById('perfil-email').innerText = email;
            document.getElementById('perfil-nome').innerText = nomeUser;
            alternarTela('painel');
        };
    }

    if (btnLogout) {
        btnLogout.onclick = () => {
            alternarTela('login');
            formLogin.reset();
        };
    }
}

// 5. TELAS E NAVEGAÇÃO
window.alternarTela = function(tela) {
    const secoes = ['estado-login', 'estado-cadastro', 'estado-painel'];
    secoes.forEach(s => document.getElementById(s).style.display = 'none');
    
    document.getElementById(tela === 'painel' ? 'estado-painel' : (tela === 'cadastro' ? 'estado-cadastro' : 'estado-login')).style.display = 'block';
    
    const titulos = { 'login': 'LOGIN / CARRINHO', 'cadastro': 'CRIAR CONTA', 'painel': 'PAINEL DO CLIENTE' };
    document.getElementById('titulo-janela').innerText = titulos[tela] || titulos['login'];
    
    if (tela === 'painel') atualizarCarrinhoVisual();
};

window.abrirSubPagina = function(abaId) {
    const abas = ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'];
    abas.forEach(aba => {
        const el = document.getElementById(`aba-${aba}`);
        if (el) el.style.display = (aba === abaId) ? 'block' : 'none';
    });
    document.getElementById('menu-navegacao-painel').style.display = (abaId === 'carrinho') ? 'grid' : 'none';
};

// 6. MODAL ZOOM (CARROSSEL COM VALIDAÇÃO DE LOGIN E TAMANHO)
window.abrirModalZoom = function(nome, preco, imgPrincipal, fotosExtras = []) {
    const modal = document.getElementById('modal-produto');
    const btnAdd = document.getElementById('btn-add-zoom');
    const selectTamanho = document.getElementById('zoom-tamanho');
    
    // 1. Preenche os dados básicos do Modal
    document.getElementById('zoom-nome-produto').innerText = nome;
    document.getElementById('img-principal-zoom').src = imgPrincipal;

    // 2. Cria as 6 miniaturas (se não tiver extras, repete a principal)
    let listaDeFotos = fotosExtras.length > 0 ? fotosExtras : Array(6).fill(imgPrincipal);
    document.getElementById('miniaturas-container').innerHTML = listaDeFotos.map((foto, idx) => `
        <img src="${foto}" class="thumb-item ${idx === 0 ? 'thumb-active' : ''}" 
             onclick="trocarImagemZoom('${foto}', this)">
    `).join('');

    // 3. Resetar o botão e o select para o estado inicial toda vez que abrir
    btnAdd.innerText = "ADICIONAR AO CARRINHO";
    btnAdd.style.background = "#DAA520";
    selectTamanho.value = ""; 

    // 4. LÓGICA DO BOTÃO ADICIONAR
    btnAdd.onclick = () => {
        const tamanho = selectTamanho.value;
        const estaLogado = document.getElementById('estado-painel').style.display === 'block';

        // REGRA 1: Validar se selecionou o tamanho
        if (!tamanho || tamanho === "") {
            alert("❌ Selecione o tamanho antes de adicionar!");
            return;
        }

        // REGRA 2: Validar se está logado
        if (!estaLogado) {
            // Abre o modal do carrinho/login por cima
            const loginWin = document.getElementById('login-window');
            loginWin.style.display = 'block';
            alternarTela('login'); 
            
            // Opcional: Alerta suave para o usuário
            alert("🔒 Quase lá! Faça login para adicionar ao carrinho.");
            return; 
        }

        // REGRA 3: Se passou nas duas, adiciona ao carrinho
        itensNoCarrinho.push({ 
            name: nome, 
            price: preco, 
            img: imgPrincipal, 
            size: tamanho 
        });

        // Feedback de sucesso sem fechar o modal imediatamente
        btnAdd.innerText = "ADICIONADO! ✓";
        btnAdd.style.background = "#4CAF50";

        setTimeout(() => {
            fecharModalZoom();
            atualizarCarrinhoVisual(); // Calcula o desconto Stüssy em background
        }, 800);
    };

    modal.style.display = 'flex';
};

window.fecharModalZoom = () => {
    document.getElementById('modal-produto').style.display = 'none';
};

window.trocarImagemZoom = (src, el) => {
    document.getElementById('img-principal-zoom').src = src;
    document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('thumb-active'));
    el.classList.add('thumb-active');
};

// 7. LÓGICA DO CARRINHO
function atualizarCarrinhoVisual() {
    const lista = document.getElementById('carrinho-lista');
    if (!lista) return;

    if (itensNoCarrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Carrinho vazio.</p>';
        document.getElementById('total-carrinho').innerText = "R$ 0,00";
        return;
    }

    lista.innerHTML = itensNoCarrinho.map((item, idx) => `
        <div class="carrinho-item" style="display:flex; align-items:center; gap:10px; border-bottom:1px solid #333; padding:10px 0;">
            <img src="${item.img}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
            <div style="flex:1; color:white; font-size:11px;">
                ${item.name} <br> <span style="color:#DAA520;">Tam: ${item.size}</span>
            </div>
            <button onclick="removerItem(${idx})" style="background:none; border:none; color:red; cursor:pointer;">X</button>
        </div>
    `).join('');

    calcularTotais();
}

function calcularTotais() {
    const somaBruta = itensNoCarrinho.reduce((acc, p) => acc + parseFloat(p.price.replace('.', '').replace(',', '.')), 0);
    let qtdStussy = itensNoCarrinho.filter(i => i.name.toLowerCase().includes("stüssy")).length;
    
    let perc = (itensNoCarrinho.length >= 2) ? 5 : 0;
    if (qtdStussy === 2) perc = 16.67;
    else if (qtdStussy === 3) perc = 21.67;
    else if (qtdStussy >= 4) perc = 30.00;

    const valorDesc = somaBruta * (perc / 100);
    const total = somaBruta - valorDesc;

    document.getElementById('preco-bruto').innerText = `R$ ${somaBruta.toFixed(2).replace('.', ',')}`;
    document.getElementById('txt-perc-desc').innerText = perc.toFixed(2);
    document.getElementById('total-carrinho').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

window.removerItem = (idx) => { itensNoCarrinho.splice(idx, 1); atualizarCarrinhoVisual(); };

// 8. FINALIZAÇÃO E MÁSCARAS (CPF/TEL)
window.mascaraCPF = (i) => {
    let v = i.value.replace(/\D/g, "").slice(0, 11);
    i.value = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

window.mascaraTel = (i) => {
    let v = i.value.replace(/\D/g, "").slice(0, 11);
    i.value = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
};
