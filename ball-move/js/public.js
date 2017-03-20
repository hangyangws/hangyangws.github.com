// made by fj 2015 09 27
! function(global, func) {
    func(global);
}(typeof window !== 'undefined' ? window : this, function(g) {
    'use strict';
    g.fj = {
        // 事件监听（惰性函数）
        on: (function(e) {
            if (e.addEventListener) {
                return function(e, t, h) {
                    e.addEventListener(t, h, false)
                }
            } else if (e.attachEvent) {
                return function(e, t, h) {
                    e.attachEvent('on' + t, h)
                }
            } else {
                return function(e, t, h) {
                    e['on' + t] = h
                }
            }
        })(document.body),
        id: function(id) {
            return document.getElementById(id)
        },
        hasClass: function(e, cls) {
            return e.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
        },
        addClass: function(e, cls) {
            !fj.hasClass(e, cls) && (e.className += ' ' + cls)
        },
        removeClass: function(e, cls) {
            fj.hasClass(e, cls) && (
                e.className = e.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), '')
            )
        }
    };
});
