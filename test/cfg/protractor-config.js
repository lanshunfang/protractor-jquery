/**
 * this is config file for protractor
 *
 * @link https://github.com/angular/protractor/blob/master/docs/referenceConf.js
 **/
var path = require('path');

var pkgPath = require.resolve('chromedriver');
var chromeDriverPath = path.resolve(path.join(path.dirname(pkgPath), '..', 'lib/chromedriver/chromedriver'));

exports.config = {
    chromeDriver: chromeDriverPath,
    directConnect: true,

    suites: {
        "protractor-jquery": __dirname + './../spec-e2e/pages/protractor-jquery.E2E.Spec.js'
    },

    // configure multiple browsers to run tests
    capabilities: {
        'browserName': 'chrome',
        shardTestFiles: true,
        maxInstances: 5
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 40000
    },

    // url where your app is running, relative URLs are prepending with this URL
    baseUrl: 'http://localhost:4000/',

    // testing framework, jasmine is the default
    framework: 'jasmine'
};