const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo para ProductoCarrito
const ProductoCarrito = sequelize.define('productocarrito', {
    cantidad: {
        type: Sequelize.INTEGER(10), allowNull: false, defaultValue: 1
    } 
});

module.exports = ProductoCarrito;