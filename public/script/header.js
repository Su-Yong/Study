var profileImage;
var profileName;
var userChip;
var notifiPanel;

var Notification = function() {
  this.id = "";
  this.name = "";
  this.action = null;
};

Notification.prototype.setId = function(id) {
  this.id = id;
  
  return this;
};
Notification.prototype.setName = function(name) {
  this.name = name;
  
  return this;
};
Notification.prototype.setAction = function(func) {
  this.action = func;
  
  return this;
};

Notification.prototype.set = function() {
  var notifi = document.createElement("li");
  notifi.className = "mdl-menu__item";
  notifi.id = this.id;
  var notifiName = document.createTextNode(this.name);
  
  notifi.appendChild(notifiName);
  notifi.addEventListener("click", this.action);
  notifiPanel.appendChild(notifi);
};

var NotificationManager = {
  notifies: [],
};

NotificationManager.addNotification = function(id, name, func) {
  for(var i in NotificationManager.notifies) {
	if(NotificationManager.notifies[i].id === id) {
	  return false;
	}
  }
  var notifi = new Notification();
  notifi.setId(id).setName(name).setAction(func);
  
  NotificationManager.notifies.push(notifi);
};

NotificationManager.submit = function() {
  while (notifiPanel.firstChild) {
    notifiPanel.removeChild(notifiPanel.firstChild);
  }
  
  for(var i in NotificationManager.notifies) {
	NotificationManager.notifies[i].set();
  }
};

function onSignIn(user) {
  if(!user.emailVerified) {
    NotificationManager.addNotification("verify", "이메일 인증을 해주세요", function() {
      Server.verifyUser((state, error) => {
        if(state === Server.SUCCESS) {
          showSnackbar("인증 메일을 전송하였습니다.");
        } else {
          showSnackbar("Unknown Error: " + error);
        }
      });
	});
  }
  
  profileImage.setAttribute("src", user.photoURL);
  profileName.innerHTML = user.displayName;
  
  NotificationManager.submit();
};

function onSignOut() {
    profileImage.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/study-e121b.appspot.com/o/ic_person_white_48dp_1x.png?alt=media&token=92f358bc-4a11-40bd-8759-1aab45c8e875");
    profileName.innerHTML = "로그인";
}

window.addEventListener("load", init);
function init() {
  profileImage = document.getElementById("profile-image");
  profileName = document.getElementById("profile-name");
  userChip = document.getElementById("user-chip");
  notifiPanel = document.getElementById("notifi-panel");
  
  var user = Server.getUser();
  if(user !== null) {
    onSignIn(user);
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

function showSnackbar(message) {
  document.getElementById("snackbar").MaterialSnackbar.showSnackbar({
    message: message,
  });
}
