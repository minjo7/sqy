$(function() {
  var duration = $('#duration').val();
  var timeset = $('#timeset').val();
  var TIMES = parseInt(duration) / 2 - 1;
  var TIMELEFT = parseInt(timeset) / 2;
  var alarm1, alarm2;
  var t1 = TIMES, t2 = TIMES;
  var ac1 = $('#alarmClock1');
  var ac2 = $('#alarmClock2');
  var acBak1 = $('#acBak1');
  var acBak2 = $('#acBak2');
  var acBtn1 = $('#acBtn1');
  var acBtn2 = $('#acBtn2');
  var btnSwitch = $('#btnSwitch');
  var btnNext = $('.navbar-nav-next ');
  var ask1 = false; var ask2 = false;
  var form1 = $('#form1');
  var form2 = $('#form2');

  btnSwitch.on('click', function (e) {
    if ($(e.target).hasClass('disabled'))
      return;
    switch (parseInt(btnSwitch.attr('status'))) {
      case 0:
        startAC1();
        btnSwitch.addClass('disabled');
        btnSwitch.attr('status', 1);
        break;
      case 1:
        startAC2();
        btnSwitch.attr('status', 2);
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
    t1 = 0;
    //acBak1.slideDown();
    saveForm(form1);
    $('.question1').hide();
    startAC2();
  }

  function startAC1() {
    $('.question1').show();
    //acBak1.slideUp();
    acBtn1.remove();
    //acBak2.removeClass('pending');
    alarm1 = window.setInterval(function () {
      if (t1 >= 0) {
        ac1.html('<span class="glyphicon glyphicon-time"></span> ' + toMi(t1));
        t1 -= 1;
        if (t1 < TIMELEFT - 1) {
          ac1.removeClass('alert-warning');
          ac1.addClass('alert-danger');
          if (!ask1) {
            alert(TIMELEFT / 60 + ' 분 남았습니다!');
            ask1 = true;
          }
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
    //acBak2.slideDown();
    // $.post('/save1', form2.serializeArray()).done(function () {
    //   location.replace('/thanks/' + num);
    // });
    saveForm(form2);
    $('.question2').hide();
    btnNext.removeClass('disabled');
  }

  function startAC2() {
    $("html, body").animate({ scrollTop: 0 });
    $('.question1').hide();
    $('.question2').show();
    acBak2.slideUp();
    alarm2 = window.setInterval(function () {
      if (t2 >= 0) {
        ac2.html('<span class="glyphicon glyphicon-time"></span> ' + toMi(t2));
        t2 -= 1;
        if (t2 < TIMELEFT - 1) {
          ac2.removeClass('alert-warning');
          ac2.addClass('alert-danger');
          if (!ask2) {
            alert(TIMELEFT / 60 + ' 분 남았습니다!');
            ask2 = true;
          }
        }
      } else {
        closeAC2(true);
        btnNext.removeClass('disabled');
      }
    }, 1000);
  }
});