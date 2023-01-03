const path = require("path");

const expressHbs = require("express-handlebars");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

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
//using the parser to get the content of the body
app.use(bodyParser.urlencoded({ extended: false }));

//allow to statically serve the a file from the folder content
app.use(express.static(path.join(__dirname, "public"))); //giving access to files trying to access the public folder statically

//order of the middleware is always important
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //USING HTML FILE

  //   res.status(404).sendFile(path.join(__dirname, "views", "404.html")); // sending a file from a path gotten with path module where __dirname is the path of the current folder

  //res.status(404).send("<h1>Page not found</h1>");

  //USING TEMPLATING ENGINE
  //Where add-product is the name of the pub
  //using pug template engine
  //   res.status(404).render("404", { pageTitle: "error page pug" });
  //using hbs template engine
  //   res.status(404).render("404", { pageTitle: "error page hbs" });
  //using ejs template engine
  res.status(404).render("404", { pageTitle: "error page ejs" });
});

app.listen(3030); //port
