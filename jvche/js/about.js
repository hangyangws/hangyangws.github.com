$(function () {
	var wHeight;
	setHeight();
	function setHeight () {
		wHeight=$(window).height();
		if (wHeight<400) {
			$('.location').height(400);
		} else {
			$('.location').height(wHeight);
		}
	}
	$(window).resize(function(){
		setHeight();
	});
	// fadein
	$('.location-title').slideDown(400,function(){
		$(this).next().fadeIn(800);
	});
});