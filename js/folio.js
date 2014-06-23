(function(){



//This sorts out the navIcon lining up with the logo
var $w = $(window),
		$ham = $('.hamburger');

var topOfPage = true; //This guy saves the removeClass from running on erry scroll

$(window).scroll(function(e) {
	if($w.scrollTop() < 22){
		$ham.addClass('top-of-page');
		topOfPage = true;
	}
	else if(topOfPage){
		$ham.removeClass('top-of-page');
		topOfPage = false;
	} 
});



// Handles scrolling, include .smooth-scroll on element
// http://css-tricks.com/snippets/jquery/smooth-scrolling/
$('a.smooth-scroll[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
});

})();