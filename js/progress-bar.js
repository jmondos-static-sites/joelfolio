var ProgressBar = (function(){
    /////////
    // Public: Anything inside this object is public
    ////////
    return {
        //=== Defaults ===//
        // Can be overwritten w/ optional create obj
        $ct: [],
        $imgs: [],
        length: 3,
        active: 1,

        //=== Always gets called by create ===//
        init: function(){
            //Runtime constructors right here
            this.length = this.$imgs.length;
            
            if(this.length){
                var str = this.buildDots();
                this._attachEventHandlers()
            }
        },

        //=====================
        // Dom & object methods 
        // Anything that works with the dom or modifies/needs access to [this] should go here.
        // These guys are on the prototype.
        //=====================
        buildDots: function(l, active){
            var str = _makeDots(l || this.length, active || this.active);
            this._appendDots(str);
        },
        _appendDots: function(str){
            this.$ct.html(str);
            this.$dots = this.$ct.children('.pdot');
        },
        updateActiveDot: function(i){
            this.$dots.filter('.active').removeClass('active');
            this.$dots.eq(i-1).addClass('active');
        },
        _attachEventHandlers: function(){
            var _this = this;

            //Click event for progress dots
            this.$ct.click(function(e){
                var $e = $(e.target), 
                    i;
                if( !$e.hasClass('active') && e.target !== _this.$ct.get(0) ){
                    i = $e.data('item');

                    //side-scroll images
                    swipe.scrollImages(i-1);

                    //update dots
                    _this.updateActiveDot(i);
                }
            });
        }
    }

    //====================
    // Module util methods
    // They don't access the dom or this, they have a defined return value.
    // Cached and fast
    //====================
    function _makeDots(num, active){
        var str="";
        for(var i = 0; i < num; i++) {
            str+= _generateDot(i+1, i === active-1 ? true : false )
        }
        return str;
    }
    function _generateDot(i, active){
        return '<i data-item="'+ i +'" class="pdot '+ (active ? "active" : "") +'"></i>';
    }

})();


