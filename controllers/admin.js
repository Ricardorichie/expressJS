const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
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
  res.render("admin/add-product", {
    pageTitle: "add product handlebar",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  //   products.push({ title: req.body.title });
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  console.log("req.body", req.body);
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
