const path = require("path");

const express = require("express");

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  //USING HTML FILE

  //   console.log("in another middleware");
  //   res.send("<h1>Hello from Express</h1>");
  console.log("admin Data products", adminData.products);
  //   res.sendFile(path.join(__dirname, "..", "views", "shop.html")); /// sending a file from a path gotten with path module where __dirname is the path of the current folder

  //USING TEMPLATING ENGINE
  //Where shop is the name of the pub
  const products = adminData.products;
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
module.exports = router;
