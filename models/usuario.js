// 1. Crear el fichero 'users.js'
// 2. Importar los módulos sequelize y db.js
const Sequelize = require('sequelize');
const sequelize = require('./db');
// 3. Declarar el nuevo modelo Usuario, indicando sus atributos y los tipos de datos de éstos
const Usuario = sequelize.define('usuarios', {
  nombre: Sequelize.STRING(50),
  apellidos: Sequelize.STRING(100),
  email: Sequelize.STRING(50),
  password: Sequelize.STRING(50)
});
// 4. Exportar Usuario
module.exports = Usuario;
