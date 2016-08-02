$(function(){
	$('#menu-sel,#sel-extend').click(function(){
		$(this).next().stop().slideToggle(300);
	});
});