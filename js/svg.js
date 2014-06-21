/*
@svgjs
@version: 1.1
@author: Grant Kiely
@date: 21/6/14

Awesomeness
-Easy way to cache svg's
-Allows styling of svg
-Loads async

Todo
Perf-wise
-make just one queryselector call, slice to array and filter for each arr elem
    http://jsperf.com/find-children-vs-queryselectoral/3
-change innerHTML to doc fragment
    -First create a function that converts string to document fragment and test against inner
    http://jsperf.com/document-fragment-vs-innerhtml-vs-looped-appendchild
-Make it work in every browser and fallback to png for ie using image.vida.io?
http://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser
-Checkout <svg> <img /> </svg for fallback


//Instructions
-Get svg code & put in arr
-If you want to compress to one line: http://www.textfixer.com/html/compress-html-compression.php
    -Or open in devtools and it compresss to around 3 lines
-Create div: <div data-svg="svg_id_here"></div>
-Put script in head <script async="js/svg.js" async></script>
*/


(function(){

	var arr = [
        '<svg class="location-pin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="31px" viewBox="0 0 24 31" enable-background="new 0 0 24 31" xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" d="M12,0C5.373,0,0,5.206,0,11.625C0,18.045,12,31,12,31  s12-12.955,12-19.375C24,5.206,18.627,0,12,0z M20,11.625c0,4.28-3.582,7.75-8,7.75s-8-3.47-8-7.75s3.582-7.75,8-7.75  S20,7.346,20,11.625z"/></svg>'
	];
    var div = document.createElement('div');

    function init(){
        var list, ll, sel,
            l = arr.length;

        for(var i =0; i<l; i++){
            div.innerHTML = arr[i];
            sel = (div.firstChild.classList ?  div.firstChild.classList[0] : false) || div.firstChild.className.animVal;
            list = document.querySelectorAll('[data-svg="'+sel+'"]');
            ll = list.length;
            for(var j=0; j<ll; j++){
                list[j].appendChild(div.firstChild.cloneNode(true));
            }
        }
    }

    //Initialise
	var ready = document.readyState;
	if(ready === "complete" || ready ==="interactive"){
		init();
	}
	else{
        document.addEventListener("DOMContentLoaded", init);
    }
  	
})();