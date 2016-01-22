'use strict';

describe('Filter: textLength', function () {

  // load the filter's module
  beforeEach(module('dotCinemaApp'));

  // initialize a new instance of the filter before each test
  var textLength;
  beforeEach(inject(function ($filter) {
    textLength = $filter('textLength');
  }));

  it('should return the input prefixed with "textLength filter:"', function () {
    var text = 'angularjs';
    expect(textLength(text)).to.equal('textLength filter: ' + text);
  });

});
