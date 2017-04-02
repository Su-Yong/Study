module.exports = function(app) {
  var express = require("express");

  app.set("view engine", "pug");
  app.set("views", "./view");

  app.use(express.static("public"));

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
