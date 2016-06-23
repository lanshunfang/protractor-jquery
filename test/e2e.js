var ptorCurrentRunningInsts = {}
var ptorCfgFileDefault = './cfg/protractor-config';

var child_process = require('child_process');
var path = require('path');

var ptorCfgDefault = require(ptorCfgFileDefault).config;
exports.maxWaitTimeForPtorChildProcess = ptorCfgDefault && ptorCfgDefault.jasmineNodeOpts && ptorCfgDefault.jasmineNodeOpts.defaultTimeoutInterval || 20000;

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

        var childProcess = child_process.spawn(getProtractorBinary('protractor'), argv, {
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

exports.protractorInstall = function (done) {
    return child_process.spawn(getProtractorBinary('webdriver-manager'), ['update'], {
        stdio: 'inherit'
    }).once('close', done);
};


var paramCaseName = getArgvOption('caseName');
paramCaseName = paramCaseName ? '--params.casename=' + paramCaseName : undefined;

exports.protractorRun()(paramCaseName).on('exit', function () {
    console.log('Done of running Protractor jQuery')
});

exports.protractorRun()();

function getProtractorBinary(binaryName) {
    var winExt = /^win/.test(process.platform) ? '.cmd' : '';
    var pkgPath = require.resolve('protractor');
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));

    return path.join(protractorDir, '/' + binaryName + winExt);
}

function getArgvOption(optionName) {

    var optionValue, i = process.argv.indexOf("--" + optionName);
    if (i > -1) {
        optionValue = process.argv[i + 1];
    }
    return optionValue
}