// =============================================
// MODAL DE PRODUTO COM CARROSSEL
// Integrado com o carrinho existente (itensNoCarrinho)
// =============================================

let fotoAtualIndex = 0;
let fotosDoModal = [];
let produtoAtualModal = null;
let tamanhoSelecionado = null;

window.abrirModal = function(product) {
  produtoAtualModal = product;
  fotosDoModal = product.fotos && product.fotos.length > 0 ? product.fotos : [product.img];
  fotoAtualIndex = 0;
  tamanhoSelecionado = null;

  let modal = document.getElementById('modal-compra');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-compra';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-caixa">
      <span class="modal-fechar" onclick="fecharModal()">&times;</span>

      <div class="modal-foto-principal-container">
        <img id="modal-foto-principal" src="${fotosDoModal[0]}" alt="${product.name}" class="modal-foto-principal" />
      </div>

      ${fotosDoModal.length > 1 ? `
      <div class="modal-carrossel-container">
        <button class="modal-seta seta-esq" onclick="scrollMiniaturas('esq')">&lsaquo;</button>
        <div class="modal-miniaturas" id="modal-miniaturas">
          ${fotosDoModal.map((foto, i) => `
            <img src="${foto}" alt="Foto ${i+1}" class="modal-thumb ${i === 0 ? 'thumb-ativa' : ''}" onclick="selecionarFoto(${i})" />
          `).join('')}
        </div>
        <button class="modal-seta seta-dir" onclick="scrollMiniaturas('dir')">&rsaquo;</button>
      </div>
      ` : ''}

      <h3 class="modal-nome">${product.name}</h3>
      <p class="modal-preco">R$ ${product.price}</p>

      <div class="modal-tamanhos">
        <p class="modal-tamanho-label">Tamanho:</p>
        <div class="modal-tamanho-opcoes">
          <button class="modal-tam-btn" onclick="selecionarTamanho(this, 'P')">P</button>
          <button class="modal-tam-btn" onclick="selecionarTamanho(this, 'M')">M</button>
          <button class="modal-tam-btn" onclick="selecionarTamanho(this, 'G')">G</button>
          <button class="modal-tam-btn" onclick="selecionarTamanho(this, 'GG')">GG</button>
        </div>
      </div>

      <button class="modal-btn-carrinho" id="btn-add-carrinho" onclick="adicionarDoModal()" disabled>
        Adicionar ao Carrinho
      </button>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.selecionarFoto = function(index) {
  fotoAtualIndex = index;
  document.getElementById('modal-foto-principal').src = fotosDoModal[index];
  document.querySelectorAll('.modal-thumb').forEach((el, i) => {
    el.classList.toggle('thumb-ativa', i === index);
  });
};

window.scrollMiniaturas = function(direcao) {
  const container = document.getElementById('modal-miniaturas');
  if (!container) return;
  const scrollAmount = direcao === 'esq' ? -80 : 80;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

window.selecionarTamanho = function(btn, tam) {
  tamanhoSelecionado = tam;
  document.querySelectorAll('.modal-tam-btn').forEach(b => b.classList.remove('tam-ativo'));
  btn.classList.add('tam-ativo');
  document.getElementById('btn-add-carrinho').disabled = false;
};

window.adicionarDoModal = function() {
  if (!produtoAtualModal || !tamanhoSelecionado) return;

  const novoItem = {
    name: produtoAtualModal.name,
    price: produtoAtualModal.price,
    img: produtoAtualModal.img,
    size: tamanhoSelecionado
  };

  if (typeof itensNoCarrinho !== 'undefined') {
    itensNoCarrinho.push(novoItem);
    if (typeof atualizarCarrinhoVisual === 'function') {
      atualizarCarrinhoVisual();
    }
  }

  abrirCarrinhoSobreModal();
};

window.abrirCarrinhoSobreModal = function() {
  let cartModal = document.getElementById('modal-carrinho-sobre');
  if (!cartModal) {
    cartModal = document.createElement('div');
    cartModal.id = 'modal-carrinho-sobre';
    cartModal.className = 'cart-modal-overlay';
    document.body.appendChild(cartModal);
  }

  let total = 0;
  let listaHTML = '';

  if (typeof itensNoCarrinho !== 'undefined' && itensNoCarrinho.length > 0) {
    listaHTML = itensNoCarrinho.map((item, idx) => {
      const preco = parseFloat(item.price.replace('.', '').replace(',', '.'));
      total += preco;
      return `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <p class="cart-item-nome">${item.name}</p>
            <p class="cart-item-tam">Tam: ${item.size}</p>
            <p class="cart-item-preco">R$ ${item.price}</p>
          </div>
          <span class="cart-item-remover" onclick="removerDoCarrinhoModal(${idx})">&times;</span>
        </div>
      `;
    }).join('');
  } else {
    listaHTML = '<p class="cart-vazio">Carrinho vazio.</p>';
  }

  cartModal.innerHTML = `
    <div class="cart-modal-caixa">
      <span class="modal-fechar" onclick="fecharCarrinhoSobreModal()">&times;</span>
      <h2 class="cart-titulo">CARRINHO</h2>
      <div class="cart-lista">${listaHTML}</div>
      <div class="cart-total">
        <span>Total:</span>
        <span class="cart-total-valor">R$ ${total.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  `;

  cartModal.style.display = 'flex';
};

window.fecharCarrinhoSobreModal = function() {
  const el = document.getElementById('modal-carrinho-sobre');
  if (el) el.style.display = 'none';
};

window.removerDoCarrinhoModal = function(idx) {
  if (typeof itensNoCarrinho !== 'undefined') {
    itensNoCarrinho.splice(idx, 1);
    if (typeof atualizarCarrinhoVisual === 'function') {
      atualizarCarrinhoVisual();
    }
    abrirCarrinhoSobreModal();
  }
};

window.fecharModal = function() {
  const el = document.getElementById('modal-compra');
  if (el) el.style.display = 'none';
  document.body.style.overflow = '';
  tamanhoSelecionado = null;
  fecharCarrinhoSobreModal();
};
