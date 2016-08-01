	var game={ms:0,sec:0,minute:0,hour:0,
	isMove:true,timeStart:null,son:[],$id:function(id){
	return typeof id=="string"?document.getElementById(id):id;},
	redDiv:function(){return game.$id("move");},
	writeDiv:function(){return game.$id("div2");},
	move:function(obj1,obj2,v){var o=game.$id(obj2);
	var redDiv=game.$id("move");
	var changeSpeed=0;
	var x=o.offsetLeft,y=o.offsetTop,fx=1,fy=1;
	var iWidth=game.$id(obj1).offsetWidth-game.$id(obj2).offsetWidth;
	var iHeight=game.$id(obj1).offsetHeight-game.$id(obj2).offsetHeight;
	o.Timer=setInterval(function(){
	x+=v*fx;y+=v*fy;
	changeSpeed++;
	if(changeSpeed%300==0){v+=2;}
	if(x>iWidth||x<0){fx*=-1;}
	if(y>iHeight||y<0){fy*=-1;}
	o.style.left=x+'px';o.style.top=y+'px';
	if(game.crashCheck(o,redDiv)){
	game.clearSet();
	clearInterval(game.timeStart);
	game.timeStart=null;
	game.stopMove();
	alert("您坚持了"+game.$id("p1").innerHTML+"秒");
	setTimeout(game.iLoad,300);}},30);},
	oTime:function(){game.ms=parseInt(game.ms)+10;
	if(parseInt(game.ms)==100){game.sec++;game.ms=0;}
	if(parseInt(game.sec)==60){game.minute++;game.sec=0;}
	if(parseInt(game.minute==60)){game.hour++;game.minute=0;}
	if(parseInt(game.ms)<10){game.ms="0"+game.ms;}
	var show=game.$id("p1");
	if(game.sec<10)show.innerHTML=game.hour+":"+game.minute+":0"+game.sec+":"+game.ms+"";
	if(game.minute<10)show.innerHTML=game.hour+":0"+game.minute+":"+game.sec+":"+game.ms+"";
	if(game.sec<10&&game.minute<10)show.innerHTML=game.hour+":0"+game.minute+":0"+game.sec+":"+game.ms+"";
	else show.innerHTML=game.hour+":"+game.minute+":"+game.sec+":"+game.ms+"";},
	iMouse:null,oDiv:null,startMove:function(obj,ev){
	var oEvent=ev||event;if(game.isMove){
	game.move("div1","son1",3);
	game.move("div1","son2",3);
	game.move("div1","son3",3);
	game.ms=0;game.sec=0;game.minute=0;game.hour=0;
	game.timeStart=setInterval("game.oTime()",100);
	game.isMove=false;}game.iMouse={x:oEvent.clientX,y:oEvent.clientY};
	game.oDiv={x:obj.offsetLeft,y:obj.offsetTop};
	if(obj.setCapture){
	obj.onmousemove=game.doMove;
	obj.onmouseup=game.stopMove;
	obj.setCapture();}
	else
	{document.addEventListener("mousemove",game.doMove,true);
	document.addEventListener("mouseup",game.stopMove,true);}},
	doMove:function(ev){
	var oEvent=ev||event;l=oEvent.clientX-game.iMouse.x+game.oDiv.x;t=oEvent.clientY-game.iMouse.y+game.oDiv.y;
	if(l<game.writeDiv().offsetLeft||
	l>(game.writeDiv().offsetWidth-game.redDiv().offsetWidth+game.writeDiv().offsetLeft)||
	t<game.writeDiv().offsetTop||t>(game.writeDiv().offsetHeight-game.redDiv().offsetHeight+game.writeDiv().offsetTop)){
	game.clearSet();clearInterval(game.timeStart);
	game.timeStart=null;game.stopMove();
	alert("您坚持了"+game.$id("p1").innerHTML+"秒");
	setTimeout(game.iLoad,100);}
	game.redDiv().style.left=l+"px";game.redDiv().style.top=t+"px";},
	stopMove:function(ev){
	if(game.redDiv().releaseCapture){
	game.redDiv().onmousemove=null;
	game.redDiv().onmouseup=null;game.redDiv().releaseCapture();}
	else
	{document.removeEventListener("mousemove",game.doMove,true);
	document.removeEventListener("mouseup",game.stopMove,true);}},
	crashCheck:function(objDrag,oDiv){
	var dragDiv1={l1:objDrag.offsetLeft,r1:objDrag.offsetLeft+objDrag.offsetWidth,
	t1:objDrag.offsetTop,b1:objDrag.offsetTop+objDrag.offsetHeight};
	var moveDiv2={l1:oDiv.offsetLeft,
	r1:oDiv.offsetLeft+oDiv.offsetWidth,t1:oDiv.offsetTop,
	b1:oDiv.offsetTop+oDiv.offsetHeight};
	if(dragDiv1.r1<moveDiv2.l1||dragDiv1.l1>moveDiv2.r1||
	dragDiv1.b1<moveDiv2.t1||dragDiv1.t1>moveDiv2.b1){
	return false;}
	else
	{return true;}},
	clearSet:function(){
	var divNum=game.$id("div2").getElementsByTagName("div");
	for(var i=0,l=divNum.length-1;i<l;i++){
	clearInterval(divNum[i].Timer);divNum[i].Timer=null;}},
	success:function(){
	var divNum=game.$id("div2").getElementsByTagName("div");
	for(var i=0,l=divNum.length-1;i<l;i++){
	game.son.push(divNum[i].offsetLeft);game.son.push(divNum[i].offsetTop);}
	game.$id("move").style.left=(game.$id("div1").offsetWidth-game.$id("move").offsetWidth)/2+"px";
	game.$id("move").style.top=(game.$id("div1").offsetHeight-game.$id("move").offsetHeight)/2+"px";
	game.$id("move").onmousedown=function(ev){game.startMove(this,ev);};
	document.write("<scr"+"ipt src=\"http://js.tongji.linezing.com/2360374/tongji.js\" language=\"JavaScript\" charset=\"gb2312\"></sc"+"ript>");},
	iLoad:function(){
	game.isMove=true;game.$id("move").style.left=(game.$id("div1").offsetWidth-game.$id("move").offsetWidth)/2+"px";
	game.$id("move").style.top=(game.$id("div1").offsetHeight-game.$id("move").offsetHeight)/2+"px";
	var divNum=game.$id("div2").getElementsByTagName("div");
	for(var i=0,l=divNum.length-1;i<l;i++){
	var n=2*i;
	divNum[i].style.left=game.son[n]+"px";
	divNum[i].style.top=game.son[n+1]+"px";}}};
	game.success();