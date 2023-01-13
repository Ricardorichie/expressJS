// const products = [];
const Product = require("../models/product");
const Cart = require("../models/cart");

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
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: "Shop details",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
  // console.log("ProdId", prodId);
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
