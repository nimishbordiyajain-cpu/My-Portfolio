import './index.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, getDocFromServer, doc } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lucide icons
declare const lucide: any;

// Test Connection to Firestore
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
  }
}

function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    setTimeout(initIcons, 500);
  }
}

// Error Handling for Firestore
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const submitBtn = document.getElementById('form-submit') as HTMLButtonElement;
  const submitText = document.getElementById('submit-text');
  const statusDiv = document.getElementById('form-status');

  if (!form || !submitBtn || !statusDiv) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable button and show loading state
    submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending...';
    statusDiv.classList.add('hidden');

    const name = (document.getElementById('form-name') as HTMLInputElement).value;
    const email = (document.getElementById('form-email') as HTMLInputElement).value;
    const subject = (document.getElementById('form-subject') as HTMLInputElement).value;
    const message = (document.getElementById('form-message') as HTMLTextAreaElement).value;

    try {
      const path = 'messages';
      await addDoc(collection(db, path), {
        name,
        email,
        subject,
        message,
        createdAt: serverTimestamp()
      });

      // Success state
      statusDiv.textContent = 'Message sent successfully! I will get back to you soon.';
      statusDiv.classList.remove('hidden', 'bg-red-500/10', 'text-red-500');
      statusDiv.classList.add('bg-green-500/10', 'text-green-500');
      form.reset();
    } catch (error) {
      // Error state
      statusDiv.textContent = 'Failed to send message. Please try again later.';
      statusDiv.classList.remove('hidden', 'bg-green-500/10', 'text-green-500');
      statusDiv.classList.add('bg-red-500/10', 'text-red-500');
      
      try {
        handleFirestoreError(error, OperationType.CREATE, 'messages');
      } catch (e) {
        // Error already logged
      }
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Send Message';
    }
  });
}

// Smooth Scrolling with Lenis
function initSmoothScroll() {
  // Disable Lenis in iframes as it can cause scrolling issues
  if (window.self !== window.top) {
    console.log('Running in iframe, disabling Lenis smooth scroll');
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Update ScrollTrigger on scroll
  lenis.on('scroll', ScrollTrigger.update);
}

// Magnetic Buttons Effect
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic-btn');
  
  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e: any) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// Scroll Progress Bar
function initProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Parallax Background Elements
function initParallax() {
  const elements = document.querySelectorAll('.parallax-bg > div');
  
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth) - 0.5;
    const yPos = (clientY / window.innerHeight) - 0.5;
    
    elements.forEach((el: any) => {
      const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
      gsap.to(el, {
        x: xPos * 100 * speed,
        y: yPos * 100 * speed,
        duration: 1,
        ease: 'power2.out'
      });
    });
  });
}

// Scroll Reveal with GSAP
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  // Small delay to ensure layout is ready
  setTimeout(() => {
    reveals.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      });
    });
    
    // Safety fallback: reveal everything if it hasn't been revealed after 3 seconds
    setTimeout(() => {
      reveals.forEach(el => {
        if (getComputedStyle(el).opacity === '0') {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.5 });
        }
      });
    }, 3000);

    ScrollTrigger.refresh();
  }, 100);
}

// Cursor Glow Effect
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    window.addEventListener('mousemove', (e) => {
      gsap.to(glow, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      });
      glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  }
}

// Active Navigation Link Highlighting
function initNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
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

// Initialize everything
function start() {
  try {
    document.body.classList.add('js-active');
    initIcons();
    initSmoothScroll();
    initMagneticButtons();
    initProgressBar();
    initParallax();
    initScrollReveal();
    initNavHighlight();
    initCursorGlow();
    initContactForm();
    testConnection();
    
    // Final refresh after a short delay to ensure layout is settled
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  } catch (error) {
    console.error('Error during portfolio initialization:', error);
    // Fallback: make everything visible if JS fails
    document.body.classList.remove('js-active');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
