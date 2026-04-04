const BASE = "https://raw.githubusercontent.com/lucvs5/Tzad-Store/main/";

const produtosModal = [
  { id: 101, name: "Conjunto BAPE Laranja", price: "250,00", img: BASE+"img/cjbl.jpg", categoria: "promocoes", fotos: [BASE+"img/cjbl.jpg", BASE+"img/bape-2.jpg", BASE+"img/cjbl.jpg", BASE+"img/cjbl.jpg"] },
  { id: 102, name: "Conjunto BAPE Laranja", price: "250,00", img: BASE+"img/cjbl.jpg", categoria: "promocoes", fotos: [BASE+"img/cjbl.jpg", BASE+"img/bape-2.jpg"] },
  { id: 103, name: "Conjunto BAPE Laranja", price: "250,00", img: BASE+"img/cjbl.jpg", categoria: "promocoes", fotos: [BASE+"img/cjbl.jpg"] },
  { id: 104, name: "Conjunto BAPE Laranja", price: "250,00", img: BASE+"img/cjbl.jpg", categoria: "promocoes", fotos: [BASE+"img/cjbl.jpg", BASE+"img/extra.jpg"] },
  { id: 105, name: "Conjunto BAPE Laranja", price: "250,00", img: BASE+"img/cjbl.jpg", categoria: "promocoes", fotos: [BASE+"img/cjbl.jpg"] },
  { id: 106, name: "Conjunto BAPE Laranja", price: "250,00", img: BASE+"img/cjbl.jpg", categoria: "promocoes", fotos: [BASE+"img/cjbl.jpg"] },
  { id: 201, name: "Conjunto Nike x Nocta NNT Cinza", price: "450,00", img: BASE+"img/nntc.png", categoria: "nocta", fotos: [BASE+"img/nntc.png"] },
  { id: 202, name: "Corta Vento Nike x Nocta Preto", price: "400,00", img: BASE+"img/nkcv.png", categoria: "nocta", fotos: [BASE+"img/nkcv.png"] },
  { id: 203, name: "Conjunto Nike Nocta Tech Fleece Preto", price: "450,00", img: BASE+"img/nktc.jpg", categoria: "nocta", fotos: [BASE+"img/nktc.jpg"] },
  { id: 204, name: "Pulseira Classic", price: "150,00", img: BASE+"img/PulseiraClassic.jpg", categoria: "nocta", fotos: [BASE+"img/PulseiraClassic.jpg"] },
  { id: 205, name: "Pulseira Gold Line", price: "150,00", img: BASE+"img/PulseiraGoldLine.jpg", categoria: "nocta", fotos: [BASE+"img/PulseiraGoldLine.jpg"] },
  { id: 206, name: "Pulseira Deluxe", price: "150,00", img: BASE+"img/PulseiraDeluxe.jpg", categoria: "nocta", fotos: [BASE+"img/PulseiraDeluxe.jpg"] },
  { id: 301, name: "STÜSSY METALHEADZ (refletiva)", price: "150,00", img: BASE+"img/stmtb.jpg", categoria: "stussy", fotos: [BASE+"img/stmtb.jpg"] },
  { id: 302, name: "Stüssy Logo Padrão P.", price: "150,00", img: BASE+"img/stlpp.jpg", categoria: "stussy", fotos: [BASE+"img/stlpp.jpg"] },
  { id: 303, name: "Stüssy Veludo B", price: "150,00", img: BASE+"img/stvlb.jpg", categoria: "stussy", fotos: [BASE+"img/stvlb.jpg"] },
  { id: 304, name: "Stüssy Veludo P", price: "150,00", img: BASE+"img/stvlp.jpg", categoria: "stussy", fotos: [BASE+"img/stvlp.jpg"] },
  { id: 305, name: "Stüssy Logo Padrão B.", price: "150,00", img: BASE+"img/stlpb.jpg", categoria: "stussy", fotos: [BASE+"img/stlpb.jpg"] },
  { id: 306, name: "Stüssy Bordada B", price: "150,00", img: BASE+"img/stbdb.jpg", categoria: "stussy", fotos: [BASE+"img/stbdb.jpg"] },
];

let tamanhoSelecionado = null;

function abrirZoom(produtoId) {
  const produto = produtosModal.find(p => p.id === produtoId);
  if (!produto) return;

  const overlay = document.getElementById("zoom-v2-overlay");
  const imgPrincipal = document.getElementById("zoom-v2-img");
  const miniaturas = document.getElementById("zoom-v2-miniaturas");
  const nome = document.getElementById("zoom-v2-nome");
  const preco = document.getElementById("zoom-v2-preco");
  const btnAdd = document.getElementById("zoom-v2-btn-add");

  imgPrincipal.src = produto.fotos[0] || produto.img;
  nome.textContent = produto.name;
  preco.textContent = "R$ " + produto.price;

  miniaturas.innerHTML = "";
  produto.fotos.forEach(function(foto, idx) {
    const img = document.createElement("img");
    img.src = foto;
    img.alt = produto.name + " " + (idx + 1);
    if (idx === 0) img.classList.add("ativo");
    img.addEventListener("click", function() {
      imgPrincipal.src = foto;
      miniaturas.querySelectorAll("img").forEach(function(el) { el.classList.remove("ativo"); });
      img.classList.add("ativo");
    });
    miniaturas.appendChild(img);
  });

  tamanhoSelecionado = null;
  document.querySelectorAll(".btn-tamanho").forEach(function(btn) { btn.classList.remove("tam-ativo"); });
  btnAdd.className = "btn-add-carrinho inativo";

  document.querySelectorAll(".btn-tamanho").forEach(function(btn) {
    btn.onclick = function() {
      document.querySelectorAll(".btn-tamanho").forEach(function(b) { b.classList.remove("tam-ativo"); });
      btn.classList.add("tam-ativo");
      tamanhoSelecionado = btn.textContent;
      btnAdd.className = "btn-add-carrinho ativo";
    };
  });

  btnAdd.onclick = function() {
    if (!tamanhoSelecionado) return;
    if (typeof itensNoCarrinho !== "undefined") {
      itensNoCarrinho.push({
        nome: produto.name,
        preco: produto.price,
        img: produto.img,
        tamanho: tamanhoSelecionado,
        quantidade: 1
      });
      if (typeof atualizarCarrinhoVisual === "function") {
        atualizarCarrinhoVisual();
      }
    }
    overlay.classList.remove("ativo");
    var loginWindow = document.querySelector(".login-window");
    if (loginWindow) loginWindow.classList.add("ativo");
  };

  overlay.classList.add("ativo");
}

function fecharZoom() {
  document.getElementById("zoom-v2-overlay").classList.remove("ativo");
}

function scrollMiniaturas(direcao) {
  var container = document.getElementById("zoom-v2-miniaturas");
  var scroll = direcao === "esquerda" ? -80 : 80;
  container.scrollBy({ left: scroll, behavior: "smooth" });
}

document.addEventListener("click", function(e) {
  var overlay = document.getElementById("zoom-v2-overlay");
  if (e.target === overlay) fecharZoom();
});
