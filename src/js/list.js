let show_list = document.querySelectorAll(".list_nav>li");
let second_list_boxx = document.querySelector("#second_list_box");
let last_top = document.querySelector("#last_top");
let cart_btn = document.querySelector(".cart_btn");
if(window.location.search){
    let tj_type= getParams("id");
    function getParams(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }; 
    $(".goods_nav>ul li").removeClass("goods_nav_active").eq(tj_type-3).addClass("goods_nav_active")
    $.get("http://localhost//huaweishangcheng/src/php/goods_box.php",{id:tj_type-2},function(res){
        for(let i = 0;i < res.length;i++){
            $div = $(`<div class='mini_box' index=${res[i].id}></div>`);
            let str = "";
            str = `
            <img src=${res[i].url}>
            <p>${res[i].name}</p>
            <p>￥${res[i].price}</p>
            <span>多款可选</span>
            <p>限时特价</p>
            <p>多人评价   非常好评</p>
            `;
            $div.html(str);
            $(".box>div").append($div)
            $div.click(function(){
                window.open(`http://localhost//huaweishangcheng/src/details.html?id=${$(this).attr("index")}`);
            })
        }
    },"json");
}else{
    $.get("http://localhost//huaweishangcheng/src/php/goods_box.php",{id:1},function(res){
        for(let i = 0;i < res.length;i++){
            $div = $(`<div class='mini_box' index=${res[i].id}></div>`);
            let str = "";
            str = `
            <img src=${res[i].url}>
            <p>${res[i].name}</p>
            <p>￥${res[i].price}</p>
            <span>多款可选</span>
            <p>限时特价</p>
            <p>多人评价   非常好评</p>
            `;
            $div.html(str);
            $(".box>div").append($div);
            $div.click(function(){
                window.open(`http://localhost//huaweishangcheng/src/details.html?id=${$(this).attr("index")}`);
            })
        }
    },"json");
}
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
//列表页二级菜单出现并设置跳转事件(不在新标签页打开)
$(".second_list").click(function(){
    $(this).parent().next().toggleClass("shua");
    $(".shadow").click(function(){
        if($(this).index() == 13){
            return false;
        }
        location.href = ("http://localhost//huaweishangcheng/src/list.html?id="+($(this).index()-0+3));
    });
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
$(".goods_nav ul li").click(function(){
    $(this).addClass("goods_nav_active").siblings().removeClass("goods_nav_active");
    $.get("http://localhost//huaweishangcheng/src/php/goods_box.php",{id:$(this).index()+1},function(res){
        $(".box>div").html("")
        for(let i = 0;i < res.length;i++){
            $div = $(`<div class='mini_box' index=${res[i].id}></div>`);
            let str = "";
            str = `
            <img src=${res[i].url}>
            <p>${res[i].name}</p>
            <p>￥${res[i].price}</p>
            <span>多款可选</span>
            <p>限时特价</p>
            <p>多人评价   非常好评</p>
            `;
            $div.html(str);
            $(".box>div").append($div)
            $div.click(function(){
                window.open(`http://localhost//huaweishangcheng/src/details.html?id=${$(this).attr("index")}`);
            })
        }
    },"json")
});
if(document.cookie){
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
//监听滚轮事件控制固定菜单出现
window.onscroll = function(){
    if(document.documentElement.scrollTop>= 600){
        last_top.style.display = "block";
    }else{
        last_top.style.display = "none";
    }
}
//回到顶部功能
last_top.onclick = function(){
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