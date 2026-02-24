import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import connectToDatabase from "./config/db";

const port = Number(process.env.PORT ?? 5000);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing. Add it to backend/.env.");
}

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase(mongoUri);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Loads environment variables, connects to MongoDB, and starts the Express server.

2. Why this file exists:
- Keeps application startup logic in one place, separate from route and middleware setup.

3. Why this syntax is used (key lines only):
- `dotenv.config()` loads values from `.env` early before other imports use `process.env`.
- `await connectToDatabase(mongoUri)` ensures the app does not accept requests before DB is ready.

4. Common mistakes in this file:
- Starting the HTTP server before DB connection completes.
- Not handling missing `MONGODB_URI` and failing later with unclear errors.

5. TypeScript syntax explanation (key TS syntax in this file):
- `const startServer = async (): Promise<void> => { ... }` → explicit async return type makes the startup contract clear.
- `const mongoUri = process.env.MONGODB_URI` → inferred as `string | undefined`; the `if (!mongoUri)` check narrows it to `string` before DB connect.
*/




/*
INTERVIEW PERSPECTIVE

1. Question:
- Why separate `server.ts` from `app.ts`?

Answer:
- It improves maintainability and testability by isolating startup concerns from Express app configuration.

2. Question:
- Why fail fast when `MONGODB_URI` is not set?

Answer:
- Early failure avoids running a partially configured server and makes deployment issues obvious.
*/
