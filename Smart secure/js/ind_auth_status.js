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
const loggedInContent = document.getElementById("loggedInContent");
const loggedOutContent = document.getElementById("loggedOutContent");

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // User is signed in
    signUpLink.style.display = "none";
    signInLink.style.display = "none";
    iotNavItem.style.display = "block";
    logoutLink.style.display = "block";
    loggedInContent.style.display = "block";
    loggedOutContent.style.display = "none";
    // Get the user's name and display it in the welcome message
    const username = await getUsername(user.uid);
    document.getElementById("usernameDisplay").textContent = username + "!";
    welcomeMessage.style.display = "block";
  } else {
    // User is signed out
    signUpLink.style.display = "block";
    signInLink.style.display = "block";
    logoutLink.style.display = "none";
    iotNavItem.style.display = "none";
    welcomeMessage.style.display = "none";
    loggedInContent.style.display = "none";
    loggedOutContent.style.display = "block";
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
