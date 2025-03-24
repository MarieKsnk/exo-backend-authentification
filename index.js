import express from "express";
import connectDB from "./database/client.js";
import authRouter from "./routes/auth.js";
import eventRouter from "./routes/events.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", eventRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
