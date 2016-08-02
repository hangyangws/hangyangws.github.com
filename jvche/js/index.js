 $(function(){
	// public variable
	var realCenterHei=494;
	// ***************************************HEIGHT
	// initialize for height
	var winHeight=$(window).height();
	var winWidth=$(window).width();
	if (winHeight>494) {
		$('.extend').height(winHeight-144);
		$('.center-all').height(winHeight);
		realCenterHei=winHeight;
	} else {
		$('.extend').height(350);
		$('.center-all').height(494);
		realCenterHei=494;
	}
	// window.resize for height
	var upScrNum=0;
	$(window).resize(function(){
		// height
		winHeight=$(window).height();
		if (winHeight>494) {
			$('.extend').height(winHeight-144);
			$('.center-all').height(winHeight);
			realCenterHei=winHeight;
		} else {
			$('.extend').height(350);
			$('.center-all').height(494);
			realCenterHei=494;
		}
		// modify screen top
		$('body').scrollTop(upScrNum*realCenterHei);
	});
	// ***************************************DOT-COLOR
	// initialize color for extend
	$('body').animate({'scrollTop':0},100,function(){
		$('.witch-all').removeClass('witch-add');
		$('.witch-one').addClass('witch-add');
	});// at the beginning goto top
	// scroll
	$(window).scroll(function(){
		// hide or show for top
		if ($(document).scrollTop()>300) {
			$('#goTop').fadeIn(500);
		} else {
			$('#goTop').fadeOut(500);
		}
	});
	// mousewheel up or down
	var mousewheelFlag=1;// mousewheel can
	$('body').mousewheel(function(event, delta) {
		if (mousewheelFlag==1) {
			if (delta<1) {//dowm
				if (upScrNum<8) {
					upScrNum++;
					mousewheelFlag=0;
			 		switch(upScrNum) {
			 			case 0: exClick(0,'one','w');break;
			 			case 1: exClick(1,'two','w');break;
			 			case 2: exClick(2,'three','w');break;
			 			case 3: exClick(3,'four','w');break;
			 			case 4: exClick(4,'five','w');break;
			 			case 5: exClick(5,'six','w');break;
			 			case 6: exClick(6,'seven','w');break;
			 			case 7: exClick(7,'eight','w');break;
			 			case 8: exClick(8,'nine','w');break;
			 			default :break;
			 		}
				}
			} else {//up
				if (upScrNum>0) {
					upScrNum--;
					mousewheelFlag=0;
			 		switch(upScrNum) {
			 			case 0: exClick(0,'one','w');break;
			 			case 1: exClick(1,'two','w');break;
			 			case 2: exClick(2,'three','w');break;
			 			case 3: exClick(3,'four','w');break;
			 			case 4: exClick(4,'five','w');break;
			 			case 5: exClick(5,'six','w');break;
			 			case 6: exClick(6,'seven','w');break;
			 			case 7: exClick(7,'eight','w');break;
			 			case 8: exClick(8,'nine','w');break;
			 			default :break;
			 		}
				}
			}
		}
	});
	// keyup up or down
	$(document).keyup(function(event){
	    if(event.keyCode == 38){//向上
			if (upScrNum>0) {
				upScrNum--;
		 		switch(upScrNum) {
		 			case 0: exClick(0,'one');break;
		 			case 1: exClick(1,'two');break;
		 			case 2: exClick(2,'three');break;
		 			case 3: exClick(3,'four');break;
		 			case 4: exClick(4,'five');break;
		 			case 5: exClick(5,'six');break;
		 			case 6: exClick(6,'seven');break;
		 			case 7: exClick(7,'eight');break;
		 			case 8: exClick(8,'nine');break;
		 			default :break;
		 		}
			}
	    }else if (event.keyCode == 40){//向下
			if (upScrNum<8) {
				upScrNum++;
		 		switch(upScrNum) {
		 			case 0: exClick(0,'one');break;
		 			case 1: exClick(1,'two');break;
		 			case 2: exClick(2,'three');break;
		 			case 3: exClick(3,'four');break;
		 			case 4: exClick(4,'five');break;
		 			case 5: exClick(5,'six');break;
		 			case 6: exClick(6,'seven');break;
		 			case 7: exClick(7,'eight');break;
		 			case 8: exClick(8,'nine');break;
		 			default :break;
		 		}
			}
	    }
	});
 	// clicked by extendDot
 	$('.witch-all').click(function(){
 		switch($(this).attr('data')) {
 			case '1': exClick(0,'one');break;
 			case '2': exClick(1,'two');break;
 			case '3': exClick(2,'three');break;
 			case '4': exClick(3,'four');break;
 			case '5': exClick(4,'five');break;
 			case '6': exClick(5,'six');break;
 			case '7': exClick(6,'seven');break;
 			case '8': exClick(7,'eight');break;
 			case '9': exClick(8,'nine');break;
 			default :break;
 		}
 	});
	// goTop
	$('#goTop').click(function(){
		exClick(0,'one');
	});
	// public function
	var nowColor=1;
	var lineId,lineTime=0,fourClickAbled=1;
	var nineClickAbled=1;
	function exClick (whoNum,whoClass,comeFrom) {
		// all color disappre
		$('.witch-all').removeClass('witch-add');
		$('body').animate({'scrollTop':whoNum*realCenterHei},500,function(){//goto this
			upScrNum=whoNum;
			// excute animate for each page
	 		switch(whoNum) {
	 			case 0:
	 				iniColor();
	 				break;
	 			case 1:
		 			changeColor();
					$('.tD-image-l').fadeIn(500,function(){
						$(this).animate({'top':'35%'},300,function(){
							$(this).animate({'top':'50%'},250,function(){
								$(this).next().fadeIn(500,function(){
									$(this).animate({'top':'45%'},400,function(){
										$(this).animate({'top':'60%'},250,function(){
											$(this).animate({'top':'50%'},250,function(){
												$(this).animate({'top':'60%'},300);
											});
										});
									});
								});
								$(this).animate({'top':'40%'},200,function(){
									$(this).animate({'top':'50%'},150);
								});
							});
						});
					});
					break;
	 			case 2:
		 			iniColor();
					$('.three-car').stop().css('right','0').animate({'right':'55%'},2000,function(){
						$(this).animate({'bottom':'+=10'},200,function(){
							$(this).animate({'bottom':'-=5'},100,function(){
								$(this).animate({'bottom':'0'},100);
							});
						});
					});
		 			setInterval(lightThree,300);
					break;
	 			case 3:
		 			iniColor();
		 			if (fourClickAbled==1) {// if is clickable
		 				fourClickAbled=0;// can not click
		 				$('.fourAll,.fourION,.fourITW').css('display','none');
			 			lineFour();
			 			lineId=setInterval(lineFour,1200);
		 			}
		 			break;
	 			case 4:
	 				changeColor();
		 			break;
	 			case 5:
	 				iniColor();
	 				break;
	 			case 6:
		 			changeColor();
					starSeven();
		 			break;
	 			case 7:
		 			iniColor();
		 			break;
	 			case 8:
		 			changeColor();
		 			break;
	 			default :break;
	 		}
	 		// mousewheel can
			if (comeFrom=='w') {
				mousewheelFlag=1;
			}
		});
		// this colored
		$('.witch-'+whoClass).addClass('witch-add');
	}
	// light for three
	function lightThree () {
 		switch(nowColor) {
 			case 1:
 				$('.light-red').css({'background-color':'#999','box-shadow':'none'});
 				$('.light-green').css({'background-color':'#7be27b','box-shadow':'0px 0px 15px #7be27b'});
 				nowColor=2;
 				break;
 			case 2:
 				$('.light-green').css({'background-color':'#999','box-shadow':'none'});
 				$('.light-yellow').css({'background-color':'#f2eb2b','box-shadow':'0px 0px 15px #f2eb2b'});
 				nowColor=3;
 				break;
 			case 3:
 				$('.light-yellow').css({'background-color':'#999','box-shadow':'none'});
 				$('.light-red').css({'background-color':'#f80','box-shadow':'0px 0px 15px #f80'});
 				nowColor=1;
 				break;
 			default :break;
 		}
	}
	// line for four
	function lineFour () {
		$('.four1').fadeIn(100,function(){// lineone fadein
			$(this).children().fadeIn(100,function(){// linetwo fadein
				$(this).children().fadeIn(100,function(){// linethree fadein
	 				$(this).children().fadeIn(100,function(){// linefour fadein
	 					$(this).fadeOut(100,function(){
	 						$(this).parent().fadeOut(100,function(){
	 							$(this).parent().fadeOut(100,function(){
	 								$(this).parent().fadeOut(100,function(){
	 									$(this).fadeIn(100,function(){
	 										$(this).children().fadeIn(100,function(){
	 											$(this).children().fadeIn(100,function(){
	 												$(this).children().fadeIn(100,function(){
														if (++lineTime>2) {
															$('.fourION').show(300,function(){
																$(this).next().show(500,function(){
													 				$('.fourAll').css({
													 					'box-shadow':'0px 0px 10px rgba(45,45,45,0.1),0px 0px 10px rgba(45,45,45,0.1) inset'
													 				});
													 				fourClickAbled=1;
													 				clearInterval(lineId);
													 				lineTime=0;//star with the beginning
																});
															});
														}
	 												});
	 											});
	 										})
	 									});
	 								});
	 							});
	 						});
	 					});
	 				});
				});
			});
		});
	}
	// star for seven
	function starSeven () {
		var starRotate = function(){
			$('#sevenStarOne').hide(100,function(){
				$(this).next().fadeOut(200,function(){
					$(this).prev().fadeIn(200,function(){
						$(this).next().show(100);
					});
				});
			});
		}
		starRotate();
		setInterval(starRotate,800);
	}
	// change header bar color
	function iniColor () {
		// brand background-position
		$('.header-brand').css('background-position','0 0');
		// head nav color change
		$('.header-nav-each').css('color','rgba(255,255,255,0.8)');
		$('.car').css('color','#fff');
		$('.header-nav-each').hover(function(){
			$(this).css('color','#fff');
		},function(){
			$(this).css('color','rgba(255,255,255,0.8)');
		});
		// header bordrbottom
		$('header').css('border-bottom','1px solid rgba(255,255,255,0.2)');
	}
	function changeColor () {
		// brand background-position
		$('.header-brand').css('background-position','0 -72px');
		// head nav color change
		$('.header-nav-each').css('color','#666');
		$('.car').css('color','#444');
		$('.header-nav-each').hover(function(){
			$(this).css('color','#444');
		},function(){
			$(this).css('color','#666');
		});
		// header bordrbottom
		$('header').css('border-bottom','1px solid rgba(0,0,0,0.1)');
	}
});
