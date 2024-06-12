class SpeechRecognizer {
constructor(inputType, outputElement, feedback, recognitionLang, recognitionTimeout, commands, monitoringDuration = 3000) {
  this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  this.recognition.lang = recognitionLang;
  this.commands = commands;
  this.inputType = inputType;
  this.outputElement = outputElement;
  this.feedback = feedback;
  this.monitoringDuration = monitoringDuration;
  this.recognitionTimeout = recognitionTimeout;
  this.setup();
}
 
setup() {
  window.addEventListener('load', () => this.onLoad());
  this.recognition.onresult = (event) => this.onResult(event);
  this.recognition.onerror = (event) => this.onError(event);
  this.recognition.onend = () => this.onEnd();
  this.recognition.onend = () => {
    this.recognition.start();
  };
}
 
onLoad() {
  clearTimeout(this.timer);
  this.recognition.start();
  this.outputElement.textContent = 'In ascolto...';
}
 
onResult(event) {
  const command = event.results[0][0].transcript.toLowerCase();
  const foundCommand = this.commands.find(keyword => {
    const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
    return regex.test(command);
  });
  if (foundCommand) {
    this.feedback.textContent = ' INDIVIDUATA: ' + foundCommand + '.';
    this.feedback.style.color = 'green';
    console.log("INDIVIDUATA")
    console.log(command)
  } else {
    this.feedback.textContent = ' NON INDIVIDUATA!';
    this.feedback.style.color = 'red';
    console.log("NON INDIVIDUATA")
    console.log(command)
  }
 
}
 
onError(event) {
  if (event.error !== 'no-speech') {
    this.outputElement.textContent = 'Errore: ' + event.error;
  }
}
 
onEnd() {
  this.recognition.start();
}
 
 
}
 
export default SpeechRecognizer;