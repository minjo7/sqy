$(function() {
  var type = $('#type').val();
  var duration = $('#duration').val();
  var timeset = $('#timeset').val();
  var TIMES = parseInt(duration) / 2 - 1;
  var TIMELEFT = parseInt(timeset) / (2==type?1:2);
  var alarm1, alarm2;
  var t1 = TIMES, t2 = TIMES, t3 = TIMES * 2 + 1;
  var ac1 = $('#alarmClock1');
  var ac2 = $('#alarmClock2');
  var acBak1 = $('#acBak1');
  var acBak2 = $('#acBak2');
  var acBtn1 = $('#acBtn1');
  var acBtn2 = $('#acBtn2');
  var btnSwitch = $('#btnSwitch');
  var btnNext = $('.navbar-nav-next ');
  var ask1 = false; var ask2 = false; var ask3 = false;
  var form1 = $('#form1');
  var form2 = $('#form2');

  btnSwitch.on('click', function (e) {
    if ($(e.target).hasClass('disabled'))
      return;
    switch (parseInt(btnSwitch.attr('status'))) {
      case 0:
        closeAC2();
        startAC1();
        btnSwitch.attr('status', 1);
        btnSwitch.html('문제 전환');
        break;
      case 1:
        closeAC1();
        startAC2();
        btnSwitch.attr('status', 0);
        break;
    } 
  });

  $('.form-percent input[name="guilty"], .form-percent input[name="not_guilty"]').change(function(e){
    var guilty = $(e.target).parent().parent().parent().find('input[name="guilty"]');
    var not_guilty = $(e.target).parent().parent().parent().find('input[name="not_guilty"]');
    var total = $(e.target).parent().parent().parent().find('input[name="total"]');
    total.val(parseInt(guilty.val()) + parseInt(not_guilty.val()));
    update_total_status(total);
  });

  function update_total_status(total){
    if (100 != total.val()) {
      total.removeClass('alert-success');
      total.addClass('alert-danger');
    } else {
      total.removeClass('alert-danger');
      total.addClass('alert-success');
    }
  }

  acBtn1.on('click', function () {
    startAC1();
  });

  acBtn2.on('click', function () {
    startAC2();
  });

  $('#saveTest').on('click', function () {
    completeEdit();
  });

  function completeEdit() {
    $.when($.post('/save1', form1.serializeArray()), $.post('/save1', form2.serializeArray()))
      .done(function () {
        location.replace('/thanks');
      });
  }

  function saveForm(form) {
    $.post('/save', form.serializeArray());
  }

  function toMi(se) {
    if (se >= 60) {
      var m = Math.floor(se / 60);
      var s = se % 60;
      if (s<10) {
        s = '0' + s;
      }
      return m + ':' + s;
    } else {
      if (se < 10) {
        s = ''
      }
      return '0:' + se;
    }
  }

  function closeAC1() {
    window.clearInterval(alarm1);
    //t1 = 0;
    //acBak1.slideDown();
    saveForm(form1);
    $('.question1').hide();
  }

  function startAC1() {
    if (2 != type)
      btnSwitch.addClass('disabled');
    $('.question1').show();
    //acBak1.slideUp();
    //acBtn1.remove();
    //acBak2.removeClass('pending');
    ac1.html('<span class="glyphicon glyphicon-time"></span> ' + toMi(2!=type?t1+1:t3+1));
    alarm1 = window.setInterval(function () {
      if ((2 != type && t1 >= 0) || (2 == type && t3 >= 0)) {
        ac1.html('<span class="glyphicon glyphicon-time"></span> ' + toMi(2!=type?t1:t3));
        if (2 != type) t1 -= 1;
        else t3 -= 1;
        if ((2 != type && t1 < TIMELEFT - 1) || (2 == type && t3 < TIMELEFT - 1)) {
          ac1.removeClass('alert-warning');
          ac1.addClass('alert-danger');
          if (2 != type ? !ask1 : !ask3) {
            alert(TIMELEFT / 60 + ' 분 남았습니다!');
            if (2 != type) ask1 = true;
            else ask3 = true;
          }
          if ('100' == form1.find('input[name="total"]').val()) {
            btnSwitch.removeClass('disabled');
          } else {
            if (2 != type)
              btnSwitch.addClass('disabled');
          }
          if ('100' == form1.find('input[name="total"]').val() &&
              2 == type && '100' == form2.find('input[name="total"]').val()) {
            btnNext.removeClass('disabled');
          }
        }
      } else {
        closeAC1();
        if ((2 != type && t2 > 0) || (2 == type && t3 > 0))
          startAC2();
        if (t3 < 0 && 2 == type || 2 != type) {
          btnSwitch.addClass('disabled');
          btnNext.removeClass('disabled');
        }
      }
    }, 1000);
  }

  function closeAC2() {
    window.clearInterval(alarm2);
    //t2 = 0;
    //form2.find('textarea').attr('readonly', 'readonly');
    //acBak2.slideDown();
    // $.post('/save1', form2.serializeArray()).done(function () {
    //   location.replace('/thanks/' + num);
    // });
    saveForm(form2);
    $('.question2').hide();
  }

  function startAC2() {
    $("html, body").animate({ scrollTop: 0 });
    if (2 != type)
      btnSwitch.addClass('disabled');
    $('.question1').hide();
    $('.question2').show();
    acBak2.slideUp();
    ac2.html('<span class="glyphicon glyphicon-time"></span> ' + toMi(2!=type?t2+1:t3+1));
    alarm2 = window.setInterval(function () {
      if ((2 != type && t2 >= 0) || (2 == type && t3 >= 0)) {
        ac2.html('<span class="glyphicon glyphicon-time"></span> ' + toMi(2!=type?t2:t3));
        if (2 != type) t2 -= 1;
        else t3 -= 1;
        if ((2 != type && t2 < TIMELEFT - 1) || (2 == type && t3 < TIMELEFT - 1)) {
          ac2.removeClass('alert-warning');
          ac2.addClass('alert-danger');
          if (2 != type ? !ask2 : !ask3) {
            alert(TIMELEFT / 60 + ' 분 남았습니다!');
            if (2 != type) ask2 = true;
            else ask3 = true;
          }
          if ('100' == form2.find('input[name="total"]').val() &&
              (2 != type || '100' == form1.find('input[name="total"]').val())) {
            btnNext.removeClass('disabled');
          } else {
            btnNext.addClass('disabled');
          }
        }
      } else {
        closeAC2();
        if (2 == type && t3 > 0)
          startAC1();
        if (t3 < 0 && 2 == type || 2 != type) {
          btnSwitch.addClass('disabled');
          btnNext.removeClass('disabled');
        }
      }
    }, 1000);
  }
});