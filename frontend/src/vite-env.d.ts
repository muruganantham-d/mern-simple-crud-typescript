/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Extends Vite environment variable typings used by frontend code.

2. Why this file exists:
- Prevents missing/unknown type errors when reading `import.meta.env` values.

3. Why this syntax is used (key lines only):
- `VITE_API_BASE_URL` is optional to allow local fallback defaults in service code.
- `/// <reference types="vite/client" />` imports Vite's built-in type declarations.

4. Common mistakes in this file:
- Using non-`VITE_` prefixed env names on the frontend.
- Accessing env values without typing and relying on `any` behavior.

5. TypeScript syntax explanation (key TS syntax in this file):
- `interface ImportMetaEnv { ... }` and `interface ImportMeta { ... }` → interfaces extend global typing for `import.meta.env`.
- `readonly VITE_API_BASE_URL?: string` → `readonly` prevents reassignment and `?` marks the env variable as optional.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why are frontend env variables prefixed with `VITE_`?

Answer:
- Vite only exposes variables with that prefix to client-side code for safety and clarity.

2. Question:
- Why define `ImportMetaEnv` manually here?

Answer:
- It provides autocomplete and compile-time checks for custom environment variables.
*/
