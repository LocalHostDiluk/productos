import app from "./src/app.js";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
