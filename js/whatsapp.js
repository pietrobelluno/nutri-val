/* ============================================
   WHATSAPP — Pre-filled links + Floating button
   ============================================ */

const WHATSAPP_NUMBER = '5554996060202';
const DEFAULT_MESSAGE = 'Olá, Val! Gostaria de agendar uma consulta.';

function buildWhatsAppURL(message) {
  const encoded = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function initWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    const customMessage = el.dataset.whatsapp || DEFAULT_MESSAGE;
    el.href = buildWhatsAppURL(customMessage);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

function initWhatsAppFloat() {
  const floatBtn = document.querySelector('.whatsapp-float');
  if (!floatBtn) return;

  floatBtn.href = buildWhatsAppURL();
  floatBtn.target = '_blank';
  floatBtn.rel = 'noopener noreferrer';

  const hero = document.querySelector('.hero');
  if (!hero) {
    floatBtn.classList.add('visible');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      floatBtn.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(hero);
}

export { initWhatsAppLinks, initWhatsAppFloat };
