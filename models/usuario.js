// 1. Crear el fichero 'users.js'
// 2. Importar los módulos sequelize y db.js
const Sequelize = require('sequelize');
const sequelize = require('./db');
// 3. Declarar el nuevo modelo Usuario, indicando sus atributos y los tipos de datos de éstos
const Usuario = sequelize.define('usuarios', {
  // type: tipo de campo, allowNull: si permite que el campo se deje en blanco, unique: si el campo tiene que ser único
  email: {type: Sequelize.STRING(100), allowNull: false, unique: true},
  password: Sequelize.STRING(50),
  nombre: Sequelize.STRING(50),
  apellidos: Sequelize.STRING(75)
});
// 4. Exportar Usuario
module.exports = Usuario;
