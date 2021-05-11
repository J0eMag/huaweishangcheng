<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect('localhost','root','root','lx');
mysqli_query($con,'set names utf8');
$uname = $_GET["name"];
$res = mysqli_query($con,"select * from user_cart where name = '$uname'");
while($row = mysqli_fetch_assoc($res)){
    $arr[]=$row;
};
echo json_encode($arr);