Smart Secure

Smart Secure is a comprehensive project developed as the final project for college before enlistment for the army. It combines HTML, CSS, JavaScript, and Arduino with ESP32 to create a secure system with touch sensors, motors, and a camera featuring face recognition. The project includes a web interface that requires user registration to access its full range of features. It utilizes Firebase as the database to store and manage user data.

Features

User Registration: Users can create an account on the Smart Secure website, providing their necessary details for authentication and access to the system's functionalities.
Face Recognition: The project incorporates a camera connected to Arduino with ESP32, enabling facial recognition as a means of identity verification.
Touch Sensor: The touch sensor acts as a gate opener and provides access to restricted or sterile areas within the system.
Motor Control: The Arduino board controls the motor, allowing it to lock or unlock doors based on user authentication.
Firebase Integration: Smart Secure integrates with Firebase as its backend database, ensuring secure storage and retrieval of user information.
Requirements
To run and modify the Smart Secure project, ensure that you have the following software and hardware components:

Web browser (e.g., Google Chrome, Mozilla Firefox)

Arduino IDE

ESP32 development board

Camera module compatible with ESP32

HTML, CSS, and JavaScript code editor (e.g., Visual Studio Code, Sublime Text)


Installation

Clone the Smart Secure repository to your local machine or download the project's ZIP file from the GitHub repository.

Set up the Arduino IDE and ESP32 development board by following the manufacturer's instructions and guidelines.

Connect the camera module to the ESP32 development board as per the provided specifications.

Open the Arduino IDE and load the Arduino code provided in the project's repository.

Upload the code to the ESP32 development board.

Set up Firebase for the web interface and database storage. Create a Firebase project, configure the necessary settings, and obtain the Firebase configuration details.

Replace the placeholder Firebase configuration values in the JavaScript code with your Firebase project details.

Host the web interface files on a web server or directly open the HTML file in your web browser to use the system.

Usage

1. Open the Smart Secure web interface in your web browser.

2. Sign up for an account by providing the required information.

3. Once registered, you will have access to the full functionality of Smart Secure.

4. To access restricted or sterile areas, use the touch sensor to initiate the system. Follow the on-screen instructions and place your face in front of the camera for facial recognition.

5. If the facial recognition process is successful, the motor will unlock the door, granting access to the designated area.

6. If the facial recognition process fails or the touch sensor is not activated, the door will remain locked.

7. Smart Secure will store user information and access logs securely in the Firebase database.
