import sequelize from "../config/bd.js";
import { DataTypes } from "sequelize";
import dotenv from "dotenv";
import { Categoria } from "./Categoria.js"; // Importa el modelo de Categoria

dotenv.config();

export const Product = sequelize.define("Producto",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255), // Ajustado al VARCHAR(255) de la BD
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.STRING(255), // Ajustado al VARCHAR(255) de la BD
    allowNull: true,
  },
  // Eliminamos la columna 'categoria' de tipo STRING
  // categoria: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  categoriaId: { // Nueva columna para la clave foránea
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria, // Referencia al modelo de Categoria
      key: 'id',       // Referencia a la columna 'id' de la tabla categorias
    },
    onUpdate: 'CASCADE', // Opcional: Define el comportamiento al actualizar la categoría
    // onDelete: 'RESTRICT', // Opcional: Define el comportamiento al eliminar la categoría
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'), // Ajustado al DEFAULT CURRENT_TIMESTAMP de la BD
  },
  fechaActualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'), // Ajustado al DEFAULT CURRENT_TIMESTAMP de la BD
    onUpdate: DataTypes.literal('CURRENT_TIMESTAMP'), // Se actualiza al actualizar el registro
  },
  status: {
    type: DataTypes.TINYINT(1), // Ajustado al TINYINT(1) de la BD
    allowNull: false,
    defaultValue: 1, // Ajustado al DEFAULT 1 de la BD
  },
}, {
  timestamps: false, // Desactiva createdAt y updatedAt
  tableName: "productos", // Debe coincidir con el nombre de la tabla
});

// Define la asociación con la tabla de categorías
Product.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Categoria.hasMany(Product, { foreignKey: 'categoriaId', as: 'productos' });
