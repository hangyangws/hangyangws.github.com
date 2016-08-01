var Pj = (function($) {
    "use strict";
    return new(function() {
        // roll img 私有变量
        var _rollImg_wrap = $('#rollImg').find('.r-i-wrap').find('figure'),
            _rollImg_div = _rollImg_wrap.find('div'),
            _rollImg_len = _rollImg_div.length, // 原始图片数量
            _rollImg_now = 0,
            _rollImg_left = ~~(_rollImg_len / 2) + 1,
            _rollImg_right = _rollImg_left + _rollImg_len - 1,
            _roll_is = true;
        this.rollImgMove = function(n, t, mask) { // n 表示要移动到的节点下标, t 表示是否要过度, make 表示是有mask蒙层放大
            if (_roll_is) {
                if (t) {
                    _roll_is = false;
                    setTimeout(function() {
                        _roll_is = true;
                        // 极端检测
                        _rollImg_now === _rollImg_left - 1 && ( // 已经到了左边的极限位置
                            Pj.rollImgMove(_rollImg_right)
                        );
                        _rollImg_now === _rollImg_right + 1 && ( // 已经到了右边的极限位置
                            Pj.rollImgMove(_rollImg_left)
                        );
                    }, 1000)
                }
                var d = _rollImg_div.eq(n), // 要滚动到的图片
                    l = 500 - d.position().left - d.width() / 2, // 要滚动的距离
                    ts = _rollImg_wrap.add(d).add(_rollImg_div.eq(_rollImg_now));
                // 判断是否有 mask 蒙层
                mask && (
                        Pj.rollImgPlay(d, true)
                    )
                    // 过度动画的是否
                t && ts.addClass('i-ts1') || ts.removeClass('i-ts1');
                // 以前的去掉active 现在的加上active
                _rollImg_div.eq(_rollImg_now).removeClass('active').end().eq(n).addClass('active');
                // 整体位置移动
                _rollImg_wrap.css({
                    '-webkit-transform': 'translateX(' + l + 'px)',
                    '-moz-transform': 'translateX(' + l + 'px)',
                    '-ms-transform': 'translateX(' + l + 'px)',
                    '-o-transform': 'translateX(' + l + 'px)',
                    'transform': 'translateX(' + l + 'px)'
                });
                // 重新赋值 现在的图片下标
                _rollImg_now = n
            }
        };
        this.rollImgCheck = function() { // 检测图片加载是否完成
            var t,
                i = _rollImg_len,
                ok = true;
            t = setInterval(function() {
                while (i--) { // 检测roll img 的所有图片是否加载完毕
                    if (!_rollImg_div.eq(i).find('img')[0].complete) {
                        ok = false;
                        break
                    }
                }
                if (ok) {
                    clearInterval(t);
                    i = _rollImg_len;
                    while (i--) { // 检测哪些图片是需要视频播放的
                        _rollImg_div.eq(i).data('video') && (
                            _rollImg_div.eq(i).append('<i class="r-i-viedo"></i>')
                        )
                    }
                    _rollImg_len < 3 && (
                        _rollImg_wrap.html(_rollImg_wrap.html() + _rollImg_wrap.html()),
                        _rollImg_div = _rollImg_wrap.find('div'),
                        _rollImg_len = _rollImg_len * 2,
                        _rollImg_left = ~~(_rollImg_len / 2) + 1,
                        _rollImg_right = _rollImg_left + _rollImg_len - 1
                    );
                    Pj.rollImgIni()
                }
                ok = true;
                i = _rollImg_len
            }, 50)
        };
        this.rollImgIni = function() {
            // 增加节点数（2n+1）
            _rollImg_wrap.html(_rollImg_wrap.html() + _rollImg_wrap.html() + _rollImg_div.get(0).outerHTML);
            // 重置信息
            _rollImg_div = _rollImg_wrap.find('div');
            // 父元素移动至中点 中点元素放大
            Pj.rollImgMove(_rollImg_len);
            // 绑定
            $('#rollImg').on('click', '.r-i-prev', function() {
                Pj.rollImgPrev()
            });
            $('#rollImg').on('click', '.r-i-next', function() {
                Pj.rollImgNext()
            })
        };
        this.rollImgPrev = function(mask) {
            Pj.rollImgMove(_rollImg_now - 1, true, mask)
        };
        this.rollImgNext = function(mask) {
            Pj.rollImgMove(_rollImg_now + 1, true, mask)
        };
        this.rollImgPlay = function($this, f) { // f 表示是否只需要渲染mask图片和视频 默认为false
            var wW = $(window).width(),
                wH = $(window).height(),
                i_w = $this.width(), // 当前激活图片的 宽
                i_h = $this.height(), // 当前激活图片的 高
                src = $this.data('video') ? '<embed class="w1 h1" src="' + $this.data('video') + '?VideoIDS=XMjkxMDgzMjk2=&isAutoPlay=true&showAd=0" allowFullScreen="true" quality="high" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>' : '<img class="w1 h1" src="' + $this.find('img').attr('src') + '" alt="img" />';

            wW / wH > i_w / i_h && ( //宽屏
                wH = wH * 0.7,
                wW = i_w / i_h * wH
            ) || ( //竖屏
                wW = wW * 0.7,
                wH = wW / (i_w / i_h)
            );

            f && (
                $('#mask').find('.r-i-mask-item').css({
                    width: wW + 'px',
                    height: wH + 'px'
                }).html(src)
            ) || (
                $('#mask').html('<span class="r-i-m-prev fl w30 h30 pr radius50 cp ts4 z1"></span>' +
                    '<span class="r-i-m-next fr w30 h30 pr radius50 cp ts4 z1"></span>' +
                    '<span class="r-i-close w30 h30 pa r0 radius50 cp ts4 z1" title="关闭窗口"></span>' +
                    '<div style="width:' + wW + 'px;height:' + wH + 'px" class="r-i-mask-item middle ts4 pr">' + src + '</div>').fadeIn(400)
            )
        };
        this.rollImgResize = function() {
            // 判断是否放大
            if ($('#mask').css("display") === 'block') {
                var re_time;
                clearTimeout(re_time);
                re_time = setTimeout(function() {
                    var wW = $(window).width(),
                        wH = $(window).height(),
                        img = _rollImg_wrap.find('.active'), // 当前激活图片
                        i_w = img.width(), // 当前激活图片的 宽
                        i_h = img.height(); // 当前激活图片的 高
                    wW / wH > i_w / i_h && ( //宽屏
                        wH = wH * 0.7,
                        wW = i_w / i_h * wH
                    ) || ( //竖屏
                        wW = wW * 0.7,
                        wH = wW / (i_w / i_h)
                    );

                    $('#mask').find('.r-i-mask-item').css({
                        'width': wW,
                        'height': wH
                    })
                }, 500);
            }
        }
    })
})(jQuery);

Pj.rollImgCheck();

// roll img 鼠标交互

// 点击 图片 或 视频 （进行放大）
$('#rollImg').on('click', 'div.active', function() {
    Pj.rollImgPlay($(this))
});

// roll img 关闭窗口
$('#mask').on('click', '.r-i-close', function() {
    $.showMask(false)
});

// roll img 下一张图
$('#mask').on('click', '.r-i-m-next', function() {
    Pj.rollImgNext(true)
});

// roll img 上一张图
$('#mask').on('click', '.r-i-m-prev', function() {
    Pj.rollImgPrev(true)
});

// mask 窗口大小改变事件
$(window).resize(function() {
    Pj.rollImgResize()
});
