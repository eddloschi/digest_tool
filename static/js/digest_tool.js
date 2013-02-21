var requests = [];

var request_digest = function (algorithm) {
    if (requests[algorithm] && requests[algorithm].readyState < 4) {
        requests[algorithm].abort();
    }
    requests[algorithm] = $.post('/hash/'+algorithm, { message: $('#message').val() }, function (data) {
        id = '#'+algorithm;
        if ($(id).hasClass('text-error')) {
            $(id).removeClass('text-error');
        }
        $(id).text(data);
    }).fail(function () {
        if (requests[algorithm].statusText !== 'abort') {
            id = '#'+algorithm;
            if (!$(id).hasClass('text-error')) {
                $(id).addClass('text-error');
            }
            $(id).text('ERROR RETRIEVING RESULT');
        }
    });
};

$(document).ready(function () {
    $('#message').bind('input propertychange', function () {
        $('input:checkbox:checked').each(function() {
            request_digest($(this).val());
        });
    });
    $('#check').click(function () {
        $('input:checkbox').each(function () {
            $(this).prop('checked', true);
            $(this).trigger('change');
        });
    });
    $('#uncheck').click(function () {
        $('input:checkbox').each(function () {
            $(this).prop('checked', false);
            $(this).trigger('change');
        });
    });
    $('input:checkbox').change(function () {
        if ($(this).is(':checked')) {
            request_digest($(this).val());
        }
        else {
            $('#'+$(this).val()).html('&nbsp;');
        }
    });
});
