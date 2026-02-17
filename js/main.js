/* ============================================
   MAIN — All-in-one (no ES modules for file:// compat)
   ============================================ */

(function () {
  'use strict';

  /* ---- CONFIG ---- */
  var WHATSAPP_NUMBER = '5554996060202';
  var DEFAULT_MESSAGE = 'Olá, Val! Gostaria de agendar uma consulta.';

  /* ---- HELPERS ---- */
  function buildWhatsAppURL(message) {
    var encoded = encodeURIComponent(message || DEFAULT_MESSAGE);
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encoded;
  }

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  /* ---- SCROLL PROGRESS BAR ---- */
  function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;

    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      bar.style.width = progress + '%';
      bar.setAttribute('aria-valuenow', progress);
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---- NAVBAR ---- */
  function initNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---- MOBILE MENU ---- */
  var _menuTriggerEl = null;

  function closeMobileMenu() {
    var hamburger = document.querySelector('.navbar__hamburger');
    var overlay = document.querySelector('.navbar__overlay');
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
    }
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';

    /* Return focus to the element that opened the menu */
    if (_menuTriggerEl) {
      _menuTriggerEl.focus();
      _menuTriggerEl = null;
    }
  }

  function getFocusableElements(container) {
    return container.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  function trapFocus(e, container) {
    var focusable = getFocusableElements(container);
    if (!focusable.length) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  function initMobileMenu() {
    var hamburger = document.querySelector('.navbar__hamburger');
    var overlay = document.querySelector('.navbar__overlay');
    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', function () {
      var isActive = hamburger.classList.toggle('active');
      overlay.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';

      /* Update ARIA state */
      hamburger.setAttribute('aria-expanded', String(isActive));
      hamburger.setAttribute(
        'aria-label',
        isActive ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
      );

      if (isActive) {
        _menuTriggerEl = hamburger;
        /* Focus the first link in the overlay */
        var firstLink = overlay.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    /* Close on link click */
    var links = overlay.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMobileMenu);
    }

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    /* Focus trap within overlay */
    overlay.addEventListener('keydown', function (e) {
      if (hamburger.classList.contains('active')) {
        trapFocus(e, overlay);
      }
    });
  }

  /* ---- SMOOTH SCROLL ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        var navHeight = document.querySelector('.navbar')
          ? document.querySelector('.navbar').offsetHeight
          : 0;
        var targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        /* Move focus to the target section for screen readers */
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });

        closeMobileMenu();
      });
    });
  }

  /* ---- SCROLL REVEAL ANIMATIONS ---- */
  function initScrollAnimations() {
    /* Respect prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var revealSelector =
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate';
    var revealElements = document.querySelectorAll(revealSelector);

    if (!revealElements.length) return;

    /* Individual element observer */
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });

    /* Stagger container observer — reveals all children at once for proper stagger */
    var staggerContainers = document.querySelectorAll('.stagger');
    if (!staggerContainers.length) return;

    var staggerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            /* Also reveal any child reveal elements so stagger timing works */
            var children = entry.target.querySelectorAll(revealSelector);
            children.forEach(function (child) {
              child.classList.add('revealed');
              observer.unobserve(child);
            });

            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    staggerContainers.forEach(function (el) {
      var hasRevealAncestor = el.closest(
        '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate'
      );
      if (!hasRevealAncestor) {
        staggerObserver.observe(el);
      }
    });
  }

  /* ---- COUNTER ANIMATIONS ---- */
  function animateCounter(el) {
    /* Respect prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = el.dataset.counter + (el.dataset.suffix || '');
      el.classList.add('counted');
      return;
    }

    var target = parseInt(el.dataset.counter, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1500;
    var startTime = performance.now();

    function update(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easedProgress = easeOutExpo(progress);
      var current = Math.round(target * easedProgress);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        /* Pop effect when counter finishes */
        el.classList.add('counted');
      }
    }

    requestAnimationFrame(update);
  }

  function initCounterAnimations() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- WHATSAPP LINKS ---- */
  function initWhatsAppLinks() {
    document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
      var customMessage = el.dataset.whatsapp || DEFAULT_MESSAGE;
      el.href = buildWhatsAppURL(customMessage);
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
  }

  /* ---- WHATSAPP FLOAT ---- */
  function initWhatsAppFloat() {
    var floatBtn = document.querySelector('.whatsapp-float');
    if (!floatBtn) return;

    floatBtn.href = buildWhatsAppURL();
    floatBtn.target = '_blank';
    floatBtn.rel = 'noopener noreferrer';

    var hero = document.querySelector('.hero');
    if (!hero) {
      floatBtn.classList.add('visible');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var isVisible = !entries[0].isIntersecting;
        floatBtn.classList.toggle('visible', isVisible);
        /* Hide from tab order when not visible */
        floatBtn.setAttribute('tabindex', isVisible ? '0' : '-1');
      },
      { threshold: 0 }
    );

    /* Start hidden from tab order */
    floatBtn.setAttribute('tabindex', '-1');
    observer.observe(hero);
  }

  /* ---- HERO ANIMATION ---- */
  function initHeroAnimation() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    /* Respect prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    requestAnimationFrame(function () {
      hero.classList.add('hero-enter');
    });
  }

  /* ---- PARALLAX LITE ---- */
  function initParallax() {
    /* Respect prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var images = document.querySelectorAll('[data-parallax]');
    if (!images.length) return;

    function updateParallax() {
      var scrollY = window.scrollY;
      images.forEach(function (img) {
        var speed = parseFloat(img.dataset.parallax) || 0.05;
        var rect = img.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var viewCenter = window.innerHeight / 2;
        var offset = (center - viewCenter) * speed;
        img.style.transform = 'translateY(' + offset + 'px)';
      });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  /* ---- INIT ---- */
  function init() {
    initScrollProgress();
    initHeroAnimation();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initCounterAnimations();
    initWhatsAppLinks();
    initWhatsAppFloat();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
