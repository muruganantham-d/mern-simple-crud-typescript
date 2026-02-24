import { Router } from "express";

import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/item.controller";

const itemRouter = Router();

itemRouter.get("/", getItems);
itemRouter.post("/", createItem);
itemRouter.put("/:id", updateItem);
itemRouter.delete("/:id", deleteItem);

export default itemRouter;

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Maps REST endpoints to controller functions for items.

2. Why this file exists:
- Route declarations stay clean and focused while logic lives in controllers.

3. Why this syntax is used (key lines only):
- `Router()` creates a modular route group mounted at `/api/items` from `app.ts`.

4. Common mistakes in this file:
- Putting business logic directly in route files.
- Inconsistent route naming and HTTP method usage.

5. TypeScript syntax explanation (key TS syntax in this file):
- `const itemRouter = Router();` → `itemRouter` type is inferred from Express typings, so you get typed router methods without manual annotation.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why keep routes and controllers separate?

Answer:
- It improves readability, testability, and scaling as endpoint count increases.

2. Question:
- Why use `PUT /:id` for update in this app?

Answer:
- `PUT` is a common and clear choice for replacing/updating a resource by id.
*/
