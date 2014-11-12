var jQuery = require('jquery');
window.$ = window.jQuery = jQuery;
require('bootstrap/dist/js/bootstrap');

require('./drive');

jQuery(function($){
	$window  = $(window);
	$main 	 = $("#main");
	$btnAuth = $("#button-auth");
});

function startDrive(){
	$.fn.drive({
		clientID : '923878780163-p8cpsqof7qr2di5j8gomvqaai15bgnuc.apps.googleusercontent.com',
		scopes : ['https://www.googleapis.com/auth/drive.readonly',
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile']
	});

	$(window).on("drive:authentificated", function(_e, _authResult){
        $("#login").remove();
        $("nav").show();
        $.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+_authResult.access_token, function(_data){
            $profile = 
                "<div id='profile' class='dropdown'>"
                  + "<button class='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown'>"
                  + " <img src='"+_data.picture+"' height='48' width='48'>"
                    + _data.name
                    + "<span class='caret'></span>"
                  + "</button>"
                  + "<ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'>"
                    + "<li><a role='menuitem' tabindex='-1' href='https://accounts.google.com/logout'>Log out</a></li>"
                  + "</ul>"
                + "</div>";
            $("nav").append($profile);
        });
	})

	$(".button-add-link")
		.popover({
			"placement": "bottom"
		})
		.on("click", function(){
			console.log("addLink")
		})
}

window.startDrive = startDrive;