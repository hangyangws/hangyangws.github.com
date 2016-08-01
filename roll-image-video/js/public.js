// made by hangyangws
// jquery 自定义插件
(function($) {

    var gVar = {

        remaindCss: '<div class="middle remaind-wrap">' +
            '<span id="remaindMessage"></span>' +
            '<span id="confirmRemaind" class="transtion">确定</span>' +
            '</div>',

        upCss: '<div style="height: 340px" class="sign-m offset-top ts4 middle w300 p5 f12">' +
            '<div class="c">' +
            '<span style="color: #999" class="sign-x w20 h20 pr fr cp ts4" title="关闭窗口"></span>' +
            '</div>' +
            '<h4 class="fcm tc f18 mt10 mb15">注册</h4>' +
            '<label class="db b1e0 h30 bcf mb15 ml30 mr30">' +
            '<span class="sign-num fl h1 tc">+86</span>' +
            '<input class="sign-tel lh200 fl h1 pl10 pr10" type="tel" placeholder="输入手机号" maxlength="11" />' +
            '</label>' +
            '<div class="c ml30 mr30 mb15">' +
            '<input class="sign-ver h1 h30 b1e0 pl10 pr10 bcf lh200 w80 h1" type="text" maxlength="6" placeholder="输入验证码" />' +
            '<button style="height: 32px" class="sign-ver-up fr w100 b1m fcf bcm tc ts4">发送验证码</button>' +
            '</div>' +
            '<label class="db bcf b1e0 h30 mb15 pl10 pr10 ml30 mr30">' +
            '<input class="sign-pass w1 h1 lh200" type="password" placeholder="输入6-20位字符或密码" maxlength="20" />' +
            '</label>' +
            '<div class="ml30 mr30 tr mb15">' +
            '注册即表示同意Wederful <a href="http://wederful.com/about/agreement" class="fcm" traget="_blank">用户协议</a>' +
            '</div>' +
            '<button class="sign-up-s sign-s db b1m h30 bc bcm fcf f14 ts4">注册</button>' +
            '<div class="ml30 mr30 mt15 c">' +
            '<span class="sign-err"></span>' +
            '<div class="fr">' +
            '已有账号，<span class="sign-in fcm cp">直接登录</span>' +
            '</div>' +
            '</div>' +
            '</div>',

        inCss: '<div style="height: 280px" class="sign-m offset-top ts4 middle w300 p5 f12">' +
            '<div class="c">' +
            '<span style="color: #999" class="sign-x w20 h20 pr fr cp ts4" title="关闭窗口"></span>' +
            '</div>' +
            '<h4 class="fcm tc f18 mt10 mb15">登录</h4>' +
            '<label class="db b1e0 h30 bcf mb20 ml30 mr30">' +
            '<span class="sign-num fl h1 tc">+86</span>' +
            '<input class="sign-tel lh200 fl h1 pl10 pr10" type="tel" placeholder="输入手机号" maxlength="11" />' +
            '</label>' +
            '<label class="db bcf b1e0 h30 mb15 pl10 pr10 ml30 mr30">' +
            '<input class="sign-pass w1 h1 lh200" type="password" placeholder="请输入6-20位字符或密码" />' +
            '</label>' +
            '<div class="ml30 mr30 c mb15">' +
            '<span class="sign-re cp">忘记密码？</span>' +
            '<span class="sign-up fcm fr cp">免费注册</span>' +
            '</div>' +
            '<button class="sign-in-s sign-s db h30 b1m bc bcm fcf f14 ts4">登录</button>' +
            '<div class="ml30 mt10 sign-err"></div>' +
            '</div>',

        reCss: '<div style="height: 285px" class="sign-m offset-top ts4 middle w300 p5 f12">' +
            '<div class="c">' +
            '<span style="color: #999" class="sign-x w20 h20 pr fr cp ts4" title="关闭窗口"></span>' +
            '</div>' +
            '<h4 class="fcm tc f18 mt10 mb15">重置密码</h4>' +
            '<label class="db b1e0 h30 bcf mb15 ml30 mr30">' +
            '<span class="sign-num fl h1 tc">+86</span>' +
            '<input class="sign-tel lh200 fl h1 pl10 pr10" type="tel" placeholder="输入手机号" maxlength="11" />' +
            '</label>' +
            '<div class="c ml30 mr30 mb15">' +
            '<input class="sign-ver h1 h30 b1e0 pl10 pr10 bcf lh200 w80 h1" type="text" maxlength="6" placeholder="输入验证码" />' +
            '<button style="height: 32px" class="sign-ver-re fr w100 b1m fcf bcm tc ts4">发送验证码</button>' +
            '</div>' +
            '<label class="db bcf b1e0 h30 mb20 pl10 pr10 ml30 mr30">' +
            '<input class="sign-pass w1 h1 lh200" type="password" placeholder="请输入6-20位支付密码" maxlength="20" />' +
            '</label>' +
            '<button class="sign-re-s sign-s db b1m h30 bc bcm fcf f14 ts4">完成</button>' +
            '<div class="ml30 mt10 sign-err"></div>' +
            '</div>',

        maskShow: function(type) {
            if (type) {
                $('#mask').fadeIn(400);
            } else {
                $('#mask').fadeOut(400).html('');
            }
        },

        // sign 模块
        f_sign: true,
        f_ver: true,

        sign_tip: function(e, d, h, f) {
            d.parents('.sign-m').find('.sign-err').html(e);
            d.html(h);
            gVar[f] = true;
        },

        signUp: function(this$, t) {
            if (gVar.f_sign) {
                gVar.f_sign = false;
                var tel = $.trim($('#mask .sign-tel').val());
                if ($.cTel(tel)) { //手机号格式正确
                    // 检测手机号是否注册过
                    this$.html('正在检测手机号...');
                    $.ajax({
                        type: 'POST',
                        url: 'temp/ctel.php',
                        dataType: 'json',
                        data: {
                            't': t ? 'rsChkMb' : 'chkMb',
                            'mb': tel
                        },
                        success: function(r) {
                            if (r.err) {
                                gVar.sign_tip(r.data, this$, t ? '完成' : '注册', 'f_sign');
                            } else {
                                var ver = $.trim($('#mask .sign-ver').val());
                                if (/^\d{6}$/.test(ver)) { // 验证码正确
                                    var pass = $('#mask .sign-pass').val();
                                    if (pass.length > 5 && pass.length < 21) {
                                        this$.html(t ? '正在修改...' : '正在注册...');
                                        $.ajax({
                                            type: 'POST',
                                            url: 'temp/signup.php',
                                            dataType: 'json',
                                            data: {
                                                't': t ? 'forgetMb' : 'regMb',
                                                'user': tel,
                                                'cf': ver,
                                                'pwd': md5(pass),
                                                'token': window.gVar.token
                                            },
                                            success: function(r) {
                                                if (r.err) {
                                                    gVar.sign_tip(r.data, this$, t ? '完成' : '注册', 'f_sign');
                                                } else {
                                                    this$.html(t ? '修改成功' : '注册成功');
                                                    location.reload();
                                                }
                                            },
                                            error: function() {
                                                gVar.sign_tip('网络繁忙，请重试', this$, t ? '完成' : '注册', 'f_sign');
                                            }
                                        });
                                    } else {
                                        gVar.sign_tip('密码格式错误', this$, t ? '完成' : '注册', 'f_sign');
                                    }
                                } else {
                                    gVar.sign_tip('验证码错误', this$, t ? '完成' : '注册', 'f_sign');
                                }
                            }
                        },
                        error: function() {
                            gVar.sign_tip('网络繁忙，请重试', this$, t ? '完成' : '注册', 'f_sign');
                        }
                    });
                } else {
                    gVar.sign_tip('手机号格式错误', this$, t ? '完成' : '注册', 'f_sign');
                }
            }
        },

        signIn: function(this$) {
            if (gVar.f_sign) {
                gVar.f_sign = false;
                var tel = $.trim($('#mask .sign-tel').val());
                if ($.cTel(tel)) {
                    var pass = $('#mask .sign-pass').val();
                    if (pass.length > 5 && pass.length < 21) {
                        this$.html('登录中...');
                        $.ajax({
                            type: 'POST',
                            url: 'temp/signIn.php',
                            dataType: 'json',
                            data: {
                                't': 'loginMb',
                                'user': tel,
                                'zone': '86',
                                'pwd': pass,
                                'pwd': md5(pass),
                                'token': window.gVar.token
                            },
                            success: function(r) {
                                if (r.err) {
                                    gVar.sign_tip(r.data, this$, '登录', 'f_sign');
                                } else {
                                    this$.html('登录成功');
                                    location.reload();
                                }
                            },
                            error: function() {
                                gVar.sign_tip('网络繁忙，请重试', this$, '登录', 'f_sign');
                            }
                        });
                    } else {
                        gVar.sign_tip('密码格式错误', this$, '登录', 'f_sign');
                    }
                } else {
                    gVar.sign_tip('手机号格式错误', this$, '登录', 'f_sign');
                }
            }
        },

        signVer: function(this$, t1, t2) {
            if (gVar.f_ver) {
                gVar.f_ver = false;
                var tel = $.trim($('#mask .sign-tel').val());
                if ($.cTel(tel)) {
                    this$.html('检测手机号...');
                    $.ajax({
                        type: 'POST',
                        url: 'temp/ctel.php',
                        dataType: 'json',
                        data: {
                            't': t1 ? t1 : 'chkMb',
                            'mb': tel
                        },
                        success: function(r) {
                            if (r.err) {
                                gVar.sign_tip(r.data, this$, '发送验证码', 'f_ver');
                            } else {
                                this$.html('正在发送...');
                                $.ajax({
                                    type: 'POST',
                                    url: 'temp/ctel.php',
                                    dataType: 'json',
                                    data: {
                                        't': t2 ? t2 : 'sendCf',
                                        'mb': tel
                                    },
                                    success: function(r) {
                                        if (r.err) {
                                            gVar.sign_tip(r.data, this$, '发送验证码', 'f_ver');
                                        } else {
                                            window.gVar.ver_t = 60;
                                            window.gVar.ver_t_id = setInterval((function() {
                                                return function() {
                                                    if (window.gVar.ver_t-- < 2) {
                                                        clearInterval(window.gVar.ver_t_id);
                                                        delete window.gVar.ver_t_id;
                                                        delete window.gVar.ver_t;
                                                        gVar.sign_tip('', this$, '发送验证码', 'f_ver');
                                                        return;
                                                    }
                                                    this$.html(window.gVar.ver_t + '秒后重试');
                                                }
                                            })(), 1000);
                                        }
                                    },
                                    error: function() {
                                        gVar.sign_tip('网络繁忙，请重试', this$, '发送验证码', 'f_ver');
                                    }
                                });
                            }
                        },
                        error: function() {
                            gVar.sign_tip('网络繁忙，请重试', this$, '发送验证码', 'f_ver');
                        }
                    });
                } else {
                    gVar.sign_tip('手机号格式错误', this$, '发送验证码', 'f_ver');
                }
            }
        },

        signShow: function(t) {
            $('#mask').hide(0).html(t).show(0, function() {
                $(this).find('.sign-m').removeClass('offset-top');
                gVar.f_sign = true;
                gVar.f_ver = true;
            });
        }
    };

    $.extend({
        remaind: function(text, type) {

            $('#mask').append(gVar.remaindCss);

            if (type) {
                $('#remaindMessage').css('color', '#f00').html(text);
            } else {
                $('#remaindMessage').css('color', '#0c9').html(text);
            }

            gVar.maskShow(true);
        },

        showMask: function(type) {

            gVar.maskShow(type);
        },

        // 验证手机号码
        cTel: function(t) {
            var r = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g;
            return t.length === 11 && r.test(t) ? true : false;
        }
    });

    // confirmRemaind
    $('#mask').delegate('#confirmRemaind, .sign-x', 'click', function() {

        gVar.maskShow(false);
    });

    $('#mask').bind('click', function(e) {
        var e = e || window.event,
            elem = e.srcElement || e.target;
        if (elem.id === 'mask') {
            gVar.maskShow(false);
        }
    });

    // sign 注册提交
    $('#mask').delegate('.sign-up-s', 'click', function() {

        gVar.signUp($(this));
    });

    // sign 登录提交
    $('#mask').delegate('.sign-in-s', 'click', function() {

        gVar.signIn($(this));
    });

    // sign 重置密码提交
    $('#mask').delegate('.sign-re-s', 'click', function() {

        gVar.signUp($(this), true);
    });

    // sign 输入框得到焦点
    $('#mask').delegate('input', 'focus', function() {

        $(this).parents('.sign-m').find('.sign-err').html('');
    });

    // sign 输入框回车
    $('#mask').delegate('input', 'keydown', function(e) {
        var k = e.keyCode || e.which;
        if (k === 13) $('#mask .sign-s').trigger('click')
    });

    // sign-up 注册发送验证码
    $('#mask').delegate('.sign-ver-up', 'click', function() {

        gVar.signVer($(this));
    });

    // sign 找回密码发送验证码
    $('#mask').delegate('.sign-ver-re', 'click', function() {

        gVar.signVer($(this), 'rsChkMb', 'rsSendCf');
    });


    // 弹出注册框
    $('.sign-up').bind('click', function() {

        gVar.signShow(gVar.upCss);
    });
    $('#mask').delegate('.sign-up', 'click', function() {

        gVar.signShow(gVar.upCss);
    });

    // 弹出登录框
    $('.sign-in').bind('click', function() {

        gVar.signShow(gVar.inCss);
    });
    $('#mask').delegate('.sign-in', 'click', function() {

        gVar.signShow(gVar.inCss);
    });

    // 弹出忘记密码框
    $('#mask').delegate('.sign-re', 'click', function() {

        gVar.signShow(gVar.reCss);
    });

})(jQuery);

// 自定义工具
var tools = (function() {
    return {
        Cookie: function(c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + "="),
                    c_end;
                if (c_start !== -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end === -1) {
                        c_end = document.cookie.length;
                    }
                    return document.cookie.slice(c_start, c_end);
                }
            }
            return '';
        },

        addCookie: function(name, value, days) {
            var date;
            date = new Date();
            date.setTime(date.getTime() + days * 86400000);
            document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toGMTString() + "; path=/";
        },

        delCookie: function(name) {
            this.addCookie(name, "", -1);
        },

        toThousands: function(n) {
            n += '';
            var fix = n.slice(n.indexOf('.')),
                n = n.slice(0, n.indexOf('.')),
                result = '';
            while (n.length > 3) {
                result = ' , ' + n.slice(-3) + result;
                n = n.slice(0, n.length - 3);
            }
            if (n) {
                result = n + result;
            }
            return result + fix;
        },

        addNum: function(n1, n2) {
            var s1, s2;
            try {
                s1 = n1.toString().split(".")[1].length;
            } catch (e) {
                s1 = 0;
            }
            try {
                s2 = n2.toString().split(".")[1].length;
            } catch (e) {
                s2 = 0;
            }
            s1 = Math.pow(10, Math.max(s1, s2));
            return (~~(n1 * s1) + ~~(n2 * s1)) / s1;
        },

        sunNum: function(n1, n2) {
            var l1, l2;
            try {
                l1 = n1.toString().split(".")[1].length;
            } catch (e) {
                l1 = 0;
            }
            try {
                l2 = n2.toString().split(".")[1].length;
            } catch (e) {
                l2 = 0;
            }
            l1 = Math.pow(10, Math.max(l1, l2)); // 该除的10次方数
            return ~~(~~(n1 * l1) * ~~(n2 * l1)) / (l1 * l1);
        }
    }
})();

// md5
(function() {
    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
    }

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function md51(s) {
        // Converts the string to UTF-8 "bytes" when necessary
        if (/[\x80-\xFF]/.test(s)) {
            s = unescape(encodeURI(s));
        }
        txt = '';
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i;
        for (i = 64; i <= s.length; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++)
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i++) tail[i] = 0;
        }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
    }

    function md5blk(s) { /* I figured global was faster.   */
        var md5blks = [],
            i; /* Andy King said do it this way. */
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) +
                (s.charCodeAt(i + 1) << 8) +
                (s.charCodeAt(i + 2) << 16) +
                (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    var hex_chr = '0123456789abcdef'.split('');

    function rhex(n) {
        var s = '',
            j = 0;
        for (; j < 4; j++)
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
            hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }

    function hex(x) {
        for (var i = 0; i < x.length; i++)
            x[i] = rhex(x[i]);
        return x.join('');
    }

    md5 = function(s) {
        return hex(md51('wdf:' + s));
    }

    /* this function is much faster, so if possible we use it. Some IEs are the
    only ones I know of that need the idiotic second function, generated by an
    if clause.  */
    function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }

    if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
        function add32(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
    }
})();
