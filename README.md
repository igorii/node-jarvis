node-jarvis
===========

Inspired by cranklin's php Jarvis project, http://cranklin.wordpress.com/2012/01/13/building-my-own-siri-jarvis/.

This project will either use node.js as a console-esque Jarvis application, or as a web server to serve a web-based Jarvis application for the network.

## Use
All the necessary files are included here for automated deployment to Heroku. For those not familair with heroku, and want to run on a local machine, start jarvis_server.js with node.js. This will serve jarvis.html and related files, but will not route GET requests to / to jarvis.html.

## Plans
+ Speech to text
+ Query some knowledge base (wolfram alpha/ evi, etc)
+ Turn response into text to speech
+ Extend with personal applications (calendar, todo, etc)
+ Extend with webcam and face recognition for greeting when entering room
