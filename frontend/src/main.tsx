import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Boots the React app and mounts it to the root DOM element.

2. Why this file exists:
- Every React app needs a single entry point for startup.

3. Why this syntax is used (key lines only):
- `createRoot(...)` uses modern concurrent-compatible React rendering.
- `StrictMode` helps detect risky patterns during development.

4. Common mistakes in this file:
- Missing `#root` element in `index.html`.
- Removing StrictMode too early and missing development warnings.

5. TypeScript syntax explanation (key TS syntax in this file):
- `document.getElementById('root')!` → `!` is the non-null assertion because `getElementById` may return `null`, but root is guaranteed by template.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why use `createRoot` instead of the old render API?

Answer:
- It is the modern React entry API and supports current rendering behavior.

2. Question:
- What is the purpose of `StrictMode`?

Answer:
- It surfaces potential issues in development without affecting production output.
*/
