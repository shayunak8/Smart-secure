#include <WiFi.h>
#include <inttypes.h>
#include <Wire.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <ESP32Servo.h>

#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define API_KEY ""
#define DATABASE_URL ""

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

Servo myservo;
const int servoPin = 26;
int recogValue;

void connectToWiFi() {
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void firebaseSetup() {
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Signup OK");
    signupOK = true;
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void setup() {
  Serial.begin(115200);
  Serial.println("Start");
  delay(1000);
  Serial.println("ESP32 Touch Test");

  connectToWiFi();
  firebaseSetup();

  myservo.attach(servoPin);
  myservo.write(10);
}

void loop() {
  int value = touchRead(4);
  Serial.print("Touch read value: ");
  Serial.println(value);

  if (Firebase.ready() && signupOK) {
    Serial.println("Firebase is ready and signup is OK.");
    if (millis() - sendDataPrevMillis > 2000 || sendDataPrevMillis == 0) {
      sendDataPrevMillis = millis();
      if (Firebase.RTDB.setFloat(&fbdo, "TouchSensor/Power", value)) {
        Serial.println("PASSED");
        Serial.println("PATH: " + fbdo.dataPath());
        Serial.println("TYPE: " + fbdo.dataType());
      } else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }
    }
delay(1000);
    if (Firebase.RTDB.getInt(&fbdo, "Camera/recog", &recogValue)) {
      Serial.print("Camera/recog value: ");
      Serial.println(recogValue);
      if (recogValue == 1) {
        myservo.write(90);
        Serial.println("Servo moved to 100 degrees");
    }
        if (Firebase.RTDB.setFloat(&fbdo, "Camera/recog", 0)) {
          Serial.print("Data path: ");
          Serial.println(fbdo.dataPath());
        } else {
          Serial.print("Error reason: ");
          Serial.println(fbdo.errorReason());
        }
        Serial.println("Camera/recog value should now be 0");
      }
  }
          myservo.write(10);
  delay(1000);
}
