var firebaseConfig = {
  apiKey: "AIzaSyCKccNAw3hgB3vGN7x47RRFgd2iY5iLNLU",
  authDomain: "final-project-b3ef7.firebaseapp.com",
  databaseURL:
    "https://final-project-b3ef7-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "final-project-b3ef7",
  storageBucket: "final-project-b3ef7.appspot.com",
  messagingSenderId: "780470933521",
  appId: "1:780470933521:web:a70f06dad316104666b9b0",
  measurementId: "G-QEFRN4MGPN",
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
