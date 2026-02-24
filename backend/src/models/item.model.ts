import { InferSchemaType, model, Schema } from "mongoose";

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [120, "Title is too long"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ItemDocument = InferSchemaType<typeof itemSchema>;

const ItemModel = model<ItemDocument>("Item", itemSchema);

export default ItemModel;

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Defines the Mongoose schema and model for items with one `title` field.

2. Why this file exists:
- The model is the single source of truth for MongoDB document shape and validation rules.

3. Why this syntax is used (key lines only):
- `required`, `minlength`, and `maxlength` enforce backend-level data integrity.
- `timestamps: true` automatically stores `createdAt` and `updatedAt`.

4. Common mistakes in this file:
- Keeping only frontend validation and skipping backend schema validation.
- Forgetting to trim strings, which allows whitespace-only values.

5. TypeScript syntax explanation (key TS syntax in this file):
- `type ItemDocument = InferSchemaType<typeof itemSchema>` → a type alias is used to derive the TS document shape directly from the schema.
- `model<ItemDocument>("Item", itemSchema)` → generic type binds the model to `ItemDocument` for typed CRUD operations.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why use Mongoose schema validation if controller already validates input?

Answer:
- Schema validation is a final safety layer for all write paths, including future endpoints.

2. Question:
- What does `InferSchemaType<typeof itemSchema>` provide?

Answer:
- It derives a TypeScript type from the schema so code stays aligned with model fields.
*/
