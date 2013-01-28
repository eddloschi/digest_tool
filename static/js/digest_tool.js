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
    $('#check').click(function () {
        $('input:checkbox').prop('checked', true);
    });
    $('#uncheck').click(function () {
        $('input:checkbox').prop('checked', false);
    });
    $('input:checkbox').change(function () {
        if ($(this).is(':checked')) {
            request_digest($(this).val());
        }
        else {
            $('#'+$(this).val()).html('&nbsp');
        }
    });
});
