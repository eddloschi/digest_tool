var request_digest = function (algorithm) {
    $.post('/hash/'+algorithm, { message: $('#message').val() }, function (data) {
        id = '#'+algorithm;
        if ($(id).hasClass('text-error')) {
            $(id).removeClass('text-error');
        }
        $(id).text(data);
    }).fail(function () {
        id = '#'+algorithm;
        if (!$(id).hasClass('text-error')) {
            $(id).addClass('text-error');
        }
        $(id).text('ERROR RETRIEVING RESULT');
    });
};

$(document).ready(function () {
    $('#message').bind('input propertychange', function () {
        $('input:checkbox:checked').each(function() {
            request_digest($(this).val());
        });
    });
});