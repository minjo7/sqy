$(function() {
  var TIMES = 539;
  var alarm1, alarm2;
  var t1 = TIMES, t2 = TIMES;
  var ac1 = $('#alarmClock1');
  var ac2 = $('#alarmClock2');
  var acBak1 = $('#acBak1');
  var acBak2 = $('#acBak2');
  var acBtn1 = $('#acBtn1');
  var acBtn2 = $('#acBtn2');
  var $t1 = $('#contTime1');
  var $t2 = $('#contTime2');
  var time1 = [];
  var time2 = [];
  var state1 = false;
  var state2 = false;

  acBtn1.on('click', function () {
    startAC1();
  });

  acBtn2.on('click', function () {
    startAC2();
  });

  var form1 = $('#form1');
  var form2 = $('#form2');
  var num = form1.find('[name="user_id"]').val();

  function completeEdit() {
    $t1.val(time1.join(','));
    $t2.val(time2.join(','));
    var param1 = form1.serializeArray();
    var param2 = form2.serializeArray();
    $.when($.post('/save2', param1), $.post('/save2', param2))
      .done(function () {
        location.replace('/thanks/' + num);
      });
  }

  function toMi(se) {
    // 大于一分钟
    if (se >= 60) {
      var m = Math.floor(se / 60);
      var s = se % 60;
      if (s<10) {
        s = '0' + s;
      }
      return m + ':' + s;
    } else {
      if (se < 10) {
        se = '0' + se;
      }
      return '0:' + se;
    }
  }
  function closeAC1() {
    if (!state1) {
      return;
    }
    state1 = false;
    window.clearInterval(alarm1);
    acBak1.slideDown();
  }

  function startAC1() {
    state1 = true;
    time1.push(t1);
    closeAC2();
    acBak1.slideUp();
    alarm1 = window.setInterval(function () {
      if (t1 > 0) {
        ac1.html('<i class="icon-time"></i> ' + toMi(t1));
        t1 -= 1;
        if (t1 < 180) {
          ac1.addClass('alert-error');
        }
      } else {
        acBtn1.remove();
        form1.find('textarea').attr('readonly', 'readonly');
        closeAC1();
        if (t2 === 0) {
          completeEdit();
        }
      }
    }, 1000);
  }

  function closeAC2() {
    if (!state2) {
      return;
    }
    state2 = false;
    window.clearInterval(alarm2);
    acBak2.slideDown();
  }

  function startAC2() {
    state2 = true;
    time2.push(t2);
    closeAC1();
    acBak2.slideUp();
    alarm2 = window.setInterval(function () {
      if (t2 > 0) {
        ac2.html('<i class="icon-time"></i> ' + toMi(t2));
        t2 -= 1;
        if (t2 < 180) {
          ac2.addClass('alert-error');
        }
      } else {
        acBtn2.remove();
        form2.find('textarea').attr('readonly', 'readonly');
        closeAC2();
        if (t1 === 0) {
          completeEdit();
        }
      }
    }, 1000);
  }

});