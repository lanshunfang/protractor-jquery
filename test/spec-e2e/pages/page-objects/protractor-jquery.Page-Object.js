exports.search = function (keyword) {
    getSearchElement().sendKeys(keyword)
};

exports.getSearchText = function () {
    return getSearchElement().getAttribute('value');
};

function getSearchElement() {
    return $('#global-search');
}