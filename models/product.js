// const fs = require("fs");
// const path = require("path");
const db = require("../util/database");
const Cart = require("./cart");

// const p = path.join(__dirname, "..", "data", "products.json");

// const getProductsFromfile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       return cb([]);
//     }
//     cb(JSON.parse(fileContent));
//   });
// };
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    return db.execute(
      "INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
    // getProductsFromfile((products) => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       (prod) => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), (err) => {
    //       console.log(err);
    //     });
    //   }
    // });
    // products.push(this);
    //saving in file instead of an array
    // const p = path.join(__dirname, "..", "data", "products.json");
    // fs.readFile(p, (err, fileContent) => {
    //   //   let products = [];
    //   //   if (!err) {
    //   //     products = JSON.parse(fileContent);
    //   //   }
    //   //   products.push(this);
    //   //   fs.writeFile(p, JSON.stringify(products), (err) => {
    //   //     console.log(err);
    //   //   });
    // });
  }
  static fetchAll() {
    return db.execute("SELECT * FROM products");
    // getProductsFromfile(cb);
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

  static deleteById(id) {
    // getProductsFromfile((products) => {
    //   const product = products.find((prod) => prod.id === id);
    //   const updatedProducts = products.filter((prod) => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //     if (!err) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //     console.log(err);
    //   });
    // });
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
    // getProductsFromfile((products) => {
    //   const product = products.find((p) => p.id === id);
    //   cb(product);
    // });
  }
};
