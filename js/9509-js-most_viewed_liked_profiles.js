function loadMostViewedProfiles(type) {
  $.ajax({
    url: 'most_viewed_profiles.php?type=' + type,
    type: "GET",
    dataType: 'json',       
    success: function(data) {
      if (data.status == 200) {
        table_klass = "most_viewed_" + type;
        console.log('#' + table_klass + ' tbody');
        $('#' + table_klass + ' tbody').html("");

        $.each(data.result, function (i, f) {
          var profileUrl = f.profile_pic ? "images/profile/" + f.profile_pic : "images/no-image-available.png";
          birthdays_str = "<a class='todays_birthdays_a' href='/profile/" + f.profile_url + "'' target='_blank'><img class='todays_profile_pic' src='/" + profileUrl + "' /><span class='todays_festivals_name_viewed_liked'>" + f.name + "</span></a>";

          $('#' + table_klass + ' tbody').append('<tr><td>' + birthdays_str + '</td></tr>');
        });
        $('#' + table_klass).show();
      }
    }
  });    
}

function loadMostLikedProfiles(type) {
  $.ajax({
    url: 'most_liked_profiles.php?type=' + type,
    type: "GET",
    dataType: 'json',       
    success: function(data) {
      if (data.status == 200) {
        table_klass = "most_liked_" + type;
        $('#' + table_klass + ' tbody').html("");

        $.each(data.result, function (i, f) {
          var profileUrl = f.profile_pic ? "images/profile/" + f.profile_pic : "images/no-image-available.png";
          birthdays_str = "<a class='todays_birthdays_a' href='/profile/" + f.profile_url + "'' target='_blank'><img class='todays_profile_pic' src='/" + profileUrl + "' /><span class='todays_festivals_name_viewed_liked'>" + f.name + "</span></a>";

          $('#' + table_klass + ' tbody').append('<tr><td>' + birthdays_str + '</td></tr>');
        });
        $('#' + table_klass).show();
      }
    }
  });    
}

function loadTrendingProfiles(type) {
  $.ajax({
    url: 'trending_profiles.php?type=' + type,
    type: "GET",
    dataType: 'json',       
    success: function(data) {
      if (data.status == 200) {
        table_klass = "trending_" + type;
        $('#' + table_klass + ' tbody').html("");

        $.each(data.result, function (i, f) {
          var profileUrl = f.profile_pic ? "images/profile/" + f.profile_pic : "images/no-image-available.png";
          birthdays_str = "<a class='todays_birthdays_a' href='/profile/" + f.profile_url + "'' target='_blank'><img class='todays_profile_pic' src='/" + profileUrl + "' /><span class='todays_festivals_name_viewed_liked'>" + f.name + "</span></a>";

          $('#' + table_klass + ' tbody').append('<tr><td>' + birthdays_str + '</td></tr>');
        });
        $('#' + table_klass).show();
      }
    }
  });    
}