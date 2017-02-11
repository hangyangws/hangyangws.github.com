<?php

	if(!session_id()){session_start();}
	if () {//has set password
		// 密码正确

			$_SESSION['enter']=$_POST['password'];
			return "1";
		// 密码错误
			return "0";
	}else{
		header("Location: ../../error.html");
	}
?>