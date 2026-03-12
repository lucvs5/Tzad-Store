// 1. FUNÇÃO DO CARROSSEL PROFISSIONAL (Com Animação)
window.abrirModalZoom = function(nome, preco, imgPrincipal, fotosExtras = []) {
    const modal = document.getElementById('modal-produto');
    const imgMain = document.getElementById('img-principal-zoom');
    const nomeTxt = document.getElementById('zoom-nome-produto');
    const containerThumbs = document.getElementById('miniaturas-container');
    const btnAdd = document.getElementById('btn-add-zoom');
    const selectTamanho = document.getElementById('zoom-tamanho');

    nomeTxt.innerText = nome;
    imgMain.src = imgPrincipal;

    btnAdd.innerText = "ADICIONAR AO CARRINHO";
    btnAdd.style.background = "#DAA520";
    if (selectTamanho) selectTamanho.value = "";

    let listaDeFotos = fotosExtras.length > 0 ? fotosExtras : Array(6).fill(imgPrincipal);

    containerThumbs.innerHTML = listaDeFotos.map((foto, index) => `
        <img src="${foto}" 
             class="thumb-item ${index === 0 ? 'thumb-active' : ''}" 
             onclick="trocarImagemZoom('${foto}', this)">
    `).join('');

    btnAdd.onclick = () => {
        const tamanho = selectTamanho ? selectTamanho.value : "";
        const painelUsuario = document.getElementById('estado-painel');

        if (!tamanho || tamanho === "") {
            alert("⚠️ Selecione o tamanho!");
            return;
        }

        if (painelUsuario && painelUsuario.style.display !== 'block') {
            document.getElementById('login-window').style.display = 'block';
            if(typeof alternarTela === 'function') alternarTela('login');
            alert("🔒 Faça login para comprar.");
            return; 
        }

        if (typeof itensNoCarrinho !== 'undefined') {
            itensNoCarrinho.push({ name: nome, price: preco, img: imgPrincipal, size: tamanho });
            btnAdd.innerText = "ADICIONADO! ✓";
            btnAdd.style.background = "#4CAF50";
            setTimeout(() => {
                fecharModalZoom();
                if(typeof atualizarCarrinhoVisual === 'function') atualizarCarrinhoVisual();
            }, 800);
        }
    };

    // --- INÍCIO DA ANIMAÇÃO DE ABERTURA ---
    modal.style.display = 'flex'; 
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    // --- FIM DA ANIMAÇÃO ---
};

// AJUSTE NA FUNÇÃO DE FECHAR (Para esperar a animação acabar)
window.fecharModalZoom = function() {
    const modal = document.getElementById('modal-produto');
    modal.classList.remove('active'); // Remove a classe que dá opacidade e escala
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // 300ms é o tempo que definimos no CSS transition
};

window.trocarImagemZoom = function(src, elemento) {
    document.getElementById('img-principal-zoom').src = src;
    document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('thumb-active'));
    elemento.classList.add('thumb-active');
};
