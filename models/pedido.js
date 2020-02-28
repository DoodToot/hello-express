const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo para Pedido
const Pedido = sequelize.define('pedidos', {
  estado: Sequelize.ENUM('PDTE_PAGO', 'PAGADO', 'CANCELADO', 'TRANSITO', 'COMPLETADO')
  // Pendiente, Cancelado, Pagado, Enviado, Completado.
});

module.exports = Pedido;