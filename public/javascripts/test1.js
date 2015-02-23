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
    $.when($.post('/save1', form1.serializeArray()), $.post('/save1', form2.serializeArray()))
      .done(function () {
        location.replace('/thanks');
      });
  }

  function saveForm(form) {
    $.post('/save1', form.serializeArray());
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
    form1.find('textarea').attr('readonly', 'readonly');
    acBak1.slideDown();
    saveForm(form1);
    startAC2();
  }

  function startAC1() {
    acBak1.slideUp();
    acBtn1.remove();
    acBak2.removeClass('pending');
    alarm1 = window.setInterval(function () {
      if (t1 > 0) {
        ac1.html('<span class="glyphicon glyphicon-time"></span> ' + toMi(t1));
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
    form2.find('textarea').attr('readonly', 'readonly');
    acBak2.slideDown();
    $.post('/save1', form2.serializeArray()).done(function () {
      location.replace('/thanks/' + num);
    });
  }

  function startAC2() {
    acBak2.slideUp();
    alarm2 = window.setInterval(function () {
      if (t2 > 0) {
        ac2.html('<span class="glyphicon glyphicon-time"></span> ' + toMi(t2));
        t2 -= 1;
        if (t2 < 180) {
          ac2.addClass('alert-error');
        }
      } else {
        closeAC2(true);
      }
    }, 1000);
  }
});