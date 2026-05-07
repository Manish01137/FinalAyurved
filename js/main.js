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

  // Mark elements already in viewport on load as instantly animated
  // (no transition) to prevent the initial opacity-0 → 1 flash
  const instantlyReveal = (el) => {
    el.style.transition = 'none';
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('aos-animate');
    // Re-enable transitions after a frame so hover/other effects still work
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { el.style.transition = ''; });
    });
  };

  // Check which elements are already in the viewport at load time
  const viewportHeight = window.innerHeight;
  targets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      // Already visible — animate immediately without flash
      instantlyReveal(el);
    }
  });

  // For the rest, use IntersectionObserver with smooth animation
  // threshold: 0 (any pixel) + small bottom rootMargin — works for both
  // short cards and very tall sections (e.g. the full treatment gallery
  // on mobile, where 1-column layout makes the parent thousands of px tall
  // and a percentage threshold can never be reached)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => entry.target.classList.add('aos-animate'), Number(delay));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => {
    if (!el.classList.contains('aos-animate')) {
      io.observe(el);
    }
  });
})();

/* ── COUNTER ANIMATIONS ────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const runCounter = (el) => {
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
  };

  const viewportHeight = window.innerHeight;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      runCounter(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => {
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < viewportHeight && rect.bottom > 0;

    if (alreadyVisible) {
      // Already in viewport on load — skip count-up, just show final value
      // This prevents the "8+ → 0 → 8+" jump
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      el.textContent = (target >= 1000 ? target.toLocaleString() : target) + suffix;
    } else {
      // Below the fold — animate when scrolled into view
      io.observe(el);
    }
  });
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

/* ── TESTIMONIAL AUTO-SCROLL ─────────────────────────────── */
(function() {
  const slider = document.getElementById('testimonial-slider');
  const prevBtn = document.getElementById('review-prev');
  const nextBtn = document.getElementById('review-next');
  if (!slider) return;
  
  let intervalId;
  
  const scrollNext = () => {
      const card = slider.querySelector('.testimonial-card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 24; // 24px gap defined in CSS
      
      // If we reach the end, scroll back to 0
      if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 10)) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
  };

  const scrollPrev = () => {
      const card = slider.querySelector('.testimonial-card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 24;
      
      // If we reach the beginning, scroll back to end
      if (slider.scrollLeft <= 10) {
        slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
  };

  const startScroll = () => {
    intervalId = setInterval(() => {
      // pause on hover
      if (slider.matches(':hover')) return; 
      scrollNext();
    }, 2000); // Scrolls every 2.0 seconds
  };

  const resetScroll = () => {
    clearInterval(intervalId);
    startScroll();
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollNext();
      resetScroll();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      scrollPrev();
      resetScroll();
    });
  }
  
  // start rolling after slight delay to allow AOS animations to finish
  setTimeout(startScroll, 2000);
})();

/* ── TREATMENT GALLERY FILTER (Service page) ─────────────── */
(function () {
  const buttons = document.querySelectorAll('.t-filter-btn');
  const cards = document.querySelectorAll('.treatment-gallery .t-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cats = (card.getAttribute('data-cat') || '').split(/\s+/);
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
})();
