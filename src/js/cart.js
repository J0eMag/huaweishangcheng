let timeout1;
let last_top = document.querySelector("#last_top");
let cart_btn = document.querySelector(".cart_btn");
function down(){
    let n = 0;
    let sum = 0;
    $(".goods_box :checkbox").each(function(i,v){
        if(v.checked){
            let str = $(v).parent().siblings(".small_price").text()
            str = str.slice(1)
            sum += str-0;
            n += ($(v).parent().siblings(".gods_price").children("input").val()-0);
        }
    })
    $(".goods_sum")
            .text(n);
    $(".sum_price")
        .text("￥"+sum)
}
if(document.cookie){//判断用户是否登录
    let uname = document.cookie.slice(5);//获取用户名
    //根据用户名获取购物车数据
    $.get("http://localhost//huaweishangcheng/src/php/cart.php",{name:uname},function(res){
        if(res){
            for(let i = 0;i < res.length;i++){
                //根据购物车商品id获取商品数据
                $.get("http://localhost//huaweishangcheng/src/php/goods_box.php",{pid:res[i].good_id},function(resp){
                    $li = $("<li></li>");//渲染页面
                    $str = `
                        <ol>
                            <li><input type="checkbox"></li>
                            <li><img src=${resp[0].url} alt=""></li>
                            <li>
                                <p>${resp[0].name}</p>
                                <p>自选 </p>
                            </li>
                            <li class="gods_price_odd">￥<span>${resp[0].price}</span></li>
                            <li class="gods_price">
                                <div class="add_btn">+</div>
                                <input type="text" value="${res[i].good_num}">
                                <div class="remove_btn">-</div>
                            </li>
                            <li  class="small_price">￥${resp[0].price*res[i].good_num}</li>
                            <li><p class="del" index=${resp[0].id}>删除</p></li>
                        </ol>
                    `;
                    $li.html($str);
                    $(".cart_mouther").append($li);
                    if($(".cart_mouther li").length == 0){//判断购物车是否为空
                        $(".cart").css({display:"block"});
                        $(".goods_price").css({display:"none"});
                        $(".cart_top").css({display:"none"});
                    }else{
                        $(".cart").css({display:"none"});
                        $(".goods_price").css({display:"block"});
                        $(".cart_top").css({display:"block"});
                    }
                    $li.children().children().children(".del").click(function(){//删除按键功能
                        layer.confirm('您确定要删除商品吗？', {
                            btn: ['确定','取消']
                        },()=>{
                            $.get("http://localhost//huaweishangcheng/src/php/cart_remove.php",{uname:uname,id:$(this).attr("index")},(res)=>{
                                console.log(res);
                            },"json");
                            $(this)
                                    .parent()
                                    .parent()
                                    .parent()
                                    .remove();
                                parent.layer.closeAll();
                                down()
                                if(!$(".cart_mouther li").length){
                                    $(".cart").css({display:"block"});
                                    $(".goods_price").css({display:"none"});
                                    $(".cart_top").css({display:"none"});
                                }else{
                                    $(".cart").css({display:"none"});
                                    $(".goods_price").css({display:"block"});
                                    $(".cart_top").css({display:"block"});
                                }
                            },()=>{
                            parent.layer.closeAll();
                        });
                    });
                    $li.children().children().children("input[type='checkbox']").change(function(){//给商品选框设置监听事件，判断是否全选
                        down()
                        if($(this).is(":checked")){
                            $(this)
                                .parent()
                                .parent()
                                .css({backgroundColor:"wheat"})
                            $(".goods_box :checkbox").each(function(i,v){
                                if(!v.checked){
                                    $(".checkbox :checkbox")
                                        .prop({checked:false});
                                    return false;
                                }else{
                                    $(".checkbox :checkbox")
                                        .prop({checked:true});
                                }
                            })
                        }else{
                            $(this)
                                .parent()
                                .parent()
                                .css({backgroundColor:"transparent"})
                            $(".checkbox :checkbox")
                                .prop({checked:false});
                        }
                        down()
                    });
                    $li.children().children().children(".add_btn").click(function(){//给添加商品数量按钮设置事件且更改数据库
                        if($(this).next().val() >= 10){
                            layer.msg("该商品限购 10 件 !");
                            return false;
                        }
                        $(this)
                            .next()
                            .val($(this).next().val()-0+1)
                            .parent()
                            .next()
                            .text("￥"+($(this).next().val()*$(this).parent().prev().children("span").text()))
                        down()
                            clearTimeout(timeout1)//防抖防止高频请求
                            timeout1 = setTimeout(()=>{
                                $.get("http://localhost//huaweishangcheng/src/php/change_cart.php",{id:$(this).parent().next().next().children("p").attr("index"),num:$(this).next().val(),uname:uname,flag:1},()=>{},"json")
                            },1000)
                    });
                    //给减少商品数量按钮设置事件且更改数据库
                    $li.children().children().children(".remove_btn").click(function(){
                        if($(this).prev().val()==1){
                            $(this)
                                layer.msg("商品数不能小于 1 !");
                                return false;
                        }
                        $(this)
                            .prev()
                            .val($(this).prev().val()-1)
                            .parent()
                            .next()
                            .text("￥"+($(this).prev().val()*$(this).parent().prev().children("span").text()))
                        down()
                        clearTimeout(timeout1)//防抖防止高频请求
                        timeout1 = setTimeout(()=>{
                        $.get("http://localhost//huaweishangcheng/src/php/change_cart.php",{id:$(this).parent().next().next().children("p").attr("index"),num:$(this).prev().val(),uname:uname,flag:1},()=>{},"json")
                        },1000)
                    });
                    //给商品数量框设置事件，限制商品最大，最小购买量以及纠正除整数外的输入内容，更改数据库
                    $li.children().children().children("input[type='text']").blur(function(){
                        if($(this).val()<=0){
                            $(this).val(1)
                        }else if($(this).val()>=10){
                            $(this).val(10)
                        }else if(isNaN(($(this).val()-0))){
                            $(this).val(1)
                        }
                        $(this).
                            val(parseInt($(this).val()))
                        $(this)
                            .parent()
                            .next()
                            .text("￥"+($(this).parent().prev().children("span").text()*$(this).val()));
                        down();
                        $.get("http://localhost//huaweishangcheng/src/php/change_cart.php",{id:$(this).parent().next().next().children("p").attr("index"),num:$(this).val(),uname:uname,flag:1},()=>{},"json")
                    });
                },"json"); 
            }
        }
    },"json")
}else{
    $(".top_banner").css("display","block")
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
$(".checkbox :checkbox").change(function(){
    if($(this).is(":checked")){
        $(".goods_box ol")
            .css({backgroundColor:"wheat"})
        $(":checkbox")
            .prop({checked:true});
        down()
    }else{
        $(".goods_box ol")
            .css({backgroundColor:"transparent"})
        $(":checkbox")
            .prop({checked:false});
        down();
    }
});
if(document.cookie){
    $(".login_li").text("您好");
    $(".name_li").text(document.cookie.slice(5).slice(0,2)+"**")
    $(".login_p").text("欢迎您,"+document.cookie.slice(5).slice(0,2)+"**")
    $out = $("<li></li>")
    $out.text("退出")
    $(".login_li").before($out)
    $(".login_li").prev().click(function(){
        layer.confirm(`您确定要退出吗？`, {
            icon:5,
            skin: 'layui-layer-lan',
            btn: ['残忍离开','再逛逛']
        },()=>{
            removeCookie("name")//localStorage.removeItem("name")
            $(".login_li").html("<a href='http://localhost/huaweishangcheng/src/login.html'>登录</a>");
            $(".name_li").html("<a href='http://localhost/huaweishangcheng/src/register.html'>注册</a>")
            $(".login_p").html('您好，请<a href="http://localhost/huaweishangcheng/src/login.html">登录 </a><span> / </span><a href="http://localhost/huaweishangcheng/src/register.html">注册</a>')
            $(".cart_mouther li").remove();
            parent.layer.closeAll();
            if(!$(".cart_mouther li").length){
                $(".cart").css({display:"block"});
                $(".goods_price").css({display:"none"});
                $(".cart_top").css({display:"none"});
            }else{
                $(".cart").css({display:"none"});
                $(".goods_price").css({display:"block"});
                $(".cart_top").css({display:"block"});
            }
            $(".top_banner").css("display","block");
        },()=>{
            parent.layer.closeAll();
        });
    })
    if($(".cart_mouther li").length == 0){
        $(".cart").css({display:"block"});
        $(".goods_price").css({display:"none"});
        $(".cart_top").css({display:"none"});
    }else{
        $(".cart").css({display:"none"});
    }
}else{
    if($(".cart_mouther li").length == 0){
        $(".cart").css({display:"block"});
        $(".goods_price").css({display:"none"});
        $(".cart_top").css({display:"none"});
    }
}
$(".rm_all").click(function(){//删除选中商品功能
    if($(".goods_box input:checked").length !== 0){
        layer.confirm('您确定要删除所选商品吗？', {
            btn: ['确定','取消']
        },()=>{
            let brr = [];
            $(".goods_box input:checked").each(function(i,v){
                $i = $(v).parent()
                        .siblings()
                        .last()
                        .children(".del")
                        .attr("index");
                brr.push($i);
            })
            for(let j = 0;j < brr.length;j++){
                $.get("http://localhost//huaweishangcheng/src/php/cart_remove.php",{uname:document.cookie.slice(5),id:brr[j]},(res)=>{
                    if(!$(".cart_mouther li").length){
                        $(".cart").css({display:"block"});
                        $(".goods_price").css({display:"none"});
                        $(".cart_top").css({display:"none"});
                    }else{
                        $(".cart").css({display:"none"});
                        $(".goods_price").css({display:"block"});
                        $(".cart_top").css({display:"block"});
                    }
                    down()
                },"json");
            }
            $(".goods_box li").remove();
            parent.layer.closeAll();
        });
    }else{
        layer.msg("您还未选中任何商品");
        return false;
    }
});
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
