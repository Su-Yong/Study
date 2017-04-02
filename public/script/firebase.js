var config = {
  apiKey: "AIzaSyAxrmAT2xb4YbDJfgeXAsw8RDgToLlj0ig",
  authDomain: "study-e121b.firebaseapp.com",
  databaseURL: "https://study-e121b.firebaseio.com",
  projectId: "study-e121b",
  storageBucket: "study-e121b.appspot.com",
  messagingSenderId: "1088032058727"
};
firebase.initializeApp(config);

var Server = {
  LOGIN: 0,
  LOGOUT: 1,
  SUCCESS: 2,
  FAILED: 3,

  stateChanged: [],
};

Server.addNewUser = function(email, password, func) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    func(Server.SUCCESS, user);
  }).catch(function(error) {
    func(Server.FAILED, error.code);
  });
};

Server.getUser = function() {
  return firebase.auth().currentUser;
};

Server.isLogin = function() {
  return !(firebase.auth().currentUser == undefined);
};

Server.updateProfile = function(data, func) {
  Server.getUser().updateProfile(data).then(function() {
    func(Server.SUCCESS);
  }, function(error) {
    func(Server.FAILED, error);
  });
};

Server.login = function(email, password, func) {
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    func(Server.SUCCESS, user);
  }).catch(function(error) {
    func(Server,FAILED, error.code);
  });
};
Server.logout = function(func) {
  firebase.auth().signOut().then(function() {
    func(Server.SUCCESS);
  }, function(error) {
    func(Server.FAILED, error.code);
  });
};

Server.onAuthStateChanged = function(func) {
  Server.stateChanged.push(func);
};
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    for(var i = 0; i < Server.stateChanged.length; i++) {
      Server.stateChanged[i](Server.LOGIN, user);
    }
  } else {
    for(var i = 0; i < Server.stateChanged.length; i++) {
      Server.stateChanged[i](Server.LOGOUT);
    }
  }
});
