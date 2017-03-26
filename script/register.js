/*var config = {
  apiKey: "AIzaSyAc12ER6ul_cMhGWgfPqAqHtKFgre0_ufs",
  authDomain: "jungang-login.firebaseapp.com",
  databaseURL: "https://jungang-login.firebaseio.com",
  storageBucket: "jungang-login.appspot.com",
  messagingSenderId: "883812000346"
};
var app = firebase.initializeApp(config);

var storage = firebase.storage();
var storageRef = storage.ref();

var database = app.database();

function dataUpload(student) {
  var data
  ref.putString(data, "base46").then(function(snapshot) {
    alert("register!");
  });
}
*/
var student = {
  grade: 0,
  class: 0,
  name: "",
};

var gradeButton;
var classButton;

function selectGrade(grade) {
  student.grade = grade;

  gradeButton.innerHTML = grade + "학년";
}

function selectClass(_class) {
  switch(student.grade) {
    case 1:
      if(_class == 9) {
        _class = 8;
      }
    break;
    default:
      // pass
    break;
  }
  student.class = _class;
  classButton.innerHTML = _class + "반";
}

window.onload = init;

function init() {
  gradeButton = document.getElementById("grade-button");
  classButton = document.getElementById("class-button");
}
