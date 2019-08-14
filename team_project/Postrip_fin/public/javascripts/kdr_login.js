let checkbox;

function checkRecaptcha() {
    var response = grecaptcha.getResponse();
    if(response.length == 0) { 
      //reCaptcha not verified
      alert("상단의 체크박스를 클릭해주세요");
      checkbox="fail";
    }
    else { 
      //reCaptch verified
      checkbox="pass";
      
      
    }
  }
  // implement on the backend
  function backend_API_challenge() {
      var response = grecaptcha.getResponse();
      $.ajax({
          type: "POST",
          url: 'https://www.google.com/recaptcha/api/siteverify',
          data: {"secret" : "6LfavrEUAAAAAIiO7qag7Xquy4HTYpAS58Hx3Jcg", "response" : response, "remoteip":"localhost"},
          contentType: 'application/x-www-form-urlencoded',
          success: function(data) { console.log(data); }
      });
  }

$(document).ready(function () {

    $('#login_form').submit(function () {
        if(checkbox=="pass"){


        event.preventDefault();

        const login_id = $(this).find('[name=login_id]').val();
        const login_pw = $(this).find('[name=login_pw]').val();

        const params = {
            login_id,
            login_pw
        };

        let login_regece = /^[0-9a-zA-Z]*$/i;

        if (login_id != "" && login_id.match(login_regece)) {
            $.post('/login_db', params, function (data, state) {
                alert(data);
                let DB = JSON.parse(data);
                location.replace('/mypage2');
            });
        } else {
             if(checkbox=="pass"){
                alert('올바른 아이디를 입력해주세요.');
             }
            
        }
    }   
    });

    $('#find_btn').click(function(){
        window.open('/find_idpw', 'Find ID/PW', 'width= 500px; height= 750px; left= 800;');
    });


});

