'use strict';

describe('Controller: ControlBlogCtrl', function () {

  // load the controller's module
  beforeEach(module('vangardApp'));

  var ControlBlogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ControlBlogCtrl = $controller('ControlBlogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
