var express = require('express');
var router = express.Router();
// require obtiene los elementos de la carpeta que se le indique ("AQUI"), siempre que tengan un module.exports
// los mete dentro de la variable (productos) en este caso
var productos = require("../models/products.js")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dood', productos });
});

module.exports = router;
