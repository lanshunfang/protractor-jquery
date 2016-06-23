var global = require('../global/global.UAT.require');

browser.get(global.baseURL + 'login');

$('#email').sendKeys(global.email);
$('#password').sendKeys(global.password);
$('#login-submit').click();

browser.waitForFramework();