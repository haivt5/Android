//---------Animation Scroll-----------
$(document).scroll(function() {
        	var scrollPos = $(window).scrollTop(),
            speed = 10000/$(document).height();
//        	$(".scroll").css("top", (0 + (scrollPos)-(scrollPos*speed)) + 'px');
//        	$(".tutorial").css("top", (0 -(scrollPos*0.07)) + 'px');
//        	$("#otherFood").css("top", (0 + (scrollPos)-(scrollPos*speed)) + 'px');
});
$("#btn-plus-search").click(function(){
    $('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 700);
    return false;
});

$('.navbar-collapse ul li a').on('click', function() {  
    $('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 500);
    return false;
});
//-------End Animation Scroll---------
