'use strict';

describe('Controller: IndividualuserCtrl', function () {

  // load the controller's module
  beforeEach(module('attendanceManagementSysApp'));

  var IndividualuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndividualuserCtrl = $controller('IndividualuserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IndividualuserCtrl.awesomeThings.length).toBe(3);
  });
});
