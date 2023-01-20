const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "add product handlebar",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    }) //internally available by sequelize and it adds the id field to the product table
    .then((result) => {
      res.redirect("/");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  // or
  //  Product.create({
  //    title: title,
  //    price: price,
  //    imageUrl: imageUrl,
  //    description: description,
  //    // userId: req.user.id, //from the app.js
  //  })
  //    .then((result) => {
  //      res.redirect("/");
  //      console.log(result);
  //    })
  //    .catch((err) => {
  //      console.log(err);
  //    });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   // Product.findOne({ where: { id: prodId } })
//   req.user
//     .getProducts({ where: { id: prodId } })
//     .then((products) => {
//       if (!products) {
//         return res.redirect("/");
//       }
//       const product = products[0];
//       res.render("admin/edit-product", {
//         pageTitle: "edit product handlebar",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((e) => console.log("get product id error", e));
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.description = updatedDesc;
//       product.imageUrl = updatedImageUrl;
//       return product.save();
//     })
//     .then((result) => {
//       // console.log("Updated product", result);
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log("post edit product error", err);
//     });
// };

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     // Product.findAll()
//     .then((products) => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((err) => {
//       console.log("getIndex Error", err);
//     });
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       res.redirect("/admin/products");
//       // console.log("destroyed product", result);
//     })
//     .catch((err) => {
//       console.log("delete post error", err);
//     });
// };
