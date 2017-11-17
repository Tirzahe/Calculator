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
function clear(){
  //this function will clear the last button pressed from the screen
}
function allClear(){
  //this function will clear and reset all functioms to zero.
}
