var config = {
  apiKey: "AIzaSyAc12ER6ul_cMhGWgfPqAqHtKFgre0_ufs",
  authDomain: "jungang-login.firebaseapp.com",
  databaseURL: "https://jungang-login.firebaseio.com",
  storageBucket: "jungang-login.appspot.com",
  messagingSenderId: "883812000346"
};
var app = firebase.initializeApp(config);

var storage = firebase.storage();
var database = app.database();

exports.getUserData = function(id, password, func) {
  var userData = database.ref("user/" + id);
  userData.once("value").then(function(snapshot) {
    var pw = snapshot.val().password;
	if(password === pw) {
	  func(true, snapshot.val());
	} else {
	  func(false);
	}
  });
};

exports.addNewUser = function(id, password, data) {
  var userData = database.ref("user/" + id);
  data["password"] = password;
  userData.set(data);
};
