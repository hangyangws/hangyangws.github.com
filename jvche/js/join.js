$(function () {
	var wHeight;
	setHeight();
	function setHeight () {
		wHeight=$(window).height();
		if (wHeight<400) {
			$('.title').height(400);
		} else {
			$('.title').height(wHeight);
		}
	}
	$(window).resize(function(){
		setHeight();
	});
	// fadein
	$('.location-title').fadeIn(400,function(){
		$(this).animate({'bottom':'-20px'},150,function(){
			$(this).animate({'bottom':'0'},150);
		});
		$(this).next().slideDown(400);
	});
	function Position () {
		var describe;
		var duty;
		var name;
		this.show = function (){
			// remove
			$('#describe>li').remove();
			$('#duty>li').remove();
			// set
			$('#position_name').html(this.name);
			for (var i = 0; i < this.describe.length; i++) {
				$('#describe').append('<li>'+this.describe[i]+'</li>');
			}
			for (var i = 0; i < this.duty.length; i++) {
				$('#duty').append('<li>'+this.duty[i]+'</li>');
			}
		}
	}
	var android = new Position();//Android开发
		// 职位名字
		android.name='Android开发工程师';
		// 给这个职位的 工作描述 添加内容
		android.describe=['1、Android平台的客户端从事Android平台的客户端软件开发'];
		// 给这个职位的 岗位职责 添加内容
		android.duty=['1、计算机、电子或相关专业',
		'2、具备扎实的Java编程基础，1年以上软件开发经验，1年以上Android相关开发经验',
		'3、熟悉基于Android SDK的应用程序开发，能独立进行应用程序开发、调试和移植',
		'4、熟悉移动终端特性和开发特点，熟悉网络编程',
		'5、工作认真仔细、责任心强，具备独立解决问题能力',
		'6、有JNI编程经验的开发者优先',
		'7、强烈的责任心和团队精神，善于与合作'];
	var ios = new Position();//ios开发
		ios.name='IOS开发工程师';
		// 给这个职位的 工作描述 添加内容
		ios.describe=['1、负责iPhone平台客户端软件开发',
		'2、按照项目计划，与项目组其他成员协同工作，在保证质量的前提下，按时完成开发任务'];
		// 给这个职位的 岗位职责 添加内容
		ios.duty=['1、本科及以上学历',
		'2、有C或C++工作经验，有扎实的Object C/C/C++语言基础',
		'3、有完整的iPhone产品开发经验，熟悉客户端产品需求、设计、开发、测试、发布流程，有良好的编程习惯',
		'4、有性能评测、调优相关经验者优先有app store线上作品者优先有SP客户端产品线开发经历者优先'];
	var server = new Position();//服务端
		server.name='服务端开发工程师';
		// 给这个这位的 工作描述 添加内容
		server.describe=['1、针对公司业务的需求进行业务的分析、建立和训练数据分析模型',
		'2、负责公司数据挖掘模型和算法的开发'];
		// 给这个职位的岗位职责 添加内容
		server.duty=['1、数学、统计、计算机等相关专业，本科及以上学历',
		'2、数学功底扎，实熟悉各种主流的分析算法：贝叶斯算法、推荐算法、聚类、分类等，对Mahout、R算法库有了解更好',
		'3、对数据结构、算法分析、计算机系统结构、操作系统、网络等计算机基础具备扎实的功底',
		'4、熟悉移动终端特特点，熟悉网络编程',
		'4、熟练掌握Java开发语言，熟悉linux开发环境'];
	var operation = new Position();//运营专员
		operation.name='运营专员';
		// 给这个这位的 工作描述 添加内容
		operation.describe=['1、对汽车和移动互联网有浓厚的兴趣，熟悉移动应用分发渠道',
		'2、性格外向，有较强的沟通能力，工作细心认真',
		'3、自主、合理、高效的安排日常工作，独立思考能力强'];
		// 给这个职位的岗位职责 添加内容
		operation.duty=['1、负责产品在应用市场及其他广告投放渠道的日常工作沟通',
		'2、渠道广告投放合同签署及财务流程',
		'3、渠道活动跟进，内外部沟通协调',
		'4、运营部其他相关工作'];
	var finance = new Position();//财务
		finance.name='财务人员';
		// 给这个这位的 工作描述 添加内容
		finance.describe=['1、财务，会计，经济等相关专业中专以上学历，有财会工作经验者优先',
		'2、熟悉现金管理及银行结算，财务软件操作',
		'3、良好的职业操守及团队合作精神，较强的沟通和协调能力',
		'4、具有独立工作和学习的能力，工作认真细心'];
		// 给这个职位的岗位职责 添加内容
		finance.duty=['1、协助完成财务部门内的财务、会计、统计等工作',
		'2、协助规范和完善财务管理制度',
		'3、管理公司合同、发票及账单等',
		'4、其他相关工作'];
	// position click
	var this_data=1;
	$('#title>li').click(function(){
		// change color
		$(this).parent().children().css('border-bottom','none').end().end().css('border-bottom','2px solid #50e29a');
		// check
		if (this_data!=+$(this).attr('data-witch')) {
			this_data=+$(this).attr('data-witch');
			switch (this_data){
				case 1: android.show();break;
				case 2: ios.show();break;
				case 3: server.show();break;
				case 4: operation.show();break;
				case 5: finance.show();break;
				default:;break;
			}
		}

	});
});