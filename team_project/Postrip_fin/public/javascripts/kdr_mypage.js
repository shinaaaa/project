$(document).ready(function () {
    $('#pw_auth_btn').click(function () {
        const pw_auth = $('#pw_auth').val();
        const params = { pw_auth };

        $.post('mypage_confirm', params, function (data, status) {
            console.log(data);
            if (data == "true") {
                $.get('mypage_edit', function (data, status) {
                    location.replace("/mypage_edit");
                })
            } else {
                alert(data);
            }
        });
    });

    $('#mypage_upload').click(function () {
        $.get('mypage_upload', function (data, status) {
            location.replace("/mypage_upload");
        });
    });

});