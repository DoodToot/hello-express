const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo para Producto
const Producto = sequelize.define('productos', {
  nombre: Sequelize.STRING(50),
  ref: Sequelize.INTEGER(10),
  imagen: Sequelize.STRING,
  precio: Sequelize.DECIMAL(10,2),
  existencias: Sequelize.INTEGER(10),
  descripcion: Sequelize.STRING
});

module.exports = Producto;