# Github_profile

A modern, responsive **GitHub profile / portfolio** web app. Enter any GitHub
username and it renders that user's profile and most-starred repositories using
the [GitHub REST API](https://docs.github.com/en/rest). It gracefully falls back
to bundled sample data when the API is unreachable or rate-limited, so it always
works end-to-end — even offline.

## Features

- Live profile lookup by username with a search box and shareable `?u=<user>` URLs
- Popular repositories with language, stars, and forks
- Light/dark theme toggle (respects your OS preference, persisted in `localStorage`)
- Graceful offline/rate-limit fallback to sample data
- Zero-framework, fast [Vite](https://vitejs.dev/) dev server + build

## Tech stack

- [Vite](https://vitejs.dev/) 6 (dev server + bundler)
- Vanilla JavaScript (ES modules) + CSS
- [Vitest](https://vitest.dev/) for unit tests, [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

## Getting started

Requires **Node.js 20+** and npm.

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
```

Open http://localhost:5173 in your browser.

## Available scripts

| Command           | Description                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server (port 5173, host 0.0.0.0)|
| `npm run build`   | Build the production bundle into `dist/`           |
| `npm run preview` | Preview the production build (port 4173)           |
| `npm test`        | Run the unit test suite with Vitest                |
| `npm run lint`    | Lint the codebase with ESLint                      |
| `npm run format`  | Format the codebase with Prettier                  |

## Project structure

```
index.html          # App shell
src/
  main.js           # App bootstrap, search + theme wiring
  github.js         # GitHub API client + sample-data fallback
  render.js         # Pure render helpers (profile, repos, states)
  style.css         # Styles (light/dark themes)
  render.test.js    # Unit tests
vite.config.js      # Vite + Vitest config
```
