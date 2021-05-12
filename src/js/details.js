let show_list = document.querySelectorAll(".list_nav>li");
let second_list_boxx = document.querySelector("#second_list_box");
let tj_type= getParams("id");
let last_top = document.querySelector("#last_top");
let cart_btn = document.querySelector(".cart_btn");
function getParams(key) {//获取地址传值的函数
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
$(".second_list_one").parent().hover(()=>{//二级菜单事件
    $(".second_list_one")[0].style.display = "block"
},()=>{
    $(".second_list_one")[0].style.display = "none"
});
$(".second_list_two").parent().hover(()=>{
    $(".second_list_two")[0].style.display = "block"
},()=>{
    $(".second_list_two")[0].style.display = "none"
});
$(".second_list").click(function(){//二级菜单单机跳转事件，去往列表页
    $(this).parent().next().toggleClass("shua");
    $(".shadow").click(function(){
        if($(this).index() == 13){
            return false;
        }
        window.open("http://localhost//huaweishangcheng/src/list.html?id="+($(this).index()-0+3));
    });
});
$(".none").focus(function(){//搜索框事件
    $(".sls").css({display:"none"});
});
$(".none").blur(function(){
    $(".sls").css({display:"block"});
});
for(let i = 1;i <= show_list.length;i++){//请求二级菜单数据，渲染二级菜单，并为它们添加触发事件
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
$(".goods_img").mouseenter(function(){//放大镜移入出现
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
$(".add_btn").click(()=>{//商品数量增加按钮，设定封顶数量
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
//根据参数请求商品图片信息
    $.get("http://localhost//huaweishangcheng/src/php/goods_img.php",{id:tj_type},function(res){
        let obj = res[0];
        let arr = [];
        var z = 0;
        for(let i in obj){
            if(obj[i]==null){
                delete obj[i];
                break;
            }
            if(!isNaN((obj[i]-0))){
                z++; 
            }
            if(z===2){
                break;
            }
            arr.push(obj[i]);
        }
        if(arr.length===7){
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
        let brr = [];
        for(let j in res[0]){
            if(res[0][j] == null){
                delete res[0][j];
                continue;
            }
            brr.push(res[0][j]);
        }
        let crr = brr.slice(arr.length+1);
        for(let x = 0;x < crr.length;x++){
            $img = $(`<img class="goods_iimmgg" src=${crr[x]}>`);
            $("#goods_iimmgg").append($img);
       }
       $img1 = $(`<img class="goods_iimmgg" src="https://res.vmallres.com/pimages/detailImg/2021/03/03/A1B84352CAB07B7441C5EB3AA6E278E23FAED949397499BD.jpg">`)
       $("#goods_iimmgg").append($img1);
    },"json");
    //根据地址传值请求商品名、价格等文本数据
$.get("http://localhost//huaweishangcheng/src/php/goods_box.php",{pid:tj_type},function(res){
    $(document).attr("title",res[0].name);
    $(".good_name")
        .text(res[0].name)
        .next()
        .text(res[0].tip)
    $(".good_price")
        .text("￥"+res[0].price)
},"json");
$(".add_cart").click(function(){//为添加购物车按钮添加事件，更改数据库数据
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
        },"json");
    }else{
        layer.confirm("请先登录再操作", {
            skin: 'layui-layer-lan',
            btn: ['登录','取消']
        },function(){
            location.href = "http://localhost//huaweishangcheng/src/login.html";
            parent.layer.closeAll();
        },function(){
            parent.layer.closeAll();
        });
    }
});
if(document.cookie){//如果已是登陆状态则显示已登陆的页面
    $(".login_li").text("您好");
    $(".name_li").text(document.cookie.slice(5).slice(0,2)+"**")
    $(".login_p").text("欢迎您,"+document.cookie.slice(5).slice(0,2)+"**")
    $out = $("<li></li>")
    $out.text("退出")
    $(".login_li").before($out)
    $(".login_li").prev().click(function(){
        removeCookie("name")
        $(".login_li").html("<a href='http://localhost/huaweishangcheng/src/login.html'>登录</a>");
        $(".name_li").html('<a href="http://localhost/huaweishangcheng/src/register.html">注册</a>')
        $(".login_p").html('您好，请<a href="http://localhost/huaweishangcheng/src/login.html">登录 </a><span> / </span><a href="http://localhost/huaweishangcheng/src/register.html">注册</a>')
        $(this).remove();
    })
}
window.onscroll = function(){//监听滚轮事件控制固定菜单出现
    if(document.documentElement.scrollTop>= 600){
        last_top.style.display = "block";
    }else{
        last_top.style.display = "none";
    }
}
last_top.onclick = function(){//回到顶部功能
    let newInterval =  setInterval(function(){
        document.documentElement.scrollTop -= 100;
        if(document.documentElement.scrollTop <= 0){
            clearInterval(newInterval);
        }
    },1)
}
cart_btn.onclick = function(){//跳转购物车
    location.href = "http://localhost/huaweishangcheng/src/cart.html";
}