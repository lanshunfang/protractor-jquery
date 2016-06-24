var ptorCurrentRunningInsts = {}
var ptorCfgFileDefault = './cfg/protractor-config';

var child_process = require('child_process');

var findBin = require('./lib/find-bin');

var ptorCfgDefault = require(ptorCfgFileDefault).config;
exports.maxWaitTimeForPtorChildProcess = ptorCfgDefault && ptorCfgDefault.jasmineNodeOpts && ptorCfgDefault.jasmineNodeOpts.defaultTimeoutInterval || 20000;

/**
 * Get Protractor ready with configure file
 *
 * @description return a function to accept test case name
 *
 * @param {string} [ptorCfgFile] - the Protractor config file name, defaulted as './cfg/protractor-config'
 * @returns {Function}
 */
exports.protractorRun = function (ptorCfgFile) {

    ptorCfgFile = ptorCfgFile || ptorCfgFileDefault;

    return function () {
        var argv = ['test/' + ptorCfgFile];

        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i]) {
                argv.push(arguments[i]);
            }
        }

        var runningId = argv.join('_');
        var runningCProcess = ptorCurrentRunningInsts[runningId];
        
        if (runningCProcess) {
            console.warn('Protractor is already running, with Arguments', runningId);
            return runningCProcess
        }

        var childProcess = child_process.spawn(findBin.getProtractorBinary('protractor'), argv, {
            stdio: 'inherit'
        });

        childProcess.on('exit', function () {
            "use strict";

            ptorCurrentRunningInsts[runningId] = null

        });
        ptorCurrentRunningInsts[runningId] = childProcess;
        setTimeout(function () {
            "use strict";
            var cProcess = ptorCurrentRunningInsts[runningId];
            if (cProcess && cProcess.kill) {
                console.log('Kill Protractor Child process for timeout', exports.maxWaitTimeForPtorChildProcess);

                cProcess.kill()
            }
        }, exports.maxWaitTimeForPtorChildProcess);
        return childProcess;
    }

};

/**
 * Update webdriver
 * @param done
 * @returns {*}
 */
exports.protractorInstall = function (done) {
    return child_process.spawn(findBin.getProtractorBinary('webdriver-manager'), ['update'], {
        stdio: 'inherit'
    }).once('close', done);
};


var paramCaseName = getArgvOption(0);

paramCaseName = paramCaseName ? '--params.casename=' + paramCaseName : undefined;

/**
 *
 */
exports.protractorRun()(paramCaseName).on('exit', function () {
    console.log('Done of running Protractor jQuery')
});

function getArgvOption(optionIndex) {
    return process.argv[optionIndex+2]
}