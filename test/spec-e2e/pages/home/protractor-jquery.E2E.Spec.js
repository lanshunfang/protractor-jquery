
var global = require('../../common/global/global.UAT.require');
var protractorJQueryPageObject = require('./page-objects/protractor-jquery.Page-Object');

describe(' Protractor jQuery Search ', function() {

    beforeEach(function () {
        "use strict";
    });

    it('should show search keyword', 'Home/Search, __E2E__', function () {
        browser.get(global.baseURL);

        var keyword = 'Protractor';
        protractorJQueryPageObject.search(keyword);

        expect(protractorJQueryPageObject.getSearchText()).toEqual(keyword)
    });

    it('should show LinkedIn Avatar of Paul Lan', 'Home/Avatar, __UAT__', function () {
        global.requireLogin();
        expect(protractorJQueryPageObject.getAvatarImage().isPresent()).toBe(true);
    });

    it('should fetch tech list of Paul Lan from server', 'Home/TechList, __UAT__', function () {
        global.requireLogin();
        var scrollToScript = 'document.querySelector(".fetch-tech-list").scrollIntoView();';

        browser.executeScript(scrollToScript).then(function () {
            protractorJQueryPageObject.getFetchListButton().click();
            expect(element.all(by.css('.list-group-item')).count()).toBeGreaterThan(2);
        });

    });
    
});
