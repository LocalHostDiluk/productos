//Configuración de express
import bodyParser from "body-parser";
import express from "express";
import productosRoutes from "./routes/routes.js";

const app = express();

app.use(bodyParser.json());
app.use("/app/products", productosRoutes);

export default app;