$(window).load(function(){
    $("#check-search").val("on");
    $('.preloader').remove();
});
var slideHeight = $(window).height();
//Page home
$('#home-slider .item').css('height',slideHeight);

$(window).resize(function(){'use strict',
    slideHeight = $(window).height();
	$('#home-slider .item').css('height',slideHeight);
});
//Page Detail
var slideHeightDetail = $(document).height();
$('#backgroud').css('height',slideHeightDetail);

$(window).resize(function(){'use strict',
    slideHeightDetail = $(window).height();
	$('#backgroud').css('height',slideHeightDetail);
});
