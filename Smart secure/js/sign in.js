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
const auth = firebase.auth();
const database = firebase.database();

document
  .getElementById("Sign_in_form")
  .addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the email, password
    var email = document.getElementById("email").value;
    var psw = document.getElementById("password").value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, psw)
      .then((response) => response.user.getIdToken())
      .then((idToken) => {
        console.log("Firebase ID token:", idToken);
        localStorage.setItem("firebase_id_token", idToken);
        console.log("Token saved to local storage!");
      })
      .then(() => {
        window.location = "index.html";
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  });
