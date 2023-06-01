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
  .getElementById("Sign_up_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var psw = document.getElementById("password1").value;
    var psw2 = document.getElementById("password2").value;

    if (psw != psw2) {
      window.alert("passwords does not match");
      return;
    }

    async function loadModels() {
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    }

    loadModels()
      .then(() => {
        console.log("Models loaded successfully");
      })
      .catch((error) => {
        console.error("Error loading models:", error);
      });
    // Your validations stay the same

    // Create a new user with the provided email and password
    auth
      .createUserWithEmailAndPassword(email, psw)
      .then(async (userCredential) => {
        // Sign up successful
        // Get the user's UID
        var user = userCredential.user;
        console.log(user.uid);
        // Capture the user's face
        const faceArray = await captureFace();
        // call a function to write the user's data to the database
        return writeToRTDB(user.uid, email, username, faceArray);
      })
      .then(() => {
        // Redirect the user to a new page
        window.location.href = "index.html";
      })
      .catch((error) => {
        // Handle sign up errors
        console.log(error);
        alert(error.message);
      });

    // function to write data to RTDB
    function writeToRTDB(userId, email, username, faceArray) {
      return database.ref("Users/" + userId).set({
        email: email,
        username: username,
        faceArray: faceArray,
      });
    }
    async function captureFace() {
      const video = document.createElement("video");
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => (video.srcObject = stream));

      await new Promise((resolve) => (video.onloadedmetadata = resolve));
      video.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      await faceapi.loadFaceLandmarkModel("/models");
      const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
      const detection = await faceapi
        .detectSingleFace(canvas, options)
        .withFaceLandmarks()
        .withFaceDescriptor(); // Added this line to include face descriptor

      // Check if a face has been detected
      if (detection) {
        // Return face descriptor instead of landmarks
        const faceDescriptor = Array.from(detection.descriptor);
        if (faceDescriptor.length !== 128) {
          console.error(
            "Face descriptor array length is not 128:",
            faceDescriptor
          );
          alert("Error processing face data. Please try again.");
          throw new Error("Face descriptor array length is not 128");
        }
        return faceDescriptor;
      } else {
        // You can change this to another error message or handle this case differently
        alert("No face detected. Please try again.");
        throw new Error("No face detected");
      }
    }
  });
