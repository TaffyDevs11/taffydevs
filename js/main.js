/* ============================================================
   TaffyDevs — main.js
   Shared across all pages
   ============================================================ */

/* ── SVG ICON SPRITES ─────────────────────────────────────── */
const ICONS = {
  target:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  arrowup:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
  zap:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  gem:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 3 18 3 22 9 12 22 2 9"/><line x1="6" y1="3" x2="2" y2="9"/><line x1="18" y1="3" x2="22" y2="9"/><line x1="2" y1="9" x2="22" y2="9"/></svg>`,
  globe:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  handshake:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>`,
  shield:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  barchart:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  check:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  creditcard:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  phone:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  mappin:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  youtube:     `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>`,
  github:      `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  linkedin:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  arrowleft:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  arrowright:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  download:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  star:        `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  send:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  play:        `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  calendar:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  tag:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  externallink:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  layers:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  menu:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  user:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  image:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  video:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  message:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5A8.48 8.48 0 0 1 21 11v.5z"/></svg>`,
};

/* Helper: render icon */
function icon(name, cls = '') {
  const svg = ICONS[name] || ICONS.star;
  return svg.replace('<svg ', `<svg class="icon ${cls}" `);
}

/* ── LANGUAGE ───────────────────────────────────────────────── */
let currentLang = localStorage.getItem('td-lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('td-lang', lang);
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.classList.toggle('lang-pl', lang === 'pl');

  /* Swap text */
  document.querySelectorAll('[data-lang-' + lang + ']').forEach(el => {
    const val = el.getAttribute('data-lang-' + lang);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
    else el.innerHTML = val;
  });

  /* Logos */
  // Root-level pages use different path
  const isRoot = !window.location.pathname.includes('/pages/');
  const prefix = isRoot ? '' : '../';
  const red  = prefix + 'assets/img/logos/logo-red.png';
  const dark = prefix + 'assets/img/logos/logo-dark.png';

  document.querySelectorAll('.nav-logo-img').forEach(img => {
    img.src = lang === 'pl' ? red : dark;
  });
  document.querySelectorAll('.loader-logo-img').forEach(img => {
    img.src = dark;
  });
  document.querySelectorAll('.footer-logo-img').forEach(img => {
    img.src = dark;
  });

  /* Toggle UI */
  document.querySelectorAll('.lang-lbl-pl').forEach(el => el.classList.toggle('active', lang === 'pl'));
  document.querySelectorAll('.lang-lbl-en').forEach(el => el.classList.toggle('active', lang === 'en'));
  document.querySelectorAll('.toggle-sw').forEach(el => el.setAttribute('aria-checked', lang === 'en'));

  /* Page title & meta */
  const titleEl = document.querySelector('title[data-lang-' + lang + ']') ||
                  document.querySelector('[data-page-title-' + lang + ']');
  if (titleEl) document.title = titleEl.getAttribute('data-page-title-' + lang) || document.title;
}

function toggleLang() {
  applyLang(currentLang === 'en' ? 'pl' : 'en');
}

/* ── LOADER ─────────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const firstVisit = sessionStorage.getItem('td-loader-seen') !== 'true';
  const delay = firstVisit ? 4000 : 1200;
  document.documentElement.style.setProperty('--loader-bar-duration', delay + 'ms');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      sessionStorage.setItem('td-loader-seen', 'true');
    }, delay);
  });
}

/* ── NAVBAR / HAMBURGER ─────────────────────────────────────── */
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* Active nav link */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.includes(path) || (path === 'index.html' && (href === '/' || href === '#'))) {
      a.classList.add('active');
    }
  });

  /* Lang toggles */
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleLang);
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLang(); }
    });
  });

  document.querySelectorAll('.nav-social-icon[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    if (ICONS[name]) el.innerHTML = icon(name, 'icon-sm');
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initSmoothAnchors() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function initFloatingActions() {
  if (document.querySelector('.floating-actions')) return;

  const wrap = document.createElement('div');
  wrap.className = 'floating-actions';
  wrap.innerHTML = `
    <div class="whatsapp-chat" id="whatsapp-chat">
      <button class="floating-btn whatsapp-btn" type="button" aria-label="Open WhatsApp chat">${icon('message')}</button>
      <div class="whatsapp-panel" role="dialog" aria-label="WhatsApp chatbot">
        <div class="whatsapp-title">TaffyDevs WhatsApp</div>
        <p>Hi, I can help with bookings, quotes, and project questions.</p>
        <a href="https://wa.me/48600762551?text=Hi%20TaffyDevs%2C%20I%20need%20help%20with%20a%20project." target="_blank" rel="noopener noreferrer" class="whatsapp-open">Start chat</a>
      </div>
    </div>
    <button class="floating-btn scroll-top-btn" type="button" aria-label="Scroll to top">${icon('arrowup')}</button>
  `;
  document.body.appendChild(wrap);

  const chat = wrap.querySelector('#whatsapp-chat');
  const chatBtn = wrap.querySelector('.whatsapp-btn');
  const topBtn = wrap.querySelector('.scroll-top-btn');
  const updateVisibility = () => wrap.classList.toggle('visible', window.scrollY > 24);

  chatBtn?.addEventListener('click', () => chat?.classList.toggle('open'));
  topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();
}

/* ── TABS (generic) ─────────────────────────────────────────── */
function initTabs(tabSel, panelSel, activeClass = 'active') {
  const tabs = document.querySelectorAll(tabSel);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove(activeClass));
      tab.classList.add(activeClass);
      const target = tab.dataset.tab || tab.dataset.ptab || tab.dataset.btab;
      document.querySelectorAll(panelSel).forEach(p => {
        const id = p.id || p.dataset.panelId;
        p.style.display = id === target ? 'block' : 'none';
        p.classList.toggle(activeClass, id === target);
      });
    });
  });
}

/* ── CURRENCY SWITCH ────────────────────────────────────────── */
function initCurrency() {
  const syms = { pln: 'zł', eur: '€', usd: '$' };
  document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.currency;
      document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.pricing-price').forEach(el => {
        const v = el.dataset[c]; if (!v) return;
        el.innerHTML = '<sup>' + syms[c] + '</sup>' + parseInt(v).toLocaleString();
      });
    });
  });
}

/* ── BOOKING FORM ───────────────────────────────────────────── */
function initBooking() {
  let step = 1;
  const TOTAL = 6;
  let bookingEmailSent = false;

  function updateProgress() {
    document.querySelectorAll('.progress-step').forEach((s, i) => {
      s.classList.remove('active', 'done');
      if (i + 1 === step) s.classList.add('active');
      if (i + 1 < step)  s.classList.add('done');
    });
    for (let i = 1; i <= TOTAL; i++) {
      const el = document.getElementById('step-' + i);
      if (el) el.classList.toggle('active', i === step);
    }
    const ind = document.getElementById('step-indicator');
    if (ind) ind.textContent = (currentLang === 'pl' ? 'Krok ' : 'Step ') + step + (currentLang === 'pl' ? ' z ' : ' of ') + TOTAL;
    const prev = document.getElementById('booking-prev');
    const next = document.getElementById('booking-next');
    if (prev) prev.style.visibility = step === 1 ? 'hidden' : 'visible';
    if (next) {
      next.style.display = step === TOTAL ? 'none' : 'inline-flex';
      const nextLabel = next.querySelector('.booking-next-label');
      if (nextLabel) {
        nextLabel.textContent = step === TOTAL - 1
          ? (currentLang === 'pl' ? 'Wyślij rezerwację' : 'Send booking')
          : (currentLang === 'pl' ? 'Dalej' : 'Next');
      }
    }
  }

  const nextBtn = document.getElementById('booking-next');
  const prevBtn = document.getElementById('booking-prev');
  if (nextBtn) nextBtn.addEventListener('click', async () => {
    if (step === TOTAL - 1 && !bookingEmailSent) {
      nextBtn.disabled = true;
      const sent = await sendBookingEmails();
      nextBtn.disabled = false;
      if (!sent) return;
      bookingEmailSent = true;
    }
    if (step < TOTAL) {
      step++;
      updateProgress();
      document.querySelector('.booking-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  if (prevBtn) prevBtn.addEventListener('click', () => { if (step > 1) { step--; updateProgress(); } });

  /* Check items */
  document.addEventListener('click', e => {
    const item = e.target.closest('.form-check-item');
    if (!item) return;
    const g = item.dataset.group; if (!g) return;
    const single = ['service-type', 'goal', 'strategy-call', 'pay-currency', 'payment-method', 'content-ready'];
    if (single.includes(g)) document.querySelectorAll(`.form-check-item[data-group="${g}"]`).forEach(i => i.classList.remove('selected'));
    item.classList.toggle('selected');
  });

  /* Package card */
  document.addEventListener('click', e => {
    const card = e.target.closest('.pkg-card');
    if (!card) return;
    document.querySelectorAll('.pkg-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const prices = {
      lite: '€60 / 250 zł / $63',
      starter: '€76 / 320 zł / $80',
      standard: '€190 / 800 zł / $200',
      premium: '€571+ / 2400+ zł / $600+'
    };
    const p = card.dataset.pkg;
    const price = prices[p];
    const sp = document.getElementById('summary-pkg');
    const sd = document.getElementById('summary-deposit');
    if (sp) sp.textContent = p.charAt(0).toUpperCase() + p.slice(1) + ' — ' + price;
    if (sd) sd.textContent = currentLang === 'pl'
      ? 'Faktura zostanie przygotowana na podstawie szczegółów rezerwacji.'
      : 'Invoice will be prepared from the booking details.';
  });

  updateProgress();
}

function selectedValues(group) {
  return [...document.querySelectorAll(`.form-check-item[data-group="${group}"].selected`)]
    .map(item => (item.dataset.value || item.textContent || '').trim())
    .filter(Boolean)
    .join(', ') || 'N/A';
}

function fieldValue(id) {
  const el = document.getElementById(id);
  if (!el) return 'N/A';
  if (el.type === 'file') return el.files?.length ? [...el.files].map(file => file.name).join(', ') : 'No files attached';
  return el.value?.trim() || 'N/A';
}

function selectedPackageDetails() {
  const card = document.querySelector('.pkg-card.selected');
  if (!card) return { tier: 'N/A', priceText: 'N/A' };
  return {
    tier: card.querySelector('.pkg-name')?.textContent.trim() || card.dataset.pkg || 'N/A',
    priceText: card.querySelector('.pkg-price')?.textContent.replace(/\s+/g, ' ').trim() || 'N/A'
  };
}

function bookingPayload() {
  const pkg = selectedPackageDetails();
  return {
    package: pkg.tier,
    price: pkg.priceText,
    currency: selectedValues('pay-currency'),
    paymentMethod: selectedValues('payment-method'),
    fullName: fieldValue('pay-name'),
    email: fieldValue('pay-email'),
    phone: fieldValue('pay-phone'),
    whatsapp: fieldValue('pay-whatsapp'),
    serviceType: selectedValues('service-type'),
    businessName: fieldValue('biz-name'),
    industry: fieldValue('biz-industry'),
    businessDescription: fieldValue('biz-desc'),
    targetClients: fieldValue('biz-audience'),
    mainGoal: selectedValues('goal'),
    currentWebsite: fieldValue('existing-url'),
    preferredTimeline: fieldValue('launch-time'),
    strategyCall: selectedValues('strategy-call'),
    visualStyle: selectedValues('style'),
    inspiration: fieldValue('inspiration'),
    competitors: fieldValue('competitors'),
    colours: fieldValue('colors-pref'),
    features: selectedValues('features'),
    logoFile: fieldValue('logo-upload'),
    photosFiles: fieldValue('photos-upload'),
    contentReady: selectedValues('content-ready'),
    otherFiles: fieldValue('extra-files'),
    additionalNotes: fieldValue('extra-notes')
  };
}

function bookingEmailText(payload, fallbackReason = '') {
  const lines = [
    'TaffyDevs booking confirmation and invoice',
    '',
    'Your booking has been received by TaffyDevs.',
    '',
    'Invoice',
    `Package: ${payload.package}`,
    `Price: ${payload.price}`,
    `Preferred currency: ${payload.currency}`,
    `Payment method: ${payload.paymentMethod}`,
    '',
    'Booking details',
    `Full name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `WhatsApp: ${payload.whatsapp}`,
    `Service type: ${payload.serviceType}`,
    `Business name: ${payload.businessName}`,
    `Industry: ${payload.industry}`,
    `Business description: ${payload.businessDescription}`,
    `Target clients: ${payload.targetClients}`,
    `Main goal: ${payload.mainGoal}`,
    `Current website: ${payload.currentWebsite}`,
    `Preferred timeline: ${payload.preferredTimeline}`,
    `Strategy call: ${payload.strategyCall}`,
    `Visual style: ${payload.visualStyle}`,
    `Inspiration: ${payload.inspiration}`,
    `Competitors: ${payload.competitors}`,
    `Colours: ${payload.colours}`,
    `Features: ${payload.features}`,
    `Logo file: ${payload.logoFile}`,
    `Photos/files: ${payload.photosFiles}`,
    `Content ready: ${payload.contentReady}`,
    `Other files: ${payload.otherFiles}`,
    `Additional notes: ${payload.additionalNotes}`
  ];

  if (fallbackReason) {
    lines.push('', `Fallback note: ${fallbackReason}`);
    lines.push('Uploaded files cannot be attached automatically from this fallback email. Please attach them before sending if needed.');
  }

  return lines.join('\n');
}

function openBookingEmailFallback(payload, reason) {
  const businessEmail = 'taffydevs@gmail.com';
  const subject = encodeURIComponent(`TaffyDevs booking - ${payload.fullName}`);
  const body = encodeURIComponent(bookingEmailText(payload, reason));
  window.location.href = `mailto:${businessEmail}?cc=${encodeURIComponent(payload.email)}&subject=${subject}&body=${body}`;
}

async function sendBookingEmailsLegacy() {
  const payload = bookingPayload();
  const respondentEmail = payload.email;
  if (respondentEmail === 'N/A' || !respondentEmail.includes('@')) {
    alert(currentLang === 'pl' ? 'Dodaj poprawny adres email.' : 'Please add a valid email address.');
    return false;
  }
  if (payload.fullName === 'N/A') {
    alert(currentLang === 'pl' ? 'Dodaj imię i nazwisko.' : 'Please add your full name.');
    return false;
  }

  if (window.location.protocol === 'file:') {
    openBookingEmailFallback(payload, 'The website is open as a local file, so the PHP booking endpoint cannot run.');
    alert(currentLang === 'pl'
      ? 'Otworzylismy aplikacje email z uzupelniona wiadomoscia do TaffyDevs i klienta. Kliknij Wyslij, aby zakonczyc.'
      : 'Your email app has been opened with a completed message to TaffyDevs and the client. Press Send to finish.');
    return true;
  }

  try {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
    ['logo-upload', 'photos-upload', 'extra-files'].forEach(id => {
      const input = document.getElementById(id);
      if (!input?.files?.length) return;
      [...input.files].forEach(file => formData.append('booking_files[]', file));
    });

    const endpointUrl = new URL('../backend/send-booking.php', window.location.href);
    const response = await fetch(endpointUrl.href, {
      method: 'POST',
      body: formData
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      throw new Error(result.message || `Booking email failed with status ${response.status}.`);
    }
    return true;
  } catch (error) {
    console.error(error);
    alert(currentLang === 'pl'
      ? `Nie udało się wysłać rezerwacji: ${error.message}. Spróbuj ponownie lub napisz na taffydevs@gmail.com.`
      : 'The email server could not be reached, so your email app has been opened with a completed message to TaffyDevs and the client. Press Send to finish.');
    openBookingEmailFallback(payload, error.message || 'The booking email endpoint could not be reached.');
    return true;
  }
}

/* ── CONTACT FORM ───────────────────────────────────────────── */
async function sendBookingEmails() {
  const payload = bookingPayload();
  const respondentEmail = payload.email;
  if (respondentEmail === 'N/A' || !respondentEmail.includes('@')) {
    alert(currentLang === 'pl' ? 'Dodaj poprawny adres email.' : 'Please add a valid email address.');
    return false;
  }
  if (payload.fullName === 'N/A') {
    alert(currentLang === 'pl' ? 'Dodaj imie i nazwisko.' : 'Please add your full name.');
    return false;
  }

  if (window.location.protocol === 'file:') {
    openBookingEmailFallback(payload, 'The website is open as a local file, so the PHP booking endpoint cannot run.');
    alert(currentLang === 'pl'
      ? 'Otworzylismy aplikacje email z uzupelniona wiadomoscia do TaffyDevs i klienta. Kliknij Wyslij, aby zakonczyc.'
      : 'Your email app has been opened with a completed message to TaffyDevs and the client. Press Send to finish.');
    return true;
  }

  try {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
    ['logo-upload', 'photos-upload', 'extra-files'].forEach(id => {
      const input = document.getElementById(id);
      if (!input?.files?.length) return;
      [...input.files].forEach(file => formData.append('booking_files[]', file));
    });

    const endpointUrl = new URL('../backend/send-booking.php', window.location.href);
    const response = await fetch(endpointUrl.href, {
      method: 'POST',
      body: formData
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      throw new Error(result.message || `Booking email failed with status ${response.status}.`);
    }
    return true;
  } catch (error) {
    console.error(error);
    openBookingEmailFallback(payload, error.message || 'The booking email endpoint could not be reached.');
    alert(currentLang === 'pl'
      ? 'Serwer email nie odpowiedzial, wiec otworzylismy aplikacje email z uzupelniona wiadomoscia do TaffyDevs i klienta. Kliknij Wyslij, aby zakonczyc.'
      : 'The email server could not be reached, so your email app has been opened with a completed message to TaffyDevs and the client. Press Send to finish.');
    return true;
  }
}

function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n  = document.getElementById('contact-name')?.value.trim();
    const em = document.getElementById('contact-email')?.value.trim();
    const ph = document.getElementById('contact-phone')?.value.trim();
    const m  = document.getElementById('contact-msg')?.value.trim();
    if (!n || !em || !m) { alert(currentLang === 'pl' ? 'Wypełnij wymagane pola.' : 'Please fill in all required fields.'); return; }
    const sub  = encodeURIComponent('TaffyDevs Contact — ' + n);
    const body = encodeURIComponent('Name: ' + n + '\nEmail: ' + em + '\nPhone: ' + (ph || 'N/A') + '\n\nMessage:\n' + m);
    window.location.href = 'mailto:taffydevs@gmail.com?subject=' + sub + '&body=' + body;
  });
}

/* ── LOAD MORE BLOG ─────────────────────────────────────────── */
function initLoadMore() {
  const btn = document.getElementById('load-more-btn');
  const extra = document.getElementById('extra-articles');
  if (!btn || !extra) return;
  btn.addEventListener('click', () => {
    const showing = extra.style.display !== 'none';
    extra.style.display = showing ? 'none' : 'block';
    btn.querySelector('.load-more-label').textContent =
      showing ? (currentLang === 'pl' ? 'Załaduj więcej' : 'Load More') : (currentLang === 'pl' ? 'Pokaż mniej' : 'Show Less');
  });
}

/* ── INIT ALL ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  applyLang(currentLang);
  initReveal();
  initSmoothAnchors();
  initFloatingActions();
  initCurrency();
  initBooking();
  initContact();
  initLoadMore();

  /* Pricing tabs */
  initTabs('.pricing-tab', '.pricing-panel');
  /* Portfolio tabs */
  initTabs('.portfolio-tab', '.portfolio-panel');
  /* Blog tabs */
  initTabs('.blog-tab', '.blog-panel');
});
