var express = require('express');
var router = express.Router();
// require obtiene los elementos de la carpeta que se le indique ("AQUI"), siempre que tengan un module.exports
// los mete dentro de la variable (productos) en este caso
var productos = require("../models/products.js")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dood', productos });
});
// creamos una nueva línea de (router) que direccione a /productos/:ref
router.get('/productos/:ref', function (req, res, next) {
  // indicamos que el ref de la dirección lo obtenemos de req (request)
  const ref = req.params.ref;
  console.log(ref);
  // producto aisla la información del elemento que tenga el ref que buscamos
  const producto = productos.find(function(p) {
    return p.ref==ref;
  });
  console.log(producto);
  if (producto)
  // el render le indica que imprima el archivo product.ejs en esa dirección, y que utiliza la información recojida en (producto)
  res.render('product', {producto});
  else res.redirect('/error');
});

const cesta = []; // provisional

router.post('/comprar', function(req, res, next) {
  const ref = req.params.ref;
  const producto = productos.find(function(p) {
    return p.ref==ref; 
  });
  // añadimos el producto a la cesta
  cesta.push(producto);
  // nos lleva a la página principal
  res.redirect("/");
});

router.get('/login', function(req, res, next) {
  res.render("login");
});

module.exports = router;