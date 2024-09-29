long startTime = 0;
int sensorVal1, sensorVal2 = 1000;
unsigned long currentTime;

void setup() {
  Serial.begin(9600);
}

void loop() {
  sensorVal1 = analogRead(A0);
  currentTime = millis();
  //if the difference between the current and previous value is greater than 100, it prints
  if (abs(sensorVal1 - sensorVal2) > 100) {
    Serial.println(sensorVal1);
  }
  //every minute the current value is printed
  if (currentTime - startTime >= 60000) {
    Serial.println(sensorVal1);
    startTime = currentTime;
  }
  sensorVal2 = sensorVal1;
  delay(1000);
}