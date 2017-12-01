var screen = document.getElementById('screen');

function addToScreen(input) {
  screen.innerText += input;
}
function setScreen(input){
  screen.innerText = input;
} // needs a test
function processNumber(input) {
  addToScreen(input);
}
function processOperator(input) {
  if(lastIndexIsOperator()) {
    setScreen(screen.innerText.slice(-1) + input);
  }
  else{
    addToScreen(input);
  }
}
function lastIndexIsOperator(){
  var operators = ['+', '-', '/', '*'] 
  return operators.includes(screen.innerText[screen.innerText.length-1]);
}
function calculate() {
  setScreen(eval(screen.innerText));
} // needs a test
function clear(){
  setScreen(0);
}

