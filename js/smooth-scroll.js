/* ============================================
   SMOOTH SCROLL — Anchor links + Navbar
   ============================================ */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Close mobile menu if open
      closeMobileMenu();
    });
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const scrollThreshold = 60;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileMenu() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const overlay = document.querySelector('.navbar__overlay');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function closeMobileMenu() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const overlay = document.querySelector('.navbar__overlay');
  if (hamburger) hamburger.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

export { initSmoothScroll, initNavbar, initMobileMenu };
