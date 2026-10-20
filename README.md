# Kevin Ricky – Personal Profile Website

Lightweight, dependency-free portfolio for Kevin Ricky, Senior Data & ML Platform Engineer. Hosted free on GitHub Pages at [kevinricky.online](https://kevinricky.online).

## Updating the content

All profile content lives in [`data/resume.json`](data/resume.json). Edit that file (summary, metrics, experience, skills, education, awards) and push; the page renders from it. No HTML changes needed.

## Run locally

The page loads `data/resume.json` with `fetch`, so it needs a local server (opening `index.html` directly won't work). Use the VS Code **Live Server** extension, or any static server.

## Tech

- Plain HTML, CSS and vanilla JavaScript – no framework, no build step
- Google Fonts (Inter, JetBrains Mono)
- Dark/light theme (saved in the browser), responsive layout, scroll reveal

## Structure

```
profile-webpage/
├── index.html          # Page shell
├── style.css           # Theme + layout
├── script.js           # Renders resume.json, theme toggle, nav
├── data/resume.json    # All profile content
├── designs/preview.html# Design explorations (not part of the live site)
└── assets/             # Photo, favicon
```

## Links

- LinkedIn: [linkedin.com/in/kevinricky](https://www.linkedin.com/in/kevinricky/)
- GitHub: [github.com/kevinricky](https://github.com/kevinricky)

Copyright © 2025 Kevin Ricky. All rights reserved.
