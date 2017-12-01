describe('Calculator', function() {
  beforeEach(function() {
    var screen = document.createElement('div');
    window.screen = screen;
  });
  describe('addToScreen', function() {
    it('should display input in screen', function() {
      spyOn(window, 'addToScreen');
      addToScreen('3');
      expect(document.getElementById).toHaveBeenCalledWith('screen');
      expect(window.screen.innerText).toBe('3');
    });
  });
  describe('processNumber', function() {
    it('should display input in screen', function() {
      spyOn(window, 'addToScreen').and.returnValue(null);
      processNumber(3);
      expect(addToScreen).toHaveBeenCalledWith(3);
    });
  });
  describe('processOperator', function(){
    it('should add operator after number', function() {
      spyOn(window, 'addToScreen').and.returnValue(null);
      processOperator('+');
      expect(addToScreen).toHaveBeenCalledWith('+');
    });
    it('should replace last character if operator', function() {
      spyOn(window, 'setScreen').and.returnValue(null);
      processNumber(0);
      processOperator('+');
      processOperator('-');
      expect(window.screen.innerText).toBe('0-');
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
  describe('clear()', function() {
    it('should set the screen to zero', function() {
      window.screen.innerText = '1';
      clear();
      expect(window.screen.innerText).toBe('0');
    });
  });
  // describe('setScreen()', function() {
    
  // });
  // describe('calculate()', function() {
    
  // });
});