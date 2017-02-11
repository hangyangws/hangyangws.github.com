<?php

  if (isset($_POST['type'])) {

    include("../admin/adminLibrary/ch.class.php");
    $db = new DB();

    switch ($_POST['type']) {

      case 'skillList':
        $rs = $db->getObjListBySql("SELECT * FROM `hy_type`");
        if ($rs === 'error') {
          echo 'error';
        } else {
          echo json_encode($rs);
        }
        break;

      case 'addType':
        $addName = $_POST['name'];
        $rs = $db->insertData("hy_type",array("type_name"),array($addName));
        if ($rs === 'error') {
          echo 'error';
        } else {
          echo $rs;
        }
        break;

      case 'articleDome':
        $id = $_POST['essayId'];
        $rs = $db->getObjListBySql("SELECT `ey_id`,`ey_title`,`ey_subt`,`ey_like` FROM `hy_essay` WHERE `ey_type` = $id ORDER BY `ey_date` DESC");
        if ($rs === 'error') {
          echo 'error';
        } else {
          echo json_encode($rs);
        }
        break;

      case 'artDelete':
        $rs = $db->getObjListBySql("SELECT `ey_id`,`ey_title` FROM `hy_essay` ORDER BY `ey_date` DESC");
        if ($rs === 'error') {
          echo 'error';
        } else {
          echo json_encode($rs);
        }
        break;

      case 'deleteArt':
        $deleteId = $_POST['deleteId'];
        $rs = $db->delete("hy_essay","ey_id",$deleteId);
        if ($rs) {
          echo 'yes';
        } else {
          echo 'error';
        }
        break;

      case 'artSeaDome':
        $search = '\'%'.$_POST['searchCon'].'%\'';
        $rs = $db->getObjListBySql("SELECT `ey_id`,`ey_title`,`ey_subt`,`ey_like` FROM `hy_essay` WHERE CONCAT(`ey_title`,`ey_subt`,`ey_con`)  LIKE $search ORDER BY `ey_date` DESC");
        if ($rs === 'error') {
          echo 'error';
        } else {
          echo json_encode($rs);
        }
        break;

      case 'article':
        $artId = $_POST['artId'];
        $rs = $db->getObjListBySql("SELECT `ey_title`,`ey_subt`,`ey_like`,`ey_con` FROM `hy_essay` WHERE `ey_id` = $artId");
        if ($rs === 'error') {
          echo 'error';
        } else {
          echo json_encode($rs);
        }
        break;

      case 'pass':
        $code = sha1(md5($_POST['code']));
        $rs = $db->getObjListBySql("SELECT `ht_id` FROM `hy_host` WHERE `ht_pass` = '$code'");
        if ($rs === 'error') {
          echo 'error';
        } else {
          if (count($rs) === 1 && $rs[0]->ht_id === "1") {
            if(!session_id()){session_start();}
            $_SESSION['enter'] = true;
            echo "yes";
          } else {
            echo 'no';
          }
        }
        break;

      case 'updataLike':
        $essayId = $_POST['essayId'];
        $nowNum = $db->getObjListBySql("SELECT `ey_like` FROM `hy_essay` WHERE `ey_id` = $essayId");
        if ($nowNum !== 'error') {
          $changeNum = ($nowNum[0]->ey_like)+1;
          $rs = $db->updataBySql("UPDATE `hy_essay` SET `ey_like` = $changeNum WHERE `ey_id` = $essayId");
          if ($rs !== 'error') {
            echo $changeNum;
          } else {
            echo 'error';
          }
        } else {
          echo 'error';
        }
        break;

      default:
        break;
    }
  } else {
    header("Location: ../error.html");
  }
?>