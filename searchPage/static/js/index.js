/**
 * Created by hangyangws(hangyangws@foxmail.com) in 2016-08-16.
 * [searchPage canvas背景]
 */

;
! function(win, doc, undefined) {
    var $canvas = doc.getElementById('bgAnimate'), // canvas Dom节点
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
        _dot_radius = 2, // 粒子半径
        _mouse_dot = { // 鼠标坐标
            x: null,
            y: null,
            power: 20000
        },
        getWinWidth = function() {
            return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
        },
        getWinHeight = function() {
            return win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight;
        },
        getColor = function() {
            return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
        },
        _dots = (function() { // 离子初始化
            var _l = _dot_number,
                dots = [];
            while (_l--) {
                dots.push({
                    x: Math.random() * getWinWidth(),
                    y: Math.random() * getWinHeight(),
                    xa: Math.random() * 2 - 1,
                    ya: Math.random() * 2 - 1,
                    color: getColor(),
                    power: 200
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
        APP = {
            resize: function() {
                $canvas.width = getWinWidth();
                $canvas.height = getWinHeight();
            },
            animateDraw: function() {
                ctx.clearRect(0, 0, $canvas.width, $canvas.height);
                // 添加鼠标坐标进入_dots
                var dots = [_mouse_dot].concat(_dots),
                    _l = _dot_number,
                    dot;
                while (_l--) { // 操作每一个离子
                    dot = _dots[_l];
                    // 离子位移
                    dot.x += dot.xa;
                    dot.y += dot.ya;
                    // 遇到边界反向
                    (dot.x > $canvas.width - _dot_radius || dot.x < _dot_radius) && (dot.xa *= -1);
                    (dot.y > $canvas.height - _dot_radius || dot.y < _dot_radius) && (dot.ya *= -1);
                    // 绘制点
                    ctx.beginPath();
                    ctx.fillStyle = dot.color;
                    ctx.arc(dot.x, dot.y, _dot_radius, 0, Math.PI * 2, true);
                    ctx.fill();
                }
                RAF(APP.animateDraw);
            }
        };
    /**
     * 事件绑定
     */
    APP.resize(); // 窗口初始化
    // 开始动画
    APP.animateDraw();
    addEvent(win, 'resize', APP.resize); // 窗口改变大小
    addEvent(win, 'mousemove', function(e) { // 鼠标移动
        e = e || win.event;
        _mouse_dot.x = e.clientX;
        _mouse_dot.y = e.clientY;
    });
    addEvent(win, 'mouseout', function() { // 鼠标移除
        _mouse_dot.x = null;
        _mouse_dot.y = null;
    });
}(window || this, document);
