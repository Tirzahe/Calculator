var screen = document.getElementById('screen');
document.addEventListener('keypress', processKey);

function addToScreen(input) {
  screen.innerText += input;
}
function setScreen(input){
  screen.innerText = input;
}
function processNumber(input) {
  addToScreen(input);
}
function processOperator(input) {
  if(lastIndexIsOperator()) {
    setScreen(screen.innerText.slice(0, -1) + input);
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
function setToZero(){//clear
  setScreen(0);
}
function isNegativeNum(){

}//needs Test
function processKey(event){
  console.log(event);
}//needs test
