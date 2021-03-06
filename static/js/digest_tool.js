var requests = [];

var request_digest = function (algorithm) {
    if (requests[algorithm] && requests[algorithm].readyState < 4)
        requests[algorithm].abort();
    var id = '#'+algorithm;
    requests[algorithm] = $.post('/hash/'+algorithm, { message: $('#message').val() }, function (data) {
        if ($(id).hasClass('text-error'))
            $(id).removeClass('text-error');
        $(id).text(data);
    }).fail(function () {
        if (requests[algorithm].statusText !== 'abort') {
            if (!$(id).hasClass('text-error'))
                $(id).addClass('text-error');
            $(id).text('ERROR RETRIEVING RESULT');
        }
    }).always(function () {
        $('#loading'+algorithm).hide();
        $(id).show();
    });
    $(id).hide();
    $('#loading'+algorithm).show();
};

$(document).ready(function () {
    var timeoutID = null;

    $('#message').bind('input propertychange', function () {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            $('input:checkbox:checked').each(function() {
                request_digest($(this).val());
            });
        }, 300);
    });
    $('#checkall').click(function () {
        $('input:checkbox:not(:checked)').each(function () {
            $(this).prop('checked', true);
            $(this).trigger('change');
        });
    });
    $('#uncheckall').click(function () {
        $('input:checkbox:checked').each(function () {
            $(this).prop('checked', false);
            $(this).trigger('change');
        });
    });
    $('input:checkbox').change(function () {
        if ($(this).is(':checked'))
            request_digest($(this).val());
        else {
            if (requests[$(this).val()] && requests[$(this).val()].readyState < 4)
                requests[$(this).val()].abort();
            $('#'+$(this).val()).html('&nbsp;');
        }
    });
});
