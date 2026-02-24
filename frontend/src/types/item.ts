export interface Item {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemPayload {
  title: string;
}

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Declares frontend types for an item and item payload.

2. Why this file exists:
- Provides reusable, consistent contracts between UI code and API service.

3. Why this syntax is used (key lines only):
- `Item` includes server-generated fields like `_id`, `createdAt`, and `updatedAt`.
- `ItemPayload` only includes input fields needed for create/update calls.

4. Common mistakes in this file:
- Using one type for both API response and request payload.
- Leaving fields untyped and relying on implicit `any`.

5. TypeScript syntax explanation (key TS syntax in this file):
- `interface Item { ... }` → interface is used for the item object shape returned by the backend.
- `interface ItemPayload { ... }` → a separate interface captures only fields needed in create/update requests.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why keep response type and payload type separate?

Answer:
- Response objects often contain server-generated metadata not required in requests.

2. Question:
- Why is `_id` typed as `string` on frontend?

Answer:
- MongoDB ObjectId values are serialized to JSON strings over HTTP.
*/
