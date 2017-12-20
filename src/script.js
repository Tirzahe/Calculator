var screen = document.getElementById('screen');
var canDecimal = true;

document.addEventListener('keypress', processKey);
  
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
  else {
    addToScreen(input);
  }
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
  var operator = ['+', '-', '/', '*'];
  return operator.includes(screen.innerText[screen.innerText.length-1]);
}
function calculate() {
  var screenWithParens = parenthesizeScreen();
  if(isOperator(screenWithParens.charAt(screenWithParens.length-1))){
    var newScreen = screenWithParens.slice(0, -1);
    setScreen(eval(newScreen));
  }
  else {
    setScreen(eval(screenWithParens));
  };
  if (screen.innerText % 1 !== 0){
    canDecimal = false;
  }
  else {
    canDecimal = true;
  }
}
function parenthesizeScreen(){
  var screenText = screen.innerText;
  var openParen = false;
  var screenWithParens = '';
  for(var i = 0; i < screenText.length; i++){
    if(i === 0 && screenText[i] === '-'){
      screenWithParens = '(-';
      openParen = true;
    }
    else if (isOperator(screenText[i])) {
      if (openParen){
        screenWithParens += ')' + screenText[i];
        openParen = false;
      }
      else if (isOperator(screenText[i-1])){
        screenWithParens += '(-';
        openParen = true;
      }
      else {
        screenWithParens += screenText[i];
      }
    }
    else {
      screenWithParens += screenText[i];
    }
  }
  if (openParen){
    screenWithParens += ')';
  }
  return screenWithParens; 
}
function setToZero(){//browswer didn't like the function name clear
  setScreen(0);
}
function processKey(event){
  var keyCode = event.keyCode;
  var operator = [42, 43, 45, 47]
  if (keyCode >= 48 && keyCode <= 57) {
    processNumber(String.fromCharCode(keyCode));
  }
  else if (keyCode === 46){
    processDecimal('.');
  }
  else if (operator.includes(keyCode)) {
    processOperator(String.fromCharCode(keyCode));
  }
  else if (keyCode === 13 || keyCode === 61){
    calculate('=');
  }
  // else if (keyCode === 8 || keycode === 127){
  //   setToZero();
  // }
  // else if (keyCode === 32 || keyCode === 45) space bar(or minus) is toggle key. How to use minus key to set negative number??.
  // need test for toggle once toggle function is written.
  else{
    return false; // is this the right way to ignore all other keyboard input??
  }
}
function isScreenNegativeNum(){
  var num = screen.innerText;
  return num < 0;
}
function toggleNeg() {
  var screenText = screen.innerText;
  var operator = ['+', '-', '/', '*'];
  for(var i = screenText.length - 1; i >= 0; i--){
    if(isOperator(screenText[i])){
      //if minus is preceeded by operator
      if(screenText[i] === '-' && i > 0 && isOperator(screenText[i-1])){
        setScreen(screenText.slice(0, i) + screenText.slice(i+1));
        return;
      }
      //if minus is not preceded by operator
      else if(screenText[i] === '-' && i > 0 && !isOperator(screenText[i-1])){
        setScreen(screenText.slice(0,i+1) + '-' + screenText.slice(i+1));
        return;
      }
      //if negative is index 0
      else if(i === 0 && screenText[0] === '-'){
        setScreen(screenText.slice(1));
        return;
      }
      //if i is operator other than '-'
      else if(isOperator(screenText[i])){
        setScreen(screenText.slice(0,i+1) + '-' + screenText.slice(i+1));
        return;
      }
    } 
    else if (i === 0){
      setScreen('-' + screenText);
      return;
    }
  }
}//needs test
function isOperator(input){
  var operator = ['+', '-', '/', '*'];
  return operator.includes(input);
}
function screenIsZero(){
  return screen.innerText === '0';
}
