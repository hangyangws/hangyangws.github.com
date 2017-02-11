console.log('%c __    __                                                           __         \n|  |  |  |                                                         / /         \n|  |__|  |                  ___      __      __      __           / /          \n|   __   |      ___        /  /      \\ \\    /\\ \\    / /          / /           \n|  |  |  |      \\  \\      /  /        \\ \\  / /\\ \\  / /          /  —— —— —— —— \n ——    ——        \\  \\    /  /          \\ \\/ /  \\ \\/ /           —— —— —— —   / \n                  \\  \\  /  /            \\/ /    \\/ /                     /  /  \n                   \\  \\/  /              ——      ——                     /  /   \n                    \\    /                                             /  /    \n                     /  /                                             /  /     \n                    /  /                                             /  /      \n                   /  /                                              ———       \n                   ———                                                         \n%changyangws : http://weibo.com/512jj', 'text-shadow: 2px 2px 1px #000;color: #fff;font-weight: 700;background-image:-webkit-gradient(linear,left top,right top, color-stop(0,#fcc),color-stop(0.15, #fcf),color-stop(0.3, #66f), color-stop(0.45, #999), color-stop(0.6, #cc6),color-stop(0.75, #9f9), color-stop(0.9, #0cf), color-stop(1, #c9c) );', 'color: #09c;font-size: 20px;');
(function($) {

    // global val
    var globalVar = {

        f_skill: true,
        f_skillEmphasize: true,
        f_search: true,
        f_articleFind: true,
        enterCode: [],
        f_start: true,
        f_guideFirst: true,
        f_like: true,

        // Scrolling text
        carousel: {

            childNum: 0,
            timeId: 0, //the id witch created by function setInterval

            ini: function() { // get children number and set inital class name
                var getChildNum = function() {
                        var container = document.getElementById('carousel'),
                            children = container.childNodes,
                            childLength = children.length,
                            childLengthTrue = 0;
                        for (var i = childLength - 1; i >= 0; i--) {
                            if (children[i].nodeName == "#text") {
                                container.removeChild(children[i]);
                            } else {
                                // console.log(childdren[i].innerHTML);
                                children[i].className = "transtion animated fadeOutDown";
                                childLengthTrue++;
                            }
                        }
                        // console.log('你喜欢这些句子么 反正我是挺喜欢的');
                        return childLengthTrue;
                    }
                    // set chifren number
                this.childNum = getChildNum();
            },

            // start carousel
            run: function() {
                var container = document.getElementById('carousel');
                // Initialization
                this.ini();
                // add the highlight class for first child
                container.firstChild.className = "transtion animated fadeInDown";
                // animate
                var animate = function() {
                    container.firstChild.className = "transtion animated fadeOutDown";
                    container.firstChild.nextSibling.className = "transtion animated fadeInDown";
                    container.appendChild(container.firstChild);
                }
                this.timeId = setInterval(animate, 3000);
            },

            clear: function() {
                clearInterval(this.timeId);
            }
        },

        getSkillList: function() {
            // ajax start
            $.post("operation/operation.php", {
                'type': 'skillList'
            }, function(data, status) {

                if (status) { //success

                    if (data === 'error') { //query error
                        $.remaind("页面加载失败 请刷新页面", true);
                    } else { //query success

                        var skillList = JSON.parse(data);

                        var li = "";

                        for (var i = skillList.length - 1; i >= 0; i--) {
                            li += "<li class='transtion' data-skill='" + skillList[i]['type_id'] + "'>" + skillList[i]['type_name'] + "</li>";
                        }

                        if (li === "") { //data is empty
                            li = "<span class='empty-data'>没有数据/Empty</apan>";
                        }
                        $('#skill').append(li);
                    }
                } else { //error
                    $.remaind("页面加载失败 请刷新页面", true);
                }
            });
        },

        start: function() {

            if (globalVar.f_start) {
                globalVar.f_start = false;
                $('#welcome').addClass('fadeOutUp').delay(1000).hide(100, function() {
                    $(this).remove();
                });
                $('#carousel').slideUp(500, function() {
                    globalVar.carousel.clear();
                    $('#carousel').remove();
                    $('#search').show().addClass('zoomIn');
                });
                $('#main').css('display', 'block').addClass('slideInUp'); //fadeInUp zoomIn slideInUp
            }
        },

        hideSliderBar: function() {

            if (globalVar.f_skill) {
                globalVar.f_skill = false;
                $('#hideSkill').toggleClass('arrows-left arrows-right').css({
                    'left': '38px'
                }).attr('title', '显示侧边栏/Show sidebar');
                $('#skillBar,#logo').toggleClass('fadeOutLeft fadeInLeft');
                $('.hy-main-content').addClass('hy-main-content-full');
                $('#search').addClass('search-change');
            } else {
                globalVar.f_skill = true;
                $('#hideSkill').toggleClass('arrows-left arrows-right').css({
                    'left': '25px'
                }).attr('title', '隐藏/hide');
                $('#skillBar,#logo').toggleClass('fadeOutLeft fadeInLeft');
                $('.hy-main-content').removeClass('hy-main-content-full');
                $('#search').removeClass('search-change');
            }
        },

        toggleSliderBar: function() {

            var documentWidth = $(document).width();
            if (documentWidth >= 640 && !globalVar.f_skill) {
                globalVar.hideSliderBar();
            } else if (documentWidth < 580 && globalVar.f_skill) {
                globalVar.hideSliderBar();
            }
        },

        skillEmphasize: function() {

            if (globalVar.f_skill) {
                if (globalVar.f_skillEmphasize) {
                    globalVar.f_skillEmphasize = false;
                    $('#skill').addClass('rubberBand').delay(900).show(100, function() {
                        $(this).removeClass('rubberBand');
                        globalVar.f_skillEmphasize = true;
                    });
                }
            } else {
                globalVar.hideSliderBar();
            }
        },

        showArticle: function(articleList, thisLi) {

            var article = "";
            for (var i = 0, length = articleList.length; i < length; i++) {

                article += "<div class='transtion article-container border-box'>" +
                    "<article>" +
                    "<h1><a href='view.html?article=" + articleList[i]['ey_id'] + "'>" + articleList[i]['ey_title'] + "</a></h1>" +
                    "<h3>" + articleList[i]['ey_subt'] + "</h3>" +
                    "</article>" +
                    "<aside>" +
                    "<a title='查看此文章/view the detailed' class='transtion view toleft' href='view.html?article=" + articleList[i]['ey_id'] + "' target='_blank'>&#xe602;</a>" +
                    "<span title='还不错/Pretty good' class='transtion like toright animated' data-index='" + articleList[i]['ey_id'] + "'>&#xe600;<em>" + articleList[i]['ey_like'] + "</em></span>" +
                    "</aside>" +
                    "</div>";
            };

            if (article === "") {
                article = "<span class='empty-data'>没有相关文章/Empty</apan>";
            }

            // hide guide and remove the article witch already exited
            if (globalVar.f_guideFirst) {

                $('#guide').fadeOut(function() {

                    $('#articles').append(article).parent().fadeIn(function() {

                        globalVar.f_guideFirst = false;
                        if (thisLi) {
                            thisLi.siblings().removeClass('skill-click').end().addClass('skill-click');
                        }
                        $.loading(false);
                        globalVar.f_articleFind = true;
                    });
                });
            } else {

                $('#articles').children().remove().end().append(article);
                if (thisLi) {
                    thisLi.siblings().removeClass('skill-click').end().addClass('skill-click');
                } else {
                    $('#skill li').removeClass('skill-click');
                }
                $.loading(false);
                globalVar.f_articleFind = true;
            }
        },

        search: function() {

            if (globalVar.f_search) {

                globalVar.f_search = false;

                var inputValue = $.trim($('#search>input').val());

                if ($.checkText(inputValue)) {

                    $.loading(true);
                    // ajax start
                    $.post("operation/operation.php", {
                        'type': 'artSeaDome',
                        'searchCon': inputValue
                    }, function(data, status) {
                        if (status) { //success
                            if (data === 'error') { //query error
                                $.loading(false);
                                $.remaind("搜索失败 再试一次", true);
                                globalVar.f_search = true;
                            } else { //query success
                                var articleList = JSON.parse(data);
                                globalVar.showArticle(articleList);
                                globalVar.f_search = true;
                            }
                        } else { //error
                            $.loading(false);
                            $.remaind("搜索失败 再试一次", true);
                            globalVar.f_search = true;
                        }
                    });
                } else {

                    $.showMask(false);
                    $.remaind('无搜索结果', true);
                    globalVar.f_search = true;
                }
            }
        },

        footerShow: function() {

            $('#footer').toggleClass('footer-show');
        },

        like: function(thisArt) {

            if (globalVar.f_like) {

                globalVar.f_like = false;
                var artId = thisArt.attr('data-index'),
                    likeNUm = thisArt.find('em').html();
                thisArt.addClass('rubberBand');
                thisArt.find('em').html(++likeNUm);
                // ajax start
                $.post("operation/operation.php", {
                    'type': 'updataLike',
                    'essayId': artId
                }, function(data, status) {
                    if (data !== 'error' && status) { //success
                        thisArt.find('em').html(data).end().removeClass('rubberBand');
                        globalVar.f_like = true;
                    } else { //error
                        $.remaind('加星失败', true);
                        thisArt.find('em').html(--likeNUm);
                        thisArt.removeClass('rubberBand');
                        globalVar.f_like = true;
                    }
                });
            }
        }
    }

    // start carousel
    globalVar.carousel.run();

    // getSkillList
    globalVar.getSkillList();

    globalVar.toggleSliderBar();

    $('#start').bind('click', function() {
        globalVar.start();
    });

    $(document).bind('keydown', function(e) {
        var userPress;
        e = e || window.event || arguments.callee.caller.arguments[0];
        userPress = e.keyCode||e.which||e.charCode;
        if (userPress === 13 || userPress === 32 || userPress === 40) {
            globalVar.start();
            // for enter code
            if (globalVar.enterCode.join('') === '66757069787148534950767349485048') {
                $.jump('admin/checkPass/');
            }
            globalVar.enterCode = [];
        } else {
            globalVar.enterCode.push(userPress);
        }
    });

    // hide or show skill slider bar
    $('#hideSkill').bind('click', function() {

        globalVar.hideSliderBar();
    });

    $(window).resize(function() {

        globalVar.toggleSliderBar();
    });

    //choose emphasize
    $('#guide').bind('click', function() {
        globalVar.skillEmphasize();
    });

    // skill and article
    $('#skill').delegate('li', 'click', function() {

        if (globalVar.f_articleFind) {

            globalVar.f_articleFind = false;

            $.loading(true);

            var thisLi = $(this),
                data_skill = thisLi.attr('data-skill');

            // ajax start
            $.post("operation/operation.php", {
                'type': 'articleDome',
                'essayId': data_skill
            }, function(data, status) {
                if (status) { //success

                    if (data === 'error') { //query error
                        $.loading(false);
                        $.remaind('加载失败 请刷新页面', true);
                        globalVar.f_articleFind = true;
                    } else { //query success
                        var articleList = JSON.parse(data);
                        globalVar.showArticle(articleList, thisLi);
                    }
                } else { //error
                    $.loading(false);
                    $.remaind('加载失败 请刷新页面', true);
                    globalVar.f_articleFind = true;
                }
            });
        }
    });

    // search
    $('#search>input').bind('keydown', function(event) {
        var userPress = event.keyCode;
        if (userPress == 13) {
            globalVar.search();
        }
    });

    $('#search>span').bind('click', function() {
        globalVar.search();
    });

    // logo
    $('#logo').bind('click', function() {

        $.jump('');
    });

    // show or hide footer
    $('#showFooter').bind('click', function() {
        globalVar.footerShow();
        $(this).removeClass('rollIn').addClass('rollOut');
        $('#hideFooter').removeClass('rollOut').addClass('rollIn');
    });

    $('#hideFooter').bind('click', function() {
        globalVar.footerShow();
        $('#showFooter').removeClass('rollOut').addClass('rollIn');
        $(this).removeClass('rollIn').addClass('rollOut');
    });

    // like
    $('#articles').delegate('aside>span.like', 'click', function() {

        globalVar.like($(this));
    });

})(jQuery);
