(function($){
	var Carousel = {

		imgList : [],
		imgWidth : 800,
		activeImg : 1,
		rollId : null,

		ini : function (imgList) {
			Carousel.imgList = imgList;
			// ini layout for html
			var imgLength = Carousel.imgList.length;
			var imgDemo = '';
			var itemDemo = '';
			var i = 0;
			while (i < imgLength) {
				imgDemo += '<li><a href="'+Carousel.imgList[i]['href']+'" style="background-image: url('+Carousel.imgList[i]['url']+')"></a></li>';
				itemDemo += '<li data-index="'+(i++)+'" class="transtion"></li>';
			}
			$('#carousel-img ul').append(imgDemo);
			$('#carousel-icon ul').append(itemDemo);
			// ini for set the first item
			$('#carousel-icon ul li:first-child').addClass('carousel-icon-active');
		},

		gotoFixed : function (index) {
			index = index < Carousel.imgList.length ? index: 0;
			Carousel.activeImg = ~~index+1;
			if (Modernizr.csstransforms) {
				$('#carousel-img ul').css({
					'-webkit-transform':'translateX('+(-(~~index*Carousel.imgWidth))+'px)',
					'transform':'translateX('+(-(~~index*Carousel.imgWidth))+'px)'
				});
				$('#carousel-icon ul li[data-index="'+index+'"]').addClass('carousel-icon-active').siblings().removeClass('carousel-icon-active');
			} else {
				$('#carousel-img ul').animate({'margin-left':-(~~index*Carousel.imgWidth)+'px'},500,function(){
					$('#carousel-icon ul li[data-index="'+index+'"]').addClass('carousel-icon-active').siblings().removeClass('carousel-icon-active');
				});
			}
		}
	}

	// ajax start for img
	var imgList = [
			{
				'url' : 'img/1.jpg',
				'href' : '***'
			},
			{
				'url' : 'img/2.jpg',
				'href' : '***'
			},
			{
				'url' : 'img/3.jpg',
				'href' : '***'
			},
			{
				'url' : 'img/4.jpg',
				'href' : '***'
			}
		];
	// ini carsusel
	Carousel.ini(imgList);
	Carousel.rollId = setInterval(function () {
		Carousel.gotoFixed(Carousel.activeImg);
	},2000);
	$('#carousel-icon').delegate('ul li','click',function(){
		Carousel.gotoFixed($(this).attr('data-index'));
	});
	$('#carousel').hover(function(){
		clearInterval(Carousel.rollId);
	},function(){
		Carousel.rollId = setInterval(function () {
			Carousel.gotoFixed(Carousel.activeImg);
		},2000);
	});
})(jQuery)