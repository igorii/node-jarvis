function loadJarvis () {
    var mic = document.getElementById('mic');
    mic.onwebkitspeechchange = function (e) {
        console.log(mic.value);
    }
}

