
var global = require('../common/global/global.UAT.require');
var protractorJQueryPageObject = require('./page-objects/protractor-jquery.Page-Object');

describe(' Protractor jQuery Search ', function() {

    global.requireLogin();

    beforeEach(function () {
        "use strict";
    });

    it('should show search keyword', 'Home/Search, __E2E__', function () {
        var keyword = 'Protractor';
        protractorJQueryPageObject.search(keyword);

        expect(protractorJQueryPageObject.getSearchText()).toEqual(keyword)
    });
});
