$(document).ready(function() {
  $('#togBtn').change(function() {
	  $.ajax({
	    type: "GET",
	    processData: false,
	    url: 'update_email_reminder_flag.php',
	    data: "flag=" + this.checked,
	    success: function(data) {
	      if (data.status == 200) {
	      	console.log(data.message);
	      }
	    }
	  });  	
  });
});