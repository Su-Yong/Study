var profileImage;
var profileName;

function onSignIn(user) {
  init();
  var profile = user.getBasicProfile();

  profileImage.setAttribute("src", profile.getImageUrl());
  profileName.innerHTML = profile.getName();

  alert(profile.getBirthDay());
};

function onSignOut() {
  var auth = gapi.auth2.getAuthInstance();
  auth.signOut().then(function() {
    profileImage.setAttribute("src", "");
    profileName.innerHTML = "Guest";
  });
}

window.onload = init;
function init() {
  profileImage = document.getElementById("profile-image");
  profileName = document.getElementById("profile-name");
}
