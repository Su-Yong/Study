var firebase = require("./firebase.js");

var id = "";
var password = "";
var grade = 0;
var _class = 0;
var name = "";
var isLogin = false;

exports.login = function(id, password, func) {
  firebase.getUserData(id, password, function(success, data) {
    switch(success) {
	  case false:
        throw "Incorrect Password or ID isn't exist";
      break;
      case true:
		isLogin = true;
        func();
      break;
    }
  });
};

exports.register = function(id, password, grade, _class, name, func) {
  firebase.addNewUser(id, password, {
    grade: grade,
	class: _class,
	name: name
  }, function() {
	func();
  });
}
