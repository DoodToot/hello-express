const Sequelize = require('sequelize');

// Primero definimos sequelize con los parámetros de conexión
const sequelize = new Sequelize('tienda1', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;