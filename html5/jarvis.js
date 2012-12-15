function Jarvis () {};

Jarvis.prototype.load = function () {
    var mic = document.getElementById('mic');
    mic.onwebkitspeechchange = function (e) {
        console.log(mic.value);
    }
}

Jarvis.prototype.query = function (text) {
    
};

Jarvis.prototype.say = function(text) {
 	
 }; 
