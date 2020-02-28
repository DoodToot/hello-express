const sequelize = require('./db');
const Producto = require('./producto');
const Usuario = require ('./usuario');
const Pedido = require ('./pedido');
const Carrito = require ('./carrito');

Usuario.hasOne(Carrito);
Carrito.belongsTo(Usuario);

// Finalmente conectamos con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync({alter : true}); // crea las tablas si no existen
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = {
      Producto,
      Usuario,
      Carrito,
      Pedido
  }