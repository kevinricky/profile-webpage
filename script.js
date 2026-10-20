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
        <a class="btn" href="${esc(c.github)}" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
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
