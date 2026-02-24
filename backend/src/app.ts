import cors from "cors";
import express from "express";

import itemRouter from "./routes/item.routes";

const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

app.use(
  cors({
    origin: clientOrigin,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "API is running." });
});

app.use("/api/items", itemRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

export default app;


/*
FILE EXPLANATION (for learning)

1. What this file does:
- Creates the Express app, registers middleware, and mounts API routes.

2. Why this file exists:
- Centralizes middleware and route wiring so server bootstrap code stays clean.

3. Why this syntax is used (key lines only):
- `app.use(express.json())` parses incoming JSON request bodies.
- `app.use("/api/items", itemRouter)` keeps item endpoints grouped under one API prefix.

4. Common mistakes in this file:
- Forgetting CORS configuration for frontend origin.
- Registering middleware in the wrong order.

5. TypeScript syntax explanation (key TS syntax in this file):
- `app.get("/api/health", (_req, res) => { ... })` → `_req` and `res` types are inferred from Express type definitions, so explicit annotations are not required.
- `app.use((_req, res) => { ... })` → callback parameter types are inferred as Express request/response for the catch-all handler.
*/




/*
INTERVIEW PERSPECTIVE

1. Question:
- Why is `express.json()` placed before the item routes?

Answer:
- Route handlers need parsed JSON in `req.body`; middleware must run first.

2. Question:
- Why keep a catch-all 404 route at the end?

Answer:
- It provides a consistent response for unknown endpoints and improves API clarity.
*/
