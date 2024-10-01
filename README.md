# PlantSolutions
All code for Plant Solutions team

/---------------------------------\

Dependencies: express, websockets, node/npm, 

Push Edition: Initial Commit and 1st Draft 

Front End notes: all site page files have been created and the basic flow and interaction is present. There needs to be more js for the AI integration. The website needs the visual work that it will get soon. 

Back End Notes: needs org key and then api key which is .env

Arduino Notes: needs a moisture sensor, arduino uno, and assembly parts. needs to have a recognized usb port on your system

Plant Solutions
Authors: Andrew Black, Max Chu, Geoff Gracia
Special Thanks: Travis, Austin, Carlos

WHAT IS PLANT SOLUTIONS:
In it's current form, this application is designed as a proof of concept/minimum viable product for 
a service that alerts the user when their plant(s) need to be watered. 

It makes use of OpenAI to allow the User to communicate and determine information about
plant's they want to add, as well as using OpenAI to fill data about the plants.

WHAT DO I NEED TO MAKE THIS WORK:
PART I
You need an Arduino with a moisture-detecting sensor attached and operating on the Serial Port of your computer
when running this program. A diagram for one such thing can be found here (external): 
https://www.instructables.com/Arduino-Soil-Moisture-Sensor/ 

The sketch for this circuit is found within this application, in project/PlantSolutions/PlantSolutions.ino

If you don't know how to run an .ino file, check out this tutorial (external):
https://forum.arduino.cc/t/how-to-open-an-ino-file/485667 

PART II

Install the following modules (we used Node - if you can figure it out otherwise, power to you):

Johhny-Five, Express, and SerialPort

PART III

Run the server (npm start) and go to localhost:3000/homepage.html

From there, you are welcome to browse through the web pages and go at your own pace, but here's a quick rundown 
of what each one does:

productpage.html - this page explains what Plant Solutions is - in a nutshell - if the maximum viable product were
achieved.

predictive.html - this page allows the User to enter into a chatbar and communicate with OpenAI to recieve results
based on the input. It returns what is essentially a list of plants, and allows the user to pick one
to add to their plant collection. Prompts are based off of one word, and is in essence a "quick search"

aiperfectsearch.html - this page is similar to predictive.html, but instead allows the user to go in more
detail to better describe the plant they are trying to add. As an example of this, a User may type in, 
"red leaves, blossoms tiny white flowers in Summer" to try and narrow their search.

plantlist.html - this page displays all the plants the user has added to their list. This is essentially
a bunch of <li> items with an href to another internal page that will display data about their plant. 
NOTE: this is THE USER'S PLANTS. This is not a database.

plantprofile.html - this page displays all the information about the plant, including the scientific name, 
some statistic info, and the amount of water it currently has. This page is anticipated to be fulfilled by
OpenAI - which would save that information in LocalStorage - but the final implementation may not have
those properties.

Any other pages not mentioned exist purely to redirect the user. 

