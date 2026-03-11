// 1. BANCO DE DADOS
const produtosLoja = [
    // PROMOÇÕES
    { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: ["img/cjbl.jpg"] },
    { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },
    { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: "img/cjbl.jpg", categoria: "promocoes", galeria: [] },

    // NOCTA
    { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: "img/nntc.png", categoria: "nocta", galeria: [] },
    { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: "img/nkcv.png", categoria: "nocta", galeria: [] },
    { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto.", price: "450,00", img: "img/nktc.jpg", categoria: "nocta", galeria: [] },
    { id: 204, name: "Pulseira Classic", price: "150,00", img: "img/PulseiraClassic.jpg", categoria: "nocta", galeria: [] },
    { id: 205, name: "Pulseira Gold Line", price: "150,00", img: "img/PulseiraGoldLine.jpg", categoria: "nocta", galeria: [] },
    { id: 206, name: "Pulseira Deluxe", price: "150,00", img: "img/PulseiraDeluxe.jpg", categoria: "nocta", galeria: [] },

    // STÜSSY
    { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: "img/stmtb.jpg", categoria: "stussy", galeria: [] },
    { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: "img/stlpp.jpg", categoria: "stussy", galeria: [] },
    { id: 303, name: "Stüssy Veludo B", price: "150,00", img: "img/stvlb.jpg", categoria: "stussy", galeria: [] },
    { id: 304, name: "Stüssy Veludo P", price: "150,00", img: "img/stvlp.jpg", categoria: "stussy", galeria: [] },
    { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: "img/stlpb.jpg", categoria: "stussy", galeria: [] },
    { id: 306, name: "Stüssy Bordada B", price: "150,00", img: "img/stbdb.jpg", categoria: "stussy", galeria: [] }
];

let itensNoCarrinho = [];

window.abrirModalProduto = function(nome, preco, img) {
    const modal = document.getElementById('modal-detalhe-produto'); // Certifique-se de ter esse ID no HTML
    
    // Injeta o conteúdo no modal
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="fecharModal()">&times;</span>
            <img src="${img}" style="width:100%; max-width:300px;">
            <h3>${nome}</h3>
            <p style="color: #DAA520; font-weight: bold;">R$ ${preco.toFixed(2)}</p>
            
            <label>Escolha o Tamanho:</label>
            <select id="escolha-tamanho" style="width: 100%; padding: 5px; margin: 10px 0; background: #222; color: #fff; border: 1px solid #444;">
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
            </select>
            
            <button class="login-button" onclick="adicionarAoCarrinho('${nome}', ${preco})">ADICIONAR AO CARRINHO</button>
        </div>
    `;
    modal.style.display = "block";
};

// 2. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrines();
    configurarInterface();
});

// 3. RENDERIZAR VITRINES (Atualizado para abrir o Modal Profissional)
function renderizarVitrines() {
    const categorias = ['promocoes', 'nocta', 'stussy'];
    categorias.forEach(cat => {
        const elemento = document.getElementById(`vitrine-${cat}`);
        if (elemento) {
            const produtosFiltrados = produtosLoja.filter(p => p.categoria === cat);
            elemento.innerHTML = produtosFiltrados.map(p => `
                <div class="produto">
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200?text=TZAD'">
                    <h4>R$ ${p.price}</h4>
                    <p>${p.name}</p>
                    <button class="btn-comprar" onclick="abrirModalZoom('${p.name}', '${p.price}', '${p.img}', ${JSON.stringify(p.galeria || [])})">
                        Ver Detalhes
                    </button>
                </div>
            `).join('');
        }
    });
}

// 4. INTERFACE E ABERTURA DA JANELA
function configurarInterface() {
    const loginWindow = document.getElementById('login-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const formLogin = document.getElementById('form-executa-login');
    const btnLogout = document.getElementById('btn-logout');

    // Abertura Forçada do Carrinho (Ignora conflitos)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.cart-icon')) {
            e.preventDefault();
            if (loginWindow) loginWindow.style.display = 'block';
        }
    });

    if (minimizeBtn && loginWindow) {
        minimizeBtn.onclick = () => loginWindow.style.display = 'none';
    }

    // Lógica de Login (Pega nome do e-mail e muda de tela)
    // Lógica de Login (Pega nome do e-mail e muda de tela)
    if (formLogin) {
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const nomeUser = email.split('@')[0];
            
            // 1. Atualiza a saudação lá no topo do painel
            const displayNome = document.getElementById('user-name-display');
            if (displayNome) displayNome.innerText = nomeUser.toUpperCase();
            
            // 2. Preenche automaticamente os dados na aba "Meu Perfil"
            const perfilEmail = document.getElementById('perfil-email');
            const perfilNome = document.getElementById('perfil-nome');
            
            if (perfilEmail) perfilEmail.innerText = email;
            if (perfilNome) perfilNome.innerText = nomeUser.toUpperCase();
            
            // 3. Muda para a tela do painel
            alternarTela('painel');
        };
    }

    // Ação de Logout
    if (btnLogout) {
        btnLogout.onclick = () => {
            alternarTela('login');
            document.getElementById('form-executa-login').reset();
        };
    }
}

// 5. TELAS (Mecânica de Injeção)
window.alternarTela = function(tela) {
    const login = document.getElementById('estado-login');
    const cadastro = document.getElementById('estado-cadastro');
    const painel = document.getElementById('estado-painel');
    const titulo = document.getElementById('titulo-janela');

    if (login) login.style.display = 'none';
    if (cadastro) cadastro.style.display = 'none';
    if (painel) painel.style.display = 'none';

    if (tela === 'cadastro' && cadastro) {
        cadastro.style.display = 'block';
        titulo.innerText = "CRIAR CONTA";
    } else if (tela === 'login' && login) {
        login.style.display = 'block';
        titulo.innerText = "LOGIN / CARRINHO";
    } else if (tela === 'painel' && painel) {
        painel.style.display = 'block';
        titulo.innerText = "PAINEL DO CLIENTE";
        atualizarCarrinhoVisual();
    }
};

// ... (mantenha os pontos 1 ao 5 como já estão)

// 6. NAVEGAÇÃO INTERNA DO PAINEL (ADICIONE ISSO AQUI)
window.abrirSubPagina = function(abaId) {
    const abas = ['carrinho', 'perfil', 'mensagens', 'enderecos', 'rastrear'];
    const menuNavegacao = document.getElementById('menu-navegacao-painel');
    
    // 1. Esconde ou Mostra as abas de conteúdo
    abas.forEach(aba => {
        const elemento = document.getElementById(`aba-${aba}`);
        if (elemento) {
            elemento.style.display = (aba === abaId) ? 'block' : 'none';
        }
    });

    // 2. Lógica do Menu de Botões:
    // Se estiver no 'carrinho', o menu aparece (grid). 
    // Se entrar em qualquer outra subpágina, o menu some (none).
    if (menuNavegacao) {
        menuNavegacao.style.display = (abaId === 'carrinho') ? 'grid' : 'none';
    }
};

// 7. CARRINHO (Adicionar, Remover e Somar)
window.adicionarAoCarrinho = function(id) {
    const p = produtosLoja.find(item => item.id === id);
    if (p) {
        itensNoCarrinho.push(p);
        const win = document.getElementById('login-window');
        if(win) win.style.display = 'block';
        
        // Garante que ao adicionar, ele mostre a aba do carrinho
        abrirSubPagina('carrinho'); 
        atualizarCarrinhoVisual();
    }
};

window.removerItem = function(index) {
    itensNoCarrinho.splice(index, 1);
    atualizarCarrinhoVisual();
};

function atualizarCarrinhoVisual() {
    const lista = document.getElementById('carrinho-lista');
    const precoBrutoTxt = document.getElementById('preco-bruto');
    const valorDescTxt = document.getElementById('valor-desconto');
    const percDescTxt = document.getElementById('txt-perc-desc');
    const totalTxt = document.getElementById('total-carrinho');
    
    if (!lista) return;

    if (itensNoCarrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Seu carrinho está vazio.</p>';
        if(precoBrutoTxt) precoBrutoTxt.innerText = "R$ 0,00";
        if(valorDescTxt) valorDescTxt.innerText = "- R$ 0,00";
        if(percDescTxt) percDescTxt.innerText = "0";
        if(totalTxt) totalTxt.innerText = "R$ 0,00";
        return;
    }

    // 1. RENDERIZAÇÃO DA LISTA (Adicionado o campo Tamanho)
    lista.innerHTML = itensNoCarrinho.map((item, index) => `
        <div style="display:flex; align-items:center; gap:10px; border-bottom:1px solid #333; padding:10px 0;">
            <img src="${item.img}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
            <div style="flex:1; color:white; font-size:11px;">
                ${item.name} <span style="color:#888;">(Tam: ${item.size || 'N/A'})</span><br>
                <strong style="color:#DAA520;">R$ ${item.price}</strong>
            </div>
            <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">X</button>
        </div>
    `).join('');

    // 2. LÓGICA DE CÁLCULO BRUTO
    const somaBruta = itensNoCarrinho.reduce((acc, p) => {
        // Remove pontos de milhar e troca vírgula por ponto para o cálculo
        let valorLimpo = p.price.toString().replace(/\./g, '').replace(',', '.');
        return acc + parseFloat(valorLimpo);
    }, 0);
    
    // 3. CONTAGEM DE CAMISETAS STÜSSY PARA DESCONTO PROGRESSIVO
    let qtdStussy = itensNoCarrinho.filter(item => item.name.includes("Stüssy")).length;
    
    // Desconto Base: 5% se tiver 2 ou mais itens quaisquer
    let percDesconto = (itensNoCarrinho.length >= 2) ? 5 : 0;

    // Bônus Progressivo Stüssy (Soma ao desconto base)
    if (qtdStussy === 2) percDesconto = 16.67;
    else if (qtdStussy === 3) percDesconto = 21.67;
    else if (qtdStussy === 4) percDesconto = 28.33;
    else if (qtdStussy >= 5) percDesconto = 30.00;

    // 4. CÁLCULOS FINAIS
    const valorAbatido = somaBruta * (percDesconto / 100);
    const totalComDesconto = somaBruta - valorAbatido;
    
    // 5. ATUALIZAÇÃO DOS TEXTOS
    if(precoBrutoTxt) precoBrutoTxt.innerText = `R$ ${somaBruta.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if(percDescTxt) percDescTxt.innerText = percDesconto.toFixed(2);
    if(valorDescTxt) valorDescTxt.innerText = `- R$ ${valorAbatido.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if(totalTxt) totalTxt.innerText = `R$ ${totalComDesconto.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// 8. FINALIZAR (WHATSAPP)
document.addEventListener('click', (e) => {
    // Note que mudei para e.target.closest ou e.target.id para ser mais preciso
    if (e.target && (e.target.id === 'btn-finalizar' || e.target.innerText === 'PAGAR')) {
        if (itensNoCarrinho.length === 0) return alert("Carrinho vazio!");
        let msg = "Olá TZAD! Pedido:%0A";
        itensNoCarrinho.forEach(i => msg += `- ${i.name}%0A`);
    
        
        const total = document.getElementById('total-carrinho').innerText;
        msg += `%0A*Total a pagar: ${total}*`;
        
        window.open(`https://wa.me/5511999999999?text=${msg}`, '_blank');
    }
});

// Função para abrir/fechar detalhes da compra
window.toggleDetalhes = function(id) {
    const detalhe = document.getElementById(`detalhe-compra-${id}`);
    const btn = document.getElementById(`btn-ver-${id}`);
    
    if (detalhe) {

        
        if (detalhe.style.display === "none" || detalhe.style.display === "") {
            detalhe.style.display = "block";
            btn.innerText = "[ recolher ]";
        } else {
            detalhe.style.display = "none";
            btn.innerText = "[ ver mais ]";
        }
    }
};// Função para Salvar CPF e Telefone
window.salvarDadosPerfil = function() {
    const cpf = document.getElementById('perfil-cpf').value;
    const tel = document.getElementById('perfil-tel').value;

    if (cpf === "" || tel === "") {
        alert("Por favor, preencha o CPF e o Telefone antes de salvar.");
        return;
    }

    // Aqui no futuro enviaremos para um banco de dados real (Firebase/Node)
    console.log("Dados salvos no sistema:", { cpf, tel });
    
    // Feedback visual para o usuário
    const btn = event.target;
    const textoOriginal = btn.innerText;
    btn.innerText = "DADOS SALVOS! ✓";
    btn.style.color = "#4CAF50";
    btn.style.borderColor = "#4CAF50";

    setTimeout(() => {
        btn.innerText = textoOriginal;
        btn.style.color = "#DAA520";
        btn.style.borderColor = "#DAA520";
    }, 2000);
}

// MÁSCARA CPF
window.mascaraCPF = function(i) {
    let v = i.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    i.value = v;
};

// MÁSCARA TELEFONE
window.mascaraTel = function(i) {
    let v = i.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    i.value = v;
};

// FUNÇÃO SALVAR COM FEEDBACK
window.salvarDadosPerfil = function() {
    const cpf = document.getElementById('perfil-cpf').value;
    const tel = document.getElementById('perfil-tel').value;

    if (cpf.length < 14 || tel.length < 14) {
        alert("⚠️ Por favor, preencha o CPF e o Telefone completos.");
        return;
    }

    // Simulação de salvamento
    const btn = event.target;
    btn.innerText = "DADOS SALVOS! ✓";
    btn.style.borderColor = "#4CAF50";
    btn.style.color = "#4CAF50";

    setTimeout(() => {
        btn.innerText = "SALVAR DADOS";
        btn.style.borderColor = "#DAA520";
        btn.style.color = "#DAA520";
    }, 2000);
};

let meusEnderecos = [];

window.salvarEndereco = function() {
    const rua = document.getElementById('end-rua').value;
    const num = document.getElementById('end-numero').value;
    const bairro = document.getElementById('end-bairro').value;
    const estado = document.getElementById('end-estado').value;
    const ref = document.getElementById('end-ref').value;

    // Validação simples (Referência é opcional)
    if (!rua || !num || !bairro || !estado) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Criar objeto do endereço
    const novoEnd = {
        id: Date.now(),
        rua, num, bairro, estado, ref
    };

    // Adicionar à lista e limpar campos
    meusEnderecos.push(novoEnd);
    limparCamposEndereco();
    renderizarEnderecos();
};

function limparCamposEndereco() {
    document.getElementById('end-rua').value = "";
    document.getElementById('end-numero').value = "";
    document.getElementById('end-bairro').value = "";
    document.getElementById('end-estado').value = "";
    document.getElementById('end-ref').value = "";
}

function renderizarEnderecos() {
    const container = document.getElementById('lista-enderecos-salvos');
    if (!container) return;

    if (meusEnderecos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #555; font-size: 11px; padding: 10px;">Nenhum endereço cadastrado.</p>';
        return;
    }

    container.innerHTML = meusEnderecos.map(end => `
        <div class="compra-card" style="background: #0a0a0a; border: 1px solid #222; padding: 10px; border-radius: 6px; position: relative;">
            <div style="font-size: 11px; color: #fff; line-height: 1.4;">
                <strong>${end.rua}, ${end.num}</strong><br>
                ${end.bairro} - ${end.estado.toUpperCase()}<br>
                ${end.ref ? `<small style="color: #888;">Ref: ${end.ref}</small>` : ''}
            </div>
            <button onclick="removerEndereco(${end.id})" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: #ff4444; cursor: pointer; font-weight: bold;">X</button>
        </div>
    `).join('');
}

window.removerEndereco = function(id) {
    meusEnderecos = meusEnderecos.filter(e => e.id !== id);
    renderizarEnderecos();
};

window.abrirModalZoom = function(nome, preco, imgPrincipal, fotosExtras = []) {
    const modal = document.getElementById('modal-produto');
    const imgMain = document.getElementById('img-principal-zoom');
    const nomeTxt = document.getElementById('zoom-nome-produto');
    const containerThumbs = document.getElementById('miniaturas-container');
    const btnAdd = document.getElementById('btn-add-zoom');

    nomeTxt.innerText = nome;
    imgMain.src = imgPrincipal;

    // LÓGICA AUTOMÁTICA:
    // Se fotosExtras estiver vazio, criamos um array com a foto principal repetida 6x
    // Se fotosExtras TIVER fotos, usamos as fotos que você colocar lá
    let listaDeFotos = fotosExtras.length > 0 ? fotosExtras : Array(6).fill(imgPrincipal);

    let htmlThumbs = '';
    listaDeFotos.forEach((foto, index) => {
        htmlThumbs += `
            <img src="${foto}" 
                 class="thumb-item ${index === 0 ? 'thumb-active' : ''}" 
                 onclick="trocarImagemZoom('${foto}', this)">
        `;
    });
    
    containerThumbs.innerHTML = htmlThumbs;

    // Configura o botão de adicionar
    btnAdd.onclick = () => {
        const tamanho = document.getElementById('zoom-tamanho').value;
        // Aqui garantimos que o item vai para o carrinho com o TAMANHO selecionado
        itensNoCarrinho.push({ 
            name: nome, 
            price: preco, 
            img: imgPrincipal, 
            size: tamanho 
        });
        fecharModalZoom();
        atualizarCarrinhoVisual(); // Chama sua função que calcula os descontos Stüssy
    };

    modal.style.display = 'flex';
};
