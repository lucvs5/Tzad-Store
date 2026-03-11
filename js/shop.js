window.addEventListener('load', renderVitrines);

function abrirModalCompra(id, cat) {
    const product = catalog[cat].find(p => p.id === id);
    if (window.abrirModal) window.abrirModal(product);
}
