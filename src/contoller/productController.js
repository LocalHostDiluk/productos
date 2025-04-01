import { Product } from "../models/productModel.js";
import { userCreatedEvent } from "../services/service.js";
import jwt from "jsonwebtoken";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};
