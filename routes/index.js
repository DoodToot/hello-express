var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const productos = [
    {nombre: "Microondas", precio:45, existencias: 6, imagen: "microondas.jpg"},
    {nombre: "Frigorífico", precio:200, existencias: 4, imagen: "frigorífico.jpg"},
    {nombre: "TV", precio:90, existencias: 0, imagen: "tv.jpg"},
    {nombre: "Lámpara", precio:20, existencias: 14, imagen: "lampara.jpg"},
    {nombre: "Lavadora", precio:290, existencias: 3},
    {nombre: "Secadora", precio:180, existencias: 5},
    ];
  res.render('index', { title: 'Dood', productos });
});

module.exports = router;
