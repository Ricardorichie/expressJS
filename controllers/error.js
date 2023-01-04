exports.get404 = (req, res, next) => {
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
  res.status(404).render("404", { pageTitle: "error page ejs", path: "404" });
};
