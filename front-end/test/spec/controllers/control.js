'use strict';

describe('Controller: ControlCtrl', function () {

  // load the controller's module
  beforeEach(module('vangardApp'));

  var ControlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ControlCtrl = $controller('ControlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
