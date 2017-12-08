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
    // it('should identify if a decimal was pressed and then use processDecimal function ', function() {
    //   spyOn(window, 'processDecimal');
    //   processKey({keyCode:190});
    //   expect(processDecimal).toHaveBeenCalledWith('.');
    // }); // WORKING ON THIS ONE!!!!

    // it('should identify if an operator was pressed and then use processOperator function ', function() {
    //   spyOn(window, 'processOperator');
    //   processKey({keyCode:187});
    //   expect(processOperator).toHaveBeenCalledWith('+');

    //   processKey({keyCode:187});
    //   expect(processOperator).toHaveBeenCalledWith('=');

    //   processKey({keyCode:189});
    //   expect(processOperator).toHaveBeenCalledWith('-');

    //   processKey({keyCode:13});
    //   expect(processOperator).toHaveBeenCalledWith('=');
    // });
    
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
    });
  });
  describe('processDecimal()', function() {
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
    });
  });
  // describe('isNegativeNum()', function() {
  //   it('should identify if number is negative', function() {
  //     window.screen.innerText = '-1';
  //     expect(isNegativeNum()).toBe(true);

  //     window.screen.innerText = '1';
  //     expect(isNegativeNum()).toBe(false);
      
  //   });
  // });
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