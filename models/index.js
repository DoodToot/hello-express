const sequelize = require('./db');
const Producto = require('./producto');
const Usuario = require ('./usuario');
// Finalmente conectamos con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync(); // crea las tablas si no existen
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = {
      Producto,
      Usuario
  }