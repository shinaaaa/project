/* 이벤트 준비 */
$(document).ready(function() {

    /* search_val 에 포커스를 줌 */
    $("#search_val").focus();

    /* join_btn 클릭시 */
    $('#join_btn').click(function() {

        /* join_business_num 의 값을 받아와서 join_business_num에 저장 */
        const join_business_num = $('#join_business_num').val();
        /* join_id 의 값을 받아와서 join_id 저장 */
        const join_id = $('#join_id').val();
        /* join_pw 의 값을 받아와서 join_pw 저장 */
        const join_pw = $('#join_pw').val();

        /* 받아온 값이 공백일 경우 실행이 안되도록하는 if문 */
        if (join_business_num === "") {
            alert("사업자 번호를 입력하세요");
        } else if (join_id === "") {
            alert(" 아이디를 입력하세요");
        } else if (join_pw === "") {
            alert("비밀번호를 입력하세요");
        } else {

            /* 받아온 값에 공백이 없을 경우
            semd_params에 값을 배열 형태로 저장 */
            const semd_params = {
                join_business_num,
                join_id,
                join_pw,
            };

            /* post 형식으로 db.js 에 semd_params를 전달 */
            $.post("/db", semd_params, function(data, status) {});

            /* post 형식으로 join.js 에 semd_params를 전달 */
            $.post("/join", semd_params, function(data, status) {

                /* 값을 초기화 하는 과정에서 생길 수 있는 오류를 처리하기 위함 */
                try {
                    /* join.js에서 JSON 형식으로 리턴 받은 값을 data로 받고
                    data를 파싱하여 값을 추출하여 myobj에 저장  */
                    var myobj = JSON.parse(data)

                    /* myobj의 값 중 키가 msg인 값을 불러와 알림창을 띄움 */
                    alert(myobj.msg);

                    /* 각 값을 공백으로 만듬 */
                    $('#join_business_num').val() = "";
                    $('#join_id').val() = "";
                    $('#join_pw').val() = "";

                    /* 처리과정에서 오류 발생시 */
                } catch (err) {

                    /* 현재 화면을 새로고침 */
                    window.location.reload(true);
                }
            });

            /* join 를 화면에서 사라지게 함 */
            $("#join").fadeOut("slow");
        }
    });

    /* login_btn을 클릭했을 경우 */
    $('#login_btn').click(function() {

        /* business_num 의 값을 받아와서 business_num 저장 */
        const business_num = $('#business_num').val();
        /* login_id 의 값을 받아와서 login_id 저장 */
        const login_id = $('#login_id').val();
        /* login_pw 의 값을 받아와서 login_pw 저장 */
        const login_pw = $('#login_pw').val();

        /* 받아온 값이 공백일 경우 실행이 안되도록하는 if문 */
        if (business_num === "") {
            alert("사업자 번호를 입력하세요");
        } else if (login_id === "") {
            alert(" 아이디를 입력하세요");
        } else if (login_pw == "") {
            alert("비밀번호를 입력하세요");
        } else {

            /* 받아온 값에 공백이 없을 경우
            semd_params에 값을 배열 형태로 저장 */
            const semd_params = {
                business_num,
                login_id,
                login_pw
            };

            /* post 형식으로 logindb.js 에 semd_params를 전달 */
            $.post("/logindb", semd_params, function(data, status) {

                /* logindb.js에서 JSON 형식으로 리턴 받은 값을 data로 받고
                    data를 파싱하여 값을 추출하여 DB1 저장  */
                var DB1 = JSON.parse(data);

                /* 받아온 값이 공백일 경우 실행이 안되도록하는 if문 */
                if (DB1 == "") {
                    alert("등록되지 않은 계정이거나 비밀번호가 틀렸습니다.");

                    /* 값을 초기화 하는 과정에서 생길 수 있는 오류를 처리하기 위함 */
                    try {
                        /* 각 값을 공백으로 만듬 */
                        $('#business_num').val() = "";
                        $('#login_id').val() = "";
                        $('#login_pw').val() = "";

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
                    let login_login_business_num = "";
                    let login_login_id = "";
                    let login_login_pw = "";

                    /* DB의 키 값이 존재하지 않을때 까지 반복 */
                    for (key in DB) {

                        /* 키 값이 db_business_num 과 일치할 경우 */
                        if (key === "db_business_num") {

                            /* login_login_business_num에
                            키에 해당하는 값을 저장 */
                            login_login_business_num = DB[key];

                            /* 키 값이 db_id 과 일치할 경우 */
                        } else if (key === "db_id") {

                            /* login_login_id
                            키에 해당하는 값을 저장 */
                            login_login_id = DB[key];

                            /* 키 값이 db_pw 과 일치할 경우 */
                        } else if (key === "db_pw") {

                            /* login_login_pw
                            키에 해당하는 값을 저장 */
                            login_login_pw = DB[key];
                        }
                    }

                    /* 저장한 키 값을 params에 배열의 형태로 저장 */
                    let params = {
                        login_login_business_num,
                        login_login_id,
                        login_login_pw
                    };

                    /* post 형식으로 login.js 에 params 전달 */
                    $.post("/login", params, function(data, status) {

                        /* 값을 초기화 하는 과정에서 생길 수 있는 오류를 처리하기 위함 */
                        try {

                            /* 각 값을 공백으로 만듬 */
                            $('#business_num').val() = "";
                            $('#login_id').val() = "";
                            $('#login_pw').val() = "";

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

    /* logout_btn 클릭시 */
    $('#logout_btn').click(function() {

        /* get 형식으로 logout.js 에 호출 */
        $.get("/logout", function(data, status) {

            /* 호출된 후에 화면을 새로 고침 */
            location.reload();
        });
    });

    /* Product_registration 클릭시 */
    $('#Product_registration').click(function() {

        /* enroll.ejs 페이지를 새창에 오픈 */
        window.open('/enroll', 'enroll', 'width= 370px; height= 580px; left= 800;');
    });

    /* main_find_btn 클릭시 */
    $('#main_find_btn').click(function() {

        /* find_user.ejs 페이지를 새창에 오픈 */
        window.open('/find_user', 'Find ID/PW', 'width= 370px; height= 580px; left= 800;');
    });

    /* join_Content 의 전체 너비의 절반 값을 저장 */
    var join_marginLeft = $(".join_Content").outerWidth() / 2;

    /* join_Content 의 전체 높이의 절반 값을 저장 */
    var join_marginTop = $(".join_Content").outerHeight() / 2;

    /* main_join_btn 클릭시 */
    $("#main_join_btn").click(function() {

        /* join 화면을 천천히 나타남 */
        $("#join").fadeIn("slow");

        /* join_Content 의 margin을 지정 */
        $(".join_Content").css({ "margin-top": -join_marginTop, "margin-left": -join_marginLeft });

        /* join_business_num 에 포커스를 줌 */
        $("#join_business_num").focus();
    });

    /* close 클릭시 */
    $("#close").click(function() {

        try {
            /* 각 값을 공백으로 만듬 */
            $('#join_business_num').val() = "";
            $('#join_id').val() = "";
            $('#join_pw').val() = "";

            /* 처리과정에서 오류 발생시 */
        } catch (err) {

            /* 현재 화면을 새로고침 */
            window.location.reload(true);
        }

        /* join를 화면에서 사라지게 함 */
        $("#join").fadeOut("slow");
    });

    /* showImage 함수를 4초 간격으로 실행 */
    setInterval(showImage, 4000);

    /* count 에 2를 저장하여 변수 설정 */
    let count = 2;

    /* 배너의 이미지를 변경하기 위하여 showImage 함수를 생성 */
    function showImage() {

        /* bannerimg의 속성 값 src을 변경 */
        $("#bannerimg").attr("src", "images/img_banner_0" + count + ".png");

        /* count 를 1씩 증가 */
        count++;

        /* count 가 4를 초과할 경우 */
        if (count > 4) {
            /* count 의 값에 1 저장 */
            count = 1;
        }
    }
})