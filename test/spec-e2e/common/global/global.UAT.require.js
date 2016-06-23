exports.curryProtractor = require('./global.protractor-utils.UAT.require');
exports.baseURL = 'http://localhost:4000/';
exports.requireLogin = function () {
    return require('../login/login.UAT.Helper');
};
var uatEnv = require('../../../cfg/credientials');
Object.keys(uatEnv).forEach(function (keyName) {
    exports[keyName] = uatEnv[keyName];
});