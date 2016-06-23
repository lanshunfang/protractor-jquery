/**
 This file provide utilities for protractor
 **/

var protractor = require('protractor');
var EC = protractor.ExpectedConditions;
require('./global.protractor-utils.jasmine.UAT.require');

browser.ignoreSynchronization = true;
/**
 * Hold test cases if jQuery ajax is ongoing
 */
exports.waitForAjax = function () {

  return ensureJQuery().then(function () {
    return browser.executeAsyncScript(function () {

      var cb = arguments[arguments.length - 1]

      if (!window.hasWaitForAjaxRun) {
        var $doc = jQuery(document);
        window.isFirstAjaxInvoked = false;

        $doc.ajaxStart(function () {
          window.isCurrentAjaxRunning = true;
          window.isFirstAjaxInvoked = true;
          clearTimeout(window.ajaxStopTimeoutId);
        });

        $doc.ajaxStop(function () {

          clearTimeout(window.ajaxStopTimeoutId);
          window.ajaxStopTimeoutId = setTimeout(function () {
            window.isCurrentAjaxRunning = false;
          }, 500);

        });

        $doc.ready(function () {
          setTimeout(function () {
            window.isFirstAjaxInvoked = true;
          }, 1000);
        });

        window.hasWaitForAjaxRun = true;
      }
      ;

      var refectAjaxToDomNode = function () {

        if (window.isFirstAjaxInvoked && !window.isCurrentAjaxRunning) {
          cb()
        } else {
          setTimeout(refectAjaxToDomNode, 300)
        }
      };
      refectAjaxToDomNode()


    });

  });

  function ensureJQuery() {

    return browser.executeAsyncScript(function () {

      var callback = arguments[arguments.length - 1];

      var findJQuery = function () {
        var isJQueryReady = typeof jQuery !== 'undefined' && jQuery.isReady;
        if (isJQueryReady) {
          callback()
        } else {
          setTimeout(findJQuery, 300)
        }
      };
      findJQuery()

    })
  }


};

browser.waitForFramework = browser.waitForAngular = function () {

  return exports.waitForAjax().then(function () {
    return browser.controlFlow().execute(function () {
      return true;
    })
  })
};
