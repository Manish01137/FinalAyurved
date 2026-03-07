/* ============================================================
   AKSHARAM AYURVED — MAIN JS
   ============================================================ */

/* ── NAVBAR: scroll + active + mobile ─────────────────────── */
(function () {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navbar-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    navbar && navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Active link from current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('#')[0];
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Hamburger toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }
})();

/* ── FAQ ACCORDION ─────────────────────────────────────────── */
(function () {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const iconEl = btn.querySelector('.faq-icon i');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.querySelector('.faq-question').classList.remove('open');
        i.querySelector('.faq-answer').classList.remove('open');
        const ico = i.querySelector('.faq-icon i');
        if (ico) { ico.className = 'fas fa-plus'; }
      });

      // Toggle clicked
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
        if (iconEl) iconEl.className = 'fas fa-xmark';
      }
    });
  });
})();

/* ── SCROLL ANIMATIONS (IntersectionObserver) ─────────────── */
(function () {
  const targets = document.querySelectorAll('[data-aos]');
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => entry.target.classList.add('aos-animate'), Number(delay));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));
})();

/* ── COUNTER ANIMATIONS ────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const elapsed = Math.min(now - start, duration);
        const t = elapsed / duration;
        const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
        const val = Math.round(eased * target);
        el.textContent = (val >= 1000 ? val.toLocaleString() : val) + suffix;
        if (elapsed < duration) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
})();

/* ── FORM SUBMISSION ────────────────────────────────────────── */
(function () {
  const forms = document.querySelectorAll('form[id]');
  forms.forEach(form => {
    const btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', e => {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
          field.style.borderColor = '#e53e3e';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      if (!valid) return;

      // Simulate send
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-circle-check"></i> Message Sent!';
        btn.style.background = '#38a169';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 3500);
      }, 1800);
    });

    // Live border reset on input
    form.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', () => { field.style.borderColor = ''; });
    });
  });
})();

/* ── SMOOTH SCROLL for anchor links ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
