var express = require('express');
var router = express.Router();

const { Producto, Usuario, Carrito} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  const username = req.session.username;
  Producto.findAll().then(products => {
    res.render('index', { title: 'The Jungle', username, products });
  })
});

// Pégina con los detalles de un producto, según su referencia.

router.get('/products/:ref', function (req, res, next) {
  // Obtengo la referencia del producto a partir de la ruta
  var ref = req.params.ref;
  Producto.findOne({
    where: {ref}
  })
  .then(product => {
    if (product) {
      // Pasamos los datos del producto a la plantilla
      res.render('product', {product});
    } else {
      // Si no encontramos el producto con esa referencia, redirigimos a página de error.
      res.redirect('/error');
    }
  })
});

var cesta = []; //provisional

// Meter producto en el Carrito
router.post("/comprar", function (req, res, next) {
  const ref = req.body;
  // Añadimos producto a Carrito
  Carrito.create(ref)
      .then(carrito => {
        // Redirigimos a página de productos
        res.redirect("/");   
      });
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/registro", function (req, res, next) {
  res.render("registro");
});

/**
 * Procesamiento del formulario de login. Obtiene los datos del formulario en la
 * petición (req) y comprueba si hay algún usuario con ese nombre y contraseña.
 * Si coincide, genera una cookie y dirige a la página principal.
 * Si no coincide, vuelve a cargar la página de login para mostrar un error.
 */

router.post("/login", function (req, res, next) {
  const {email, password} = req.body;
  // buscar un usuario en la base de datos que tenga ese email y password
  Usuario.findOne({where : {email, password}})
    .then(usuario => {
      if (usuario) {
        req.session.usuarioId = usuario.id;
        res.redirect("/");
      } else {
        res.render("login");
      }
    })
});

router.post("/registro", function (req, res, next) {
  const datos = req.body;
  // Si las dos contraseñas coinciden:
  if (datos.password == datos.rep_password) {
    // Meter en la BD Usuario con los datos del formulario.
    Usuario.create(datos)
      .then(usuario => {
        res.redirect("/login");    
      });
  } else {
    // Mostrar un error si no coinciden
    res.redirect("/registro");
  }
});

module.exports = router;

