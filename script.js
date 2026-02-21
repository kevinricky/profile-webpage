/* ============================================================
   KEVIN RICKY – PROFILE WEBSITE SCRIPTS
   ============================================================ */

/* ---------- Hamburger Menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ---------- Active Nav Link on Scroll ---------- */
const sections = document.querySelectorAll('header[id], section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* ---------- Scroll Reveal Animation ---------- */
const revealElements = document.querySelectorAll('.card, .section-title');

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger animation for cards in the same grid
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((sibling, index) => {
        setTimeout(() => {
          sibling.classList.add('visible');
        }, index * 80);
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ---------- Navbar shadow on scroll ---------- */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
  }
}, { passive: true });

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- Hamburger animation ---------- */
const style = document.createElement('style');
style.textContent = `
  .hamburger.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger.active span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .hamburger.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
`;
document.head.appendChild(style);
