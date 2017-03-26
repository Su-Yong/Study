module.exports = function(app) {
  app.set("view engine", "pug");
  app.set("views", "./view");

  app.get("/", function(req, res) {
    res.render("index.pug");
  });
  app.get("/register", function(req, res) {
    res.render("register.pug");
  });
  app.get("/googlesign", function(req, res) {

  });
};
