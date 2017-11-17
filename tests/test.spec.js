describe('Calculator', function() {
  // describe('addToScreen', function() {
  //   it('should display input in screen', function() {
  //     var screen = document.createElement('div');
  //     // document.getElementById = jasmine.createSpy().and.returnValue(screen);
  //     spyOn(document, 'getElementById').and.returnValue(screen);
  //     spyOn(window, 'addToScreen');
  //     addToScreen('3');
  //     expect(document.getElementById).toHaveBeenCalledWith('screen');
  //     expect(screen.innerText).toBe('3');
  //   });
  // });
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
      var screen = document.createElement('div');
      screen.setAttribute('id', 'screen');
      document.body.appendChild(screen);
      spyOn(window, 'setScreen').and.returnValue(null);
      processNumber(0);
      processOperator('+');
      processOperator('-');
      expect(setScreen).toHaveBeenCalledWith('0-');
    });
  });
});