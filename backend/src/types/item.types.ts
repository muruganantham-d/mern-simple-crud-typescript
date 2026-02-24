export interface ItemRequestBody {
  title: string;
}


/*
FILE EXPLANATION (for learning)

1. What this file does:
- Defines the TypeScript shape of the request body for create/update item APIs.

2. Why this file exists:
- Prevents duplicated inline types across controller methods.

3. Why this syntax is used (key lines only):
- `interface ItemRequestBody` clearly expresses required payload fields.

4. Common mistakes in this file:
- Repeating payload shapes in many files and creating inconsistent contracts.
- Using `any` for request body and losing compile-time safety.

5. TypeScript syntax explanation (key TS syntax in this file):
- `interface ItemRequestBody { ... }` → interface is used because this file defines a simple object-shaped API contract.
*/





/*
INTERVIEW PERSPECTIVE

1. Question:
- Why define request body types in a separate file?

Answer:
- It improves reuse, readability, and consistency as APIs grow.

2. Question:
- Why use an `interface` here instead of `type`?

Answer:
- Either works; `interface` is commonly preferred for object-shaped API contracts.
*/
