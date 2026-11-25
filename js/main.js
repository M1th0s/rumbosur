// Header scroll state
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => io.observe(el));

// Stagger reveal for groups
document.querySelectorAll('.cards, .steps, .gallery, .mosaic, .projects-grid').forEach(group => {
  const items = group.querySelectorAll('.reveal');
  items.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nombre = (data.get('nombre') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  if (!nombre || !email) {
    note.textContent = 'Por favor completa tu nombre y correo electrónico.';
    note.style.color = '#b04a3a';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.textContent = 'Ingresa un correo electrónico válido.';
    note.style.color = '#b04a3a';
    return;
  }
  note.style.color = 'var(--green-moss)';
  note.textContent = '¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.';
  form.reset();
});