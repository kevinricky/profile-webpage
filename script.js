/* ============================================================
   KEVIN RICKY – PROFILE WEBSITE SCRIPTS
   Renders the page from data/resume.json, then wires up the UI.
   ============================================================ */

const root = document.documentElement;
const app = document.getElementById('app');

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const items = a => a.map(x => `<li>${esc(x)}</li>`).join('');
const chips = a => a.map(x => `<span>${esc(x)}</span>`).join('');

/* ---------- Render ---------- */
function render(r) {
  const c = r.contact;

  app.innerHTML = `
    <div class="bento">
      <div class="tile hero">
        <img class="avatar" src="assets/20230520_122155.jpg" alt="${esc(r.name)}" />
        <h1>${esc(r.name)}</h1>
        <p class="role">${esc(r.title)} · ${esc(r.subtitle)}</p>
        <p class="sum">${esc(r.summary.split('. ').slice(0, 2).join('. '))}.</p>
      </div>
      <div class="tile contact">
        <a href="mailto:${esc(c.email)}">✉ Get in touch</a>
        <a href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a href="${esc(c.github)}" target="_blank" rel="noopener">GitHub ↗</a>
      </div>
      ${r.metrics.map(m => `<div class="tile stat reveal"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join('')}

      <h2 id="experience">Experience</h2>
      ${r.experience.map((e, i) => `
        <article class="tile job ${i < 2 ? 'big' : ''} reveal">
          <div class="when">${esc(e.period)}</div>
          <h3>${esc(e.company)}</h3>
          <p class="r">${esc(e.role)}</p>
          <ul>${items(e.highlights)}</ul>
          <div class="tags">${chips(e.tech)}</div>
        </article>`).join('')}

      <h2 id="skills">Skills</h2>
      ${r.skills.map(s => `<div class="tile sk reveal"><b>${esc(s.group)}</b><div class="tags">${chips(s.items)}</div></div>`).join('')}

      <h2 id="education">Education &amp; Awards</h2>
      ${r.education.map(e => `<div class="tile sk reveal"><b>${esc(e.degree)} · ${esc(e.period)}</b><p>${esc(e.school)}, ${esc(e.place)}</p></div>`).join('')}
      ${r.awards.map(a => `<div class="tile sk reveal"><b>Award</b><p>${esc(a)}</p></div>`).join('')}

      <h2 id="projects">Public Projects</h2>
      <div class="tile soon reveal">Work in progress – public projects will be added here as they become available.</div>
    </div>`;

  document.getElementById('contact').innerHTML = `
    <h2>Get in touch</h2>
    <p>Open to new opportunities. Feel free to reach out.</p>
    <div class="links">
      <a class="btn primary" href="mailto:${esc(c.email)}">${esc(c.email)}</a>
      <a class="btn" href="tel:${esc(c.phone.replace(/[^+\d]/g, ''))}">${esc(c.phone)}</a>
      <a class="btn" href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
      <a class="btn" href="${esc(c.github)}" target="_blank" rel="noopener">GitHub</a>
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
  document.querySelectorAll('h2[id], footer[id]').forEach(s => io.observe(s));
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
