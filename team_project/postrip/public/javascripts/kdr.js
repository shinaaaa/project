/* 이벤트 준비 */
$(document).ready(function () {    
    /* logout_li 클릭시 */
    $('#logout_li').click(function(){
        /* post 형식으로 logout.js 호출 */
        $.post('/logout', function() {
            /* 현재 창 새로고침 */
            window.location.reload();
        });
    });
});