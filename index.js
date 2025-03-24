import express from "express";
import connectDB from "./database/client.js";
import authRouter from "./routes/auth.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
