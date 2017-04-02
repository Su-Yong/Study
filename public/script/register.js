var student = {
  grade: 0,
  class: 0,
  name: "",
};

var gradeButton;
var classButton;
var registerButton;
var idBox;
var passwordBox;
var nameBox;

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

window.addEventListener("load", init);
function init() {
  gradeButton = document.getElementById("grade-button");
  classButton = document.getElementById("class-button");
  registerButton = document.getElementById("register-button");
  idBox = document.getElementById("id-box");
  passwordBox = document.getElementById("password-box");
  nameBox = document.getElementById("name-box");

  registerButton.addEventListener("click", function() {
    Server.addNewUser(idBox.value, passwordBox.value, function(state, data) {
      if(state === Server.SUCCESS) {
        Server.updateProfile({
          displayName: nameBox.value,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/study-e121b.appspot.com/o/ic_person_white_48dp_1x.png?alt=media&token=92f358bc-4a11-40bd-8759-1aab45c8e875",
        }, function(state, data) {
          if(state === Server.SUCCESS) {
            window.location = "../";
          }
        });
        return;
      } else {
        switch(data) {
          case "auth/invalid-email":
            showSnackbar("올바른 email 형식이 아닙니다.");
          break;
          case "auth/weak-password":
            showSnackbar("비밀번호가 너무 약합니다.");
          break;
          case "auth/email-already-in-use":
            showSnackbar("이미 사용중인 이메일 입니다.");
          break;
          default:
            showSnackbar("Unknown Error: " + data);
            console.log(data);
        }
      }
    });
  });
}
