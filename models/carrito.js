const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo para Carrito
const Carrito = sequelize.define('carrito', {
  /*nombre: Sequelize.STRING,
  ref: Sequelize.INTEGER,
  imagen: Sequelize.STRING,
  precio: Sequelize.DECIMAL(10,2),
  existencias: Sequelize.INTEGER,
  descripcion: Sequelize.STRING*/
});

module.exports = Carrito;