# TodayPay Quiz App

A clean, responsive quiz built with React, hooks, and React Router. Features include one-question-at-a-time flow, score tracking, results summary, per-question timer, a progress bar, and persistent high scores.

## Quick Start

```bash
# Node 18+ recommended
npm install
npm run dev
# build for prod
npm run build && npm run preview
```

## Features Checklist

- Responsive layout (desktop & mobile)
- One question per screen with 4 options
- Required selection then **Lock Answer** → Next
- Score tracking and final results page
- Progress bar and per-question timer
- Local JSON or Open Trivia DB source
- Restart quiz flow, persistent top high scores (localStorage)
- Accessibility: keyboard navigation, ARIA roles, visible focus

## Architecture

- **React Functional Components + Hooks**: `useState`, `useEffect`, `useMemo`, Context API in `QuizContext`.
- **State Flow**: Load → (select → lock → next) × N → Results → Restart.
- **Routing**: `react-router-dom` with routes `/`, `/quiz`, `/results`, `/settings`.
- **UI**: Modern CSS (no external framework) with variables, glassy cards, and soft shadows.
- **Data**: 
  - `src/data/questions.json` (offline/local)
  - Open Trivia DB via `fetch`, normalized in `normalizeFromOpenTrivia`.
- **Persistence**: High scores stored in `localStorage` (top 10). Settings persisted as well.

## Design Decisions

- **Explicit Lock Step**: Prevent accidental skipping and satisfies “select before moving” requirement.
- **Timer as Guardrail**: Auto-locks when time runs out (default 30s).
- **Progress Feedback**: Top sticky header + progress bar during quiz.
- **Resilience**: Loading/error states for API mode, sane defaults for offline mode.
- **Accessibility**: Keyboard shortcuts and ARIA attributes for progress and options listbox.

## Testing Notes

- **Edge Cases**: 
  - No internet/API failure → use local JSON.
  - Short/empty data handled with fallback UI.
  - Rapid clicks debounced by lock/next gating.
  - Page refresh: settings & highscores persist.
- **Mobile**: Layout tested to stack cleanly at small widths.

## Files

- `src/state/QuizContext.jsx` — Single source of truth for quiz flow and timer.
- `src/components/*` — `QuestionCard`, `Controls`, `ProgressBar`, `ResultSummary`, `HighScores`.
- `src/routes/*` — Pages: Home, Quiz, Results, Settings.
- `src/utils/utils.js` — shuffle + OpenTrivia normalizer.
- `src/data/questions.json` — local dataset.

---

© 2025 TodayPay Quiz App submission
