 $(function(){

    // $.ajax({
    //     type: "get",
    //     async: true,
    //     jsonp: "juche_callback",
    //     jsonpCallback: "get_data",
    //     url: "http://*********************************",
    //     dataType: "jsonp",
    //     success: function(data) {

    //         var flag_isAjax=false;//标示符 还没有加载完成不能连续点击

    //         // 生成颜色等级
    //         var stateColorList = ['303', '306', '309', '30c', '30f', '33f', '36f','39f','3cf','3cc'];
    //         $.each(stateColorList,function(index,color){
    //             $('#MapColor').append("<span style='background-color: #"+color+";'></span>");
    //         });
    //         // 绘制全国地图
    //         $('#ChinaMap').SVGMap({
    //             mapName: 'china',// 定义中国的数据(地形和省份名字) 来自china.js
    //             stateData: data,
    //             stateTipHtml: function (mapData, obj) {// 鼠标悬浮每个省份的提示框里面展示的数据
    //                 var _value = mapData[obj.id].value;
    //                 var _idx = mapData[obj.id].index;
    //                 var tipStr = '<div class="mapInfo">'+
    //                                  '<i>'+_idx+ '</i>'+//展示顺序
    //                                  '<span>' + obj.name + '</span>'+//展示省份名字
    //                                  '<b>' + _value + '</b>'+//展示省份数据
    //                              '</div>';
    //                 return tipStr;
    //             },
    //             clickCallback: function(stateData, obj){// 省份点击事件 点击以后应该ajax 请求后台数据(市列表和数据) 再把这个省的数据展示在右边
    //                 if (!flag_isAjax) {
    //                     flag_isAjax=true;
    //                     $('#city-data>li').remove();//更新数据前 移除旧数据
    //                     var cityName=obj.name;

    //                     $.ajax({
    //                         type: "get",
    //                         async: true,
    //                         jsonp: "juche_callback",
    //                         jsonpCallback: "get_data",
    //                         url: "http://*********************************?city="+cityName,
    //                         dataType: "jsonp",
    //                         success: function(city) {
    //                             // 循环为每一个城市实例化Dom 结点
    //                             $('#city-data>span').html(cityName);
    //                             var li,em;
    //                             for(var temp_city in city ){
    //                                 li='';
    //                                 em='';
    //                                 li='<li>'<a href="city.html?city='+temp_city+'">'+temp_city+'</a>';
    //                                 for (var temp_data in city[temp_city]) {
    //                                     em += '<em>'+temp_data+'<i>'+city[temp_city][temp_data]+'</i></em>';
    //                                 }
    //                                 li+=(em+'</li>');
    //                                 $('#city-data').append(li);//数据展示
    //                                 $('#city-data').slideDown(200,function(){
    //                                     flag_isAjax=false;
    //                                 });
    //                             }
    //                         }
    //                     });

    //                 }
    //             }
    //         });
    //     }
    // });

// ##############################(由#号包起来的代码只是参考(应该删除) 正规代码是上面的ajax函数)#######################################################
    var flag_isAjax=false;//标示符 还没有加载完成不能连续点击
    // 定义每个 省 的数据（假数据）
    var data = {
        "jiangsu":{"value":"30.05%","index":"1","stateInitColor":"0"},
        "henan":{"value":"19.77%","index":"2","stateInitColor":"0"},
        "anhui":{"value":"10.85%","index":"3","stateInitColor":"0"},
        "zhejiang":{"value":"10.02%","index":"4","stateInitColor":"0"},
        "liaoning":{"value":"8.46%","index":"5","stateInitColor":"0"},
        "beijing":{"value":"4.04%","index":"6","stateInitColor":"1"},
        "hubei":{"value":"3.66%","index":"7","stateInitColor":"1"},
        "jilin":{"value":"2.56%","index":"8","stateInitColor":"1"},
        "shanghai":{"value":"2.47%","index":"9","stateInitColor":"1"},
        "guangxi":{"value":"2.3%","index":"10","stateInitColor":"1"},
        "sichuan":{"value":"1.48%","index":"11","stateInitColor":"2"},
        "guizhou":{"value":"0.99%","index":"12","stateInitColor":"2"},
        "hunan":{"value":"0.78%","index":"13","stateInitColor":"2"},
        "shandong":{"value":"0.7%","index":"14","stateInitColor":"2"},
        "guangdong":{"value":"0.44%","index":"15","stateInitColor":"2"},
        "jiangxi":{"value":"0.34%","index":"16","stateInitColor":"3"},
        "fujian":{"value":"0.27%","index":"17","stateInitColor":"3"},
        "yunnan":{"value":"0.23%","index":"18","stateInitColor":"3"},
        "hainan":{"value":"0.21%","index":"19","stateInitColor":"3"},
        "shanxi":{"value":"0.11%","index":"20","stateInitColor":"3"},
        "hebei":{"value":"0.11%","index":"21","stateInitColor":"4"},
        "neimongol":{"value":"0.04%","index":"22","stateInitColor":"4"},
        "tianjin":{"value":"0.04%","index":"23","stateInitColor":"4"},
        "gansu":{"value":"0.04%","index":"24","stateInitColor":"4"},
        "shaanxi":{"value":"0.02%","index":"25","stateInitColor":"4"},
        "macau":{"value":"0.0%","index":"26","stateInitColor":"5"},
        "hongkong":{"value":"0.0%","index":"27","stateInitColor":"5"},
        "taiwan":{"value":"0.0%","index":"28","stateInitColor":"6"},
        "qinghai":{"value":"0.0%","index":"29","stateInitColor":"7"},
        "xizang":{"value":"0.0%","index":"30","stateInitColor":"7"},
        "ningxia":{"value":"0.0%","index":"31","stateInitColor":"8"},
        "xinjiang":{"value":"0.0%","index":"32","stateInitColor":"8"},
        "heilongjiang":{"value":"0.0%","index":"33","stateInitColor":"9"},
        "chongqing":{"value":"0.0%","index":"34","stateInitColor":"9"}
    };
    // 生成颜色等级
    var stateColorList = ['303', '306', '309', '30c', '30f', '33f', '36f','39f','3cf','3cc'];
    $.each(stateColorList,function(index,color){
        $('#MapColor').append("<span style='background-color: #"+color+";'></span>");
    });
    // 绘制地图
    $('#ChinaMap').SVGMap({
        // 定义中国的数据(地形和省份名字) 来自china.js
        mapName: 'china',
        // 定义每个省份的数据 由ajax 提供
        stateData: data,
        // 鼠标悬浮每个省份的提示框里面展示的数据
        stateTipHtml: function (mapData, obj) {
            var _value = mapData[obj.id].value;
            var _idx = mapData[obj.id].index;
            var tipStr = '<div class="mapInfo">'+
                             '<i>'+_idx+ '</i>'+//展示顺序
                             '<span>' + obj.name + '</span>'+//展示省份名字
                             '<b>' + _value + '</b>'+//展示省份数据
                         '</div>';
            return tipStr;
        },
        // 省份点击事件 点击以后应该ajax 请求后台数据(市列表和数据) 再把这个省的数据展示在右边
        clickCallback: function(stateData, obj){
            if (!flag_isAjax) {
                flag_isAjax=true;
                $('#city-data>li').remove();//更新数据前 移除旧数据
                var cityName=obj.name;

                // $.ajax({
                //     type: "get",
                //     async: true,
                //     jsonp: "juche_callback",
                //     jsonpCallback: "get_data",
                //     url: "http://*********************************?city="+cityName,
                //     dataType: "jsonp",
                //     success: function(city) {//这个result 格式应该和假数据 city 格式一样
                //         $('#city-data>span').html(cityName);
                //         // 循环为每一个城市实例化Dom 结点
                //         var li,em;
                //         for(var temp_city in city ){
                //             li='';//初始化数据
                //             em='';//初始化数据
                //             li='<li>'+
                //                     '<a href="#####?city=####">'+temp_city+'</a>';
                //             for (var temp_data in city[temp_city]){
                //                 em += '<em>'+temp_data+'<i>'+city[temp_city][temp_data]+'</i></em>';
                //             }
                //             li+=(em+'</li>');
                //             $('#city-data').append(li);//数据展示
                //         }
                //     }
                // });

                // 模拟 ajax 已经返回数据（假数据）##############################################
                // 定义每个 城市 的数据 此数据应该由ajax 获取再赋值 （假数据）
                var city={
                    '成都':{'数据一':21,'数据二':'数据二','数据三':34},
                    '自贡':{'数据一':21,'数据二':'数据二'},
                    'ttt':{'数据一':21,'数据二':'数据二'}
                }
                $('#city-data>span').html(cityName);
                var li,em;
                for(var temp_city in city ){
                    li='';
                    em='';
                    li='<li>'+
                            '<a href="city.html?city='+temp_city+'">'+temp_city+'</a>';
                    for (var temp_data in city[temp_city]){
                        em += '<em>'+temp_data+'<i>'+city[temp_city][temp_data]+'</i></em>';
                    }
                    li+=(em+'</li>');
                    $('#city-data').append(li);//数据展示
                    $('#city-data').slideDown(200,function(){
                        flag_isAjax=false;
                    });
                }
                // ###############################################################################
            }
        }
    });
// #####################################################################################

 });