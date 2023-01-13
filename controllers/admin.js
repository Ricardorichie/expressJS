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
  res.render("admin/edit-product", {
    pageTitle: "add product handlebar",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  //   products.push({ title: req.body.title });
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  console.log("req.body", req.body);
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "edit product handlebar",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
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
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
