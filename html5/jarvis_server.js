var http    = require('http');
var fs      = require('fs');

// Necessary Jarvis properties and urls
function Jarvis () {
    this.wolfram  = 'api.wolframalpha.com';
    this.wolfpath = '/v2/query?appid=6LPKV5-YJ3YPXP8QG&format=plaintext&podtitle=Result&input=';
}

// Jarvis ask() is responsible for requesting a response from
// Wolfram|Alpha's knowledge base.
Jarvis.prototype.ask = function(text, callback) {
    var options = {
        host: this.wolfram,
        path: this.wolfpath + encodeURIComponent(text)
    };

    var process = function(response) {
        var str = '';
        response.on('data', function (chunk) {   str += chunk;   });
        response.on('end',  function ()      {   console.log(str);     });
    }

    http.request(options, process).end();
};

// Jarvis Server
http.createServer(function (request, response) {
    var filePath = '.' + request.url;

    // If a GET is received, return the requested resource
    if (request.method === 'GET') {        
        fs.exists(filePath, function (exists) {
            if (exists) {
                fs.readFile(filePath, function (error, content) {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    } else {
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.end(content, 'utf-8');
                    }
                });
            } else {
                response.writeHead(404);
                response.end();   
            }
        });
    // If a POST is received, do the appropriate Jarvis function
    } else if (request.method === 'POST' && filePath === './ask') {
        var str = '';

        request.on('data', function (data) {  
            str += data;  
        });
        request.on('end',  function () {  
            console.log('Asking jarvis: ' + str); 
            jarvis.ask(str);
        });
    }
}).listen(1337);

// Create Jarvis, and print a message indicating that Jarvis is listening
var jarvis = new Jarvis();
console.log('Jarvis running on port 1337...');