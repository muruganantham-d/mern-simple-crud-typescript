import axios from "axios";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import "./App.css";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "./services/itemApi";
import type { Item } from "./types/item";

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? "Request failed.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
};

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loadItems = async (): Promise<void> => {
    setLoading(true);
    setError("");

    try {
      const data = await getItems();
      setItems(data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const resetForm = (): void => {
    setTitle("");
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Title is required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // One input handles both create and edit modes.
      if (editingId) {
        await updateItem(editingId, { title: cleanTitle });
      } else {
        await createItem({ title: cleanTitle });
      }

      resetForm();
      await loadItems();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: Item): void => {
    setEditingId(item._id);
    setTitle(item.title);
    setError("");
  };

  const handleDelete = async (id: string): Promise<void> => {
    const isConfirmed = window.confirm("Delete this item?");
    if (!isConfirmed) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await deleteItem(id);

      if (editingId === id) {
        resetForm();
      }

      await loadItems();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="app">
      <section className="card">
        <h1>TypeScript MERN CRUD</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter item title"
            maxLength={120}
            disabled={submitting}
          />

          <button type="submit" disabled={submitting}>
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              className="secondary"
              onClick={resetForm}
              disabled={submitting}
            >
              Cancel
            </button>
          )}
        </form>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="status">Loading items...</p>
        ) : (
          <ul className="list">
            {items.length === 0 && <li className="empty">No items yet.</li>}

            {items.map((item) => (
              <li key={item._id} className="list-row">
                <span>{item.title}</span>

                <div className="actions">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => handleEdit(item)}
                    disabled={submitting}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={() => {
                      void handleDelete(item._id);
                    }}
                    disabled={submitting}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Implements the full CRUD UI with one input field, list rendering, and actions.

2. Why this file exists:
- Serves as the main page component for this basic project.

3. Why this syntax is used (key lines only):
- `useState<Item[]>([])` explicitly types list state for safer item access.
- `if (editingId) ... else ...` reuses one form for both create and update flows.

4. Common mistakes in this file:
- Using `useState([])` and getting weak or incorrect type inference.
- Not handling loading/error/submitting states and creating poor UX.

5. TypeScript syntax explanation (key TS syntax in this file):
- `import type { FormEvent } from "react"` and `import type { Item } ...` → type-only imports keep type usage separate from runtime values.
- `useState<Item[]>([])` and `useState<string>("")` → generic type arguments make state types explicit and safe.
- `FormEvent<HTMLFormElement>` → generic event type provides correct typing for form submit events.
- `const getErrorMessage = (error: unknown): string => { ... }` → `unknown` enforces safe narrowing before accessing error details.
- `Promise<void>` return annotations on async handlers make side-effect-only functions explicit.
- `axios.isAxiosError<{ message?: string }>(error)` → generic describes expected error response payload shape.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why keep separate `loading`, `submitting`, and `error` states?

Answer:
- Each state represents a distinct UI concern and avoids ambiguous conditional logic.

2. Question:
- Why use one form for add and edit instead of two forms?

Answer:
- It reduces duplicated code and keeps behavior consistent across create/update actions.
*/
