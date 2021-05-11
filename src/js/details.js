let show_list = document.querySelectorAll(".list_nav>li");
let second_list_boxx = document.querySelector("#second_list_box");
let tj_type= getParams("id");
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
$(".second_list_one").parent().hover(()=>{
    $(".second_list_one")[0].style.display = "block"
},()=>{
    $(".second_list_one")[0].style.display = "none"
});
$(".second_list_two").parent().hover(()=>{
    $(".second_list_two")[0].style.display = "block"
},()=>{
    $(".second_list_two")[0].style.display = "none"
});
$(".second_list").click(function(){
    $(this).parent().next().toggleClass("shua");
});
$(".none").focus(function(){
    $(".sls").css({display:"none"});
});
$(".none").blur(function(){
    $(".sls").css({display:"block"});
});
for(let i = 1;i <= show_list.length;i++){
    show_list[i-1].onmouseover = ()=>{
        second_list_boxx.style.display = "flex";
        promiseAjax({
            url:"http://localhost/huaweishangcheng/src/php/second_list.php",
            data:{
                id:i
            }
        }).then(res=>{
            let str = "";
            for(let j = 0;j < res.length;j++){
                str +=`
                <li>
                <img src=${res[j].url}>
                <span>${res[j].name}</span>
                </li>
                `;
            }
            second_list_boxx.innerHTML = str;
            let limgs = second_list_boxx.querySelectorAll("img");
            let llis = second_list_boxx.querySelectorAll("li");
            limgs.forEach(item=>{
                setStyle(item,{width:48+"px",height:48+"px",marginTop:"5px",float:"left",marginRight:"20px",marginLeft:"30px"});
            });
            llis.forEach(item=>{
                setStyle(item,{width:230+"px",height:60+"px",margin:"14px 10px",borderRadius:"10px"});
                item.onmouseover = ()=>{
                    item.style.backgroundColor = "#eee";
                }
                item.onmouseout = ()=>{
                    item.style.backgroundColor = "transparent";
                }
            })
            second_list_boxx.style.width = Math.ceil(res.length/5) * 250 + 'px';
        });
    }
    second_list_boxx.onmouseover = ()=>{
        second_list_boxx.style.display = "flex";
    }
    show_list[i -1].onmouseout = second_list_boxx.onmouseout =  ()=>{
        second_list_boxx.style.display = "none";
    }
}
$(".goods_img").mouseenter(function(){
    $(".mask")
        .css({display:"block"})
        .parent().next()
        .css({display:"block"});
    $(".goods_img").mousemove(function(e){
        let x = e.pageX - $(".goods_img").offset().left;
        let y = e.pageY - $(".goods_img").offset().top;
        let left = x - 112.5;
        let top = y - 112.5;
        if(left < 0){
            left = 0;
        }
        if(top < 0){
            top =0;
        }
        if(left >= 225){
            left = 225;
        }
        if(top >= 225){
            top = 225;
        }
        $(".mask")
        .css({top:top,left:left})
        $(".mirror")
        .css({backgroundPosition:(-left*2+"px")+" "+(-top*2+"px")});
    });
});
$(".goods_img").mouseleave(function(e){
    $(".mask")
        .css({display:"none"})
        .parent()
        .next()
        .css({display:"none"});
});
$(".add_btn").click(()=>{
    if($(".price_box input").val() >= 10){
        layer.msg("该商品限购 10 件!");
        return false;
    }
    $(".price_box input")
    .val($(".price_box input").val()-0+1);
});
$(".remove_btn").click(()=>{
    if($(".price_box input").val() == 1){
        layer.msg("再减就没了哟~");
        return false;
    }
    $(".price_box input")
    .val($(".price_box input").val()-1);
});
$(".price_box input").blur(function(){
    if($(this).val()<=0){
        $(this).val(1)
    }else if($(this).val()>=10){
        $(this).val(10)
    }else if(isNaN(($(this).val()-0))){
        $(this).val(1)
    }
    $(this).
        val(parseInt($(this).val()))
})
$.get("http://localhost//huaweishangcheng/src/php/goods_img.php",{id:tj_type},function(res){
        let obj = res[0];
        let arr = [];
        for(let i in obj){
            if(obj[i]==null){
                delete obj[i];
                break;
            }
            arr.push(obj[i]);
        }
        if(arr.length>=7){
            arr.pop();
        }
        for(let j = 1;j < arr.length;j++){
            $li = $(`<li class="small_goods_img"></li>`);
            if(j===1){
                $li.addClass("s_img_active");
            }
            $li.css({backgroundImage:`url(${arr[j]})`})
            $(".goods_small_img").append($li)
        }
        $(".goods_img")
            .css({backgroundImage:`url(${arr[1]})`})
            .next()
            .css({backgroundImage:`url(${arr[1]})`})
        $(".small_goods_img").click(function(){
            $(this).addClass("s_img_active").siblings().removeClass("s_img_active")
            $(".goods_img")
                .css({backgroundImage:$(this).css("background-image")})
                .next()
                .css({backgroundImage:$(this).css("background-image")})
        });
    },"json");
$.get("http://localhost//huaweishangcheng/src/php/goods_box.php",{pid:tj_type},function(res){
    $(".good_name")
        .text(res[0].name)
        .next()
        .text(res[0].tip)
    $(".good_price")
        .text("￥"+res[0].price)
},"json");
$(".add_cart").click(function(){
    // var data = new Date();
    // data.setTime(data.getTime()-1000*60*60*8-1); // 当前时间的上一秒
    // document.cookie = 'id=0;expires='+data+";path=/";
    // var date = new Date();
    // date.setTime(date.getTime()-1000*60*60*8+80000);
    // document.cookie =`pid=${id};expires=${date};path=/;`
    // document.cookie =`num=${$(".price_box input").val()};expires=${date};path=/;`
    if(document.cookie){
        $.get("http://localhost//huaweishangcheng/src/php/change_cart.php",{id:tj_type,num:$(".price_box input").val(),uname:document.cookie.slice(5)},function(res){ 
            layer.confirm(`${$(".good_name").text()}成功加入购物车`, {
                icon:1,
                skin: 'layui-layer-molv',
                btn: ['再逛逛','去结算']
            },function(){
                parent.layer.closeAll();
            },function(){
                location.href = "http://localhost/huaweishangcheng/src/cart.html";
            });
            // layer.confirm(`${$(".good_name").text()}成功加入购物车`, {
            //     btn: ['再逛逛','去结算'] //按钮
            //   }, function(){
            //     parent.layer.closeAll();
            //   }, function(){
            //     location.href = "http://localhost/huaweishangcheng/src/cart.html";
            //   });
        },"json");
    }else{
        layer.msg("请先登录再操作");
        return false;
    }
    // window.open("http://localhost//huaweishangcheng/src/cart.html");
});
if(document.cookie){
    $(".login_li").text("您好");
    $(".name_li").text(document.cookie.slice(5).slice(0,2)+"**")
    $(".login_p").text("欢迎您,"+document.cookie.slice(5).slice(0,2)+"**")
    $out = $("<li></li>")
    $out.text("退出")
    $(".login_li").before($out)
    $(".login_li").prev().click(function(){
        // var data = new Date();
        // data.setTime(data.getTime()-1000*60*60*8-1); // 当前时间的上一秒
        // document.cookie ='id=0;expires='+data+";path=/";
        removeCookie("name")
        $(".login_li").html("<a href='http://localhost/huaweishangcheng/src/login.html'>登录</a>");
        $(".name_li").html('<a href="http://localhost/huaweishangcheng/src/register.html">注册</a>')
        $(".login_p").html('您好，请<a href="http://localhost/huaweishangcheng/src/login.html">登录 </a><span> / </span><a href="http://localhost/huaweishangcheng/src/register.html">注册</a>')
        $(this).remove();
    })
}