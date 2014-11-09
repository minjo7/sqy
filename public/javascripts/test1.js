$(function() {
  var TIMES = 899;
  var alarm1, alarm2;
  var t1 = TIMES, t2 = TIMES;
  var ac1 = $('#alarmClock1');
  var ac2 = $('#alarmClock2');
  var acBak1 = $('#acBak1');
  var acBak2 = $('#acBak2');
  var acBtn1 = $('#acBtn1');
  var acBtn2 = $('#acBtn2');

  acBtn1.on('click', function () {
    startAC1();
  });

  acBtn2.on('click', function () {
    startAC2();
  });
  var form1 = $('#form1');
  var form2 = $('#form2');
  $('#saveTest').on('click', function () {
    completeEdit();
  });

  function completeEdit() {
    $.when($.post('/save', form1.serializeArray()), $.post('/save', form2.serializeArray()))
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
    t1 = 0;
    acBak1.slideDown();
    saveForm(form1);
  }

  function startAC1() {
    acBak1.slideUp();
    acBtn1.remove();
    acBak2.removeClass('pending');
    alarm1 = window.setInterval(function () {
      if (t1 > 0) {
        ac1.html('<i class="icon-time"></i> ' + toMi(t1));
        t1 -= 1;
        if (t1 < 180) {
          ac1.addClass('alert-error');
        }
      } else {
        closeAC1();
      }
    }, 1000);
  }

  function closeAC2() {
    window.clearInterval(alarm2);
    t2 = 0;
    acBak2.slideDown();
  }

  function startAC2() {
    closeAC1();
    acBak2.slideUp();
    alarm2 = window.setInterval(function () {
      if (t2 > 0) {
        ac2.html('<i class="icon-time"></i> ' + toMi(t2));
        t2 -= 1;
        if (t2 === 180) {
          ac2.addClass('alert-error');
        }
      } else {
        closeAC2();
      }
    }, 1000);
  }
});