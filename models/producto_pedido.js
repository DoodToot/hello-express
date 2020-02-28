const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo para ProductoPedido
const ProductoPedido = sequelize.define('productopedido', {
    cantidad: {
        type: Sequelize.INTEGER(10), allowNull: false, defaultValue: 1
    } 
});

module.exports = ProductoPedido;