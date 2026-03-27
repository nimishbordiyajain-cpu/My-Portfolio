/**
 * Portfolio Logic
 * Handles scroll animations, navigation highlighting, and icon initialization.
 */
import './index.css';

// Initialize Lucide icons
declare const lucide: any;

function initIcons() {
  if (typeof lucide !== 'undefined') {
    console.log('Lucide found, creating icons...');
    lucide.createIcons();
  } else {
    console.warn('Lucide not found, retrying in 500ms...');
    setTimeout(initIcons, 500);
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

// Active Navigation Link Highlighting
function initNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Mobile Menu Toggle (Simple)
function initMobileMenu() {
  const menuBtn = document.querySelector('button.md\\:hidden');
  const navLinksContainer = document.querySelector('.md\\:flex');
  
  if (menuBtn && navLinksContainer) {
    menuBtn.addEventListener('click', () => {
      // For a truly premium feel, we'd build a proper mobile overlay
      // but for now, we'll just toggle visibility if needed or keep it simple.
      // Given the "minimal" requirement, a simple scroll is often preferred.
      alert('Mobile menu functionality can be expanded here!');
    });
  }
}

// Cursor Glow Effect
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'fixed w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none -z-10 transition-opacity duration-300 opacity-0';
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX - 250}px`;
    glow.style.top = `${e.clientY - 250}px`;
    glow.style.opacity = '1';
  });
}

// Initialize everything when DOM is ready
function start() {
  console.log('Portfolio script starting...');
  document.body.classList.add('js-active');
  initIcons();
  initScrollReveal();
  initNavHighlight();
  initMobileMenu();
  initCursorGlow();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
