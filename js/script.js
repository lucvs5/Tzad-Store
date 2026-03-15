// 1. BANCO DE DADOS (Base para a Vitrine)
const produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/bape-2.jpg", "img/cjbl.jpg", "img/cjbl.jpg"] },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/bape-2.jpg"] },
    { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/extra.jpg"] },
    { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },

    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta", fotos: ["img/cjbl.jpg"] },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta", fotos: ["img/cjbl.jpg"] },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: "450,00", img: "img/nktc.jpg", categoria: "nocta", fotos: ["img/cjbl.jpg"] },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta", fotos: ["img/cjbl.jpg"] },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta", fotos: ["img/cjbl.jpg"] },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta", fotos: ["img/cjbl.jpg"] },

    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy", fotos: ["img/cjbl.jpg"] },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy", fotos: ["img/cjbl.jpg"] },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy", fotos: ["img/cjbl.jpg"] },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy", fotos: ["img/cjbl.jpg"] },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy", fotos: ["img/cjbl.jpg"] },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy", fotos: ["img/cjbl.jpg"] }
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
                   <button class="btn-comprar" onclick="abrirZoomV2(${p.id})">Ver Detalhes</button>
                </div>
            `).join(''); // <-- O ponto final da criação dos produtos
        } // <-- Fecha o IF
    }); // <-- Fecha o FOREACH
} // <-- Fecha a FUNÇÃO

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

// 8. LÓGICA DO PERFIL (TRAVAR/DESTRAVAR)
function habilitarEdicao() {
    document.getElementById('perfil-cpf').disabled = false;
    document.getElementById('perfil-tel').disabled = false;
    document.getElementById('perfil-cpf').classList.add('editando');
    document.getElementById('perfil-tel').classList.add('editando');
    
    document.getElementById('btn-salvar-perfil').style.display = 'block';
    document.getElementById('btn-alterar-perfil').style.display = 'none';
}

function salvarDadosPerfil() {
    // Aqui você travaria de volta
    document.getElementById('perfil-cpf').disabled = true;
    document.getElementById('perfil-tel').disabled = true;
    document.getElementById('perfil-cpf').classList.remove('editando');
    document.getElementById('perfil-tel').classList.remove('editando');

    document.getElementById('btn-salvar-perfil').style.display = 'none';
    document.getElementById('btn-alterar-perfil').style.display = 'block';
    alert("✅ Dados salvos permanentemente!");
}

// 8.1. LÓGICA DE VER MAIS COMPRAS
function toggleDetalhes(id) {
    const info = document.getElementById(`detalhe-compra-${id}`);
    const btn = document.getElementById(`btn-ver-${id}`);
    if (info.style.display === 'none') {
        info.style.display = 'block';
        btn.innerText = '[ ver menos ]';
    } else {
        info.style.display = 'none';
        btn.innerText = '[ ver mais ]';
    }
                            }
function salvarDadosPerfil() {
    const cpf = document.getElementById('perfil-cpf').value;
    const tel = document.getElementById('perfil-tel').value;

    // 1. Salva no banco de dados local do navegador
    localStorage.setItem('user_cpf', cpf);
    localStorage.setItem('user_tel', tel);

    // 2. Trava os campos novamente
    document.getElementById('perfil-cpf').disabled = true;
    document.getElementById('perfil-tel').disabled = true;
    document.getElementById('perfil-cpf').classList.remove('editando');
    document.getElementById('perfil-tel').classList.remove('editando');

    document.getElementById('btn-salvar-perfil').style.display = 'none';
    document.getElementById('btn-alterar-perfil').style.display = 'block';

    alert("✅ Dados salvos no seu navegador!");
}

function carregarDadosSalvos() {
    const cpfSalvo = localStorage.getItem('user_cpf');
    const telSalvo = localStorage.getItem('user_tel');

    if (cpfSalvo) {
        document.getElementById('perfil-cpf').value = cpfSalvo;
    }
    if (telSalvo) {
        document.getElementById('perfil-tel').value = telSalvo;
    }
}

// Chame essa função dentro do seu DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    configurarInterface();
    renderizarEnderecos();
    carregarDadosSalvos(); // <-- Adicione isso aqui!
});

// 9. FINALIZAÇÃO E MÁSCARAS (CPF/TEL)
// 1. BANCO DE DADOS COMPLETO
const produtosLoja = [
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg", "img/bape-2.jpg"] },
    { id: 102, name: "Conjunto BAPE Azul", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 103, name: "Conjunto BAPE Verde", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 104, name: "Conjunto BAPE Preto", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 105, name: "Conjunto BAPE Branco", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] },
    { id: 106, name: "Conjunto BAPE Camo", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", fotos: ["img/cjbl.jpg"] }
];

// Carrinho Global
let itensNoCarrinho = [];

// 2. FUNÇÃO PARA GERAR A VITRINE NA TELA
function renderizarVitrines() {
    const grid = document.querySelector('.produtos-grid');
    if (!grid) return;

    grid.innerHTML = produtosLoja.map(p => `
        <div class="produto-card">
            <div class="produto-img">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="produto-info">
                <h3>${p.name}</h3>
                <p class="preco-original">R$ 350,00</p>
                <p class="preco-atual">R$ ${p.price}</p>
                <button class="btn-comprar" onclick="abrirZoomV2(${p.id})">Ver Detalhes</button>
            </div>
        </div>
    `).join('');
}

// 3. FUNÇÃO PARA ADICIONAR AO CARRINHO (Sincronizada)
window.adicionarAoCarrinho = function(nome, preco, img, tamanho) {
    // Converte o preço string para número real
    const precoNum = parseFloat(preco.toString().replace('R$', '').replace('.', '').replace(',', '.').trim());

    const novoItem = {
        nome: nome,
        preco: precoNum,
        img: img,
        tamanho: tamanho,
        quantidade: 1
    };

    itensNoCarrinho.push(novoItem);
    
    // ATUALIZA A TELA DO CARRINHO NA HORA
    window.atualizarCarrinhoHTML();

    // Abre o painel para mostrar o item adicionado
    if (typeof window.alternarTela === 'function') {
        window.alternarTela('painel');
        window.abrirSubPagina('carrinho');
    }
};

// 4. FUNÇÃO QUE DESENHA O CARRINHO (Resolve o problema de ter que relogar)
window.atualizarCarrinhoHTML = function() {
    const listaUI = document.getElementById('lista-carrinho');
    const totalUI = document.getElementById('total-carrinho');
    
    if (!listaUI) return;

    if (itensNoCarrinho.length === 0) {
        listaUI.innerHTML = "<p style='text-align:center; padding:20px;'>Seu carrinho está vazio.</p>";
        if (totalUI) totalUI.innerText = "0,00";
        return;
    }

    let subtotal = 0;
    listaUI.innerHTML = itensNoCarrinho.map((item, index) => {
        subtotal += item.preco;
        return `
            <div class="item-carrinho" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #222;">
                <img src="${item.img}" style="width:50px; border-radius:5px;">
                <div style="flex:1;">
                    <h4 style="font-size:14px; margin:0;">${item.nome}</h4>
                    <p style="font-size:12px; color:#DAA520; margin:2px 0;">Tam: ${item.tamanho}</p>
                    <p style="font-size:13px; margin:0;">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button onclick="removerDoCarrinho(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:20px;">&times;</button>
            </div>
        `;
    }).join('');

    if (totalUI) totalUI.innerText = subtotal.toFixed(2).replace('.', ',');
};

window.removerDoCarrinho = function(index) {
    itensNoCarrinho.splice(index, 1);
    window.atualizarCarrinhoHTML();
};

// 5. MÁSCARAS E INICIALIZAÇÃO
window.mascaraCPF = (i) => {
    let v = i.value.replace(/\D/g, "").slice(0, 11);
    i.value = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

window.mascaraTel = (i) => {
    let v = i.value.replace(/\D/g, "").slice(0, 11);
    i.value = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
};

document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    
    // Recuperar login salvo para o perfil
    const cpf = localStorage.getItem('user_cpf');
    if (cpf && document.getElementById('perfil-cpf')) {
        document.getElementById('perfil-cpf').value = cpf;
    }
});
