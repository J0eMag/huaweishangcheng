<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect('localhost','root','root','lx');
mysqli_query($con,'set names utf8');
$id = $_GET["id"];
$res = mysqli_query($con,"select * from goods_img where pid = '$id'");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
};
echo json_encode($arr);