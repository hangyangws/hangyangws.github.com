;
(function($) {

    // global val
    var globalVar = {

        urlArr: $.urlGet(),
        article: '',
        f_like: true,

        showPage: function() {

            $.loading(true);

            // get url article for article
            globalVar.article = globalVar.urlArr['article'];

            if (globalVar.article && globalVar.urlArr['len'] === 1) {
                // ajax start
                $.post("operation/operation.php", {
                    'type': 'article',
                    'artId': globalVar.article
                }, function(data, status) {
                    if (status) { //success
                        if (data === 'error') { //query error

                            $.loading(false);
                            $.remaind('加载失败 请刷新页面', true);
                        } else { //query success

                            var article = JSON.parse(data);
                            var articleHtml = "";

                            if (article.length === 1) {
                                var articleHtml =
                                    "<article>" +
                                    "<h1 data-role='title'>" + article[0]['ey_title'] + "</h1>" +
                                    "<h3 data-role='subTitle'>" + article[0]['ey_subt'] + "</h3>" +
                                    article[0]['ey_con'] +
                                    "</article>" +
                                    "<aside class='border-box'>" +
                                    "<span title='还不错/Pretty good' class='transtion like animated'  data-index='" + globalVar.article + "'>&#xe600;<em>" + article[0]['ey_like'] + "</em></span>" +
                                    "</aside>";

                                document.title = "航洋-" + article[0]['ey_title'];

                                $("#viewArticleWrap").append(articleHtml);

                                $.loading(false);
                            } else { //data is empty
                                $.jump('./error.html');
                            }
                        }
                    } else { //error
                        $.loading(false);
                        $.remaind('加载失败 请刷新页面', true);
                    }
                });
            } else {
                $.jump('./error.html');
            }
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
                        thisArt.removeClass('rubberBand');
                        globalVar.f_like = true;
                    }
                });
            }
        }
    }

    globalVar.showPage();

    // like
    $('#viewArticleWrap').delegate('aside>span.like', 'click', function() {

        globalVar.like($(this));
    });

})(jQuery);
