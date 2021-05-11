<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect('localhost','root','root','lx');
mysqli_query($con,'set names utf8');
$id = $_GET["id"];
$num = $_GET["num"];
$uname = $_GET["uname"];
$flag = $_GET["flag"];
$id2 = (integer)$id;
$num2 = (integer)$num;
$res = mysqli_query($con,"select * from user_cart where good_id = $id2 and name='$uname'");
$row = mysqli_fetch_assoc($res);
if($row){
    if($flag == 1){
        mysqli_query($con,"update user_cart set good_num=$num2 where good_id=$id and name='$uname'");
    }else{
        $oldnum = (integer)$row["good_num"];
        $newnum = $oldnum+$num2;
        if($newnum>10){
            $newnum = 10;
        }
        mysqli_query($con,"update user_cart set good_num=$newnum where good_id=$id and name='$uname'");
    }
}else{
    mysqli_query($con,"insert user_cart(name,good_id,good_num) values('$uname',$id2,$num2)");
}