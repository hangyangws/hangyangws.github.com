;
(function($) {

    var globalVal = {

        loadCss: '<div class="middle load-wrap">' +
            '<div class="sk-spinner sk-spinner-cube-grid">' +
            '<div class="sk-cube"></div>' +
            '<div class="sk-cube"></div>' +
            '<div class="sk-cube"></div>' +
            '<div class="sk-cube"></div>' +
            '<div class="sk-cube"></div>' +
            '<div class="sk-cube"></div>' +
            '<div class="sk-cube"></div>' +
            '<div class="sk-cube"></div>' +
            '<div class="sk-cube"></div>' +
            '</div>' +
            '</div>',

        remaindCss: '<div class="middle english-font remaind-wrap">' +
            '<span id="remaindMessage"></span>' +
            '<span id="confirmRemaind" class="transtion">确定</span>' +
            '</div>',

        maskShow: function(type) {

            if (type) {
                $('#loadMask').css('display', 'block');
            } else {
                $('#loadMask').children().remove().end().css('display', 'none');
            }
        }
    }

    $.extend({

        urlGet: function() {

            var aQuery = window.location.href.split("?"),
                aGET = [],
                aTmp;

            if (aQuery.length === 2) {

                var aBuf = aQuery[1].split("&");
                for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {

                    aTmp = aBuf[i].split("="); //分离key与Value
                    aGET[aTmp[0]] = aTmp[1];
                }

                aGET['len'] = aBuf.length;
            }

            return aGET;
        },

        jump: function(url) {
            location.href = url;
        },

        remaind: function(text, type) {

            $('#loadMask').append(globalVal.remaindCss);

            if (type) {
                $('#remaindMessage').css('color', '#f00').html(text);
            } else {
                $('#remaindMessage').css('color', '#0c9').html(text);
            }

            globalVal.maskShow(true);
        },

        loading: function(type) {

            if (type) {
                $('#loadMask').append(globalVal.loadCss);
                globalVal.maskShow(true);
            } else {
                globalVal.maskShow(false);
            }
        },

        showMask: function(type) {

            globalVal.maskShow(type);
        },

        eachDispaly: function(Doms) {

            for (var key in Doms) {

                if (key === 'true') {
                    Doms[key].css('display', 'block');
                } else {
                    Doms[key].css('display', 'none');
                }
            }
        },

        checkText: function(text) {

            if (text.replace(/^[\u4e00-\u9fa5_a-zA-Z0-9\s]+$/, "") !== "" || text === "") {
                return false;
            } else {
                return true;
            }
        },

        checkTextEnglish: function(text) {

            if (text.replace(/^[a-zA-Z0-9]+$/, "") !== "" || text === "") {
                return false;
            } else {
                return true;
            }
        }
    });

    // confirmRemaind
    $('#loadMask').delegate('#confirmRemaind', 'click', function() {
        globalVal.maskShow(false);
    });

})(jQuery);
