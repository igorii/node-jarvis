function JarvisWeb () {

    // Text to speech url
    this.ttsurl = 'http://translate.google.com/translate_tts?tl=en&q=';
}

// Loading work for Jarvis, set styles and event handlers
JarvisWeb.prototype.load = function () {
    var that  = this;
    var mic   = document.getElementById('mic');
    var text  = document.getElementById('textInput');

    // Move mic to middle
    mic.style.left  = (window.innerWidth / 2) - (mic.offsetWidth / 2) + 'px';
    mic.style.top   = window.innerHeight / 2 + 'px';
    text.style.left = (window.innerWidth / 2) - (text.offsetWidth / 2) + 'px';
    text.style.top  = window.innerHeight / 2 + 60 + 'px';

    // Hide the response iframe so it appears as if Jarvis is talking back to us
    document.getElementById('response').hidden = true;

    // Register handler to activate when speech has finished
    mic.onwebkitspeechchange = function (e) {
        that.ask(mic.value);
    }

    // Send a request when the user presses enter, and clear the text field
    text.onkeydown = function (e) {
        if (e.keyCode == 13) {  
            that.ask(text.value);
            text.value = '';
        }
    }
}

// Jarvis' ask function sends a request to Jarvis server,
// who responds with Wolfram|Alpha information.
JarvisWeb.prototype.ask = function (text) {
    var that = this;
    var url = '/ask';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'text');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log('Received: ' + xhr.responseText);

            // Remove old responseText div
            var old = null;
            if (old = document.getElementById('responseText'))
                old.parentNode.removeChild(old);            

            // Create response div
            var responseDiv = document.createElement('div');
            document.getElementById('all').appendChild(responseDiv);

            // Insert the respones into the new div, and center the div
            responseDiv.innerHTML  = xhr.responseText;
            responseDiv.style.top  = (window.innerHeight / 2) - 300 + 'px';
            responseDiv.id         = 'responseText';     
            responseDiv.style.left = (window.innerWidth / 2) - (responseDiv.offsetWidth / 2)  + 'px';

            // Speak the response 
            that.say(xhr.responseText);
        }
    };

    xhr.send(text);
};

// Jarvis' text to speech function, sends a request to
// Jarvis server who POSTs google's tts service, and 
// returns the recording for playback 
JarvisWeb.prototype.say = function(text) {
    var responseFrame = document.getElementById('response');
    responseFrame.src = this.ttsurl + encodeURIComponent(text);
 }; 
