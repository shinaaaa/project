/* 이벤트 준비 */
$(document).ready(function() {

    /* search_btn 클릭시 */
    $('#search_btn').click(function() {

        /* search_val 의 값을 받아와서 search_val 저장 */
        const search_val = $('#search_val').val();

        /* 받아온 값에 공백이 없을 경우
            semd_params에 값을 배열 형태로 저장 */
        const semd_params = {
            search_val
        };

        /* post 형식으로 searchdata.js 에 semd_params를 전달 */
        $.post("/searchdata", semd_params, function(data, status) {
            /* searchdata.js에서 JSON 형식으로 리턴 받은 값을 data로 받고
                    data를 파싱하여 값을 추출하여 DB1 저장  */
            var DB1 = JSON.parse(data);

            /* 받아온 값이 공백일 경우 실행이 안되도록하는 if문 */
            if (DB1 == "") {
                alert("등록된 데이터가 없습니다.");

                /* 값을 초기화 하는 과정에서 생길 수 있는 오류를 처리하기 위함 */
                try {
                    /* 각 값을 공백으로 만듬 */
                    $('#search_val').val() = "";

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
                let find_db_product = "";
                let find_db_origin = "";
                let find_db_Date_of_Manufacture = "";

                /* DB의 키 값이 존재하지 않을때 까지 반복 */
                for (key in DB) {
                    /* 키 값이 db_product 과 일치할 경우 */
                    if (key === "db_product") {
                        /* find_db_product
                            키에 해당하는 값을 저장 */
                        find_db_product = DB[key];

                        /* 키 값이 db_origin 과 일치할 경우 */
                    } else if (key === "db_origin") {
                        /* find_db_origin
                            키에 해당하는 값을 저장 */
                        find_db_origin = DB[key];

                        /* 키 값이 db_Date_of_Manufacture 과 일치할 경우 */
                    } else if (key === "db_Date_of_Manufacture") {
                        /* find_db_Date_of_Manufacture
                            키에 해당하는 값을 저장 */
                        find_db_Date_of_Manufacture = DB[key];
                    }
                }

                /* 저장한 키 값을 params에 배열의 형태로 저장 */
                let params = {
                    find_db_product,
                    find_db_origin,
                    find_db_Date_of_Manufacture
                };

                /* post 형식으로 searchsearch.js 에 params 전달 */
                $.post("/searchsearch", params, function(data, status) {

                    /* 값을 초기화 하는 과정에서 생길 수 있는 오류를 처리하기 위함 */
                    try {
                        /* 각 값을 공백으로 만듬 */
                        $('#search_val').val() = "";

                        /* 처리과정에서 오류 발생시 */
                    } catch (err) {
                        /* 현재 화면을 새로고침 */
                        window.location.reload(true);
                    }
                });

                /* searchdatapage.ejs 페이지를 새창에 오픈 */
                window.open('/searchdatapage', 'searchdatapage', 'width= 370px; height= 580px; left= 800;');
            }
        });
    });

    /* close_btn 클릭시 */
    $('#close_btn').click(function() {

        /* 현재 창을 닫음 */
        window.close();
    });

    /* close 클릭시 */
    $('#close').click(function() {

        /* 현재 창을 닫음 */
        window.close();
    });
});