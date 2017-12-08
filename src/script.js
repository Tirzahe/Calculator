var screen = document.getElementById('screen');
var canDecimal = true;
document.addEventListener('onkeypress', processKey);
// toggle '+/-' needs to setScreen to remove Zero.
function addToScreen(input) {
  screen.innerText += input;
}
function setScreen(input){
  screen.innerText = input;
}
function processNumber(input) {
  if (screenIsZero()){
    setScreen(input);
    canDecimal = true;
  }
  else addToScreen(input);
}

function processDecimal(){
  if (canDecimal && lastIndexIsOperator()){
    addToScreen('0.');
    canDecimal = false;
  }
  else if (canDecimal){
    addToScreen('.');
    canDecimal = false;
  }
}
function processOperator(input) {
  if(lastIndexIsOperator()) {
    setScreen(screen.innerText.slice(0, -1) + input);
  }
  else{
    addToScreen(input);
  }
  canDecimal = true;
}
function lastIndexIsOperator(){
  var operators = ['+', '-', '/', '*'] 
  return operators.includes(screen.innerText[screen.innerText.length-1]);
}
function calculate() {
  setScreen(eval(screen.innerText));
}
function setToZero(){//browswer didn't like the function name clear
  setScreen(0);
}
// function isNegativeNum(){
//   var num
//   return num < 0;
// }//needs test
function processKey(event){
  var keyCode = event.keyCode;
  var operators = ['56', '187', '189', '191']
  if (keyCode >= 48 && keyCode <= 57) {
    processNumber(String.fromCharCode(keyCode));
  }
  // else if (keyCode === 190){
  //   processDecimal('.');
  // }
  // else if (operators.includes(keyCode)) {
  //   processOperator(String.fromCharCode(keyCode));
  // }
}//WORKING ON THIS NOW*
function screenIsZero(){
  return screen.innerText === '0';
}
