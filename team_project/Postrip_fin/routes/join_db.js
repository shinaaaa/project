const express = require('express');

/* models 모듈에서 User 모델을 호출하여 User 로 선언 */
var User = require('../models').User;

const multer = require('multer');
//파일 업로드 모듈

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter: function (req, file, callback) {
    if (file.mimetype.indexOf('image') === -1) {
      req.validateErr = '<script>alert("이미지 파일만 업로드 가능합니다."); history.go(-1);</script>';
      callback(null, false, new Error('이미지 파일만 업로드 가능합니다.'));
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@안녕 다시 업로드 해")
    } else {
      callback(null, true);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!안녕 업로드 성공")
    }
  }
});

const router = express.Router();

router.post('/', upload.single('img'), function (req, res) {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : " + (req.body.join_email).length);
  if (req.validateErr) {
    return res.send(req.validateErr);
  }/*  else if (!req.file) {
    return res.send('<script>alert("파일을 업로드 해주세요."); history.go(-1);</script>');
  }  */else {
    if (req.body.join_email && req.body.join_id && req.body.join_name && req.body.join_pw && req.body.year && req.body.month && req.body.day) {
      
      if ((req.body.join_name).length >= 20) {
        res.send("<script>alert('이름을 20자 이내로 입력해주세요.'); history.go(-1);</script>");
      } else if ((req.body.join_email).length  >= 20) {
        res.send("<script>alert('이메일을 20자 이내로 입력해주세요.'); history.go(-1);</script>");
      }  else if ((req.body.join_id).length  >= 20) {
        res.send("<script>alert('아이디를 20자 이내로 입력해주세요.'); history.go(-1);</script>");
      }  else if((req.body.join_pw).length >= 255) {
        return res.send('<script>alert("비밀번호를 255자 이내로 입력해주세요."); history.go(-1);</script>');
      } else {

      if (!req.body.join_email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)) {
        return res.send('<script>alert("이메일 형식에 맞지않습니다."); history.go(-1);</script>');
      } else if (!req.body.join_id.match(/^[0-9a-zA-Z]*$/i)) {
        return res.send('<script>alert("올바른 아이디 형식으로 입력해주세요."); history.go(-1);</script>');
      } else {
        if(!req.file) {
          if (pw_confirm()) {
            console.log("qweqweqwe : " + pw_confirm());
            if (id_confirm()) {
              if (email_confirm()) {
                User.create({
                  db_email: req.body.join_email,
                  db_id: req.body.join_id,
                  db_name: req.body.join_name,
                  db_pw: SHA256(req.body.join_pw),
                  db_birth: req.body.year + '-' + req.body.month + '-' + req.body.day,
                  db_image: "avatar.jpg",
                  db_count: 0,
                  db_time: Date.now()
                })
                  /* 회원가입 성공 */
                  .then((result) => {
                    console.log("result : " + result);
                    res.redirect('/');
                  })
                  /* 회원가입 실패 */
                  .catch((err) => {
                    console.error("err : User.create : " + err);
                    res.send('<script>alert("오류야 이놈아."); history.go(-1);</script>');
                  });
              }
            }
            console.log("qweqweqwe : id_confirm : " + id_confirm());
          }
        }else {
          if (pw_confirm()) {
            console.log("qweqweqwe : " + pw_confirm());
            if (id_confirm()) {
              if (email_confirm()) {
                User.create({
                  db_email: req.body.join_email,
                  db_id: req.body.join_id,
                  db_name: req.body.join_name,
                  db_pw: SHA256(req.body.join_pw),
                  db_birth: req.body.year + '-' + req.body.month + '-' + req.body.day,
                  db_image: req.file.filename,
                  db_count: 0,
                  db_time: Date.now()
                })
                  /* 회원가입 성공 */
                  .then((result) => {
                    console.log("result : " + result);
                    res.redirect('/');
                  })
                  /* 회원가입 실패 */
                  .catch((err) => {
                    console.error("err : User.create : " + err);
                    res.send('<script>alert("오류야 이놈아."); history.go(-1);</script>');
                  });
                }
                }
              }
            }
            console.log("qweqweqwe : id_confirm : " + id_confirm());
          }
        }
    } else if (!req.body.join_email) {
      res.send("<script>alert('이메일을 입력해주세요.'); history.go(-1);</script>");
    } else if (!req.body.join_id) {
      res.send("<script>alert('아이디를 입력해주세요.'); history.go(-1);</script>");
    } else if (!req.body.join_name) {
      res.send("<script>alert('이름을 입력해주세요.'); history.go(-1);</script>");
    } else if (!req.body.join_pw) {
      res.send("<script>alert('비밀번호를 입력해주세요.'); history.go(-1);</script>");
    } else if (!req.body.year || !req.body.month || !req.body.day) {
      res.send("<script>alert('생년월일을 입력해주세요.'); history.go(-1);</script>");
    }
  }

  /* 비밀번호 */

  function pw_confirm() {

    var pw = req.body.join_pw;
    var id = req.body.join_id;

    var pattern1 = /[0-9]/;
    var pattern2 = /[a-zA-Z]/;
    var pattern3 = /[~!@\#$%<>^&*]/;

    if (!pattern1.test(pw) || !pattern2.test(pw) || !pattern3.test(pw) || pw.length < 8 || pw.length > 50) {
      return res.send('<script>alert("영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다."); history.go(-1);</script>');
    }
    if (pw.indexOf(id) > -1) {
      return res.send('<script>alert("비밀번호는 ID를 포함할 수 없습니다."); history.go(-1);</script>');
    }
    var SamePass_0 = 0; //동일문자 카운트
    var SamePass_1 = 0; //연속성(+) 카운드
    var SamePass_2 = 0; //연속성(-) 카운드

    for (var i = 0; i < pw.length; i++) {
      var chr_pass_0;
      var chr_pass_1;
      var chr_pass_2;

      if (i >= 2) {
        chr_pass_0 = pw.charCodeAt(i - 2);
        chr_pass_1 = pw.charCodeAt(i - 1);
        chr_pass_2 = pw.charCodeAt(i);

        //동일문자 카운트
        if ((chr_pass_0 == chr_pass_1) && (chr_pass_1 == chr_pass_2)) {
          SamePass_0++;
        }
        else {
          SamePass_0 = 0;
        }

        //연속성(+) 카운드
        if (chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
          SamePass_1++;
        }
        else {
          SamePass_1 = 0;
        }

        //연속성(-) 카운드
        if (chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
          SamePass_2++;
        }
        else {
          SamePass_2 = 0;
        }
      } else if (SamePass_0 > 0) {
        res.send('<script>alert("동일문자를 3자 이상 연속 입력할 수 없습니다."); history.go(-1);</script>');
        return false;
      } else if (SamePass_1 > 0 || SamePass_2 > 0) {
        return res.send('<script>alert("영문, 숫자는 3자 이상 연속 입력할 수 없습니다."); history.go(-1);</script>');
      } else {
        return true;
      }
    }
  }

  function id_confirm() {
    var rs = false;
    return User.findAll({
      attributes: ['db_id'],
      where: {
        db_id: req.body.join_id,
      }
    }).then((result) => {
      if (result != "") {
        console.log("id_confirm : false : " + result);
        //res.end();
        rs = false;
        console.log("찍어본다 : " + rs);
        return rs;
      } else {
        console.log("id_confirm : true : " + result);
        //res.end();
        rs = true;
        console.log("찍어본다 : " + rs);
        return rs;
      }
    }).catch((err) => {
      console.error("err : " + err);
      res.redirect('/');
    });
  }

  function email_confirm() {
    var rs = false;
    return User.findAll({
      attributes: ['db_email'],
      where: {
        db_email: req.body.join_email,
      }
    }).then((result) => {
      if (result != "") {
        console.log("id_confirm : false : " + result);
        //res.end();
        rs = false;
        console.log("찍어본다 : " + rs);
        return rs;
      } else {
        console.log("id_confirm : true : " + result);
        //res.end();
        rs = true;
        console.log("찍어본다 : " + rs);
        return rs;
      }
    }).catch((err) => {
      console.error("err : " + err);
      res.redirect('/');
    });
  }

  function SHA256(s){
      
    var chrsz   = 8;
    var hexcase = 0;
  
    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
  
    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
  
    function core_sha256 (m, l) {
         
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
            0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
            0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
            0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
            0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
            0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
  
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
  
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
  
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
  
        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
  
            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
  
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
  
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
  
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }
  
    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }
  
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    }
  
    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }
  
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
  
  }
});

module.exports = router;
