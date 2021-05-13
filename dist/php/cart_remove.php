<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect('localhost','root','root','lx');
mysqli_query($con,'set names utf8');
$uname = $_GET["uname"];
$id = $_GET["id"];
$id2 = (integer)$id;
$bool = mysqli_query($con,"delete from user_cart where name='$uname' and good_id=$id2");
echo json_encode(1);
