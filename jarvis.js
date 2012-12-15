var http = require("http");
var fs = require('fs');

console.log('Starting Jarvis...');

// Create jarvis server
http.createServer(function (req, response) {

    // Read in example flac file -> TODO: replace this with voice input feed somehow...
    fs.readFile('test.flac', function (err, data) {

        // When flac is finished loading, POST Google's STT engine
        var options = {
            host: 'www.google.com',
            port: 80,
            path: '/speech-api/v1/recognize?xjerr=1&client=chromium&lang=en-US',
            method: 'POST',
            headers: {
                'Content-Type': 'audio/x-flac; rate=16000',
                'Content-Length': data.length
            }
        };

        var req = http.request(options, function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            var stt = JSON.parse(chunk).hypotheses[0].utterance;
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(stt); // Write the stt result to the clients screen
          });
        });

        // Catch http errors
        req.on('error', function(e) {
          console.log('Problem with request: ' + e.message);
        });

        // Write the flac to the request body
        req.write(data);
        req.end();
    });
}).listen(1337, '127.0.0.1');

console.log('Jarvis successfully started. Listening on 127.0.0.1:1337...');
