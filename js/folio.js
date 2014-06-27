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

$(window).scroll(function() {
	$('.banner-black-filter').css('opacity', function(){
		var $headerHeight = $(this).height();
		var transparency = ($headerHeight-$(window).scrollTop() )/$headerHeight;
		return 1 - transparency;
	});
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
		UTIL.timer(function hamgurgerSwitch(){
			if(!$nav_overlay.hasClass('closed')) {
				hamWasDark = true;
				ham.classList.remove('dark');
			}
		}, 200)

	}
	else if(hamWasDark){
		UTIL.timer(function hamgurgerSwitch(){
			if($nav_overlay.hasClass('closed')) {
				ham.classList.add('dark');
				hamWasDark = false;
			}
		}, 450);
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




//==== Filter button ====//
var $list = $('.filter-list'),
		$btn_ct = $('.btn-filter-ct'),
		$btn_filter = $('.btn-filter'),
		$list_elem = $('.list-elem');
$btn_filter.click(function(){
	$btn_ct.toggleClass('selected');
	// $list.slideToggle(250);
	$list.animate({
    height:"toggle",
    opacity:"toggle"
  });

});

var $close = $('.close-blue');

// $close.click(function(){
// 	var $this = $(this);
// 	$this.parent().addClass('grey-elem');
// 	$this.hide();
// });
var $elems = $('.work-collage .elem');


//hide x's for mobile
//added true for desktop flag
if(UTIL.isMobile || UTIL.mobileFlag || true){
	$close.hide();
	$list_elem.css('cursor', 'pointer')
}



$list_elem.click(function(e){
	var $e = $(e.target);
	var $this = $(this),
			filter = $this.data('filter'),
			$list = $elems.filter('[data-filter*="'+ filter + '"]');
	//orignal desktop version, added false flag
	if(!UTIL.isMobile && !UTIL.mobileFlag && false){
		if($this.hasClass('active-elem')){
			$this.removeClass('active-elem');
			$this.children('.close-blue').show();
			$list.removeClass('dark');
		}
		else if($e.hasClass('close-blue')){
			$this.addClass('active-elem');
			$e.hide();
			$list.addClass('dark');
		}
	}
	else{
		if($this.hasClass('active-elem')){
			$this.removeClass('active-elem');
			UTIL.$collage.isotope({ filter: '' });

			//If you want same filter system as desktop
			//some jsbossery right here, removes elem from filterList
			// var filterIndex; 
			// if( ~(filterIndex = filterList.indexOf(filter)) ){ 
			// 	filterList.splice(filterIndex, 1)
			// }
			
		}
		else{
			UTIL.$collage.isotope({ filter: '[data-filter*="'+ filter +'"]' });
			$list_elem.removeClass('active-elem');
			$this.addClass('active-elem');
			
		}
	}
});




//=== End of filter ====


})();
