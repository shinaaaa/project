$(document).ready(function () {

    $('#find_find_id_btn').click(function () {
        const find_id_email = $('#find_id_email').val();
        const find_id_name = $('#find_id_name').val();

        const params = {
            find_id_email,
            find_id_name,
        };

        if (find_id_email == "") {
            alert("이메일을 입력해주세요");
        } else if (find_id_name == "") {
            alert("이름을 입력해주세요");
        } else {
            $.post('find_idpw_db', params, function (data, status) {
                if(data == 'false') {
                    alert('일치하는 회원 정보가 없습니다. 다시 확인해주세요');
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            });
        }
    });

    $('#find_find_pw_btn').click(function () {
        const find_pw_email = $('#find_pw_email').val();
        const find_pw_id = $('#find_pw_id').val();

        const params = {
            find_pw_email,
            find_pw_id
        };

        if (find_pw_email == "") {
            alert("이메일을 입력해주세요");
        } else if (find_pw_id == "") {
            alert("아이디를 입력해주세요");
        } else {
            $.post('find_idpw_db', params, function (data, status) {
                if(data == 'false') {
                    alert('일치하는 회원 정보가 없습니다. 다시 확인해주세요');
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            });
        }
    });

    $('#find_close_btn').click(function () {
        $.post('find_session', function () {
            window.close();
        });
    });


    $('#new_pw_btn').click(function () {
        const new_pw = $('#new_pw').val();
        const params = {
            new_pw
        };
        $.post('edit_pw_db', params, function (data, status) {
            if(data == '1') {
                alert('영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다.');
                window.location.reload();
            } else if(data == '2') {
                alert('비밀번호는 ID를 포함할 수 없습니다.');
                window.location.reload();
            } else if(data == '3') {
                alert('동일문자를 3자 이상 연속 입력할 수 없습니다.');
                window.location.reload();
            } else if(data == '4') {
                alert('영문, 숫자는 3자 이상 연속 입력할 수 없습니다.');
                window.location.reload();
            } else if(data == '5') {
                alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요.');
                window.close();
            } else if(data == '6') {
                alert('오류다 이놈아');
                window.location.reload();
            } else {
                alert('오류다 이놈아');
                window.location.reload();
            }
        });
    });
});