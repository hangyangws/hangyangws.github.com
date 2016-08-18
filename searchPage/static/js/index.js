/**
 * Created by hangyangws(hangyangws@foxmail.com) in 2016-08-16.
 * [searchPage canvas背景]
 */

;
! function(win, doc, undefined) {
    'use strict';
    var $main = doc.querySelector('#main'),
        // _user_obj = JSON.parse(decodeURI(win.location.href.split('?')[1])),
        _user_obj = (function() {
            var str = win.location.href.split('?')[1];
            if (str) {
                return JSON.parse(decodeURI(str));
            } else {
                return {
                    name: 'userName',
                    animate: 'true'
                }
            }
        })(),
        // 粒子动画相应参数与方法
        $canvas = doc.querySelector('#bgAnimate'), // canvas Dom节点
        ctx = $canvas.getContext('2d'), // canvas 2d 上下文
        addEvent = (function() { // 事件绑定函数
            if (win.addEventListener) {
                return function(element, type, handler) {
                    element.addEventListener(type, handler, false);
                }
            } else if (window.attachEvent) {
                return function(element, type, handler) {
                    element.attachEvent('on' + type, handler);
                }
            } else {
                return function(element, type, handler) {
                    element.addEventListener(type, handler, false);
                    element['on' + type] = handler;
                }
            }
        })(),
        _dot_number = 100, // 离子数量
        _dot_acceleration = 1, // 离子加速度
        _dot_radius = 1, // 粒子半径
        _line_width = 1, // 粒子连线最大宽度
        _mouse_dis = 8000, // 鼠标和粒子之间最小间距
        _mouse_dot = { // 鼠标坐标
            x: null,
            y: null,
            power: 40000
        },
        getRandom = function(min, max) {
            return Math.random() * (max - min) + min;
        },
        getWinWidth = function() {
            return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
        },
        getWinHeight = function() {
            return win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight;
        },
        getColor = function() {
            return 'rgba(RED, GREEN, BLUE, TRANS)'
                .replace('RED', getRandom(0, 255).toFixed(0))
                .replace('GREEN', getRandom(0, 255).toFixed(0))
                .replace('BLUE', getRandom(0, 255).toFixed(0))
                .replace('TRANS', Math.random());
        },
        _dots = (function() { // 离子初始化
            var _l = _dot_number,
                dots = [];
            while (_l--) {
                dots.push({
                    x: getRandom(_dot_radius, getWinWidth() - _dot_radius),
                    y: getRandom(_dot_radius, getWinHeight() - _dot_radius),
                    xa: Math.random() * _dot_acceleration - _dot_acceleration / 2,
                    ya: Math.random() * _dot_acceleration - _dot_acceleration / 2,
                    color: getColor(),
                    power: 18000
                });
            }
            return dots;
        })(),
        RAF = (function() {
            return win.requestAnimationFrame ||
                win.webkitRequestAnimationFrame ||
                win.mozRequestAnimationFrame ||
                win.oRequestAnimationFrame ||
                win.msRequestAnimationFrame ||
                function(callBack) {
                    win.setTimeout(callBack, 16.6);
                };
        })(),
        ANIMATE = {
            init: function() {
                ANIMATE.resize(); // 窗口初始化
                ANIMATE.animateDraw(); // 开始动画
                // 检测是否要背景动画
                _user_obj.animate && ($main.className = $main.className + ' bg-animate');
            },
            resize: function() {
                $canvas.width = getWinWidth();
                $canvas.height = getWinHeight();
            },
            animateDraw: function() {
                // 清空画布
                ctx.clearRect(0, 0, $canvas.width, $canvas.height);
                // 添加鼠标坐标进入_dots
                var _all_dots = [_mouse_dot].concat(_dots),
                    _all_len,
                    _dot_len = _dot_number,
                    dot1,
                    dot2;
                while (_dot_len--) { // 操作每一个离子(不包括鼠标粒子)
                    dot1 = _dots[_dot_len];
                    // 离子位移
                    dot1.x += dot1.xa;
                    dot1.y += dot1.ya;
                    // 遇到边界反向
                    (dot1.x > $canvas.width - _dot_radius || dot1.x < _dot_radius) && (dot1.xa *= -1);
                    (dot1.y > $canvas.height - _dot_radius || dot1.y < _dot_radius) && (dot1.ya *= -1);
                    // 绘制粒子
                    ctx.beginPath();
                    ctx.fillStyle = dot1.color;
                    ctx.arc(dot1.x, dot1.y, _dot_radius, 0, Math.PI * 2, true);
                    ctx.fill();
                    // 对比当前粒子与其他粒子距离
                    _all_len = _all_dots.length;
                    while (_all_len--) {
                        dot2 = _all_dots[_all_len];
                        // 遇到当前粒子 或者 鼠标粒子为空跳过
                        if (dot2 === dot1 || !dot2.x) continue;
                        // 2个粒子之间的距离
                        var _dis_x = dot2.x - dot1.x,
                            _dis_y = dot2.y - dot1.y,
                            distans = _dis_x * _dis_x + _dis_y * _dis_y,
                            ratio = (dot2.power - distans) / dot2.power;
                        if (distans < dot2.power) {
                            // 如果是鼠标粒子，则移向鼠标粒子
                            if (dot2 === _mouse_dot && distans > _mouse_dis) {
                                dot1.x += _dis_x * ratio / 60;
                                dot1.y += _dis_y * ratio / 60;
                            }
                            // 画线
                            ctx.beginPath();
                            ctx.lineWidth = _line_width * ratio;
                            ctx.strokeStyle = dot2.color;
                            ctx.moveTo(dot2.x, dot2.y);
                            ctx.lineTo(dot1.x, dot1.y);
                            ctx.stroke();
                        }
                    }
                }
                RAF(ANIMATE.animateDraw);
            }
        },
        // 搜索框相应参数与方法
        now = new Date(), //
        $ipt = $main.querySelector('.search-ipt'), // 输入框Dom
        $chrome = $main.querySelector('.js-chrome'),
        $baidu = $main.querySelector('.js-baidu'),
        _ipt_time = {
            time1: null,
            time2: null
        },
        SEARCH = {
            init: function() {
                // 用户名
                $main.querySelector('.js-name').innerHTML = this.getTime() + '，' + _user_obj.name;
                // 问候语编写
                $main.querySelector('.js-greet').innerHTML = [
                    '星期日，明天就要上班了',
                    '星期一，怎么那么多任务要完成',
                    '星期二，加油我是最厉害的',
                    '星期三，测试提交了好多BUG',
                    '星期四，还有一天就放假了',
                    '星期五，算了还是明天加班吧',
                    '星期六，看了朋友的朋友圈我觉得他们会失去本宝宝'
                ][now.getDay()];
                // 输入框聚焦
                $ipt.focus();
            },
            getTime: function() {
                var hour = now.getHours()
                if (hour < 11) {
                    return 'Good morning';
                } else if (hour < 16) {
                    return 'Good Afternoon';
                } else {
                    return 'Good evening';
                }
            },
            getValArr: function() {
                return $ipt.value.replace(/(^\s*)|(\s*$)/g, '').split(/\s+/);
            },
            start: function(e) {
                e = e || win.event;
                if ((e.keyCode || e.which) === 13) {
                    if (_ipt_time.time1) {
                        _ipt_time.time2 = new Date().getTime();
                    } else {
                        _ipt_time.time1 = new Date().getTime();
                        var _time = setTimeout(function() {
                            clearTimeout(_time);
                            if (_ipt_time.time2 && (_ipt_time.time2 - _ipt_time.time1 < 320)) {
                                SEARCH.chrome();
                            } else {
                                SEARCH.baidu();
                            }
                            _ipt_time.time1 = null;
                            _ipt_time.time2 = null;
                        }, 340);
                    }
                }
            },
            chrome: function() {
                win.location.href = 'https://www.google.com/#q=' + SEARCH.getValArr().join('+');
            },
            baidu: function() {
                win.location.href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + encodeURI(SEARCH.getValArr().join(' '));
            }
        };

    /**
     * 搜索框
     */
    SEARCH.init(); // 搜索初始化
    addEvent($ipt, 'keydown', SEARCH.start); // 用户搜索
    addEvent($chrome, 'click', SEARCH.chrome); // 点击谷歌
    addEvent($baidu, 'click', SEARCH.baidu); // 点击百度

    /**
     * 动画
     */
    ANIMATE.init(); // 动画初始化
    addEvent(win, 'resize', ANIMATE.resize); // 窗口改变大小
    addEvent(win, 'mousemove', function(e) { // 鼠标移动
        e = e || win.event;
        _mouse_dot.x = e.clientX;
        _mouse_dot.y = e.clientY;
    });
    addEvent(win, 'mouseout', function() { // 鼠标移出
        _mouse_dot.x = null;
        _mouse_dot.y = null;
    });
}(window || this, document);
