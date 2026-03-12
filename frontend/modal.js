// 1. ABRIR MODAL
window.abrirModalZoom = function(nome, preco, imgPrincipal, fotosExtras = []) {
    const modal = document.getElementById('modal-produto');
    const imgMain = document.getElementById('img-principal-zoom');
    const nomeTxt = document.getElementById('zoom-nome-produto');
    const containerThumbs = document.getElementById('miniaturas-container');
    const btnAdd = document.getElementById('btn-add-zoom');
    const selectTamanho = document.getElementById('zoom-tamanho');

    // Preenchimento básico
    if (nomeTxt) nomeTxt.innerText = nome;
    if (imgMain) imgMain.src = imgPrincipal;

    // Reset do botão
    if (btnAdd) {
        btnAdd.innerText = "ADICIONAR AO CARRINHO";
        btnAdd.style.background = "#DAA520";
    }
    if (selectTamanho) selectTamanho.value = "";

    // Miniaturas
    let listaDeFotos = fotosExtras.length > 0 ? fotosExtras : Array(6).fill(imgPrincipal);
    if (containerThumbs) {
        containerThumbs.innerHTML = listaDeFotos.map((foto, index) => `
            <img src="${foto}" 
                 class="thumb-item ${index === 0 ? 'thumb-active' : ''}" 
                 onclick="trocarImagemZoom('${foto}', this)">
        `).join('');
    }

    // Ação do botão Adicionar
    if (btnAdd) {
        btnAdd.onclick = () => {
            const tamanho = selectTamanho ? selectTamanho.value : "";
            if (!tamanho) {
                alert("⚠️ Selecione o tamanho!");
                return;
            }
            // Lógica de adicionar ao carrinho aqui...
            alert("Produto adicionado!");
        };
    }

    // --- A LINHA QUE ESTAVA VERMELHA ---
    if (modal) {
        modal.style.display = 'flex'; // Primeiro o display
        setTimeout(() => {
            modal.classList.add('active'); // Depois a animação
        }, 10);
    }
};

// 2. FECHAR MODAL
window.fecharModalZoom = function() {
    const modal = document.getElementById('modal-produto');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none'; // A OUTRA LINHA VERMELHA
        }, 400);
    }
};

// 3. TROCAR IMAGEM
window.trocarImagemZoom = function(src, elemento) {
    const imgMain = document.getElementById('img-principal-zoom');
    if (imgMain) imgMain.src = src;
    document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('thumb-active'));
    if (elemento) elemento.classList.add('thumb-active');
};
