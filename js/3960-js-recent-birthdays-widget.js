function loadRecentBirthdays() {
  if (getCookie("JANMAT_SESSION_ID")) {
    $('.recent-birthdays-widget').show();
    $('.bannerHeadText').hide();

    $.ajax({
      url: 'fetch_recent_birthdays.php',
      type: "GET",
      dataType: 'json',       
      beforeSend: function() {
        $(".ajax_loader_recent_birthdays").show();
      },         
      complete:function(data) {
        $(".ajax_loader_recent_birthdays").hide();
      }, 
      success: function(data) {
        if (data.status == 200 && !data.message) {
          $('.recent-birthdays-data').html("");
          var list = $('<ul/>').appendTo('.recent-birthdays-data');
          if (data.result.before) {
            renderBirthday(list, data.result.before.birthdays[0]);
          }
          if (data.result.on) {
            $.each(data.result.on.birthdays, function( index, value ) {
              renderBirthday(list, value);  
            });
          }
          if (data.result.after) {
            renderBirthday(list, data.result.after.birthdays[0]);  
          }
        } else {
          $('.recent-birthdays-widget').hide();
          $('.bannerHeadText').show();
        }
        $('.recent-birthdays-widget-details').show();
      }
    });    
  }
}

function renderBirthday(list, bday) {
  var dayStr = moment(bday.indian_dob, "YYYY-MM-DD").calendar();
  if (dayStr.includes("Yesterday")) {
    dayStr = "Yesterday";
  } else if (dayStr.includes("Today")) {
    dayStr = "Today";
  } else {
    dayStr = moment(bday.indian_dob, "YYYY-MM-DD").fromNow();
  }
  list.append('<li><a target="_blank" href="' + bday.short_url + '">' + bday.name + ' ' + bday.tithi + '</a>, ' + dayStr + ' on ' + moment(bday.indian_dob, "YYYY-MM-DD").format("MMMM Do") + '</li>');  
}