import { Product } from "../models/productModel.js";
import jwt from "jsonwebtoken";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const createProduct = async (req, res) => {
  const { nombre, precio, stock, descripcion, imagen, categoria } = req.body;

  if (!nombre || !precio || !stock || !categoria || !descripcion) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  if (stock < 0) {
    return res.status(400).json({ message: "El stock no puede ser negativo" });
  }

  if (precio < 0) {
    return res.status(400).json({ message: "El precio no puede ser negativo" });
  }

  try {
    const newProduct = await Product.create({
      nombre,
      precio,
      stock,
      descripcion,
      imagen,
      categoria,
    });

    console.log("Producto creado:", newProduct);

    res.status(201).json({ message: "Producto creado", data: newProduct });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, descripcion, imagen, categoria } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (stock < 0) {
      return res
        .status(400)
        .json({ message: "El stock no puede ser negativo" });
    }
    if (precio < 0) {
      return res
        .status(400)
        .json({ message: "El precio no puede ser negativo" });
    }

    await product.update({
      nombre: nombre || product.nombre,
      precio: precio || product.precio,
      stock: stock || product.stock,
      descripcion: descripcion || product.descripcion,
      imagen: imagen || product.imagen,
      categoria: categoria || product.categoria,
    });

    return res
      .status(200)
      .json({ message: "Producto actualizado correctamente", data: product });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (!product.status) {
      return res.status(400).json({ message: "El producto ya está eliminado" });
    }

    await product.update({
      status: false,
    });

    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
