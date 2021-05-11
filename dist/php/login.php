<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect('localhost','root','root','lx');
mysqli_query($con,'set names utf8');
$psd = $_POST["psd"];
$name = $_POST["name"];
$res = mysqli_query($con,"select * from user where name = '$name'");
$row = mysqli_fetch_assoc($res);
if($row){
    if($row["psd"] === $psd){
        $arr = [
            "meta"=>[
                "status"=>1,
                "message"=>"登陆成功"
            ],
            "data"=>$row["name"]
        ];
    }else{
        $arr = [
            "meta"=>[
                "status"=>2,
                "message"=>"密码错误"
            ],
            "data"=>null
        ];
    }
}else{
    $arr = [
        "meta"=>[
            "status"=>0,
            "message"=>"用户名不存在"
        ],
        "data"=>null
    ];
}
echo json_encode($arr);