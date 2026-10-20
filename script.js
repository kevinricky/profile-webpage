/* ============================================================
   KEVIN RICKY – PROFILE WEBSITE SCRIPTS
   Renders the page from data/resume.json, then wires up the UI.
   ============================================================ */

const root = document.documentElement;
const app = document.getElementById('app');

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const items = a => a.map(x => `<li>${esc(x)}</li>`).join('');
const chips = a => a.map(x => `<span>${esc(x)}</span>`).join('');

/* Brand logos (Simple Icons paths, 24x24) */
const svgIcon = d => `<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const ICONS = {
  linkedin: svgIcon('M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'),
  github: svgIcon('M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12')
};

/* ---------- Render ---------- */
function render(r) {
  const [first, ...rest] = r.name.split(' ');
  const c = r.contact;

  app.innerHTML = `
    <header>
      <div class="hero-row">
        <img class="avatar" src="assets/20230520_122155.jpg" alt="${esc(r.name)}" />
        <div>
          <h1>${esc(first)} <em>${esc(rest.join(' '))}</em></h1>
          <p class="role cursor">${esc(r.title)} · ${esc(r.subtitle)}</p>
        </div>
      </div>
      <p class="lede">${esc(r.summary)}</p>
      <div class="chips">${chips(r.stack)}</div>
      <div class="links">
        <a class="btn primary" href="mailto:${esc(c.email)}">Hire me</a>
        <a class="btn" href="${esc(c.github)}" target="_blank" rel="noopener">${ICONS.github}GitHub</a>
        <a class="btn" href="${esc(c.linkedin)}" target="_blank" rel="noopener">${ICONS.linkedin}LinkedIn</a>
      </div>
      <div class="metrics reveal">
        ${r.metrics.slice(0, 4).map(m => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join('')}
      </div>
    </header>

    <section id="experience">
      <h2>Experience</h2>
      ${r.experience.map(e => `
        <article class="job reveal">
          <header>
            <div><h3>${esc(e.company)}</h3><span class="r">${esc(e.role)}</span></div>
            <span class="when">${esc(e.period)}</span>
          </header>
          <ul>${items(e.highlights)}</ul>
          <p class="tags">${esc(e.tech.join(" · "))}</p>
        </article>`).join('')}
    </section>

    <section id="skills">
      <h2>Skills</h2>
      <div class="grid">
        ${r.skills.map(s => `<div class="box reveal"><b>${esc(s.group)}</b><p class="tags">${esc(s.items.join(" · "))}</p></div>`).join('')}
      </div>
    </section>

    <section id="education">
      <h2>Education &amp; Awards</h2>
      <div class="grid">
        ${r.education.map(e => `<div class="box reveal"><b>${esc(e.degree)} · ${esc(e.period)}</b><p>${esc(e.school)}, ${esc(e.place)}</p></div>`).join('')}
        ${r.awards.map(a => `<div class="box reveal"><b>Award</b><p>${esc(a)}</p></div>`).join('')}
      </div>
    </section>

    <section id="projects">
      <h2>Public Projects</h2>
      <div class="soon reveal">Work in progress – public projects will be added here as they become available.</div>
    </section>`;

  document.getElementById('contact').innerHTML = `
    <h2>Get in touch</h2>
    <p>Open to new opportunities. Feel free to reach out.</p>
    <div class="links">
      <a class="btn primary" href="mailto:${esc(c.email)}">${esc(c.email)}</a>
      <a class="btn" href="tel:${esc(c.phone.replace(/[^+\d]/g, ''))}">${esc(c.phone)}</a>
      <a class="btn" href="${esc(c.linkedin)}" target="_blank" rel="noopener">${ICONS.linkedin}LinkedIn</a>
      <a class="btn" href="${esc(c.github)}" target="_blank" rel="noopener">${ICONS.github}GitHub</a>
    </div>
    <small>&copy; ${new Date().getFullYear()} ${esc(r.name)}</small>`;

  initReveal();
  initActiveNav();
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}

/* ---------- Active nav link ---------- */
function initActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id], footer[id]').forEach(s => io.observe(s));
}

/* ---------- Theme toggle ---------- */
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }
});

/* ---------- Load data ---------- */
fetch('data/resume.json')
  .then(res => { if (!res.ok) throw new Error(res.status); return res.json(); })
  .then(render)
  .catch(() => {
    app.innerHTML = '<p class="lede">Could not load profile data. Please reach me at kevinricky999@yahoo.com.</p>';
  });
