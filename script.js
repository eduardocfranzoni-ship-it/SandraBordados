/* ========================================
   SANDRA MARCIA BORDADOS - JAVASCRIPT
   ======================================== */

// ========================================
// ATUALIZA O ANO NO RODAPÉ
// ========================================
document.getElementById('ano').textContent = new Date().getFullYear();

// ========================================
// FAKE SUBMIT DO FORMULÁRIO
// ========================================
function fakeSubmit(e) {
  e.preventDefault();
  const nome = document.getElementById('f_nome')?.value || '';
  alert('Obrigado, ' + (nome ? nome + '!' : '') + ' Sua mensagem foi recebida. Entrarei em contato em breve.');

  // Limpa os campos
  if (document.getElementById('f_nome')) document.getElementById('f_nome').value = '';
  if (document.getElementById('f_email')) document.getElementById('f_email').value = '';
  if (document.getElementById('f_msg')) document.getElementById('f_msg').value = '';
}

// ========================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ========================================
// Considera header + faixa = 132px
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 132;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ========================================
// LIGHTBOX FUNCTIONS
// ========================================
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lb.style.display = "flex";
  lb.setAttribute('aria-hidden', 'false');
  document.addEventListener('keydown', escClose);
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  lb.style.display = "none";
  img.src = '';
  lb.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', escClose);
}

function escClose(e) {
  if (e.key === 'Escape') closeLightbox();
}

// ========================================
// CARROSSEL - SETAS E ARRASTAR
// ========================================
(function() {
  function scrollByStep(car, step) {
    const item = car.querySelector('.carousel-item');
    const gap = parseInt(getComputedStyle(car).gap || 16);
    const itemWidth = item ? item.getBoundingClientRect().width + gap : 220;
    car.scrollBy({ left: step * itemWidth, behavior: 'smooth' });
  }

  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const car = wrap.querySelector('.carousel');
    if (!car) return;

    const btnLeft = wrap.querySelector('.carousel-btn.left');
    const btnRight = wrap.querySelector('.carousel-btn.right');

    // Botões de navegação
    if (btnLeft && btnRight) {
      btnLeft.addEventListener('click', () => scrollByStep(car, -1));
      btnRight.addEventListener('click', () => scrollByStep(car, 1));
    }

    // Arrastar com mouse
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    car.addEventListener('mousedown', e => {
      isDown = true;
      car.classList.add('active');
      startX = e.pageX - car.offsetLeft;
      scrollLeft = car.scrollLeft;
    });

    car.addEventListener('mouseleave', () => {
      isDown = false;
      car.classList.remove('active');
    });

    car.addEventListener('mouseup', () => {
      isDown = false;
      car.classList.remove('active');
    });

    car.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - car.offsetLeft;
      const walk = (x - startX) * 1;
      car.scrollLeft = scrollLeft - walk;
    });

    // Navegação por teclado quando carrossel está focado
    car.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByStep(car, -1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByStep(car, 1);
      }
    });

    // Garantir que carrossel é focável pelo teclado
    car.setAttribute('tabindex', '0');
  });
})();
