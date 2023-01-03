const path = require("path");
const rootPath = require("../util/path");

const express = require("express");

const router = express.Router();

const products = [];
//USING HTML FILE

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  //   res.sendFile(path.join(__dirname, "..", "views", "add-product.html")); // sending a file from a path gotten with path module where __dirname is the path of the current folder
  // or
  //   res.sendFile(path.join(rootPath, "views", "add-product.html")); // sending a file from a path .gotten with path module

  //previous work
  //   res.send(
  //     "<form action='/admin/add-product' method='POST'><input type='text' name='title'> <button type='submit'>Add Product</button></form>"
  //   );

  //USING TEMPLATING ENGINE

  //Where add-product is the name of the pub or handlebar file
  //using the pug template engine
  // res.render("add-product", {
  //   pageTitle: "add product pug",
  //   path: "/admin/add-product",
  // });

  //using the handlebar template engine
  // res.render("add-product", {
  //   pageTitle: "add product handlebar",
  //   path: "/admin/add-product",
  //   // layout: false,
  //   activeAddProduct: true,
  //   formsCSS: true,
  //   productCSS: true,
  // });

  //using the ejs template engine
  res.render("add-product", {
    pageTitle: "add product handlebar",
    path: "/admin/add-product",
  });
});

// /admin/add-product => POST

//will only trigger for post requests and the get for get request.
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  console.log("req.body", req.body);
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
