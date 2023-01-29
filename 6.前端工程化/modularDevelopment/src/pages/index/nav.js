import 'flexslider';

//	导航固定顶部
$(function(){
	$(window).scroll(function(){
		var ws=$(window).scrollTop();
		if(ws>60){
			$(".head").addClass("ding").css({"background":"rgba(255,255,255,"+ws/300+")"});
		}else{
			$(".head").removeClass("ding").css({"background":"#fff"});
		}
	});
})

$(function() {
	$('#home_slider').flexslider({
		animation: 'slide',
		controlNav: true,
		directionNav: true,
		animationLoop: true,
		slideshow: true,
		slideshowSpeed:2000,
		useCSS: false
	});

});
