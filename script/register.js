var account = require("./account.js");

var student = {
  grade: 0,
  class: 0,
  name: "",
};

var gradeButton;
var classButton;
var registerButton;

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
  registerButton = document.getElementById("register-button");
  
  registerButton.onclick = function() {
    /*account.register("id", "password", 1, 7, "테스트", function() {
	  alert("회원가입 성공!");
	});*/
  };
}
