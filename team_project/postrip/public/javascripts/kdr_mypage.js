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
        readURL(this);
    });
    /* post 형식으로 mypage_posting_db.js 호출 */
    $.post('/mypage_posting_db', function(data,state) {
    });
});