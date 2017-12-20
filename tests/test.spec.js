describe('Calculator', function() {
  beforeEach(function() {
    var screen = document.createElement('div');
    window.screen = screen;
  });
  describe('addToScreen', function() {
    it('should display input in screen', function() {
      spyOn(window, 'addToScreen');
      addToScreen('3');
      expect(addToScreen).toHaveBeenCalledWith('3');
    });
  });
  describe('processNumber', function() {
    it('should display input in screen', function() {
      spyOn(window, 'addToScreen').and.returnValue(null);
      processNumber(4);
      expect(addToScreen).toHaveBeenCalledWith(4);
    });
  });
  describe('processKey()', function() {
    it('should identify if a number was pressed and then use processNumber function', function() {
      spyOn(window, 'processNumber');
      processKey({keyCode:49});
      expect(processNumber).toHaveBeenCalledWith('1');

      processKey({keyCode:48});
      expect(processNumber).toHaveBeenCalledWith('0');

      processKey({keyCode:56});
      expect(processNumber).toHaveBeenCalledWith('8');

      processKey({keyCode:57});
      expect(processNumber).toHaveBeenCalledWith('9');
    });
    it('should identify if a decimal was pressed and then use processDecimal function ', function() {
      spyOn(window, 'processDecimal');
      processKey({keyCode:46});
      expect(processDecimal).toHaveBeenCalledWith('.');
    });

    it('should identify if an operator was pressed and then use processOperator function ', function() {
      spyOn(window, 'processOperator');
      processKey({keyCode:42});
      expect(processOperator).toHaveBeenCalledWith('*');

      processKey({keyCode:43});
      expect(processOperator).toHaveBeenCalledWith('+');

      processKey({keyCode:45});
      expect(processOperator).toHaveBeenCalledWith('-');

      processKey({keyCode:47});
      expect(processOperator).toHaveBeenCalledWith('/');
    });
    it('should identify if the "=" or the "enter" keys were pressed then use the calculate function', function() {
      spyOn(window, 'calculate');
      processKey({keyCode:13});
      expect(calculate).toHaveBeenCalled();

      processKey({keyCode:61});
      expect(calculate).toHaveBeenCalled();
    }); 
    // it ('should identify if the "backspace" key was pressed and use the setToZero function', function(){
    //   spyOn(window, 'setToZero');
    //   processKey({keyCode:8});
    //   expect(setToZero).toHaveBeenCalled();
    // });  ignore this test right now 
  });
  describe('processOperator', function(){
    it('should add operator after number', function() {
      spyOn(window, 'addToScreen').and.returnValue(null);
      processOperator('+');
      expect(addToScreen).toHaveBeenCalledWith('+');
    });
    it('should replace last character if operator', function() {
      processNumber(0);
      processOperator('+');
      processOperator('-');
      expect(window.screen.innerText).toBe('0-');
    });
    it('should set canDecimal flag to true', function(){
      canDecimal = false;
      processOperator('-');
      expect(canDecimal).toBe(true);
    });
  });
  describe('lastIndexIsOperator()', function(){
    it('should check if the last character of the screen.innerText is an operator', function(){
      window.screen.innerText = '4+';
      expect(lastIndexIsOperator()).toBe(true);
      window.screen.innerText = '4-';
      expect(lastIndexIsOperator()).toBe(true);
      window.screen.innerText = '4/';
      expect(lastIndexIsOperator()).toBe(true);
      window.screen.innerText = '4*';
      expect(lastIndexIsOperator()).toBe(true);
      
      window.screen.innerText = '40';
      expect(lastIndexIsOperator()).toBe(false);
    });
  });
  describe('setToZero()', function() {
    it('should set the screen to zero', function() {
      window.screen.innerText = '1';
      setToZero();
      expect(window.screen.innerText).toBe('0');
    });
  });
  describe('setScreen()', function() {
    it('should replace contents of screen with input', function() {
      window.screen.innerText = '7+7';
      setScreen('78');
      expect(window.screen.innerText).toBe('78');
    });
  });
  describe('calculate()', function() {
    it('should evaluate the problem in the screen and return the answer in the screen', function() {
      window.screen.innerText = '8+4';
      calculate();
      expect(window.screen.innerText).toBe('12');
      
      window.screen.innerText = '8-4';
      calculate();
      expect(window.screen.innerText).toBe('4');
     
      window.screen.innerText = '8/4';
      calculate();
      expect(window.screen.innerText).toBe('2');
      
      window.screen.innerText = '8*4';
      calculate();
      expect(window.screen.innerText).toBe('32');

      window.screen.innerText = '8*4+';
      calculate();
      expect(window.screen.innerText).toBe('32');

      window.screen.innerText = '8.5--2';
      calculate();
      expect(window.screen.innerText).toBe('10.5');
    });
  });
  describe('parenthesizeScreen()', function() {
    it('should identify if number is negative and put parenthesis around it', function() {
      window.screen.innerText = '4*-1';
      expect(parenthesizeScreen()).toBe('4*(-1)');

      window.screen.innerText = '-4*-1';
      expect(parenthesizeScreen()).toBe('(-4)*(-1)');

      window.screen.innerText = '4*-1+1.2--3';
      expect(parenthesizeScreen()).toBe('4*(-1)+1.2-(-3)');

      window.screen.innerText = '4*-1.542/1.2--3.56';
      expect(parenthesizeScreen()).toBe('4*(-1.542)/1.2-(-3.56)');

    });
    
  });
  describe('processDecimal()', function() {
    beforeEach (function(){
      window.canDecimal = true;
    });
    it('should add decimal to screen if canDecimal variable is true', function() {
      window.screen.innerText = '0';
      processDecimal();
      expect(window.screen.innerText).toBe('0.');
      expect(canDecimal).toBe(false);

      window.screen.innerText = '0';
      processNumber('4');
      processOperator('+')
      processDecimal();
      expect(window.screen.innerText).toBe('4+0.');
      expect(canDecimal).toBe(false);
      
      window.screen.innerText = '4.5';
      processDecimal();
      expect(window.screen.innerText).toBe('4.5');
      expect(canDecimal).toBe(false);

      window.screen.innerText = '0';
      processNumber('4');
      processDecimal();
      processNumber('5');
      processOperator('*');
      processNumber('2');
      processDecimal();
      expect(window.screen.innerText).toBe('4.5*2.');
      expect(canDecimal).toBe(false);

      window.screen.innerText = '0';
      processNumber('4');
      processDecimal();
      processDecimal();
      expect(window.screen.innerText).toBe('4.');
      expect(canDecimal).toBe(false);

      window.screen.innerText = '0';
      processNumber('4');
      processDecimal();
      processNumber('2');
      processDecimal();
      expect(window.screen.innerText).toBe('4.2');
      expect(canDecimal).toBe(false);

      window.screen.innerText = '4.5+2';
      calculate();
      processDecimal();
      expect(window.screen.innerText).toBe('6.5');
      expect(canDecimal).toBe(false);
    });
  });
  describe('isScreenNegativeNum()', function() {
    it('should identify if number is negative', function() {
      window.screen.innerText = '-1';
      expect(isScreenNegativeNum()).toBe(true);

      window.screen.innerText = '1';
      expect(isScreenNegativeNum()).toBe(false);
      
    });
  });
  describe ('toggleNeg()', function(){
    it('if only a number it should set the number to negative', function(){
      window.screen.innerText = '0';
      toggleNeg();
      expect(window.screen.innerText).toBe('-0');
      window.screen.innerText = '3.456';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3.456');
      window.screen.innerText = '0.12';
      toggleNeg();
      expect(window.screen.innerText).toBe('-0.12');
    });
    it('if negative single number should set to positive', function(){  
      window.screen.innerText = '-3.6547';
      toggleNeg();
      expect(window.screen.innerText).toBe('3.6547');
      window.screen.innerText = '-4';
      toggleNeg();
      expect(window.screen.innerText).toBe('4');
    });
    it('should remove negative if minus is preceeded by operator', function() {
      window.screen.innerText = '30--3';
      toggleNeg();
      expect(window.screen.innerText).toBe('30-3');
    });
    it('should remove negative at index 0', function(){
      window.screen.innerText = '-3';
      toggleNeg();
      expect(window.screen.innerText).toBe('3');
    });
    it('should insert negative if minus is not preceded by operator', function(){
      window.screen.innerText = '-3-4';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3--4');
    });
    it('should add negative if trailing operator', function(){
      window.screen.innerText = '-3-';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3--');
      window.screen.innerText = '-3*';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3*-');
      window.screen.innerText = '-3/';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3/-');
      window.screen.innerText = '-3+';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3+-');
    
    });
    it('should remove trailing negative symbol', function(){
      window.screen.innerText = '-3--';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3-');
      window.screen.innerText = '-3*-';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3*');
      window.screen.innerText = '-3+-';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3+');
      window.screen.innerText = '-3/-';
      toggleNeg();
      expect(window.screen.innerText).toBe('-3/');
    })

    
  });
  describe('isOperator()', function(){
    it('should identify if character is an Operator', function() {
      
      expect(isOperator('+')).toBe(true);

      expect(isOperator('-')).toBe(true);
      
      expect(isOperator('/')).toBe(true);
      
      expect(isOperator('*')).toBe(true);
      
      expect(isOperator('0')).toBe(false);
      
      expect(isOperator('9')).toBe(false);
    });
  });
  describe('screenIsZero()', function() {
    it('should identify if screen is set to zero', function() {
      window.screen.innerText = '0';
      expect(screenIsZero()).toBe(true);
      
      window.screen.innerText = '10';
      expect(screenIsZero()).toBe(false);
      window.screen.innerText = '0.1';
      expect(screenIsZero()).toBe(false);
    });
  });
});