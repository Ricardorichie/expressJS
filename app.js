const path = require("path");

const expressHbs = require("express-handlebars");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

//   .then((result) => console.log("result", result[0], "\n", "part 2", result[1]))
//   .catch((err) => {
//     console.log("database error", err);
//   });

//TEMPLATE ENGINE
//REGISTER VIEW ENGINE

//using pug template engine
//setting a global configuration value (view engine in this case) to a template engine, pug
// app.set("view engine", "pug");
// app.set("views", "views"); //where to find the configuration

//using handlebars template engine
//the last 2 lines is for defining a layout
// app.engine(
//   "hbs",
//   expressHbs.engine({
//     extname: ".hbs",
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//   })
// );
// app.set("view engine", "hbs");
// app.set("views", "views");

//using EJS templating engine
app.set("view engine", "ejs");
app.set("views", "views");

//GET BODY CONTENT
//using the parser to get the content of the body form
app.use(bodyParser.urlencoded({ extended: false }));

//allow to statically serve the a file from the folder content
app.use(express.static(path.join(__dirname, "public"))); //giving access to files trying to access the public folder statically

//middleware for incoming requests
app.use((req, res, next) => {
  User.findOne({ where: { id: 1 } })
    .then((user) => {
      req.user = user; // adding new field to the request object to store the user sequelize content from the database
      next();
    })
    .catch((err) => {
      console.log("error", err);
    });
});

//order of the middleware is always important
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//create associations/relationship between product and user models (1:M relationship)
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

//create associations/relationship user and cart (1:1 relationship)
User.hasOne(Cart);
Cart.belongsTo(User);

//create associations/relationship product and cart (M:M relationship)
//the through property links the 2 tables together by storing their id property in them
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

//create association/relationship between user and orders (1:M)
Order.belongsTo(User);
User.hasMany(Order);

//create associations/relationship product and orders (M:M relationship)
//the through property links the 2 tables together by storing their id property in them

Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

//sync the table to the database
sequelize
  .sync()
  // .sync({ force: true }) //not needed in production
  .then((result) => {
    return User.findOne({ where: { id: 1 } });
    // console.log("sequelize result", result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Richard", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
    // console.log(user);
  })
  .then((result) => {
    app.listen(3030); //port
  })
  .catch((err) => {
    console.log("sequelize error", err);
  });
