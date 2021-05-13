<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect('localhost','root','root','lx');
mysqli_query($con,'set names utf8');
$china = $_POST["china"];
$psd = $_POST["psd"];
$name = $_POST["name"];
$birthday = $_POST["birthday"];
$res = mysqli_query($con,"select * from user where name = '$name'");
$row = mysqli_fetch_assoc($res);
if($row){
    $arr = [
        "meta"=>[
            "status"=>2,
            "message"=>"手机号或邮箱已注册!"
        ],
        "data"=>null
    ];
}else{
    $bool = mysqli_query($con,"insert user(name,psd,china,birthday) values('$name','$psd','$china',$birthday)");
    if($bool){
        $arr = [
            "meta"=>[
                "status"=>1,
                "message"=>"注册成功,即将前往登陆页面..."
            ],
            "data"=>null
        ];
    }else{
        $arr = [
            "meta"=>[
                "status"=>0,
                "message"=>"注册失败!"
            ],
            "data"=>null
        ];
    }
}
echo json_encode($arr);