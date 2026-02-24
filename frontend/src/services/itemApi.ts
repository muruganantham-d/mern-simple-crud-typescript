import axios from "axios";

import type { Item, ItemPayload } from "../types/item";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getItems = async (): Promise<Item[]> => {
  const response = await apiClient.get<Item[]>("/api/items");
  return response.data;
};

export const createItem = async (payload: ItemPayload): Promise<Item> => {
  const response = await apiClient.post<Item>("/api/items", payload);
  return response.data;
};

export const updateItem = async (
  id: string,
  payload: ItemPayload,
): Promise<Item> => {
  const response = await apiClient.put<Item>(`/api/items/${id}`, payload);
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/items/${id}`);
};

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Wraps all item-related HTTP calls in one Axios service module.

2. Why this file exists:
- Keeps networking logic out of React components and makes calls reusable.

3. Why this syntax is used (key lines only):
- `axios.create({ baseURL: ... })` avoids repeating base URL for each request.
- Generic calls like `get<Item[]>()` provide strongly typed response data.

4. Common mistakes in this file:
- Hardcoding endpoint URLs in multiple components.
- Skipping response typing and losing IntelliSense/type safety.

5. TypeScript syntax explanation (key TS syntax in this file):
- `import type { Item, ItemPayload } from "../types/item"` → type-only import avoids runtime imports for compile-time types.
- `get<Item[]>()`, `post<Item>()`, `put<Item>()` → Axios generics define the expected response data type.
- `Promise<Item[]>`, `Promise<Item>`, `Promise<void>` → explicit return types document each API function contract.
- `(id: string, payload: ItemPayload)` → typed parameters ensure only valid argument shapes are passed.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why centralize API calls in a service layer?

Answer:
- It improves maintainability and lets UI components focus on state and rendering.

2. Question:
- Why return typed promises from service functions?

Answer:
- Consumers get compile-time guarantees about data shape and safer refactoring.
*/
