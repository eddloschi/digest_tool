var request_digest = function (algorithm) {
    $.post('/hash/'+algorithm, { message: $('#message').val() }, function (data) {
        $('#'+algorithm).text(data);
    }).fail(function () {
        $('#'+algorithm).text('ERROR RETRIEVING RESULT');
    });
};

$(document).ready(function () {
    $('#message').bind('input propertychange', function () {
        $('input:checkbox:checked').each(function() {
            request_digest($(this).val());
        });
    });
});
