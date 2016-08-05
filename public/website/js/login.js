$(function () {
  if(localStorage.getItem('userInfo')){
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo&&userInfo.user&&userInfo.hasOwnProperty('remeber')) {
      $("#userid").val(userInfo.user.userName);
      $("#pwd").val(userInfo.pwd);
      $("#login_ch").attr("checked", true);
    }
  }

  $('#userid').focus(function () {
    if ($('#userid').val() != null) {
      $('#clear1').show()
    }
  });


  $('#pwd').focus(function () {
    if ($('#pwd').val() != null) {
      $('#clear2').show()
    } else {
      $('#clear2').hide()
    }
  });

  $('#clear1').click(function () {
    $('#userid').val("");
  });
  $('#clear2').click(function () {
    $('#pwd').val("");
  });

  $('#login').click(function () {
    $('.bg_login').show();    $('.login_page').show();
  });
  $('.del').click(function () {
    $('.bg_login').hide();
    $('.login_page').hide()
  });

  $('#btn_Login').click(function () {
    if ($.trim($('#userid').val()) == '') {
      $('.prompt').html('请输入您的用户名');
      return false;
    } else if ($.trim($('#pwd').val()) == '') {
      $('.prompt').html('');
      $('.prompt1').html('请输入您的密码');
      return false;
    } else {
      $.post("/login/adminLogin.do", {
        userName: $.trim($('#userid').val()),
        password: $("#pwd").val()
      }, function (result) {
        console.log(result)
        if (result.c) {
          if ($("#login_ch").val()) {
            result.remeber = true;
          }
          result.pwd = $("#pwd").val();
          localStorage.setItem("userInfo", JSON.stringify(result));

          if (result.user.userRole == 'admin') {
            window.location = 'http://' + window.location.host + "/#/DataCenter/UserData";
          }
          if(result.user.userRole == 'advertiser') {
            window.location = 'http://' + window.location.host + "/#/AdvDataStatistics/AdvDataStatistics";
          }
          if(result.user.userRole == 'channel') {
            window.location = 'http://' + window.location.host + "/#/DataStatistics/DataStatistics";
          }

        } else {
          console.log("登录出错");
        }


      });
    }
  });

  $("#flushLoginValiCode1,#flushLoginValiCode2").click(function () {
    $("#loginImgCode").attr("src", "/handler/GetLoginCode.ashx?" + Math.random());
  });

})
