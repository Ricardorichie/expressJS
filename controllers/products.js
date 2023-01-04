// const products = [];
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
  res.render("add-product", {
    pageTitle: "add product handlebar",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  //   products.push({ title: req.body.title });
  const product = new Product(req.body.title);
  product.save();
  console.log("req.body", req.body);
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    //USING HTML FILE

    //   console.log("in another middleware");
    //   res.send("<h1>Hello from Express</h1>");
    //   console.log("admin Data products", adminData.products);
    //   res.sendFile(path.join(__dirname, "..", "views", "shop.html")); /// sending a file from a path gotten with path module where __dirname is the path of the current folder

    //USING TEMPLATING ENGINE
    //Where shop is the name of the pub
    //   const products = adminData.products;
    //using pug template
    // res.render("shop", {
    //   prods: products,
    //   pageTitle: "shop",
    //   path: "/",
    // });

    //using handlebar template engine
    // res.render("shop", {
    //   prods: products,
    //   pageTitle: "shop",
    //   path: "/",
    //   hasProducts: products.length > 0,
    //   // layout: false,
    //   activeShop: true,
    //   productCSS: true,
    // });

    //using ejs template engine
    res.render("shop", {
      prods: products,
      pageTitle: "shop ejs",
      path: "/",
    });
  });
};
