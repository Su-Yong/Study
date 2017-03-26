var express = require("express");
var app = express();
var router = require("./router/main")(app);

var server = app.listen(8000, function() {
    console.log("Express server has started on port 8000");
});
