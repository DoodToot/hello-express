const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo para Carrito
const Carrito = sequelize.define('carritos', {
});

module.exports = Carrito;