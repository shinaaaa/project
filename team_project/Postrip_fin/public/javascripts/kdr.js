$(document).ready(function () {

    /* 가입시 프로필 이미지 넣기 */
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader(); //파일을 읽기 위한 FileReader객체 생성
            reader.onload = function (e) {
                //파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
                $('#profile_image').attr('src', e.target.result);
                //이미지 Tag의 SRC속성에 읽어들인 File내용을 지정
                //(아래 코드에서 읽어들인 dataURL형식)
            }
            reader.readAsDataURL(input.files[0]);
            //File내용을 읽어 dataURL형식의 문자열로 저장
        }
    } //readURL()--

    //file 양식으로 이미지를 선택(값이 변경) 되었을때 처리하는 코드
    $("#save_profile").change(function () {
        //alert(this.value); //선택한 이미지 경로 표시
        readURL(this);
    })

    $('#logout_li').click(function () {
        $.post('logout', function () {
            window.location.reload();
        });
    });

    $('#find_btn').click(function () {
        window.open('/find_idpw', 'Find ID/PW', 'width= 370px; height= 580px; left= 800;');
    });

    $('#email_seach').click(function () {
        const join_email = $('input[name=join_email]').val();

        const params = {
            join_email
        };

        let email_regece = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (!join_email.match(email_regece) && join_email != "") {
            alert('이메일 형식으로 입력해주세요.');
        } else if (join_email != "") {
            $.post('/join_db2', params, function (data, status) {
                alert(data);
            });
        } else {
            alert('이메일을 입력해주세요.');
        }
        event.preventDefault();
    });

    $('#id_seach').click(function () {
        const join_id = $('input[name=join_id]').val();

        const params = {
            join_id
        };

        let id_regece = /^[0-9a-zA-Z]*$/i;

        if (join_id != "" && join_id.match(id_regece)) {
            $.post('/join_db3', params, function (data, status) {
                $('#join_btn').attr('disabled', false);
                alert(data);
            });
        } else {
            alert('아이디를 입력해주세요.');
        }
        event.preventDefault();
    });
});