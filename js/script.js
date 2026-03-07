// Teste para saber se o JS carregou
console.log("Tzad Store carregada");

// Topo que desce quando a página é rolada
const topo = document.querySelector('.topo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    topo.style.transform = 'translateY(-80px)'; // desce
    topo.style.transition = 'transform 0.3s ease';
  } else {
    topo.style.transform = 'translateY(0)'; // volta ao topo
  }
});
