/* 이벤트 준비 */
$(document).ready(function () {
    $('#find_find_btn').click(function () {
        const find_id_email = $('#find_id_email').val();
        const find_id_name = $('#find_id_name').val();
        const find_pw_email = $('#find_pw_email').val();
        const find_pw_id = $('#find_pw_id').val();

        const params = {
            find_id_email,
            find_id_name,
            find_pw_email,
            find_pw_id
        };
        /* post 형식으로 find_idpw_db.js 에 params를 전달 */
        $.post('find_idpw_db', params, function () {
            window.location.reload();
        });
    });

    $('#find_close_btn').click(function () {
        /* post 형식으로 find_session.js 호출 */
        $.post('find_session', function () {
            window.close();
        });
    });
});