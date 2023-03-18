function openNav() {
  fetchUpcomingBirthdays();
}

function manageNav() {
  $("#float_fb_plugin").css("z-index", "unset");
  $(".sticky-container-home").css("z-index", "unset");
  $("#save-button-txt").css("z-index", "unset");
  $(".addthisevent-drop").css("z-index", "unset");
  $(".sticky-container").css("z-index", "unset");
  $(".closebtn").show();
  if($(window).width() < 767) {
    document.getElementById("mySidenav").style.width = "100%";
  } else {
    document.getElementById("mySidenav").style.width = "40%";
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  $(".closebtn").hide();
}

function fetchUpcomingBirthdays() {
  if (getCookie("JANMAT_SESSION_ID")) {
    $('#upcoming-birthdays-result-table').hide();
    $('.email-reminder-switch').hide();

    $.ajax({
      type: "GET",
      dataType: 'json',
      url: '/fetch_upcoming_birthdays.php',
      success: function(data) {
        if(data.message) {
          $('.message').text(data.message);
          $('.message').show();
        } else if (data.status == 200) {
          $('.message').text("");
          $('.message').hide();
          $('#upcoming-birthdays-result-table tbody').html("");
          $.each(data.result, function (i, row) {
            _shortUrl = row.short_url;
            _dob = "";
            if (row.english_dob) {
              _urlObj = new URL(_shortUrl);
              _shortUrl = _urlObj.protocol + "//" + _urlObj.hostname + "/output.html?bdate=" + encodeURIComponent(moment(row.english_dob).format("DD/MM/yyy")) + "&PAnth=0&time=" + encodeURIComponent(moment(row.english_dob).format("HH:mm:ss")) + "&year=" + row.for_year + "&name=" + row.name + "&tz=" + "GMT" + encodeURIComponent(moment().format("Z"));            
              _dob = moment(row.english_dob, "YYYY-MM-DD HH:mm:ss").format("DD MMM yyyy h:mm a");
            } 

            _indian_dob = moment(row.indian_dob, "YYYY-MM-DD").format("DD MMM YYYY");
            $('#upcoming-birthdays-result-table tbody').append('<tr><td><center>' + (i+1) + '<br/><i class="fa fa-trash" onclick="deleteUpcomingBirthday(' + row.id + ')"></i></center></td><td>' + row.name + ' ' + row.tithi + '</td><td>'  + _indian_dob + '</td><td>'  + row.masa + ', ' + row.paksha + ', ' + row.tithi + '</td><td>'  + _dob + '</td><td><a href="' + _shortUrl + '">Click Here</a></td></tr>');
          });
          $('#upcoming-birthdays-result-table').show();
        }
        manageNav();
      }
    });

    $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'get_email_reminder_flag.php',
      success: function(data) {
        console.log(data);
        if (data.status == 200) {
          $('#togBtn').prop('checked', data.data.flag == "1" ? true : false);
          $('.email-reminder-switch').show();
        }
      }  
    });

  } else {
    interceptLogin("CUSTOM_OPEN_NAV");
  }
}

function deleteUpcomingBirthday(id) {
  if(confirm ('Are you sure you want to Delete this birthday?')) {
    if (getCookie("JANMAT_SESSION_ID")) {
      $.ajax({
        type: "POST",
        dataType: 'json',
        processData: false,
        contentType: "application/x-www-form-urlencoded",
        url: '/update_upcoming_birthday.php',
        data: "id=" + id,
        success: function(data) {
          if(data.status == 200) {
            alert("Deleted Successfully!");      
            fetchUpcomingBirthdays();
          } else if (data.status == 401) {
            alert("To save your birthday securely on our site, Please sign-in with google at top right of this page and then click save again. Thanks!");
          }
        }
      });    
    } else {
      alert("Please sign-in to delete your birthday!");
    } 
  }
}

function storeUpcomingBirthday(shortUrl) {
  if (getCookie("JANMAT_SESSION_ID")) {
    shortUrl = shortUrl.split("#")[0];
    $('#save-shorturl-msg').hide();
    var formData = "shortUrl=" + encodeURIComponent(shortUrl);
    if ($('#inputBdate').text()) {
      formData += "&english_dob=" + moment($('#inputBdate').text(), "DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DD HH:mm:ss') + "&isInPast=" + moment($("#lunarJanmaTithiMap").text(), "DD/MM/YYYY").isBefore();
    }
    $.ajax({
      type: "POST",
      dataType: 'json',
      processData: false,
      contentType: "application/x-www-form-urlencoded",
      url: '/store_upcoming_birthday.php',
      data: formData,
      beforeSend: function() {
        $(".ajax_loader").show();
      },         
      complete:function(data){
        $(".ajax_loader").hide();
      },       
      success: function(data) {
        if(data.status == 200) {
          $('#save-shorturl-msg').text(data.message);
          $('#save-shorturl-msg').show();
          openNav();
        } else if (data.status == 401) {
          alert("To save your birthday securely on our site, Please sign-in with google at top right of this page and then click save again. Thanks!");
        }
      }
    });    
  } else {
    interceptLogin("CUSTOM_SAVE_BIRTHDAY");
  }  
}
