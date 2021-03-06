var express = require('express');
var router = express.Router();

const { Producto, Usuario, Carrito, Pedido, sequelize } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  const username = req.session.username;
  Producto.findAll().then(products => {
    res.render('index', { title: 'The Jungle', username, products })
  })
})

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
      res.render('product', {product})
    } else {
      // Si no encontramos el producto con esa referencia, redirigimos a página de error.
      res.redirect('/error')
    }
  })
})

// Meter producto en el Carrito
router.post("/comprar", function (req, res, next) {
  const ref = req.body.ref;
  const usuarioId= req.session.usuarioId;
  // Añadimos producto a Carrito
  if (usuarioId) {
    Producto.findOne({where: {ref}})
    // Producto -> Sequelize
    .then(producto => {
      if (producto) {
        // Añadimos el producto al carrito del usuario
        Carrito.findOrCreate({where: {usuarioId}, include: [Producto], defaults: {usuarioId}})
        .then(([carrito, created]) => {
          var productos = carrito.productos;
          var p = productos.find( p => p.ref == ref);
          if (p) {
            // el artículo ya está en el carrito, por lo que incrementamos su cantidad
            p.productocarrito.increment({cantidad: 1})
            .then(() => {
              p.decrement({existencias: 1});
              res.redirect("/carrito");
            })
          } else {
            carrito.addProducto(producto)
            .then(() => {
              p.decrement({existencias: 1});
              res.redirect("/carrito");
            })
          }
        })
      } else {
        res.render("error", {message: "No existe el producto solicitado"});
      }
    })
  } else {
    res.redirect("/login");
  }
})
router.get("/login", function (req, res, next) {
  res.render("login", {error: undefined})
})

/**
 * Procesamiento del formulario de login. Obtiene los datos del formulario en la
 * petición (req) y comprueba si hay algún usuario con ese nombre y contraseña.
 * Si coincide, genera una cookie y dirige a la página principal.
 * Si no coincide, vuelve a cargar la página de login para mostrar un error.
 */

router.post("/login", function (req, res, next) {
  const {email, password} = req.body;
  // buscar un usuario en la base de datos que tenga ese email y password
  Usuario.findOne({where: {email, password}})
    .then(usuario => {
      if (usuario) {
        req.session.usuarioId = usuario.id;
        res.redirect("/");
      } else {
        res.render("login", {error: "Ese usuario no existe"})
      }
    })
})

router.get("/logout", function (req, res, next) {
  req.session = null;
  res.redirect("/");
})

router.get("/registro", function (req, res, next) {
  res.render("registro", {error: undefined, datos:{} });
})

router.post("/registro", function (req, res, next) {
  const datos = req.body;
  if (datos.nombre.length == 0) {
    res.render("registro", {datos, error: "Nombre no puede estar vacío"})
  } else if (datos.apellidos.length == 0) {
    res.render("registro", {datos, error: "Apellidos no puede estar vacío"})
  } else if (datos.email.length == 0) {
    res.render("registro", {datos, error: "Email no puede estar vacío"})
    // Añadimos la expresión regulada entre barras "/.../" y la comparamos con el string ".test(string)" 
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(datos.email)) {
    res.render("registro", {datos, error: "La estructura del email no es la adecuada"})
  } else if (datos.password.length < 6) {
    res.render("registro", {datos, error: "Password debe tener 6 caracteres mínimo"})
  } else if (datos.password != datos.rep_password) {
    res.render("registro", {datos, error: "Las contraseñas deben coincidir"})
  } else {
    // Meter en la BD Usuario con los datos del formulario.
    Usuario.create(datos)
      .then(usuario => {
        res.redirect("/login")
      })
    }
})

router.get("/carrito", function (req, res, next) {
  const usuarioId= req.session.usuarioId;
  if (!usuarioId) {
    res.redirect("/login");
  } else {
    Carrito.findOne({where: {usuarioId}, include: [Producto]})
    .then(carrito => {
      var productos = carrito.productos;
      res.render("carrito", {productos});
    })
  }
})

router.post("/checkout", function (req, res, next) {
  const usuarioId= req.session.usuarioId;
  if (!usuarioId) {
    res.redirect("/login");
  } else {
    sequelize.transaction(t => {
      return Carrito.findOne({where: {usuarioId}, include: [Producto]})
      .then(carrito => {
        const productos = carrito.productos;
        // VERSIÓN 3 (Every)
        if (productos.every(p => p.existencias >= p.productocarrito.cantidad)) {
          return Pedido.create({usuarioId, estado: "PDTE_PAGO"})
          .then(pedido => {
            pedido.addProductos(productos, {transaction: t})
            .then(() => carrito.removeProductos(productos))
            .then(() => t.commit())
            .then(() => res.redirect("/pedido/" + pedido.id))
          })
        } else {
          for (var i = 0; i < productos.length; i++) {
            // metemos en hayExistencias (un Array) el resultado de la comparación (true o false)
            productos[i].hayExistencias = productos[i].existencias >= productos[i].productocarrito.cantidad;
          }
          res.render("carrito", {productos});
        }
      })
    })
  }
})

router.get("/pedido/:pedido.id", function (req, res, next) {
  const pedidoId = req.params.pedido.id;
  res.render("pedido");
})

module.exports = router;
