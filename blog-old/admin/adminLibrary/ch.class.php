<?php
require 'config.php';
date_default_timezone_set('PRC');
class DB
{
    public $host;
    public $username;
    public $password;
    public $dbname;
    public $conn;
    /**
     * DB类构造函数
     */
    public function __construct()
    {
        $this->host = SAE_MYSQL_HOST_M . ':' . SAE_MYSQL_PORT;
        $this->username = SAE_MYSQL_USER;
        $this->password = SAE_MYSQL_PASS;
        $this->dbname = SAE_MYSQL_DB;
    }
    // 本地开发
    // public function __construct($host = DB_HOST, $username = DB_USER, $password = DB_PASSWORD, $dbname = DB_NAME) {
    //     $this->host = $host;
    //     $this->username = $username;
    //     $this->password = $password;
    //     $this->dbname = $dbname;
    // }
    /**
     * connect database and chatset
     */
    public function open()
    {
        $this->conn = mysqli_connect($this->host, $this->username, $this->password, $this->dbname);
        mysqli_query($this->conn, 'SET NAMES UTF8');
    }
    /**
     * close connect database
     */
    public function close()
    {
        mysqli_close($this->conn);
    }
    /**
     * 通过sql语句获取数据
     */
    public function getObjListBySql($sql)
    {
        $this->open();
        $rs = mysqli_query($this->conn, $sql);
        if ($rs) {
            $objList = array();
            while ($obj = mysqli_fetch_object($rs)) {
                if ($obj) {
                    $objList[] = $obj;
                }
            }
            $this->close();
            return $objList;
        } else {
            $this->close();
            return 'error';
        }
    }
    /**
     * 向数据库表中插入数据
     */
    public function insertData($table, $columns = array(), $values = array())
    {
        $sql = 'insert into ' . $table . ' (';
        for ($i = 0; $i < sizeof($columns); $i++) {
            //把列之间添加逗号分隔
            $sql .= $columns[$i];
            if ($i < sizeof($columns) - 1) {
                $sql .= ',';
            }
        }
        $sql .= ') values ( ';
        for ($i = 0; $i < sizeof($values); $i++) {
            //把值之间添加逗号分隔
            $sql .= '\'' . $values[$i] . '\'';
            if ($i < sizeof($values) - 1) {
                $sql .= ',';
            }
        }
        $sql .= ' )';
        $this->open();
        $rs = mysqli_query($this->conn, $sql);
        $insertId = mysqli_insert_id($this->conn);
        if ($rs && $insertId) {
            $this->close();
            return $insertId;
        } else {
            $this->close();
            return 'error';
        }
    }
    /**
     * 通过表中某字段，删除记录
     */
    public function delete($tableName, $atrName, $atrValue)
    {
        $this->open();
        $deleteResult = false;
        if (mysqli_query($this->conn, 'DELETE FROM ' . $tableName . " WHERE {$atrName} = '{$atrValue}'")) {
            $deleteResult = true;
        }
        $this->close();
        return $deleteResult;
    }
    /**
     * 通过sql语句更新数据 或者操作数据
     */
    public function updataBySql($sql)
    {
        $this->open();
        $rs = mysqli_query($this->conn, $sql);
        //$re为返回的结果
        $this->close();
        if ($rs) {
            return 'yes';
        } else {
            return 'error';
        }
    }
}