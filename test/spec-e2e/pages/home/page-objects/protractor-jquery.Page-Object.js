exports.search = function (keyword) {
    getSearchElement().sendKeys(keyword)
};

exports.getSearchText = function () {
    return getSearchElement().getAttribute('value');
};

exports.getAvatarImage = function () {
    return $('.linkedin-avatar');
};

exports.getFetchListButton = function () {
    return $('.fetch-tech-list');
};

function getSearchElement() {
    return $('#global-search');
}