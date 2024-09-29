const five = require("johnny-five");
const { SerialPort } = require('serialport'); // Import SerialPort

const board = new five.Board({
  port: "/dev/ttyACM0" // Specify the Arduino port here
});

let startTime = 0;
let sensorVal1, sensorVal2 = 1000;

board.on("ready", function() {
  const sensor = new five.Sensor("A0"); // Use the analog pin A0

  sensor.on("data", function() {
    sensorVal1 = this.value;
    const currentTime = Date.now();

    // If the difference between the current and previous value is greater than 100, print
    if (Math.abs(sensorVal1 - sensorVal2) > 100) {
      console.log(sensorVal1);
    }

    // Every minute the current value is printed
    if (currentTime - startTime >= 60000) {
      console.log(sensorVal1);
      startTime = currentTime;
    }

    sensorVal2 = sensorVal1; // Update the previous value
  });

  // Set an interval (not really necessary in this case)
  setInterval(() => {}, 1000); // Delay for 1 second
});

// If you want to log when the board is ready
board.on("ready", function() {
  console.log("Board is ready and connected!");
});
