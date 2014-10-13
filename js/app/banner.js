var Banner = (function(){
  
  return{
    //default
    $banner:[],
    $slides:[],

    req:{
      $banner:{
        test: function(banner){return banner.length > 0}, 
        msg: function(banner){return banner.selector + ' returned 0 nodes.' }
      },
      $slides:[]
    },
    init: function(){
    },
    //next and prev could be taken out & just ref update
    next: function(){
      var $curElem =  this.$slides.filter('.active'),
          $nextElem = $curElem.next(),
          nextData = $nextElem.data('slide');

      if($nextElem.length){
        //update colour scheme
        this.$banner.attr('class', 'case-wrapper '+ nextData);
        // this.$banner.addClass( nextData )
        //     .removeClass($curElem.data('slide'));
        
        //change active slide
        $curElem.removeClass('active');
        $nextElem.addClass('active');
      }
    },
    prev: function(){
      var $curElem = this.$slides.filter('.active'),
          $prevElem = $curElem.prev(),
          prevData = $prevElem.data('slide');

      if($prevElem.length){
          //update colour scheme
          this.$banner.attr('class', 'case-wrapper '+ prevData);
          
          //change active slide
          $curElem.removeClass('active');
          $prevElem.addClass('active');
        }
    },
    update: function(i){
      var $curElem =  this.$slides.filter('.active'),
          $newElem = this.$slides.eq(i-1);
          
      this.$banner.attr('class', 'case-wrapper '+ $newElem.data('slide'));
      // this.$banner.addClass( $newElem.data('slide') )
      //             .removeClass( $curElem.data('slide') );

      //change active slide
      $curElem.removeClass('active');
      $newElem.addClass('active');      
    }
  }
})();