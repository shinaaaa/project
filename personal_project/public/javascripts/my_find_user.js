/* 이벤트 준비 */
$(document).ready(function() {

    /* close_btn 클릭시 */
    $('#close_btn').click(function() {

        /* get 형식으로 findclose.js 호출*/
        $.get("/findclose", function(data, status) {

            /* 현재 창을 닫음 */
            window.close();
        });
    });

    /* close 클릭시 */
    $('#close').click(function() {
        /* get 형식으로 findclose.js 호출*/
        $.get("/findclose", function(data, status) {

            /* 현재 창을 닫음 */
            window.close();
        });
    });

    /* find_btn 클릭시 */
    $('#find_btn').click(function() {

        /* find_business_num 의 값을 받아와서 find_business_num 저장 */
        const find_business_num = $('#find_business_num').val();

        /* find_id 의 값을 받아와서 find_id 저장 */
        const find_id = $('#find_id').val();

        /* find_pw 의 값을 받아와서 find_pw 저장 */
        const find_pw = $('#find_pw').val();

        /* 받아온 값이 공백일 경우 실행이 안되도록하는 if문 */
        if (find_business_num === "") {
            alert("사업자 번호를 입력하세요");

        } else {

            /* 받아온 값에 공백이 없을 경우
            semd_params에 값을 배열 형태로 저장 */
            const semd_params = {
                find_business_num,
                find_id,
                find_pw,
            };

            /* post 형식으로 find.js 에 semd_params를 전달 */
            $.post("/find", semd_params, function(data, status) {

                /* find.js에서 JSON 형식으로 리턴 받은 값을 data로 받고
                    data를 파싱하여 값을 추출하여 DB1 저장  */
                var DB1 = JSON.parse(data);
                /* 받아온 값이 공백일 경우 실행이 안되도록하는 if문 */
                if (DB1 == "") {
                    alert("등록되지않은 사업자입니다.");

                    /* 값을 초기화 하는 과정에서 생길 수 있는 오류를 처리하기 위함 */
                    try {
                        /* 각 값을 공백으로 만듬 */
                        $('#find_business_num').val() = "";

                        /* 처리과정에서 오류 발생시 */
                    } catch (err) {

                        /* 현재 화면을 새로고침 */
                        window.location.reload(true);
                    }
                } else {

                    /* 받아온 값에 공백이 없을 경우
                    DB1의 배열상 첫번째 배열을 DB에 저장 */
                    var DB = DB1[0];

                    /* DB의 값을 저장하기 위하여 변수를 생성, 초기화 */
                    let find_find_business_num = "";
                    let find_find_id = "";
                    let find_find_pw = "";

                    /* DB의 키 값이 존재하지 않을때 까지 반복 */
                    for (key in DB) {

                        /* 키 값이 db_business_num 과 일치할 경우 */
                        if (key === "db_business_num") {

                            /* find_find_business_num
                            키에 해당하는 값을 저장 */
                            find_find_business_num = DB[key];

                            /* 키 값이 db_id 과 일치할 경우 */
                        } else if (key === "db_id") {

                            /* find_find_id
                            키에 해당하는 값을 저장 */
                            find_find_id = DB[key];

                            /* 키 값이 db_pw 과 일치할 경우 */
                        } else if (key === "db_pw") {

                            /* find_find_pw
                            키에 해당하는 값을 저장 */
                            find_find_pw = DB[key];
                        }
                    }

                    /* 저장한 키 값을 params에 배열의 형태로 저장 */
                    let params = {
                        find_find_business_num,
                        find_find_id,
                        find_find_pw
                    };

                    /* post 형식으로 find_find.js 에 params 전달 */
                    $.post("/find_find", params, function(data, status) {

                        /* 값을 초기화 하는 과정에서 생길 수 있는 오류를 처리하기 위함 */
                        try {

                            /* JSON.parse(data) 값 중 키가 msg인 값을 불러와 알림창을 띄움 */
                            alert(JSON.parse(data).msg);
                            /* 각 값을 공백으로 만듬 */
                            $('#find_business_num').val() = "";
                            $('#find_id').val() = "";
                            $('#find_pw').val() = "";

                            /* 처리과정에서 오류 발생시 */
                        } catch (err) {

                            /* 현재 화면을 새로고침 */
                            window.location.reload(true);
                        }
                    });
                }
            });
        }
    });
});