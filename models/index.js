const sequelize = require('./db');
const Producto = require('./producto');
const Usuario = require ('./usuario');
const Carrito = require ('./carrito');
const Pedido = require ('./pedido');
const ProductoCarrito = require ('./producto_carrito');
const ProductoPedido = require ('./producto_pedido');
// Usuario - Carrito
Usuario.hasOne(Carrito);
Carrito.belongsTo(Usuario);
// Usuario - Pedido
Usuario.hasMany(Pedido);
Pedido.belongsTo(Usuario);
// Carrito - Producto
Carrito.belongsToMany(Producto, {
  through: ProductoCarrito
});
Producto.belongsToMany(Carrito, {
  through: ProductoCarrito
});
// Pedido - Producto
Pedido.belongsToMany(Producto, {
  through: ProductoPedido
});
Producto.belongsToMany(Pedido, {
  through: ProductoPedido
});

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
      Pedido,
      ProductoCarrito,
      ProductoPedido
  }