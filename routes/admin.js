const path = require("path");
const rootPath = require("../util/path");

const express = require("express");
const productsController = require("../controllers/products");
const router = express.Router();

const products = [];
//USING HTML FILE

// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);

// /admin/add-product => POST

//will only trigger for post requests and the get for get request.
router.post("/add-product", productsController.postAddProduct);

// exports.routes = router;
// exports.products = products;

module.exports = router;
