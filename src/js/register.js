$(".email_register").click(function(){
    let inp = $("<input type='text' name='email' placeholder='请输入邮箱'>");
    $("input[name='phone']")
        .replaceWith(inp);
    $(".email_register")
        .addClass("check")
        .prev()
        .removeClass("check");
});
$(".phone_register").click(function(){
    let inp = $("<input type='text' name='phone' placeholder='请输入手机号'>");
    $("input[name='email']")
        .replaceWith(inp);
    $(".phone_register")
        .addClass("check")
        .next()
        .removeClass("check");
});
$("button").click(function(){
    let china = $("input[name='china']").val();
    let psd = $("input[name='password']").val();
    let repsd = $("input[name='repassword']").val();
    let birthday = $("input[name='time']").val();
    let name = null;
    if(china === ""){
        layer.msg("国家或地区不能为空");
        return false;
    }
    console.log($("input[name='phone']").length);
    if($("input[name='phone']").length > 0){
        if($("input[name='phone']").val() === ""){
            layer.msg("手机号不能为空");
            return false;
        }
        if(!(/^1[3456789]\d{9}$/).test($("input[name='phone']").val())){
            layer.msg("手机号格式错误");
            return false;
        }
        name = $("input[name='phone']").val();
    }else{
        if($("input[name='email']").val() === ""){
            layer.msg("邮箱不能为空");
            return false;
        }
        if(!(/^[123456789]\d{4,9}@qq\.com$/).test($("input[name='email']").val())){
            layer.msg("邮箱格式错误");
            return false;
        }
        name = $("input[name='email']").val();
    }
    if(psd === ""){
        layer.msg("密码不能为空");
        return false;
    }
    if(!(/^.{6,16}$/).test(psd)){
        layer.msg("密码长度或格式错误");
        return false;
    }
    if(repsd === ""){
        layer.msg("重复密码不能为空");
        return false;
    }
    if(repsd !== psd){
        layer.msg("两次密码输入不一致");
        return false;
    }
    
    $.ajax({
        type: "post",
        url: "http://localhost/huaweishangcheng/src/php/register.php",
        data:{
            china,
            psd,
            name,
            birthday
        },
        dataType: "json",
        success: res=>{
            var {meta:{status,message}} = res;
            layer.msg(message);
            if(status === 1){
                setTimeout(()=>{
                    location.href = "http://localhost/huaweishangcheng/src/login.html";
                },1500)
            }else if(status === 2){
                return false;
            }
        }
    });
});
    