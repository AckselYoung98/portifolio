// script-memoria.js
const icons = [
  'fa-rocket', 'fa-star', 'fa-heart',
  'fa-moon', 'fa-bolt', 'fa-leaf',
];

let grid = document.querySelector('.grid');
let movimentosSpan = document.getElementById('movimentos');
let reiniciarBtn = document.getElementById('reiniciar');
let movimentos = 0;
let cartasViradas = [];
let bloqueio = false;

function criarCartas() {
  const pares = [...icons, ...icons];
  const embaralhadas = pares.sort(() => 0.5 - Math.random());
  grid.innerHTML = '';
  movimentos = 0;
  movimentosSpan.textContent = movimentos;
  cartasViradas = [];

  embaralhadas.forEach(icon => {
    const carta = document.createElement('div');
    carta.classList.add('card');
    carta.dataset.icone = icon;
    carta.innerHTML = '<i class="fas fa-question"></i>';
    carta.addEventListener('click', virarCarta);
    grid.appendChild(carta);
  });
}

function virarCarta(e) {
  if (bloqueio) return;
  const carta = e.currentTarget;
  if (carta.classList.contains('virada') || cartasViradas.includes(carta)) return;

  carta.innerHTML = `<i class="fas ${carta.dataset.icone}"></i>`;
  carta.classList.add('virada');
  cartasViradas.push(carta);

  if (cartasViradas.length === 2) {
    bloqueio = true;
    movimentos++;
    movimentosSpan.textContent = movimentos;

    const [c1, c2] = cartasViradas;
    if (c1.dataset.icone === c2.dataset.icone) {
      cartasViradas = [];
      bloqueio = false;
    } else {
      setTimeout(() => {
        c1.innerHTML = '<i class="fas fa-question"></i>';
        c2.innerHTML = '<i class="fas fa-question"></i>';
        c1.classList.remove('virada');
        c2.classList.remove('virada');
        cartasViradas = [];
        bloqueio = false;
      }, 1000);
    }
  }
}

reiniciarBtn.addEventListener('click', criarCartas);
criarCartas();
