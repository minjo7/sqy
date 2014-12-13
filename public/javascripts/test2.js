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
  var count1 = $('#editTimes1');
  var count2 = $('#editTimes2');
  var c1 = 0;
  var c2 = 0;
  var time1 = [];
  var time2 = [];

  acBtn1.on('click', function () {
    startAC1();
  });

  acBtn2.on('click', function () {
    startAC2();
  });

  var form1 = $('#form1');
  var form2 = $('#form2');
  var num = form1.find('[name="user_id"]').val();
  $('#saveTest').on('click', function () {
    completeEdit();
  });
  function completeEdit() {
    $t1.val(time1.join(','));
    $t2.val(time2.join(','));
    count1.val(c1);
    count2.val(c2);
    $.when($.post('/save2', form1.serializeArray()), $.post('/save2', form2.serializeArray()))
      .done(function () {
        location.replace('/thanks/' + num);
      });
  }

  function saveForm(form) {
    $.post('/save2', form.serializeArray());
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
    time1.push('close: ' + toMi(t1));
    window.clearInterval(alarm1);
    acBak1.slideDown();
    saveForm(form1);
  }

  function startAC1() {
    c1 += 1;
    time1.push('open: ' + toMi(t1));
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
        form1.find('textarea').attr('readonly', 'readonly');
        closeAC1();
        if (t2 === 0) {
          completeEdit();
        }
      }
    }, 1000);
  }

  function closeAC2() {
    time2.push('close: ' + toMi(t2));
    window.clearInterval(alarm2);
    acBak2.slideDown();
    saveForm(form2);
  }

  function startAC2() {
    c2 += 1;
    time2.push('open: ' + toMi(t2));
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
        form2.find('textarea').attr('readonly', 'readonly');
        closeAC2();
        if (t1 === 0) {
          completeEdit();
        }
      }
    }, 1000);
  }

});