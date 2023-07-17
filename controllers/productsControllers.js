const productModel = require("../models/product");
const db = require("../database/models");

const controller = {
  // OK
  getList: function (req, res) {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productList", { productos: productos })
      })
  },

  getEdit: (req, res) => {

    db.Producto.findByPk(req.params.id)

      .then(function (producto) {
        res.render("editProduct", { producto: producto })
      })

  },
  getDetail: (req, res) => {

    db.Producto.findByPk(req.params.id)

      .then(function (producto) {
        res.render("productDetail", { producto: producto })
      })


  },
  deleteProduct: (req, res) => {
    db.Producto.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect("/product")

  },

  updateProduct: (req, res) => {
    db.Producto.update({
      activity_name: req.body.activity_name,
      aliado: req.body.aliado_id,
      price: req.body.price,
      discount: req.body.discount,
      spots: req.body.spots,
      description: req.body.product_description,
      schedule: req.body.schedule,
      length: req.body.length,
      difficulty: req.body.difficulty,
      city: req.body.city
    }, {
      where: {
        id: req.params.id
      }
    })
  },

  getCart: (req, res) => {
    let products = productModel.findAll();
    res.render("productCart", {
      products: products,
    });
  },

  getCreate: (req, res) => {
    res.render("createProduct");
  },

  getService: (req, res) => {
    res.render("profileServices");
  },

  getListYoga: function (req, res) {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productListYoga", { productos: productos })
      })
  },

  getListFitness: (req, res) => {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productListFitness", { productos: productos })
      })
  },

  getListDeportes: (req, res) => {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productListDeportes", { productos: productos })
      })
  },

  getListDanzas: function (req, res) {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productListDanzas", { productos: productos })
      })

  },

  postProduct: (req, res) => {

      let datos = {
      activity_name: req.body.activity_name,
      aliado: req.body.aliado_id,
      price: req.body.price,
      discount: req.body.discount,
      spots: req.body.spots,
      description: req.body.product_description,
      image: req.body.image,
      schedule: req.body.schedule,
      length: req.body.length,
      difficulty: req.body.difficulty,
      city: req.body.city}
   
        db.Producto.create(datos);

    res.redirect("/product");
    res.redirect("/productListDanzas");
    res.redirect("/productListDeportes");
    res.redirect("/productListFitness");
    res.redirect("/productListYoga");

    /*
    let datos = req.body;

    datos.id = productModel.length + 1;

    datos.valor = Number(datos.valor);

    datos.img = req.file ? req.file.filename : "sin foto";

    productModel.createOne(datos);

    res.redirect("/product");
    res.redirect("/productListDanzas");
    res.redirect("/productListDeportes");
    res.redirect("/productListFitness");
    res.redirect("/productListYoga");
    */

  },

};

module.exports = controller;
