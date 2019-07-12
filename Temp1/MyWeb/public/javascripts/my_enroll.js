/* 이벤트 준비 */
$(document).ready(function() {

    /* registration_btn 클릭시 */
    $('#registration_btn').click(function() {

        /* product_name 의 값을 받아와서 product_name 저장 */
        const product_name = $('#product_name').val();

        /* product_origin 의 값을 받아와서 product_origin 저장 */
        const product_origin = $('#product_origin').val();

        /* product_Date_of_Manufacture 의 값을 받아와서 product_Date_of_Manufacture 저장 */
        const product_Date_of_Manufacture = $('#product_Date_of_Manufacture').val();

        /* 받아온 값이 공백일 경우 실행이 안되도록하는 if문 */
        if (product_name === "") {
            alert("제품코드를 입력하세요");
        } else if (product_origin === "") {
            alert(" 원산지를 입력하세요");
        } else if (product_Date_of_Manufacture === "") {
            alert("제조일자를 입력하세요");
        } else {

            /* 받아온 값에 공백이 없을 경우
            semd_params에 값을 배열 형태로 저장 */
            const semd_params = {
                product_name,
                product_origin,
                product_Date_of_Manufacture,
            };

            /* post 형식으로 db_product.js 에 semd_params를 전달 */
            $.post("/db_product", semd_params, function(data, status) {
                alert(data + ":" + status);
            });

            /* post 형식으로 enrollproduct.js 에 semd_params를 전달 */
            $.post("/enrollproduct", semd_params, function(data, status) {

                /* 값을 초기화 하는 과정에서 생길 수 있는 오류를 처리하기 위함 */
                try {
                    /* join.js에서 JSON 형식으로 리턴 받은 값을 data로 받고
                    data를 파싱하여 값을 추출하여 myobj에 저장  */
                    var myobj = JSON.parse(data)

                    /* myobj의 값 중 키가 msg인 값을 불러와 알림창을 띄움 */
                    alert(myobj.msg);

                    /* 각 값을 공백으로 만듬 */
                    $('#product_name').val() = "";
                    $('#product_origin').val() = "";
                    $('#product_Date_of_Manufacture').val() = "";

                    /* 처리과정에서 오류 발생시 */
                } catch (err) {

                    /* 현재 화면을 새로고침 */
                    window.location.reload(true);
                }
            });
        }
    });

    /* close 클릭시 */
    $('#close').click(function() {

        /* 현재 창을 닫음 */
        window.close();
    });
});