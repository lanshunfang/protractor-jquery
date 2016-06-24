var child_process = require('child_process');

var findBin = require('./find-bin');

/**
 * Update webdriver
 * @param done
 * @returns {*}
 */

child_process.spawn(findBin.getProtractorBinary('webdriver-manager'), ['update'], {
    stdio: 'inherit'
}).once('close', function () {
    console.log('webdriver-manager updated')
});