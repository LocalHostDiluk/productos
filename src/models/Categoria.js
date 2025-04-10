import sequelize from "../config/bd.js";
import { DataTypes } from "sequelize";

export const Categoria = sequelize.define("Categoria", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100), // Ajustado al VARCHAR(100) de tu BD
    allowNull: false,
    unique: true, // Ajustado al UNIQUE de tu BD
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false, // Desactiva createdAt y updatedAt
  tableName: "categorias", // Debe coincidir con el nombre de la tabla
});
