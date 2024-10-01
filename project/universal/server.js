// require("dotenv").config();
const express = require('express');
const http = require('http'); // Import http module
const WebSocket = require('ws'); // Import WebSocket
const path = require('path');
const PORT = 3000;

const orgKey = "org-C0V9tT5zjNoT3VLZp6IH4mwF"; // Replace with your OpenAI API key
// const apiKey = whatever geoff gives you
const apiKey = process.env.OPENAI_API_KEY;

const app = express();
const server = http.createServer(app); // Create an HTTP server
const wss = new WebSocket.Server({ server }); // Create a WebSocket server

app.use(express.json());
app.use('/', express.static(path.resolve(`${__dirname}/../../hosted/`)));
//app.use('/', express.static(path.resolve(`${__dirname}/../Act 2 - Path Plant List/`)));
// Serve static files from the project directory
app.use('/project', express.static(path.resolve(`${__dirname}/../../project`)));

app.post('/api/suggestions', async (req, res) => {
  const query = req.body.query;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Organization': `${orgKey}`,
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "user", content: `Suggest plants related to ${query}, but limit it to 10 results. I just want to display the common names that are most relevant to the query, no other data for now` }
        ]
      })
    });

    

    const data = await response.json();
    const suggestions = data.choices[0].message.content.split('\n').filter(item => item);

    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

// const five = require("johnny-five");
// const { SerialPort } = require('serialport'); // Import SerialPort

// const board = new five.Board({
//   port: "/dev/ttyACM0" // Specify the Arduino port here
// });

// let startTime = 0;
// let sensorVal1, sensorVal2 = 1000;

// board.on("ready", function() {
//   console.log("Board is ready and connected!");

//   const sensor = new five.Sensor("A0"); // Use the analog pin A0

//   sensor.on("data", function() {
//     sensorVal1 = this.value;
//     const currentTime = Date.now();

//     // Send the sensor value to all connected WebSocket clients
//     wss.clients.forEach(client => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ sensorValue: sensorVal1 }));
//       }
//     });

//     // If the difference between the current and previous value is greater than 100, print
//     if (Math.abs(sensorVal1 - sensorVal2) > 100) {
//       console.log(sensorVal1);
//     }

//     // Every minute the current value is printed
//     if (currentTime - startTime >= 60000) {
//       console.log(sensorVal1);
//       startTime = currentTime;
//     }

//     sensorVal2 = sensorVal1; // Update the previous value
//   });
// });

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
