/* eslint-disable */

var $ = require('jquery');

window.jQuery = $;

$(function () {
    $('#protractor-form').submit(function () {
        $('#jumbotron').hide();
        $(this).hide();
        $('#protractor-iframe').show().attr('src', 'http://www.xiaofang.me/category/front-end/');
    })
});
