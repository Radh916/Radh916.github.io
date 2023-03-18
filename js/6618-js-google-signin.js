function Google_signIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var jsonProfile = {};
  jsonProfile["Eea"] = profile.getId();
  jsonProfile["U3"] = profile.getEmail();
  jsonProfile["ig"] = profile.getName();
  jsonProfile["Paa"] = profile.getImageUrl();
  update_user_data(jsonProfile);
}   

function Google_signInError() {
  removeLoginInterceptCookies();
}

function update_user_data(response) {
  $.ajax({
    type: "POST",
    dataType: 'json',
    data: response,
    url: '/check_user.php',
    success: function(msg) {
      if(msg.error == 1) {
        console.log('Something Went Wrong!');
      } else {
        if (msg.Eea) {
          setCookie("JANMAT_SESSION_ID", msg.Eea, 1);
          setCookie("JANMAT_USER_NAME", msg.ig, 1);
          manageSessionForLogin();
          manageLoginInterceptions();
        }
      }
    }
  });
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name+'=; Path=/; Max-Age=-99999999;';  
}    

function interceptLogin(cookieName) {
  setCookie(cookieName, "true", 1);
  $('.abcRioButtonIcon').click();
}

function manageSessionForLogin() {
  var userName = getCookie("JANMAT_USER_NAME");
  if (userName) {
    $(".g-signin2").hide();
    $(".login-message").show();
    $("#logged-in-user-name").text(userName);        
  }
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();
  auth2.signOut().then(function () {
    eraseCookie("JANMAT_USER_NAME");
    eraseCookie("JANMAT_SESSION_ID");
    removeLoginInterceptCookies();
    location.reload();
  });
}

function manageLoginInterceptions() {
  if (getCookie("CUSTOM_OPEN_NAV") == "true") {
    openNav();
  } else if (getCookie("CUSTOM_SAVE_BIRTHDAY") == "true") {
    storeUpcomingBirthday(document.getElementById('shortUrl').value);
  } else if (getCookie("CUSTOM_PERSONALITY_BIRTHDAY") == "true") {
    submitCall();
  } else if (getCookie("CUSTOM_PERSONALITY_BIRTHDAY_PAGE") == "true") {
    loadReferredBirthdays(); 
  }
  
  if (typeof loadRecentBirthdays !== 'undefined') {
    loadRecentBirthdays();
  }

  removeLoginInterceptCookies();
}

function removeLoginInterceptCookies() {
  eraseCookie("CUSTOM_OPEN_NAV");
  eraseCookie("CUSTOM_SAVE_BIRTHDAY");
  eraseCookie("CUSTOM_PERSONALITY_BIRTHDAY");
  eraseCookie("CUSTOM_PERSONALITY_BIRTHDAY_PAGE");
}
