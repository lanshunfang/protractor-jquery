/* eslint-disable */

var $ = require('jquery');

window.jQuery = $;

$(function () {
    $('#protractor-form').submit(function () {
        $('.jumbotron').hide();
        $('#protractor-logined').show();
        return false;
    });
    
    $('.fetch-tech-list').click(function () {
        $.get('/api/tech-list', function (data) {
            JSON.parse(data).forEach(function (element) {
                $('.tech-list').append('<li class="list-group-item">' + element + '</li>')
            });
        });

        return false;

    });
});
