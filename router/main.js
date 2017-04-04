module.exports = function(app) {
  var express = require("express");
  
  app.set("view engine", "pug");
  // When I develop it with mobile phone
  var path = __dirname.split("/");
  path.pop();
  path = path.join("/");
  
  app.set("views", path + "/view");

  app.use("", express.static(path + "/public"));
  
  // PC
  /*app.set("views", "view");

  app.use("", express.static("public"));*/
  
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
