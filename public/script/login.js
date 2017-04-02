var idBox;
var passwordBox;
var loginButton;

function login() {
  Server.login(idBox.value, passwordBox.value, function(state, data) {
    if(state === Server.SUCCESS) {
      window.location = "../";
      return;
    } else {
      switch(data) {
        case "auth/invalid-email":
          showSnackbar("올바른 email 형식이 아닙니다.");
        break;
        case "auth/weak-password":
          showSnackbar("비밀번호가 너무 약합니다.");
        break;
        case "auth/wrong-password":
          showSnackbar("비밀번호가 맞지 않습니다.");
        break;
        default:
          showSnackbar("Unknown Error: " + data);
          console.log(data);
      }
    }
  });
}

window.addEventListener("load", init);
function init() {
  idBox = document.getElementById("id-box");
  passwordBox = document.getElementById("password-box");
  loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", function() {
    login();
  });
  document.addEventListener("keydown", function(event) {
    var keyCode = event.keyCode;
    if(keyCode == 13) {
      login();
    }
  }, false);
}
