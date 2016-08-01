$(function(){
	var paper = Raphael('myRaphael', 1004, 800);//对id 为myRaphael 的元素里面绘制800 * 400 的画布

	// 通过 add 添加元素
	paper.add([
	    {
	        type: "circle",
	        cx: 100,
	        cy: 360,
	        r: 50
	    },
	    {
	        type: "rect",
	        x: 100,
	        y: 360,
	        width: 30,
	        height: 30,
	        fill: "#fc0"
	    }
	]);

	// 圆 回调函数 动画特效 elastic bounce backIn backOut > < <>
	// circle.attr({'fill':'#999','stroke':'#666'});//给圆形填充和边复制颜色
    var circle1=paper.circle(70, 70, 50).animate({
    	fill: "#0f9",
    	stroke: "#000",
    	"stroke-width": 40,
    	"stroke-opacity": 0.5}, 1200,'elastic',function(){console.log('圆动画完成')});

	// 文字
	// text.attr({"font-size":"30px","fill":"blue","stroke":"red","opacity":".5"});
	var text=paper.text(280,70,'HANGYANGWS').animate({
	'font-size':28,
	fill:'#0f9',
	"stroke-width": 4,
	stroke:'#000',
	'stroke-opacity':0.2},1200);

	// 点击
	text.click(function(){console.log('文字单击');});
	circle1.dblclick(function(){console.log('文字双击');});
	// circle1.click(function(){this.animate});

	// 矩形 拖拽 显示BOX
	var rect=paper.rect(420,40,70,70,10).animate({
		fill: '#0f9',
		stroke: '#666'
	},1200);
	rect.drag(
		function(){console.log('鼠标移动');},
		function(){console.log('鼠标开始');},
		function(){console.log('鼠标结束');}
		);
	// 获取元素的id值
	console.log('id is '+rect.id);
	console.log('matrix is '+rect.matrix);

	// 动画延迟 动画循环
	var anim = Raphael.animation({
		fill: '#0f9',
		stroke: '#666'
	},200).repeat(5);
	var rect2=paper.rect(500,40,70,70).animate(anim.delay(1000));

	// 椭圆
	var ellipse = paper.ellipse(650,70,50,20).animate({
		fill: '#0f9',
		stroke: '#666'
	},1200);
	console.log('椭圆的box');
	console.log(ellipse.getBBox(true).x+'----'+ellipse.getBBox(true).y);
	console.log(ellipse.getBBox(true).x2+'----'+ellipse.getBBox(true).y2);
	console.log(ellipse.getBBox(true).width+'----'+ellipse.getBBox(true).height);
	ellipse.node.onclick = function () {
		console.log('椭圆点击 node 获取节点 触发 onclick事件');
	}

	// 元素属性 data
	for (var i=0;i<5;i++) {
	    paper.circle(50 + 45 * i, 200, 50)
	         .attr({fill: "#000","fill-opacity": 0.5})
	         .data("i", i)
	         .click(function () {
	            console.log(this.data("i"));
	         });
	}

	// 路径
	var path = paper.path('M300 200L600 200C400 220 300 150 300 200S320 260 400 300H 500V 240');
	console.log('路径：'+path.getPointAtLength(600).x+"---"+path.getPointAtLength(200).y);
	console.log('路径全长：'+path.getTotalLength(600));
	path.glow({
				opacity: 0.5,
				color: '#f9c'
			});
	// translate 100, 100, rotate 45°, translate -100, 0
	// t代表移动 r旋转 s放缩
	path.transform("t20,-40r-10s0.5");

	// 便利每个元素
	paper.forEach(function (el) {
		el.animate({stroke:'#f00'},1000)
	});
});