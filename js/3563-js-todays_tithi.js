function loadTodaysDetail() {
  $.ajax({
    url: 'todays_tithi.php',
    type: "GET",
    dataType: 'json',
    data: { 
      bdate: moment().format("DD/MM/yyyy"), 
      time: moment().format("HH:mm:ss"),
      tz: "GMT" + moment().format("Z")
    },       
    beforeSend: function() {
      $(".ajax_loader").show();
    },         
    complete:function(data){
      $(".ajax_loader").hide();
    }, 
    success: function(data) {
      if (data.status == 200) {
        today = jQuery.parseJSON(data.result.today);
        festivals_str = "";
        $.each(data.result.festivals, function (i, f) {    
          var profileUrl = f.profile_pic ? "images/profile/" + f.profile_pic : "images/no-image-available.png";
          festivals_str = festivals_str.concat("<a class='todays_festivals_a' href='/festivals/" + f.profile_url + "'' target='_blank'><img class='todays_profile_pic' src='" + profileUrl + "' /><span class='todays_festivals_name'>" + f.name + "</span></a>" + (((i + 1) != data.result.festivals.length) ? " | " : ""));
        });
        birthdays_str = "";
        $.each(data.result.birthdays, function (i, f) {    
          var profileUrl = f.profile_pic ? "images/profile/" + f.profile_pic : "images/no-image-available.png";
          birthdays_str = birthdays_str.concat("<a class='todays_birthdays_a' href='/profile/" + f.profile_url + "'' target='_blank'><img class='todays_profile_pic' src='/" + profileUrl + "' /><span class='todays_festivals_name'>" + f.name + "</span></a>" + (((i + 1) != data.result.birthdays.length) ? " | " : ""));
        });

        $('#today_date').html(moment().format("dddd, MMMM Do YYYY, HH:mm:ss Z"));
        $('#today_tithi').html(today.lunarJanmaMonTithi);
        $('#today_nakshatra').html(today.birthNakshatra);
        if (festivals_str) {
          $('#today_festivals').html(festivals_str);
          if (data.result.nearby_festivals) {
            var cache = $('#t_festivals').children();
            $('#t_festivals').text("Upcoming Festivals in " + data.result.nearby_festivals_days + " days ").append(cache);
          }
          $('#t_festivals').show();
        }
        if (birthdays_str) {
          $('#today_birthdays').html(birthdays_str);
          if (data.result.nearby_birthdays) {
            var cache = $('#t_birthdays').children();
            $('#t_birthdays').text("Upcoming Birthdays in " + data.result.nearby_birthdays_days + " days ").append(cache);
          }
          $('#t_birthdays').show();
        }
        $("#today_tithi_timing_starts").text(today.starts2);
        $("#today_tithi_timing_ends").text(today.ends2);
        $("#today_lunar_month").text(today.lunarJanmaMonth);
        $("#today_lunar_month_begins").text(today.lunarPaushBegins2);
        $("#today_sunrise").text(today.sunRise2);
        $("#today_nakshatra_starts").text(today.nakshatraStarts2);
        $("#today_nakshatra_ends").text(today.nakshatraEnds2);

        current_time = moment().format("HH:mm:ss");
        sunrise_time = data.result.sunrise_at;

        $("#current_time_link").attr("href", "/output.html?bdate=" + encodeURIComponent(moment().format("DD/MM/yyyy")) + "&PAnth=0&time=" + encodeURIComponent(current_time) + "&year=" + encodeURIComponent(moment().format("yyyy")) + "&name=&tz=GMT" + encodeURIComponent(moment().format("Z")));
        $("#sunrise_link").attr("href", "/output.html?bdate=" + encodeURIComponent(moment().format("DD/MM/yyyy")) + "&PAnth=0&time=" + encodeURIComponent(sunrise_time) + "&year=" + encodeURIComponent(moment().format("yyyy")) + "&name=&tz=GMT" + encodeURIComponent(moment().format("Z")));        

        $(".cal_short_url").attr("href", data.result.cal_short_url);
        $(".monthly-calendar").attr("onclick", "window.open('" + data.result.cal_short_url + "', '_blank');");
        $(".queryCount").text(Number(data.result.query_count).toLocaleString());
        $('.todays-details').show();
      } else if (data.status == 500) {
      }
    }
  });
}

function loadTodaysDetailForCalendar() {
  $.ajax({
    url: 'todays_tithi.php',
    type: "GET",
    dataType: 'json',
    data: { 
      bdate: moment().format("DD/MM/yyyy"), 
      time: moment().format("HH:mm:ss"),
      tz: "GMT" + moment().format("Z")
    },       
    beforeSend: function() {
      $(".ajax_loader").show();
    }, 
    success: function(data) {
      if (data.status == 200) {
        today = jQuery.parseJSON(data.result.today);
        $('#masa option:contains("' + today.lunarJanmaMonth + '")').prop('selected', true);
        getCalendarData();
      } else if (data.status == 500) {
      }
    }
  });
}
