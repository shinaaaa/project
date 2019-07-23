/* 이벤트 준비 */
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
    /* delete_btn을 눌렀을 때 이벤트 */
    $('#delete_btn').click(function () {
        /* name = edit_email의 값을 변수  edit_email로 선언 */
        const edit_email = $(this).find('[name=edit_email]').val();
        /* 값을 전달하기 위해서 배열 params 선언 */
        let params = {
            edit_email
        }
        /* get 형식으로 delete_db.js 에 params를 전달 */
        $.get('/delete_db', params, function (data, state) {
            alert(data);
            location.replace('/');
        });
    });

});