module.exports = function(app) {
  var viewPath = __dirname.split("/");
  viewPath.pop();
  viewPath = viewPath.join("/");
  
  app.set("view engine", "pug");
  app.set("views", viewPath + "/view");

  app.get("/", function(req, res) {
    res.render("index.pug");
  });
  app.get("/register", function(req, res) {
    res.render("register.pug");
  });
  app.get("/login", function(req, res) {
    res.render("login.pug");
  });
  app.get("/googlesign", function(req, res) {

  });
};
