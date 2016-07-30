"use strict";
// made by fj 2015 09 27

var Move = (function() {
    var ing = true,
        wrap = fj.id('wrap'),
        ball = fj.id('ball'),
        X = fj.id('x'),
        Y = fj.id('y');

    return {
        to: function(x, y) {
            wrap.style.transform = 'translateX(' + x + 'px)';
            ball.style.transform = 'translateY(' + y + 'px)';
            X.innerHTML = ~~x;
            Y.innerHTML = ~~y;
        },
        move: function() {
            var time, that, t_id;
            if (ing) {
                ing = false;
                time = 0;
                that = this;
                fj.addClass(fj.id('scroll'), 'go');
                t_id = setInterval(function() {
                    that.to((time + 0.01) * 258, 0.5 * 80 * (time + 0.01) * (time + 0.01));
                    time += 0.006;
                    time > 3.524 && (
                        clearInterval(t_id),
                        ing = true,
                        fj.removeClass(fj.id('scroll'), 'go')
                    );
                }, 0.01);
            }
        }
    }
})()

fj.on(fj.id('run'), 'click', function() {
    Move.move();
});
