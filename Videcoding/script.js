// Aprimoramentos opcionais: todo o conteúdo continua disponível sem JavaScript.
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle'), menu = document.querySelector('.site-nav');
menuButton.hidden = false;
menuButton.addEventListener('click', () => {
  const aberto = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', aberto);
});

// Revela blocos editoriais de forma discreta ao entrar na área visível.
const items = document.querySelectorAll('.reveal');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  items.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

// Alterna somente as fotos das peças que têm os dois tons disponíveis.
document.querySelectorAll('[data-color-switch]').forEach((switcher) => {
  const media = switcher.parentElement.querySelector('.product-media'), image = media.querySelector('img');
  switcher.addEventListener('click', ({ target }) => {
    if (!target.matches('button[data-tone]')) return;
    const tone = target.dataset.tone;
    image.src = image.dataset[`${tone}Src`];
    image.alt = image.alt.replace(/Merlot|Off White/i, tone === 'merlot' ? 'Merlot' : 'Off White');
    media.dataset.tone = tone;
    switcher.querySelectorAll('button').forEach((button) => {
      const active = button === target;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active);
    });
  });
});
