// ── Page Transition ──
(function () {
  const overlay = document.querySelector('.page-transition-overlay');
  const content = document.querySelector('.page-content');
  let isTransitioning = false;

  // Reset scroll position immediately
  window.scrollTo(0, 0);

  if (overlay) {
    // Start with content hidden behind overlay
    if (content) content.classList.add('hidden-for-transition');
    overlay.classList.add('entering');

    // Wait for overlay to mostly clear, then reveal content
    setTimeout(() => {
      if (content) {
        content.classList.add('animating');
      }
    }, 350);

    // Clean up overlay after full animation (550ms + 160ms last stagger)
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.classList.remove('entering');
    }, 750);
  }

  // Intercept internal link clicks for exit animation
  document.addEventListener('click', (e) => {
    if (isTransitioning) return;
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;

    e.preventDefault();
    isTransitioning = true;

    if (overlay) {
      // Fade out content smoothly (now has transition on .page-content)
      if (content) {
        content.classList.remove('animating');
        content.classList.add('hidden-for-transition');
      }

      // Start overlay exit after content begins fading
      setTimeout(() => {
        overlay.style.display = 'flex';
        overlay.classList.remove('entering');
        overlay.classList.add('exiting');
      }, 150);

      // Navigate after overlay fully covers (400ms + 120ms last stagger)
      setTimeout(() => {
        window.location.href = href;
      }, 680);
    } else {
      window.location.href = href;
    }
  });
})();

// ── Mobile Menu ──
const menuBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('icon-menu');
const menuIconClose = document.getElementById('icon-close');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuIconOpen.style.display = isOpen ? 'none' : 'block';
    menuIconClose.style.display = isOpen ? 'block' : 'none';
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuIconOpen.style.display = 'block';
      menuIconClose.style.display = 'none';
    });
  });
}

// ── Close dropdown on outside click ──
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('dropdown-envente');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

// ── Scroll Animations (IntersectionObserver) ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ── Lucide Icons ──
if (window.lucide) {
  lucide.createIcons();
}

// ── Vehicle Gallery ──
(function () {
  const galleryMain = document.getElementById('gallery-main');
  if (!galleryMain) return;

  const images = [
    'assets/avendre_auto/sportka-1.webp',
    'assets/avendre_auto/sportka-2.webp',
    'assets/avendre_auto/sportka-3.webp',
    'assets/avendre_auto/sportka-4.webp',
    'assets/avendre_auto/sportka-5.webp',
    'assets/avendre_auto/sportka-6.webp',
    'assets/avendre_auto/sportka-7.webp',
    'assets/avendre_auto/sportka-8.webp'
  ];
  let current = 0;
  const placeholder = document.getElementById('gallery-main-placeholder');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  function goTo(index) {
    current = (index + images.length) % images.length;
    galleryMain.style.opacity = '0';
    setTimeout(function () {
      galleryMain.src = images[current];
      galleryMain.style.display = '';
      if (placeholder) placeholder.style.display = 'none';
      galleryMain.style.opacity = '1';
    }, 150);
    thumbs.forEach(function (t) {
      var i = parseInt(t.getAttribute('data-index'));
      if (i === current) {
        t.classList.add('active');
        t.style.borderColor = 'hsl(8 75% 52%)';
      } else {
        t.classList.remove('active');
        t.style.borderColor = 'transparent';
      }
    });
  }

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      goTo(parseInt(this.getAttribute('data-index')));
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
})();

// ── Contact Form ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        showToast('Message envoyé', 'Nous vous répondrons dans les meilleurs délais.');
        contactForm.reset();
      })
      .catch(() => {
        showToast('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
      });
  });
}

// ── Toast ──
function showToast(title, description) {
  // Remove existing
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-desc">${description}</div>`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
