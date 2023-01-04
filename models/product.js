const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "data", "products.json");

const getProductsFromfile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor(tit) {
    this.title = tit;
  }
  save() {
    getProductsFromfile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
    // products.push(this);

    //saving in file instead of an array
    // const p = path.join(__dirname, "..", "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      //   let products = [];
      //   if (!err) {
      //     products = JSON.parse(fileContent);
      //   }
      //   products.push(this);
      //   fs.writeFile(p, JSON.stringify(products), (err) => {
      //     console.log(err);
      //   });
    });
  }
  static fetchAll(cb) {
    getProductsFromfile(cb);
    // const p = path.join(__dirname, "..", "data", "products.json");
    // fs.readFile(p, (err, fileContent) => {
    //   if (err) {
    //     cb([]);
    //     return [];
    //   }
    //   cb(JSON.parse(fileContent));
    // });
    // return products;
  }
};
