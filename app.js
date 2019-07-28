const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const reply = document.querySelector(".reply");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// predefined words
const greetings = ["I'm doing good!", "I'm doing okay!"];
const weather = ["Weather is fine!", "Weather is great!"];


recognition.onstart = function () {
    console.log("voice is activated!");
}

recognition.onresult = function (event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;

    readOutLoud(transcript);

}

/// add the listener to the button
btn.addEventListener("click", function () {
    recognition.start();
});

// Speech Synthesis
function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    if (message.includes("how are you")) {
        let finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
        reply.textContent = finalText;
    }
    if (message.includes("weather")) {
        let finalText = weather[Math.floor(Math.random() * weather.length)];
        speech.text = finalText;
        reply.textContent = finalText;
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}