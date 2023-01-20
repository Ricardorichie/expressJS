const path = require("path");
const rootPath = require("../util/path");

const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

const products = [];
//USING HTML FILE

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
// router.get("/products", adminController.getProducts);

// /admin/add-product => POST

//will only trigger for post requests and the get for get request.
router.post("/add-product", adminController.postAddProduct);

// router.get("/edit-product/:productId", adminController.getEditProduct);

// router.post("/edit-product", adminController.postEditProduct);

// router.post("/delete-product", adminController.postDeleteProduct);
// exports.routes = router;
// exports.products = products;

module.exports = router;
