import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../contoller/productController.js";

const router = express.Router(); // Router para crear rutas de nuestro servicio

router.get("/all", getProducts);
router.post("/create", createProduct);
router.patch("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router; // Exportamos el router para usarlo en app.js