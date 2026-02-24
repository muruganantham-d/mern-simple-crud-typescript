import mongoose from "mongoose";

const connectToDatabase = async (mongoUri: string): Promise<void> => {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
};

export default connectToDatabase;

/*
FILE EXPLANATION (for learning)

1. What this file does:
- Exposes a reusable function to connect Mongoose to MongoDB.

2. Why this file exists:
- Keeps DB connection setup separate from server startup and route logic.

3. Why this syntax is used (key lines only):
- The function accepts `mongoUri: string` to avoid hardcoding connection strings.
- `await mongoose.connect(...)` ensures connection success/failure is handled by caller.

4. Common mistakes in this file:
- Hardcoding credentials in source code.
- Ignoring connection errors and assuming DB is always available.

5. TypeScript syntax explanation (key TS syntax in this file):
- `const connectToDatabase = async (mongoUri: string): Promise<void> => { ... }` → `mongoUri: string` enforces input type and `Promise<void>` documents that this async function returns no value.
*/

/*
INTERVIEW PERSPECTIVE

1. Question:
- Why wrap DB connection in a dedicated function?

Answer:
- It improves separation of concerns and makes startup flow easier to test and reuse.

2. Question:
- Why is this function async?

Answer:
- MongoDB connection is asynchronous; startup should await it before serving traffic.
*/
