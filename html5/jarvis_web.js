function JarvisWeb () {}

// Loading work for Jarvis, set styles and event handlers
JarvisWeb.prototype.load = function () {
    var that = this;
    var mic  = document.getElementById('mic');

    // Move mic to middle
    mic.style.left = window.innerWidth / 2 + 'px';
    mic.style.top  = window.innerHeight / 2 + 'px';

    // Register handler to activate when speech has finished
    mic.onwebkitspeechchange = function (e) {
        console.log(that.query(mic.value));
    }
}

// Jarvis' query function sends a request to Jarvis server,
// who responds with Wolfram|Alpha information.
JarvisWeb.prototype.query = function (text) {
	var url = '/ask';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'text');
    
    xhr.onreadystatechange = function() {
    	if (xhr.readyState === 4)
    		return xhr.responseText;
    };

    xhr.send(text);
};

// Jarvis' text to speech function, sends a request to
// Jarvis server who POSTs google's tts service, and 
// returns the recording for playback 
JarvisWeb.prototype.say = function(text) {
 	
 }; 
