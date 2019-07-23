/* 이벤트 준비 */
$(document).ready(function () {

    /* login_form submit */
    $('#login_form').submit(function () {
        /* submit의 기본 기능을 막기위한 메서드 */
        event.preventDefault();

        /* login_form안에 name = login_id의 값을 변수 login_id로 선언 */
        const login_id = $(this).find('[name=login_id]').val();
        /* login_form안에 name = login_pw의 값을 변수 login_pw로 선언 */
        const login_pw = $(this).find('[name=login_pw]').val();

        /* 값을 전달하기 위해서 배열 params 선언 */
        const params = {
            login_id,
            login_pw
        };
        /* post 형식으로 login_db.js 에 params를 전달 */
        $.post('/login_db', params, function (data, state) {
            alert(data);
            /* mypage2로 URL 변경 */
            location.replace('/mypage2');
        });
    });

    /* find_btn 버튼 클릭시 */
    $('#find_btn').click(function(){
        /* find_idpw URL 주소를 가진 새창을 띄움 */
        window.open('/find_idpw', 'Find ID/PW', 'width= 370px; height= 580px; left= 800;');
    });
});