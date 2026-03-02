import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Is Running..........");
});

connectDB();

app.listen(5001, () => {
  console.log("Server is running at PORT: 5001");
});
