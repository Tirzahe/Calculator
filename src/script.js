function addToScreen(input) {
    document.getElementById('screen').innerText += input;
}
function setScreen(input){
    document.getElementById('screen').innerText = input;
}
function processNumber(input) {
  addToScreen(input);
}
function processOperator(input) {
  setScreen(input);
}
