/* ============================================================
   KEVIN RICKY – PROFILE WEBSITE SCRIPTS
   Renders the page from data/resume.js, then wires up the UI.
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
      <p class="prompt">kevin@platform:~<span class="dollar">$</span> whoami</p>
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
        <a class="btn ripple" href="${esc(c.github)}" target="_blank" rel="noopener">${ICONS.github}GitHub</a>
        <a class="btn ripple" href="${esc(c.linkedin)}" target="_blank" rel="noopener">${ICONS.linkedin}LinkedIn</a>
      </div>
      <div class="achievements reveal">
        <h2 class="plain">Key achievements</h2>
        <div class="metrics">
          ${r.metrics.map(m => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join('')}
        </div>
      </div>
    </header>

    <section id="career-tree" class="tree">
      <div class="tree-head">
        <h2 id="treeCmd">tree ./career-path<span class="run-hint" aria-hidden="true">⏎ run</span></h2>
        <button type="button" class="tree-toggle" id="treeToggle" aria-expanded="true" aria-controls="treeBody" aria-label="Clear the career tree">
          <span class="tree-toggle-text">clear</span>
        </button>
      </div>
      <div class="tree-body" id="treeBody">
        <div class="tree-clip">
          <div class="crt"><div class="tree-scroll">${buildTree(r.careerTree)}</div></div>
        </div>
      </div>
    </section>

    <section id="experience">
      <h2>git log --career</h2>
      ${r.experience.map(e => `
        <article class="job reveal">
          <header>
            <div class="co">
              ${e.logo ? `<span class="logo" role="img" aria-label="${esc(e.company)} logo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${(window.LOGOS && window.LOGOS[e.logo]) || ''}"/></svg></span>` : ""}
              <div><h3>${esc(e.company)}</h3><span class="r">${esc(e.role)}</span></div>
            </div>
            <span class="when">${esc(e.period)}</span>
          </header>
          <ul>${items(e.highlights)}</ul>
          <div class="tags">${chips(e.tech)}</div>
        </article>`).join('')}
    </section>

    <section id="skills">
      <h2>ls ./skills</h2>
      <div class="grid">
        ${r.skills.map(s => `<div class="box reveal"><b>${esc(s.group)}</b><div class="tags">${chips(s.items)}</div></div>`).join('')}
      </div>
    </section>

    <section id="education">
      <h2>cat education awards</h2>
      <div class="grid">
        ${r.education.map(e => `<div class="box reveal"><b>${esc(e.degree)} · ${esc(e.period)}</b><p>${esc(e.school)}, ${esc(e.place)}</p></div>`).join('')}
        ${r.awards.map(a => `<div class="box reveal"><b>award</b><p>${esc(a)}</p></div>`).join('')}
      </div>
    </section>

    <section id="projects">
      <h2>ls ./public-projects</h2>
      <div class="soon reveal">Work in progress – public projects will be added here as they become available.</div>
    </section>`;

  document.getElementById('contact').innerHTML = `
    <h2>Get in touch</h2>
    <p>Open to new opportunities. Feel free to reach out.</p>
    <div class="links">
      <a class="btn primary" href="mailto:${esc(c.email)}">${esc(c.email)}</a>
      <a class="btn" href="tel:${esc(c.phone.replace(/[^+\d]/g, ''))}">${esc(c.phone)}</a>
      <a class="btn ripple" href="${esc(c.linkedin)}" target="_blank" rel="noopener">${ICONS.linkedin}LinkedIn</a>
      <a class="btn ripple" href="${esc(c.github)}" target="_blank" rel="noopener">${ICONS.github}GitHub</a>
    </div>
    <small>&copy; ${new Date().getFullYear()} ${esc(r.name)}</small>`;

  initTree();
  initReveal();
  initActiveNav();
}


/* ---------- Career tree ----------
   Landscape SVG: columns run left→right in career order, height = seniority
   (junior at the bottom, senior at the top). Solid line = role progression,
   dotted branches = the functions performed in each role. */
function wrapText(s, max) {
  const lines = [];
  let line = '';
  s.split(' ').forEach(w => {
    if (line && (line + ' ' + w).length > max) { lines.push(line); line = w; }
    else line = line ? line + ' ' + w : w;
  });
  if (line) lines.push(line);
  return lines;
}

function buildTree(t) {
  const colW = 292, padX = 24, step = 78, base0 = 52, chipW = 132, chipH = 18, chipGap = 4;
  const maxLevel = Math.max(...t.roles.map(r => r.level));

  // Group consecutive roles by company: each company becomes one vertical stack.
  const companies = [];
  t.roles.forEach(r => {
    const last = companies[companies.length - 1];
    if (last && last.org === r.org) last.roles.push(r);
    else companies.push({ org: r.org, roles: [r] });
  });

  const top = 44;                                    // room for the tallest chip stack
  const baseY = top + base0 + maxLevel * step;       // company baseline
  const W = companies.length * colW + padX * 2;
  const H = baseY + 56;
  const yOf = r => baseY - base0 - r.level * step;
  const xOf = c => padX + c * colW + 10;

  const cols = companies.map((co, c) => {
    const x = xOf(c), tx = x + 124;
    const topY = Math.min(...co.roles.map(yOf));
    const delay = c * 0.55;

    const stack = co.roles.map((r, k) => {
      const y = yOf(r), d = (delay + 0.5 + k * 0.3).toFixed(2);
      const lines = wrapText(r.role, 16);
      const label = lines.map((l, i) =>
        `<text class="t-role" x="${x + 14}" y="${y - 7 - (lines.length - 1 - i) * 13}">${esc(l)}</text>`).join('');

      const fns = r.functions;
      const h = fns.length * chipH + (fns.length - 1) * chipGap;
      let cy = y - h / 2, leaves = '';
      fns.forEach((f, j) => {
        const mid = cy + chipH / 2;
        leaves += `<g class="t-leaf" style="--j:${j}">
          <path class="t-dot" d="M${tx} ${mid} H${x + 138}"/>
          <rect class="t-chip" x="${x + 138}" y="${cy}" width="${chipW}" height="${chipH}" rx="4"/>
          <text class="t-fn" x="${x + 144}" y="${cy + 12.5}">${esc(f)}</text>
        </g>`;
        cy += chipH + chipGap;
      });
      const trunkTop = y - h / 2 + chipH / 2, trunkBot = y + h / 2 - chipH / 2;

      return `<g class="t-col" style="--d:${d}s">
        <path class="t-dot" d="M${x + 8} ${y} H${tx}"/>
        <path class="t-dot" d="M${tx} ${trunkTop} V${trunkBot}"/>
        ${leaves}${label}
        <circle class="t-node${r.senior ? ' senior' : ''}${r.current ? ' current' : ''}" cx="${x}" cy="${y}" r="${r.senior ? 8 : 6}"/>
      </g>`;
    }).join('');

    const period = (t.periods || {})[co.org] || '';
    return `<g class="t-company">
      <path class="t-path" pathLength="1" style="--d:${(delay + 0.2).toFixed(2)}s;--t:1.2s" d="M${x} ${baseY} V${topY}"/>
      ${stack}
      <rect class="t-base" x="${x - 6}" y="${baseY - 6}" width="12" height="12" rx="2"/>
      <text class="t-co" x="${x - 6}" y="${baseY + 26}">${esc(co.org)}</text>
      <text class="t-per" x="${x - 6}" y="${baseY + 41}">${esc(period)}</text>
    </g>`;
  }).join('');

  const baseline = `<path class="t-path" pathLength="1" style="--d:0s;--t:${(companies.length * 0.55 + 0.4).toFixed(2)}s" d="M${xOf(0)} ${baseY} H${xOf(companies.length - 1)}"/>`;
  const summary = t.roles.map(r => `${r.role} at ${r.org}`).join(', then ');
  return `<svg class="tree-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Career path, junior to senior, grouped by company: ${esc(summary)}">
    ${baseline}
    ${cols}
  </svg>`;
}

function initTree() {
  const sec = document.getElementById('career-tree');
  if (!sec) return;
  const body = sec.querySelector('.tree-body');
  const crt = sec.querySelector('.crt');
  const btn = document.getElementById('treeToggle');
  const cmd = document.getElementById('treeCmd');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CRT_MS = 700, COLLAPSE_MS = 700, GROW_MS = 4400;
  let busy = false;

  function hide() {
    busy = true;
    btn.setAttribute('aria-expanded', 'false');
    const collapse = () => {
      body.classList.add('collapsed');
      body.inert = true;
      // Once cleared, the heading turns into a suggested command the visitor can run again
      sec.classList.add('cleared');
      btn.hidden = true;
      cmd.setAttribute('role', 'button');
      cmd.setAttribute('tabindex', '0');
      cmd.setAttribute('aria-label', 'Run tree ./career-path to show the career tree');
      setTimeout(() => { busy = false; }, COLLAPSE_MS);
    };
    if (reduce) { collapse(); return; }
    crt.classList.add('crt-off');            // 1. TV switches off
    setTimeout(collapse, CRT_MS);            // 2. page closes up the gap
  }

  function show() {
    busy = true;
    btn.setAttribute('aria-expanded', 'true');
    btn.hidden = false;
    sec.classList.remove('cleared');
    cmd.removeAttribute('role');
    cmd.removeAttribute('tabindex');
    cmd.removeAttribute('aria-label');
    body.inert = false;
    crt.classList.remove('crt-off');
    if (!reduce) sec.classList.add('growing');   // path draws, branches sprout
    body.classList.remove('collapsed');          // page is pushed down slowly
    setTimeout(() => { sec.classList.remove('growing'); busy = false; }, reduce ? 0 : GROW_MS);
  }

  btn.addEventListener('click', () => { if (!busy) hide(); });

  // "Run" the suggested command to bring the tree back
  const run = () => { if (!busy && sec.classList.contains('cleared')) show(); };
  cmd.addEventListener('click', run);
  cmd.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(); }
  });
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
try {
  render(window.RESUME);
} catch (err) {
  console.error(err);
  app.innerHTML = '<p class="lede">Could not load profile data. Please reach me at kevinricky999@yahoo.com.</p>';
}

/* ---------- Accent colour picker ---------- */
const ACCENTS = [
  // Ordered by hue, like the spectrum of light
  ['wine', '#8c2f4b'], ['blood', '#ef4444'], ['coffee', '#8b5e3c'],
  ['right', '#f97316'], ['sunshine', '#facc15'], ['nature', '#22c55e'], ['teal', '#14b8a6'], ['business', '#3b82f6'], ['violet', '#8b5cf6']
];
const accentList = document.querySelector('#accentMenu ul');
accentList.innerHTML = ACCENTS.map(([name, hex]) =>
  `<li><button type="button" data-accent="${name}" aria-pressed="false"><span class="swatch" style="--sw:${hex}"></span>${name}</button></li>`
).join('');

function setAccent(name) {
  root.dataset.accent = name;
  accentList.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.accent === name));
}
accentList.addEventListener('click', e => {
  const b = e.target.closest('button[data-accent]');
  if (!b) return;
  setAccent(b.dataset.accent);
  try { localStorage.setItem('accent', b.dataset.accent); } catch (err) {}
});
setAccent(ACCENTS.some(([n]) => n === root.dataset.accent) ? root.dataset.accent : 'business');
