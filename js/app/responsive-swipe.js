//This is working but needs to be cleaned up

var Swipe = (function(){
		var $w = $(window)
		var IMG_WIDTH = $w.width(),
		lastImg =0,
		currentImg=0,
		speed=500,
		imgs = [],
		imgList,
		$parent,
		pcval, testMobile = false;

		//if is mobile: use pixels, assume the viewport size is not going to change.
		//use % for desktop
		//Unfortunately % disables the touch swipe motion, look at fixing that
		//If there is no fix, work out way to account for resize on mobile.

		return {
				mobile : false,
				imgs:[],
				imgList: [], // list of names
				currentImg:0,
				$parent: [], // parent of slides
				req:{imgs:[]},
				onSwipeLeft: function(){},
				onSwipeRight: function(){},
				init: function init(){
						//=== runtime constructors ===//
						
						//Shouldn't need these 2
						imgs = this.imgs;
						maxImages = this.imgs.length;
						
						imgList = $.map(this.imgs, function(n, i){
							return $(n).data('slide');
						});
						$parent = this.imgs.parent();



						pcval = !UTIL.isMobile;

						// testing flag to get desktop to behave like mobile
						// testMobile = true;
						if(UTIL.mobileFlag || this.mobile){
								UTIL.isMobile = true
								pcval = false;
						}

						if(Modernizr.cssvwunit && UTIL.isMobile){
						//Init touch swipe
								imgs.swipe( {
										triggerOnTouchEnd : true,
										swipeStatus : swipeStatus,
										allowPageScroll:"vertical"
								});
						}
				},
				prev: function prev(){
					lastImg = currentImg;
					// currentImg = Math.max(currentImg-1, 0);
					currentImg = currentImg > 0 ? currentImg -1 : this.imgs.length -1;
					if(pcval){
							scrollImages2('right');
					}
					else{
							//pixel based
							scrollImages2( IMG_WIDTH * currentImg, speed);
					}
				},
				next: function next(){
					// non-infinite loop
					lastImg = currentImg;
					// currentImg = Math.min(currentImg+1, maxImages-1);
					currentImg = currentImg < this.imgs.length - 1 ? currentImg+1 : 0;
					if(pcval){
							scrollImages2('left');
					}
					else{
							//pixel based
							scrollImages2( IMG_WIDTH * currentImg, speed);
					}
				},
				removePointer: function($elem){
					$elem.css('pointer-events', 'none');
					return this;
				},
				prepImage: function(){
					//this.imgs.eq(currentImg);
				},
				scrollProgress: function(i){
						currentImg = Math.min(i-1, maxImages-1);
						if(pcval){
								scrollImages2(i-1, speed);
						}
						else{
								//pixel based
								scrollImages2( IMG_WIDTH * (i-1) , speed);
						}
						
				},
				scrollImages2: scrollImages2
		}

		/**
		* Catch each phase of the swipe.
		* move : we drag the div.
		* cancel : we animate back to where we were
		* end : we animate to the next image
		*/
		
		function swipeStatus(event, phase, direction, distance, fingers)
		{

				//If we are moving before swipe, and we are going L or R, then manually drag the images
				if( phase=="move" && (direction=="left" || direction=="right") )
				{
						var duration=0;
						if (direction == "left"){
								if(pcval){
									 scrollImages2(currentImg, duration); 
								}
								else{
										//pixel version
										scrollImages2((IMG_WIDTH * currentImg) + distance, duration);
								}
						}
						else if (direction == "right"){
								if(pcval){
										scrollImages2(currentImg, duration);
								}
								else{
										//pixel version
										scrollImages2((IMG_WIDTH * currentImg) - distance, duration);
								}

						}
				}

				//Else, cancel means snap back to the begining
				else if ( phase == "cancel")
				{
						scrollImages2(IMG_WIDTH * currentImg, speed);
				}

				//Else end means the swipe was completed, so move to the next image
				else if ( phase =="end" )
				{
						if (direction == "right")
								prevImage()
						else if (direction == "left")
								nextImage()
				}
		}

		function prevImage()
		{
				swipe.prev();
				swipe.onSwipeLeft();
		}

		function nextImage()
		{
				swipe.next();
				swipe.onSwipeRight();
		}



		/**
		 * Manually update the position of the imgs on drag
		 */

		 // This guy is the dom workhorse
		 // Be careful modifying this, it is very touchy
		function scrollImages(distance, duration)
		{   
				var value;
				imgs.css("-ms-transition-duration", (duration/1000).toFixed(1) + "s");
				imgs.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
				imgs.css("transition-duration", (duration/1000).toFixed(1) + "s");

				//inverse the number we set in the css
				if(pcval){
						value = (distance<0 ? "" : "-") + distance*100 + "%";
				}
				else{
						//pixel based
						value = (distance<0 ? "" : "-") + Math.abs(distance) + "px";
				}
				//Render with smooth 3d, fallback to 2d
				if(Modernizr.csstransforms3d){
						imgs.css("-ms-transform", "translate3d("+value +",0px,0px)");
						imgs.css("-webkit-transform", "translate3d("+value +",0px,0px)");
						imgs.css("transform", "translate3d("+value +",0px,0px)");
				}
				else{
						imgs.css("-ms-transform", "translate("+value +",0px)");
						imgs.css("-webkit-transform", "translate("+value +",0px)");
						imgs.css("transform", "translate("+value +",0px)");
				}
		}

		//The power of sass
		function scrollImages2(dir){
			
			dir == "left" ? $parent.removeAttr('data-pre-trans-right') : $parent.removeAttr('data-pre-trans-left');
			$parent.attr('data-pre-trans-' + dir, imgList[lastImg]);
			//dir == "left" ? $parent.removeAttr('data-trans-right') : $parent.removeAttr('data-trans-left');
			$parent.removeAttr('data-trans-left');
			$parent.removeAttr('data-trans-right');

			setTimeout(function(){
				$parent.attr('data-trans-' + dir, imgList[lastImg]);
			})
		}

		function updateInternalVals(){
				IMG_WIDTH = $w.width();
		}
		//
})();




// Instead of moving/removing dom elems, lets do a virtual tracker and consistently update transforms
// 