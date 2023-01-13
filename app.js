const path = require("path");

const expressHbs = require("express-handlebars");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const app = express();

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

//order of the middleware is always important
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3030); //port
