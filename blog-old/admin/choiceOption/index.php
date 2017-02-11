<?php
    if(!session_id()){session_start();}
    if (isset($_SESSION['enter']) && $_SESSION['enter']) {//has set session enter
?>
    <!DOCTYPE html>
    <html lang="zh-cmn-Hans">
        <head>
            <meta name="renderer" content="webkit" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta charset="UTF-8" />
            <title>航洋-管理</title>
            <meta http-equiv="Cache-Control" content="no-siteapp" />

            <link rel="shortcut icon" type="image/png" href="../../img/title_icon.png" />

            <!-- librery -->
            <link rel="stylesheet" href="../../css/library.css" />
            <link rel="stylesheet" href="../../css/animate.css" />
            <link rel="stylesheet" href="../../css/loading.css" />

            <!-- self -->
            <link rel="stylesheet" href="../../css/option.css" />

            <!-- editor need -->
            <link rel="stylesheet" href="editor/themes/default/default.css" />
            <link rel="stylesheet" href="editor/plugins/code/prettify.css" />

            <!--[if lt IE 10]>
                <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
                <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
            <![endif]-->
            <!--[if lt IE 9]>
                <script>window.location.href = 'ie.html';</script>
            <![endif]-->
        </head>
        <body id="body">

            <!-- main -->
            <div id="optionChoice" class="english-font middle border-box">
                <span><a href="../../">主页</a></span>
                <span id="choicePublish" class="transtion">发布</span>
                <span id="choiceOperate" class="transtion">管理</span>
            </div>

            <!-- publish -->
            <div id="optionPublish" class="transtion">
                <a class="option-back english-font transtion" href="index.php">返回</a>
                <form id="articleForm" action="addArticle.php" method="POST" class="border-box">
                    <input id="hiddenType" type="hidden" name="type" value="0" />
                    <input id="choiceType" type="button" name="typename" value="类型[未选择]" class="english-font" />
                    <input id="articleName" type="text" name="title" placeholder="标题" class="english-font border-box" required />
                    <input id="articleSubTitle" type="text" name="subtitle" placeholder="副标题" class="english-font border-box" required />
                    <textarea name="articlemain" id="articleMain" class="english-font border-box" placeholder="文章主体" required></textarea>
                    <input name="submit" type="submit" value="发布" class="english-font border-box transtion" />
                </form>
            </div>

            <!-- operate -->
            <div id="optionOperate" class="transtion">
                <a class="option-back english-font transtion" href="index.php">返回</a>
                <ul id="deleteList" class="border-box english-font"></ul>
            </div>

            <!-- load mask -->
            <div id="loadMask"></div>

            <!-- librery -->
            <script src="../../js/jq.js"></script>
            <script src="../../js/public.js"></script>

            <!-- self -->
            <script src="../../js/option.js"></script>

            <!-- editor -->
            <script src="editor/kindeditor.js"></script>
            <script src="editor/lang/zh_CN.js"></script>
            <script src="editor/plugins/code/prettify.js"></script>

            <script>
                KindEditor.ready(function(K) {

                    var options = {
                        cssPath : 'editor/plugins/code/prettify.css',
                        uploadJson : 'editor/php/upload_json.php',
                        fileManagerJson : 'editor/php/file_manager_json.php',
                        width : '100%',
                        allowFileManager : true,
                        resizeType : 1,

                        afterCreate : function(){
                                            this.sync();
                                        },
                        afterChange : function(){
                                            this.sync();
                                        },
                        afterBlur : function(){
                                            this.sync();
                                        }
                    };

                    var editor = K.create('#articleMain', options);

                    editor.sync();
                });
            </script>
        </body>
    </html>
<?php
    }else{
        header("Location: ../../error.html");
    }
?>