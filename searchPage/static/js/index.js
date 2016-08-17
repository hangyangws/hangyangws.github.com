/**
 * Created by hangyangws(hangyangws@foxmail.com) in 2016-08-16.
 * [searchPage canvas背景]
 */

;
! function(win, doc, undefined) {
    'use strict';
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
        _dot_number = 240, // 离子数量
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
                    power: 8000
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
    addEvent(win, 'mouseout', function() { // 鼠标yi
        _mouse_dot.x = null;
        _mouse_dot.y = null;
    });
}(window || this, document);
