import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import ItemModel from "../models/item.model";
import { ItemRequestBody } from "../types/item.types";

interface ItemIdParams {
  id: string;
}

const normalizeTitle = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const title = value.trim();
  return title.length > 0 ? title : null;
};

export const getItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await ItemModel.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    res.status(500).json({ message: "Failed to fetch items." });
  }
};

export const createItem = async (
  req: Request<Record<string, never>, unknown, ItemRequestBody>,
  res: Response,
): Promise<void> => {
  const title = normalizeTitle(req.body?.title);

  if (!title) {
    res.status(400).json({ message: "Title is required." });
    return;
  }

  try {
    const item = await ItemModel.create({ title });
    res.status(201).json(item);
  } catch (error) {
    console.error("Failed to create item:", error);
    res.status(500).json({ message: "Failed to create item." });
  }
};

export const updateItem = async (
  req: Request<ItemIdParams, unknown, ItemRequestBody>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid item id." });
    return;
  }

  const title = normalizeTitle(req.body?.title);

  if (!title) {
    res.status(400).json({ message: "Title is required." });
    return;
  }

  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true },
    );

    if (!updatedItem) {
      res.status(404).json({ message: "Item not found." });
      return;
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Failed to update item:", error);
    res.status(500).json({ message: "Failed to update item." });
  }
};

export const deleteItem = async (
  req: Request<ItemIdParams>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid item id." });
    return;
  }

  try {
    const deletedItem = await ItemModel.findByIdAndDelete(id);

    if (!deletedItem) {
      res.status(404).json({ message: "Item not found." });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete item:", error);
    res.status(500).json({ message: "Failed to delete item." });
  }
};

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Implements CRUD handlers: list, create, update, and delete items.

2. Why this file exists:
- Keeps request handling and business logic separate from route definitions.

3. Why this syntax is used (key lines only):
- `Request<Params, unknown, Body>` adds compile-time safety for params and payloads.
- `isValidObjectId(id)` prevents invalid MongoDB id values from reaching queries.

4. Common mistakes in this file:
- Skipping input trimming/validation and storing bad data.
- Returning the wrong HTTP status codes for not found vs validation errors.

5. TypeScript syntax explanation (key TS syntax in this file):
- `interface ItemIdParams { id: string; }` → interface defines the expected `:id` route params shape.
- `const normalizeTitle = (value: unknown): string | null => { ... }` → `unknown` forces safe runtime checks; `string | null` is a union return type for validated/invalid input.
- `Request<ItemIdParams, unknown, ItemRequestBody>` → generics mean `Params`, `ResBody`, and `ReqBody`, so route handlers get strongly typed params/body.
- `): Promise<void> => { ... }` → explicit async return type clarifies the handler resolves without returning a value payload.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why validate ObjectId in controller before DB call?

Answer:
- It avoids unnecessary query work and returns a clearer `400 Bad Request` for invalid ids.

2. Question:
- Why use `runValidators: true` in `findByIdAndUpdate`?

Answer:
- Mongoose does not always run schema validators on updates unless explicitly enabled.
*/
