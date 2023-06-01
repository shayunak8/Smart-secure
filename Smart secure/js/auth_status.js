const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

firebase.initializeApp(firebaseConfig);

var signUpLink = document.getElementById("signUpLink");
var signInLink = document.getElementById("signInLink");
var logoutLink = document.getElementById("logoutLink");
var iotNavItem = document.getElementById("iotNavItem");
var welcomeMessage = document.getElementById("welcomeMessage");

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // User is signed in
    signUpLink.style.display = "none";
    signInLink.style.display = "none";
    logoutLink.style.display = "block";
    iotNavItem.style.display = "block";
    // Get the user's name and display it in the welcome message
    const username = await getUsername(user.uid);
    document.getElementById("usernameDisplay").textContent = username + "!";
    welcomeMessage.style.display = "block";
  } else {
    // User is signed out
    signUpLink.style.display = "block";
    signInLink.style.display = "block";
    iotNavItem.style.display = "none";
    logoutLink.style.display = "none";
    welcomeMessage.style.display = "none";
  }
});

// Add an event listener to the logout button
logoutLink.addEventListener("click", function () {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });
});

function getUsername(userId) {
  return firebase
    .database()
    .ref("Users/" + userId)
    .once("value")
    .then((snapshot) => {
      return snapshot.val().username;
    });
}
