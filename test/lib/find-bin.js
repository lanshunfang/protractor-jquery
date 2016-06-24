var path = require('path');
var child_process = require('child_process');

exports.getProtractorBinary = function(binaryName) {
    var winExt = /^win/.test(process.platform) ? '.cmd' : '';
    var pkgPath = require.resolve('protractor');
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));

    return path.join(protractorDir, '/' + binaryName + winExt);
};
