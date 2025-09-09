// ======================
// Madisha's Pub & Restaurant - JavaScript
// ======================

// Smooth Scroll for Navbar Links
document.querySelectorAll('nav .links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Fade-in Animation on Scroll
const faders = document.querySelectorAll('.card, .gallery-grid img, .events li, .contact p');

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('fade-in');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Gallery Lightbox Effect
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('lightbox');
    overlay.innerHTML = `<img src="${img.src}" alt="Expanded Image">`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      overlay.remove();
    });
  });
});

// Add CSS dynamically for fade-in + lightbox
const style = document.createElement('style');
style.innerHTML = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: all 0.8s ease-out;
  }

  .card, .gallery-grid img, .events li, .contact p {
    opacity: 0;
    transform: translateY(30px);
  }

  .lightbox {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }

  .lightbox img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
  }
`;
document.head.appendChild(style);
