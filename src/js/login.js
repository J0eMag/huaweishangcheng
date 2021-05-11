$("button").click(function(){
    let psd = $("input[name='password']").val();
    let name = $("input[name='name']").val();
    if(name === ""){
        layer.msg("账号不能为空");
        return false;
    }
    if(psd === ""){
        layer.msg("密码不能为空");
        return false;
    }
    if(!(/^.{6,16}$/).test(psd)){
        layer.msg("密码长度或格式错误");
        return false;
    }
    $.post("http://localhost/huaweishangcheng/src/php/login.php",{psd:psd,name:name},function(res){
        var {meta:{status,message}} = res;
            layer.msg(message);
            if(status === 1){
                setTimeout(function(){
                    var date = new Date();
                    date.setTime(date.getTime()-1000*60*60*8+80000);
                    document.cookie =`name=${res.data};path=/;`
                    location.href = "http://localhost//huaweishangcheng/src/home.html";
                },1000);
                return false;
            }else if(status === 2){
                return false;
            }
    },"json");
});