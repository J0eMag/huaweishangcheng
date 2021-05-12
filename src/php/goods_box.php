<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect('localhost','root','root','lx');
mysqli_query($con,'set names utf8');
$id = $_GET["id"];
$pid = $_GET["pid"];
if($id){
    $res = mysqli_query($con,"select * from goods_box where num = '$id'");//首页请求
    $arr = [];
    while($row = mysqli_fetch_assoc($res)){
        $arr[] = $row;
    };
}else{
    if($pid){
        $res = mysqli_query($con,"select * from goods_box where id = '$pid'");//详情页请求
        $arr = [];
        while($row = mysqli_fetch_assoc($res)){
            $arr[] = $row;
        };
    }else{
        $res = mysqli_query($con,"select * from goods_box");//列表页请求
        $arr = [];
        while($row = mysqli_fetch_assoc($res)){
        $arr[] = $row;
    };
    }
}
echo json_encode($arr);