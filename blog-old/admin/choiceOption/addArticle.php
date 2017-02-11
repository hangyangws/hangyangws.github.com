<?php
    if(!session_id()){session_start();}
    if (isset($_POST['submit']) && isset($_SESSION['enter']) && $_SESSION['enter']) {
        include("../adminLibrary/ch.class.php");
        $db = new DB();
?>
        <!DOCTYPE html>
        <html lang="zh-cmn-Hans">
            <head>
                <meta charset="UTF-8" />
                <title>航洋-文章保存</title>

                <meta name="author" content="@echo冯杰,hangyangws,www.hangyangws.sinaapp.com" />
                <meta name="viewport" content="target-densitydpi=medium-dpi, width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
                <meta name="robots" content="index,follow" />
                <meta name="renderer" content="webkit" />
                <meta name="HandheldFriendly" content="true" />
                <meta name="MobileOptimized" content="320" />
                <meta name="screen-orientation" content="portrait" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="apple-touch-fullscreen" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="full-screen" content="yes" />
                <meta name="screen-orientation" content="portrait" />
                <meta name="x5-orientation" content="portrait" />
                <meta name="x5-fullscreen" content="true" />
                <meta name="x5-page-mode" content="app" />
                <meta name="browsermode" content="application" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta http-equiv="Cache-Control" content="no-siteapp" />

                <link rel="shortcut icon" type="image/gif" href="../../img/title_icon.png" />

                <!-- librery -->
                <link rel="stylesheet" href="../../css/library.css" />
                <link rel="stylesheet" href="../../css/loading.css" />

                <!--[if lt IE 10]>
                    <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
                    <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
                <![endif]-->
                <!--[if lt IE 9]>
                    <script>window.location.href = 'ie.html';</script>
                <![endif]-->
            </head>
            <body>

                <div id="loadMask"></div>

                <script src="../../js/jq.js"></script>
                <script src="../../js/public.js"></script>

                <script>
                    (function($){

                        $.loading(true);

                        $('#loadMask').on('click', '#confirmRemaind', function() {
                            $.jump('index.php');
                        });
                    })(jQuery);
                </script>
<?php
                $col = array("ey_type","ey_title","ey_subt","ey_con","ey_date");
                $val = array(
                        $_POST['type'],
                        $_POST['title'],
                        $_POST['subtitle'],
                        $_POST['articlemain'],
                        date("Y-m-d")
                    );

                $rs = $db->insertData("hy_essay", $col, $val);
                if ($rs === 'error') {
?>
                    <script>
                        (function($){
                            $.showMask(false);
                            $.remaind("保存失败",true)
                        })(jQuery)
                    </script>
<?php
                } else {
?>
                    <script>
                        (function($){
                            $.showMask(false);
                            $.remaind("保存成功",false)
                        })(jQuery)
                    </script>
<?php
                }
?>
            </body>
        </html>
<?php
    } else {
        header("Location: ../../error.html");
    }
?>