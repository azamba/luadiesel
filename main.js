// Lua Diesel — menu, seção atual, entradas e a plaqueta.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Menu do celular
(() => {
  const toggle = document.querySelector('.bar-toggle');
  const menu = document.getElementById('menu');
  if (!toggle || !menu) return;
  const set = (open) => { menu.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', open); toggle.textContent = open ? 'Fechar' : 'Menu'; };
  toggle.addEventListener('click', () => set(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
})();

// Link do menu da seção atual
(() => {
  if (!('IntersectionObserver' in window)) return;
  const watch = (links, rootMargin) => {
    const map = new Map();
    links.forEach((a) => { const t = document.querySelector(a.getAttribute('href')); if (t) map.set(t, a); });
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => a.classList.remove('is-on'));
        map.get(e.target)?.classList.add('is-on');
      }
    }, { rootMargin });
    map.forEach((_, t) => io.observe(t));
  };
  watch([...document.querySelectorAll('.bar-nav a')], '-45% 0px -50% 0px');
})();


// Barra: sombra discreta depois que a página rola (o logo não muda de lugar nem de tamanho)
(() => {
  const bar = document.querySelector('.bar');
  if (!bar) return;
  const set = () => bar.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', set, { passive: true });
  set();
})();

// Títulos de seção: divide em palavras para subirem uma a uma
document.querySelectorAll('.head').forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute('aria-label', el.textContent.trim());
  el.innerHTML = words.map((w, k) => `<span class="w" aria-hidden="true"><span style="--k:${k}">${w}</span></span>`).join(' ');
});

// Revelações ao rolar: cada bloco anima uma vez; filhos ganham o índice para o escalonamento
(() => {
  const targets = [...document.querySelectorAll('[data-anim], .head')];
  document.querySelectorAll('[data-anim="rise"], [data-anim="stagger"]').forEach((el) => {
    [...el.children].forEach((child, k) => child.style.setProperty('--k', k));
  });
  if (!('IntersectionObserver' in window)) { targets.forEach((t) => t.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  targets.forEach((t) => io.observe(t));
  // rede de segurança: nada fica escondido se o observador não disparar
  addEventListener('load', () => setTimeout(() => {
    targets.forEach((t) => { const r = t.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) t.classList.add('is-in'); });
  }, 1800));
})();

// A plaqueta inclina levemente acompanhando o mouse
(() => {
  const plate = document.querySelector('.plate');
  const hero = document.querySelector('.hero');
  if (!plate || !hero || reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let raf = 0;
  hero.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = plate.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      plate.style.transition = 'transform 120ms linear';
      plate.style.transform = `rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg)`;
    });
  });
  hero.addEventListener('pointerleave', () => {
    plate.style.transition = 'transform 900ms cubic-bezier(.16, 1, .3, 1)';
    plate.style.transform = '';
  });
})();

// Produtos: contador de componentes e foco na linha do centro da tela
(() => {
  const lines = [...document.querySelectorAll('.line')];
  if (!lines.length || !('IntersectionObserver' in window)) return;
  const countUp = (el) => {
    const to = Number(el.dataset.to);
    if (reduce) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 900;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = 0;
    requestAnimationFrame(tick);
  };
  const seen = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const c = e.target.querySelector('.count');
      if (c) countUp(c);
      seen.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.2 });
  lines.forEach((l) => seen.observe(l));

  // foco: só em telas largas e sem movimento reduzido
  const products = document.querySelector('.products');
  if (reduce || !matchMedia('(min-width: 981px)').matches) return;
  const focus = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle('is-focus', e.isIntersecting);
    products.classList.toggle('has-focus', lines.some((l) => l.classList.contains('is-focus')));
  }, { rootMargin: '-40% 0px -40% 0px' });
  lines.forEach((l) => focus.observe(l));
})();
