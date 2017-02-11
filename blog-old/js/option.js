;
(function($) {

    var globalVal = {

        isDelete: true,
        f_add: true,
        choiceType: false,
        title: false,
        subTitle: false,

        addTypeCss: '<div id="fallPageChoice" class="english-font">' +
            '<span id="addType" class="transtion radius animated" title="添加" data-index="add">+</span>' +
            '<span id="addCancel" data-index="cancel">取消</span>' +
            '<input id="addTypeItem" class="input transtion animated" type="text" placeholder="输入添加类型" title="回车确认" />',

        showChoiceType: function() {

            $.loading(true);
            // ajax start
            $.post("../../operation/operation.php", {
                'type': 'skillList'
            }, function(data, status) {

                if (status) { //success

                    if (data === 'error') { //query error
                        $.remaind("加载失败 重试 或 刷新页面", true);
                    } else { //query success

                        var typeList = JSON.parse(data);

                        var typeListTemp = globalVal.addTypeCss;

                        for (var i = typeList.length - 1; i >= 0; i--) {
                            typeListTemp += '<span class="transtion type-item" data-index="' + typeList[i]['type_id'] + '">' + typeList[i]['type_name'] + '</span>';
                        }

                        typeListTemp += '</div>';

                        $.showMask(false);

                        $('#loadMask').append(typeListTemp);

                        $.showMask(true);
                    }
                } else { //error
                    $.loading(false);
                    $.remaind("加载失败 重试 或 刷新页面", true);
                }
            });
        },

        startAdd: function() {

            $('#addType').removeClass('fadeInRightBig').addClass('fadeOutRightBig');
            $('#addTypeItem').removeClass('flipOutY').css('display', 'inline-block').addClass('flipInY');
        },

        typeClick: function(name, id) {

            if (name === "+" && id === "add") {
                globalVal.startAdd();
            } else if (name === "取消" && id === "cancel") {
                $.showMask(false);
            } else {

                $('#choiceType').val(name);
                $('#hiddenType').val(id);
                globalVal.choiceType = true;
                $.showMask(false);
            }
        },

        endAdd: function() {

            $('#addTypeItem').removeClass('flipInY').delay(1200).show(function() {

                $(this).addClass('flipOutY').removeAttr("readonly").css('color', '#0c9').val('').hide(function() {

                    $('#addType').removeClass('fadeOutRightBig').addClass('fadeInRightBig');
                    globalVal.f_add = true;
                });
            });
        },

        addRemaind: function(text, type) {

            if (type) {
                $('#addTypeItem').css('color', '#fff').val(text).attr("readonly", "readonly");
            } else {
                $('#addTypeItem').css('color', '#f00').val(text).attr("readonly", "readonly");
            }
        },

        addType: function(key) {

            if (key === 13 && globalVal.f_add) {

                globalVal.f_add = false;
                var addTypeText = $.trim($('#addTypeItem').val());

                if ($.checkTextEnglish(addTypeText)) {

                    globalVal.addRemaind('正在添加/adding', true);
                    $.post("../../operation/operation.php", {
                        'type': 'addType',
                        'name': addTypeText
                    }, function(data, status) {

                        if (status) { //success

                            if (data === 'error') { //query error
                                globalVal.addRemaind('添加失败 请重试', false);
                                globalVal.endAdd();
                            } else { //query success
                                var returnId = data;
                                $('#fallPageChoice').append('<span class="transtion type-item" data-index="' + returnId + '">' + addTypeText + '</span>');
                                globalVal.addRemaind('添加成功/success', true);
                                globalVal.endAdd();
                            }
                        } else { //error
                            globalVal.addRemaind('添加失败 请重试', false);
                            globalVal.endAdd();
                        }
                    });
                } else {
                    globalVal.addRemaind('添加失败 请重试', false);
                    globalVal.endAdd();
                }
            }
        },

        loadArticle: function() {

            $.eachDispaly({
                false: $('#optionChoice'),
                true: $('#optionOperate')
            });

            // mask show
            $.loading(true);
            // ajax start
            $.post("../../operation/operation.php", {
                'type': 'artDelete'
            }, function(data, status) {

                if (status) { //success

                    if (data === 'error') { //query error
                        $.remaind("加载失败", true);
                    } else { //query success
                        var articleList = JSON.parse(data);
                        var tempList = '';
                        for (var i = 0, length = articleList.length; i < length; i++) {

                            tempList +=
                                "<li>" +
                                "<a class='toleft title' target='_blank' href='../../view.html?article=" + articleList[i]['ey_id'] + "'>" + articleList[i]['ey_title'] + "</a>" +
                                "<span class='delete toright' data-index='" + articleList[i]['ey_id'] + "'>删除</span>" +
                                "</li>";
                        }

                        if (tempList === "") {
                            tempList = "<span class='empty-data'>没有数据/Empty</apan>";
                        }

                        $('#deleteList').append(tempList);
                        $.loading(false);
                    }
                } else { //error

                    $.remaind('加载失败 请重试', true);
                }
            });
        },

        deleteArticle: function(thisArticle, thisLi) {

            if (globalVal.isDelete) {
                globalVal.isDelete = false;
                $.loading(true);
                // ajax start
                $.post("../../operation/operation.php", {
                    'type': 'deleteArt',
                    'deleteId': thisArticle
                }, function(data, status) {

                    if (status && data === 'yes') { //success
                        $.loading(false);
                        $.remaind('删除成功', false);
                        thisLi.parent().slideUp(100);
                        globalVal.isDelete = true;
                    } else { //error
                        $.loading(false);
                        $.remaind('删除失败', true);
                        globalVal.isDelete = true;
                    }
                });
            }
        },

        checkSubmit: function() {

            var title = $('#articleName').val(),
                subTitle = $('#articleSubTitle').val();

            if ($.checkText(title)) {
                globalVal.title = true;
            }

            if ($.checkText(subTitle)) {
                globalVal.subTitle = true;
            }

            if (globalVal.choiceType && globalVal.title && globalVal.subTitle) {
                return true;
            } else {
                $.remaind('请填写完文章内容 且确定内容无误', true);
                return false;
            }
        }
    };

    // publish
    $('#choicePublish').bind('click', function() {
        $.eachDispaly({
            false: $('#optionChoice'),
            true: $('#optionPublish')
        });
    });

    $('#choiceType').bind('click', function() {
        globalVal.showChoiceType();
    });

    // span click
    $('#loadMask').delegate('div>span[data-index]', 'click', function() {

        globalVal.typeClick($(this).html(), $(this).attr('data-index'));
    });

    // input keydown
    $('#loadMask').delegate('input#addTypeItem', 'keydown', function(e) {
        e = e || window.event || arguments.callee.caller.arguments[0];
        var _k = e.keyCode || e.which || e.charCode;
        globalVal.addType(_k);
    });

    // choicOperate
    $('#choiceOperate').bind('click', function() {

        globalVal.loadArticle();
    });

    $('#deleteList').delegate('li>span.delete', 'click', function() {

        globalVal.deleteArticle($(this).attr('data-index'), $(this));
    });

    // form submit
    $('#articleForm').bind('submit', function() {

        return globalVal.checkSubmit();
    });

})(jQuery);
