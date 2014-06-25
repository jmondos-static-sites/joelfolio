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



//Event handlers

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


//=== nav-overlay handler ===//
var $nav_overlay = $('.nav-overlay');

//check if 3d is supported, if so use it, else fallback to 2d.
var _closed = Modernizr.csstransforms3d ? "closed" : (function(){
  $nav_overlay.removeClass('closed').addClass('closed2d'); 
  return "closed2d";
})();

//Handlers
$('.hamburger-icon').click(function(){
  if(Modernizr.csstransforms3d){
    $nav_overlay.toggleClass(_closed);
  }
  else{
    $nav_overlay.toggleClass(_closed);
  }
});

$('.nav-close').click(function(){
  $nav_overlay.addClass(_closed);
});
//==== End of nav-overlay ====




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


//=== End of hamburger ===

// $document.scroll(function () {
//     if ($document.scrollTop() >= 300) {
//         $element.addClass(classNameOne);
//     } else if ($document.scrollTop() >= 600 && $document.scrollTop() < 600) ) {
//         $element.addClass(classNameTwo);
//     } else if ($document.scrollTop() >= 900 && $document.scrollTop() < 900)) {
//         $element.addClass(classNameThree);
//     } else if ($document.scrollTop() >= 1200 && $document.scrollTop() < 1200)) {
//         $element.addClass(classNameFour);
//     } else if ($document.scrollTop() >= 1500 && $document.scrollTop() < 1500)) {
//         $element.addClass(classNameFive);
//     } else if ($document.scrollTop() >= 1800 && $document.scrollTop() < 1800)) {
//         $element.addClass(classNameSix);
//     } else {

//     }
// });




if(typeof UTIL === "undefined") UTIL={};

UTIL.app={};
//Methods/vars for this app

//Merge these into 1 function, and make into module for nav widget
//yeah this needs to be taken out.
UTIL.app._attachNavWidgetHandlers = function($swipe_slides, $nav_widget){
  $('.nav-widget .next').click(function(){
      swipe.next();


      //This is all for the nav widget ehh
      var $curElem = $swipe_slides.filter('.active');
      var $nextElem = $curElem.next();
      var nextData = $nextElem.data('slide');

      var $bg, $next;

      if($nextElem.length){
          //update colour scheme
          $banner.addClass( nextData )
                 .removeClass($curElem.data('slide'));
          
          //change active slide
          $curElem.removeClass('active');
          $nextElem.addClass('active');



          //You can can't transition bg-gradients in css, unless you use opacity
          //This is the result
          $bg = $nav_widget.children('.bg-grad');
          $bg.not('.active').remove();

          $next = $('<div class="bg-grad op0" data-slide="'+ nextData + '"></div>');
          $bg.after($next);

          //$bg.addClass('op0');
          $bg.removeClass('active');
          $next.addClass('active')
          UTIL.timer(function(){
              $next.removeClass('op0');
          });
      }
  });

  $('.nav-widget .prev').click(function(){
      swipe.prev();

      var $curElem = $swipe_slides.filter('.active');
      var $prevElem = $curElem.prev();
      var prevData = $prevElem.data('slide');

      var $bg, $next;

      if($prevElem.length){
          //update colour scheme
          $banner.addClass( $prevElem.data('slide') )
                 .removeClass($curElem.data('slide'));
          
          //change active slide
          $curElem.removeClass('active');
          $prevElem.addClass('active');


          //You can can't transition bg-gradients in css, unless you use opacity
          //This is the result
          $bg = $nav_widget.children('.bg-grad');
          $bg.not('.active').remove();
          $prev = $('<div class="bg-grad op0 " data-slide="'+ prevData + '"></div>');
          $bg.after($prev);

          $bg.removeClass('active');
          $prev.addClass('active');

          UTIL.timer(function(){
              $prev.removeClass('op0');
          });
      }
  });
}


})();