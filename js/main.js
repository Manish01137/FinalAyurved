/* ========================================
   AKSHARAM AYURVED - MAIN JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ─── NAVBAR Scroll Effect ───────────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // ─── Active Nav Link ──────────────────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Mobile Menu Toggle ───────────────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navbar-nav');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.querySelectorAll('span').forEach((s, i) => {
        if (isOpen) {
          if (i === 0) s.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (i === 1) s.style.opacity = '0';
          if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          s.style.transform = '';
          s.style.opacity = '';
        }
      });
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ─── FAQ Accordion ────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = this.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-question.open').forEach(q => {
        q.classList.remove('open');
        q.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        this.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // ─── AOS – Simple Intersection Observer ──────────────────────────────────
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

  // ─── Counter Animation ────────────────────────────────────────────────────
  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = prefix + target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = prefix + Math.floor(start) + suffix;
      }
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (!isNaN(target)) animateCounter(el, target, 1800);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ─── Form Submission ──────────────────────────────────────────────────────
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #2d6a4f, #40916c)';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }, 1500);
    });
  });

  // ─── Smooth Scroll for Internal Links ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Number ticker on stats ───────────────────────────────────────────────
  const nums = document.querySelectorAll('.stat-num[data-count], .hero-stat .num[data-count]');
  const numsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (!isNaN(val)) animateCounter(el, val, 2000);
        numsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => numsObserver.observe(n));

});
