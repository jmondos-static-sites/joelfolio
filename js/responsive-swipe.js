//This is working but needs to be cleaned up
//We should not set maxImages or any of inside but have it set similar to progress-bar.js

var Swipe = (function(){
    var $w = $(window)
    var IMG_WIDTH = $w.width(),
    currentImg=0,
    maxImages=3,
    speed=500,
    imgs = [],
    pcval, testMobile = false;

    //if is mobile: use pixels, assume the viewport size is not going to change.
    //use % for desktop
    //Unfortunately % disables the touch swipe motion, look at fixing that
    //If there is no fix, work out way to account for resize on mobile.

    return {
        mobile : false,
        imgs:[],
        currentImg:0,
        req:{imgs:[]},
        onSwipeLeft: function(){},
        onSwipeRight: function(){},
        init: function init(){
            //=== runtime constructors ===//
            
            
            //Shouldn't need these 2
            imgs = this.imgs;
            // maxImages = this.maxImgs = this.imgs.length; 
            maxImages = this.imgs.length;


            pcval = !UTIL.isMobile;

            // testing flag to get desktop to behave like mobile
            // testMobile = true;
            if(UTIL.mobileFlag){
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
            currentImg = Math.max(currentImg-1, 0);
            if(pcval){
                scrollImages(currentImg, speed);
            }
            else{
                //pixel based
                scrollImages( IMG_WIDTH * currentImg, speed);
            }
        },
        next: function next(){
            currentImg = Math.min(currentImg+1, maxImages-1);
            
            if(pcval){
                scrollImages(currentImg, speed);
            }
            else{
                //pixel based
                scrollImages( IMG_WIDTH * currentImg, speed);
            }
        },
        removePointer: function($elem){
            $elem.css('pointer-events', 'none');
            return this;
        },
        scrollProgress: function(i){
            currentImg = Math.min(i-1, maxImages-1);
            if(pcval){
                scrollImages(i-1, speed);
            }
            else{
                //pixel based
                scrollImages( IMG_WIDTH * (i-1) , speed);
            }
            
        },
        scrollImages: scrollImages
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
                   scrollImages(currentImg, duration); 
                }
                else{
                    //pixel version
                    scrollImages((IMG_WIDTH * currentImg) + distance, duration);
                }
            }
            else if (direction == "right"){
                if(pcval){
                    scrollImages(currentImg, duration);
                }
                else{
                    //pixel version
                    scrollImages((IMG_WIDTH * currentImg) - distance, duration);
                }

            }
        }

        //Else, cancel means snap back to the begining
        else if ( phase == "cancel")
        {
            scrollImages(IMG_WIDTH * currentImg, speed);
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
        currentImg = Math.max(currentImg-1, 0);
        if(pcval){
            scrollImages(currentImg, speed);
        }
        else{
            //pixel based
            scrollImages( IMG_WIDTH * currentImg, speed);
        }
        swipe.onSwipeLeft();
    }

    function nextImage()
    {
        currentImg = Math.min(currentImg+1, maxImages-1);
        
        if(pcval){
            scrollImages(currentImg, speed);
        }
        else{
            //pixel based
            scrollImages( IMG_WIDTH * currentImg, speed);
        }
        swipe.onSwipeRight();
    }



    /**
     * Manually update the position of the imgs on drag
     */

     // Be careful modifying this, it is very touchy
    function scrollImages(distance, duration)
    {   
        var val;
        imgs.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");

        //inverse the number we set in the css
        if(pcval){
            value = (distance<0 ? "" : "-") + distance*100 + "%";
        }
        else{
            //pixel based
            var value = (distance<0 ? "" : "-") + Math.abs(distance) + "px";
        }
        //Render with smooth 3d, fallback to 2d
        if(Modernizr.csstransforms3d){
            imgs.css("-webkit-transform", "translate3d("+value +",0px,0px)");
            imgs.css("transform", "translate3d("+value +",0px,0px)");
        }
        else{
            imgs.css("-ms-transform", "translate("+value +",0px)");
            imgs.css("-webkit-transform", "translate("+value +",0px)");
            imgs.css("transform", "translate("+value +",0px)");
        }
    }

    function updateInternalVals(){
        IMG_WIDTH = $w.width();
    }

})();

