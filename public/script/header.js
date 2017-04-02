var profileImage;
var profileName;
var userChip;

function onSignIn(photoUrl, name) {
  profileImage.setAttribute("src", photoUrl);
  profileName.innerHTML = name;
};

function onSignOut() {
    profileImage.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/study-e121b.appspot.com/o/ic_person_white_48dp_1x.png?alt=media&token=92f358bc-4a11-40bd-8759-1aab45c8e875");
    profileName.innerHTML = "Guest";
}

window.addEventListener("load", init);
function init() {
  profileImage = document.getElementById("profile-image");
  profileName = document.getElementById("profile-name");
  userChip = document.getElementById("user-chip");

  var user = Server.getUser();
  if(user !== null) {
    onSignIn(user.photoURL, user.displayName);
  }
  userChip.addEventListener("click", function() {
    if(Server.isLogin()) {
      Server.logout(function(state, data) {
        if(state === Server.SUCCESS) {
          showSnackbar("로그아웃 되었습니다.");
        } else {
          showSnackbar("Unknown Error: " + data);
        }
      });
    } else {
      window.location = "/login";
    }
  });
  Server.onAuthStateChanged(function(state, user) {
    switch(state) {
      case Server.LOGIN:
        onSignIn(user.photoURL, user.displayName);
      break;
      case Server.LOGOUT:
        onSignOut();
      break;
    }
  });
};

function addOnWindowLoad(func) {
  var loadHook = window.onload;
  if(typeof window.onload !== "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      loadHook();
      func();
    }
  }
}

function showSnackbar(message) {
  document.getElementById("snackbar").MaterialSnackbar.showSnackbar({
    message: message,
  });
}
