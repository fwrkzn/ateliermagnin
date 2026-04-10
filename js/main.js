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
const desktopDropdownBtn = document.querySelector('#dropdown-envente > button');
const mobileDropdownBtn = document.querySelector('.mobile-dropdown-btn');

if (menuBtn && mobileMenu) {
  menuBtn.setAttribute('aria-label', 'Ouvrir le menu');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-controls', 'mobile-menu');
}

if (desktopDropdownBtn) {
  desktopDropdownBtn.setAttribute('aria-label', 'Ouvrir le menu En vente');
  desktopDropdownBtn.setAttribute('aria-expanded', 'false');
}

if (mobileDropdownBtn) {
  mobileDropdownBtn.setAttribute('aria-label', 'Ouvrir le menu En vente');
  mobileDropdownBtn.setAttribute('aria-expanded', 'false');
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuIconOpen.style.display = isOpen ? 'none' : 'block';
    menuIconClose.style.display = isOpen ? 'block' : 'none';
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuIconOpen.style.display = 'block';
      menuIconClose.style.display = 'none';
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });
}

if (desktopDropdownBtn) {
  desktopDropdownBtn.addEventListener('click', () => {
    const dropdown = document.getElementById('dropdown-envente');
    desktopDropdownBtn.setAttribute('aria-expanded', String(dropdown.classList.contains('open')));
  });
}

if (mobileDropdownBtn) {
  mobileDropdownBtn.addEventListener('click', () => {
    const parent = mobileDropdownBtn.parentElement;
    mobileDropdownBtn.setAttribute('aria-expanded', String(parent.classList.contains('open')));
  });
}

// ── Close dropdown on outside click ──
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('dropdown-envente');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
    if (desktopDropdownBtn) {
      desktopDropdownBtn.setAttribute('aria-expanded', 'false');
    }
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

// ── Fastback Carousel ──
(function () {
  const mainImage = document.getElementById('fastback-carousel-main');
  if (!mainImage) return;

  const placeholder = document.getElementById('fastback-carousel-placeholder');
  const prevBtn = document.getElementById('fastback-carousel-prev');
  const nextBtn = document.getElementById('fastback-carousel-next');
  const thumbs = document.querySelectorAll('.fastback-thumb');
  const caption = document.getElementById('fastback-carousel-caption');

  const slides = [
    { src: '/assets/chantiers/mustang-68-1.webp', alt: 'Mustang Fastback 1968 bleue en cours de tôlerie', caption: 'Vue générale du chantier en cours de tôlerie.' },
    { src: '/assets/chantiers/mustang-68-2.webp', alt: 'Mustang Fastback 1968 bleue avec carrosserie ouverte', caption: 'Ouverture de carrosserie et reprise des zones atteintes.' },
    { src: '/assets/chantiers/mustang-68-3.webp', alt: 'Mustang Fastback 1968 bleue avec éléments déposés', caption: 'Travail structurel avec éléments déposés et accès complet aux zones critiques.' },
    { src: '/assets/chantiers/mustang-68-4.webp', alt: 'Mustang Fastback 1968 bleue pendant les découpes de tôlerie', caption: 'Découpes et reconstruction progressive des parties endommagées.' },
    { src: '/assets/chantiers/mustang-68-5.webp', alt: 'Mustang Fastback 1968 bleue pendant les ajustements de carrosserie', caption: 'Ajustements de tôlerie avant préparation de surface.' },
    { src: '/assets/chantiers/mustang-68-6.webp', alt: 'Mustang Fastback 1968 bleue avant la phase peinture', caption: 'Mise en forme et alignements avant peinture.' },
    { src: '/assets/chantiers/mustang-68-7.webp', alt: 'Mustang Fastback 1968 bleue en phase de remontage', caption: 'Progression du dossier avant remontage final.' },
    { src: '/assets/chantiers/mustang-68-8.webp', alt: 'Mustang Fastback 1968 bleue en fin de chantier', caption: 'Dernières étapes du chantier avant livraison.' }
  ];

  let current = 0;
  let autoplay = null;

  function updateThumbs() {
    thumbs.forEach(function (thumb) {
      const index = parseInt(thumb.getAttribute('data-index'));
      if (index === current) {
        thumb.classList.add('active');
        thumb.style.borderColor = 'hsl(8 75% 52%)';
      } else {
        thumb.classList.remove('active');
        thumb.style.borderColor = 'transparent';
      }
    });
  }

  function showPlaceholder() {
    mainImage.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  }

  function showImage() {
    mainImage.style.display = '';
    if (placeholder) placeholder.style.display = 'none';
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];

    mainImage.style.opacity = '0';
    mainImage.onload = function () {
      showImage();
      mainImage.style.opacity = '1';
    };
    mainImage.onerror = function () {
      showPlaceholder();
      mainImage.style.opacity = '1';
    };
    mainImage.alt = slide.alt;
    mainImage.src = slide.src;
    if (caption) caption.textContent = slide.caption;
    updateThumbs();
  }

  function restartAutoplay() {
    if (autoplay) window.clearInterval(autoplay);
    autoplay = window.setInterval(function () {
      goTo(current + 1);
    }, 5000);
  }

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      goTo(parseInt(this.getAttribute('data-index')));
      restartAutoplay();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goTo(current - 1);
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo(current + 1);
      restartAutoplay();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      goTo(current - 1);
      restartAutoplay();
    }
    if (e.key === 'ArrowRight') {
      goTo(current + 1);
      restartAutoplay();
    }
  });

  goTo(0);
  restartAutoplay();
})();

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
