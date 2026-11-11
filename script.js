/* Portfolio interactions: no frameworks or backend required. */
(() => {
  'use strict';
  const pageIds = ['about', 'experience', 'education', 'portfolio', 'research', 'honours', 'contact'];
  const tabs = [...document.querySelectorAll('.tab-button')];
  const panels = [...document.querySelectorAll('.panel')];
  const root = document.documentElement;
  const toast = document.getElementById('toast');
  let toastTimer;

  function flash(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function setPage(id, opts = {}) {
    const page = pageIds.includes(id) ? id : 'about';
    const shouldChangeHash = opts.updateHash !== false;
    const shouldFocus = opts.focus === true;
    tabs.forEach(tab => {
      const active = tab.dataset.page === page;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => {
      const active = panel.id === page;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    if (shouldChangeHash) {
      try { history.replaceState(null, '', '#' + page); }
      catch (_) { /* Some file:// browsing contexts restrict history changes. */ }
    }
    if (shouldFocus) {
      const target = document.getElementById(page);
      if (target) target.focus({preventScroll:true});
    }
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setPage(tab.dataset.page));
    tab.addEventListener('keydown', event => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[nextIndex].focus();
      setPage(tabs[nextIndex].dataset.page, {focus:false});
    });
  });

  document.querySelectorAll('[data-go]').forEach(element => {
    element.addEventListener('click', () => setPage(element.dataset.go));
  });
  window.addEventListener('hashchange', () => setPage(location.hash.slice(1), {updateHash:false}));
  setPage(location.hash.slice(1), {updateHash:false});

  const filters = [...document.querySelectorAll('.filter-btn')];
  const projects = [...document.querySelectorAll('.project-card')];
  filters.forEach(btn => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filters.forEach(item => {
      const active = item === btn;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach(project => {
      const types = (project.dataset.categories || '').split(' ');
      project.hidden = filter !== 'all' && !types.includes(filter);
    });
  }));

  const toggle = document.getElementById('themeToggle');
  try {
    const saved = localStorage.getItem('tanvir-portfolio-theme');
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch (_) { /* Private-mode storage may be unavailable. */ }
  const updateThemeLabel = () => {
    if (toggle) toggle.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };
  updateThemeLabel();
  if (toggle) toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    updateThemeLabel();
    try { localStorage.setItem('tanvir-portfolio-theme', next); } catch (_) {}
  });

  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    const email = 'tanvir.ahammed.cse@gmail.com';
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(email);
      flash('Email address copied.');
    } catch (_) {
      flash('Select the email address above to copy it.');
    }
  });

  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.getElementById('contactName').value.trim();
    const sender = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !sender || !subject || !message) return;
    const body = `${message}\n\nFrom: ${name}\nReply to: ${sender}\n\nSent from the portfolio contact form.`;
    const mailto = `mailto:tanvir.ahammed.cse@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    flash('Opening your email application…');
  });

  const year = document.getElementById('currentYear');
  if (year) year.textContent = String(new Date().getFullYear());
})();
