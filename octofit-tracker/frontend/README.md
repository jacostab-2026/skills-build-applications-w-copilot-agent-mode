# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application. The app uses Vite, Bootstrap, and `react-router-dom` to navigate between users, teams, activities, leaderboard, and workout suggestions.

## Environment

Define `VITE_CODESPACE_NAME` before running the app in GitHub Codespaces so API requests use the forwarded logic tier URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, add it to `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, the frontend calls API endpoints under:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api` so it never builds `https://undefined-8000...` URLs.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
