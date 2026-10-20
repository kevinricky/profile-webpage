# Kevin Ricky – Personal Profile Website

Lightweight, dependency-free portfolio for Kevin Ricky, Senior Data & ML Platform Engineer. Hosted free on GitHub Pages at [kevinricky.online](https://kevinricky.online).

## Updating the content

All profile content lives in [`data/resume.js`](data/resume.js). Edit that file (summary, metrics, experience, skills, education, awards) and push; the page renders from it. No HTML changes needed.

## Run locally

No server or build step needed: just open `index.html` in a browser. (The data is loaded with a normal `<script>` tag, so it also works straight from disk.)

## Tech

- Plain HTML, CSS and vanilla JavaScript – no framework, no build step
- Google Fonts (Inter, JetBrains Mono)
- Dark/light theme (saved in the browser), responsive layout, scroll reveal

## Structure

```
profile-webpage/
├── index.html          # Page shell
├── style.css           # Theme + layout
├── script.js           # Renders resume.js, theme toggle, accent picker, career tree
├── data/resume.js      # All profile content
├── designs/preview.html# Design explorations (not part of the live site)
└── assets/             # Photo, favicon
```

## Links

- LinkedIn: [linkedin.com/in/kevinricky](https://www.linkedin.com/in/kevinricky/)
- GitHub: [github.com/kevinricky](https://github.com/kevinricky)

Copyright © 2025 Kevin Ricky. All rights reserved.
