'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {


  it('should automatically redirect to /home when location hash/fragment is empty', function () {
    browser.get('index.html');

    expect(browser.getCurrentUrl()).toMatch('/home');
  });

  describe('navigation', function() {

    it('should activate Home nav item', function() {
      browser.get('/');

      expect(element(by.css('.nav-active')).getText()).toEqual('Home');
    });  

    it('should activate Users nav item', function() {
      browser.get('/users');

      expect(element(by.css('.nav-active')).getText()).toEqual('Users');
    });  

    it('should activate Users nav item with user id', function() {
      browser.get('/users/1');

      expect(element(by.css('.nav-active')).getText()).toEqual('Users');
    });  

    it('should activate Items nav item', function() {
      browser.get('/items');

      expect(element(by.css('.nav-active')).getText()).toEqual('Items');
    });  
  });

});