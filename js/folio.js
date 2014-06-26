(function(){
//This sorts out the navIcon lining up with the logo
// var $w = $(window),
// 		$ham = $('.hamburger-icon');

// var topOfPage = true; //This guy saves the removeClass from running on erry scroll

// $(window).scroll(function(e) {
// 	if($w.scrollTop() < 22){
// 		$ham.addClass('top-of-page');
// 		topOfPage = true;
// 	}
// 	else if(topOfPage){
// 		$ham.removeClass('top-of-page');
// 		topOfPage = false;
// 	} 
// });





//////// Event handlers ////////


//=== Hamburger change colour on scroll ===//
//=== classList for perf win
var $document = $(document),
		$banner = $('.banner');

var ham = document.getElementsByClassName('hamburger-icon')[0];
$document.scroll(function(){
	if ($document.scrollTop() >= $banner.height() - 76) {
		if(!ham.classList.contains('dark'))
			ham.classList.add('dark')
	}
	else{
		if(ham.classList.contains('dark'))
			ham.classList.remove('dark');
	}
});
//=== End of hamburger scroller ===



// Handles smooth scrolling to a #element, 
// include .smooth-scroll on click element and href="#targetElem"
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



//====== nav-overlay handler =======
var $nav_overlay = $('.nav-overlay'),
		hamWasDark = false;

//Fixes occasional issue of css parsing element nd showing it before it's translated
UTIL.timer(function(){
	$nav_overlay.removeClass('hide');
}, 600);

//check if 3d is supported, if so use it, else fallback to 2d.
var _closed = Modernizr.csstransforms3d ? "closed" : (function(){
	$nav_overlay.removeClass('closed').addClass('closed2d'); 
	return "closed2d";
})();


function updateHamburger(){
	if(ham.classList.contains('dark')){
		hamWasDark = true;
		ham.classList.remove('dark');
	}
	else if(hamWasDark){
		ham.classList.add('dark');
		hamWasDark = false;
	}
}

//Handers for nav
$('.hamburger-icon').click(function(){
	$nav_overlay.toggleClass(_closed)
	.promise()
	.done(updateHamburger);
});

$('.nav-close').click(function(){
	$nav_overlay.addClass(_closed);
});



//==== End of nav-overlay ====






if(typeof UTIL === "undefined") UTIL={};

UTIL.app={};
//Methods/vars for this app

//Merge these into 1 function, and make into module for nav widget
//yeah this needs to be taken out.


})();