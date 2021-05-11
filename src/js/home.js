let shadows = document.querySelectorAll(".shadow");
let goods_list_one = document.querySelector(".major-goods>div>div");
let lbtn = document.querySelector(".lbtn");
let rbtn = document.querySelector(".rbtn");
let goods_list_two = document.querySelector("#two");
let llbtn = document.querySelector(".llbtn");
let rrbtn = document.querySelector(".rrbtn");
let show_imgs = document.querySelectorAll(".show_img");
let show_lbtn = document.querySelector(".show_lbtn");
let show_rbtn = document.querySelector(".show_rbtn");
let show_pointers = document.querySelectorAll(".show_pointer>li");
let hovers = document.querySelectorAll(".list");
let auto_new = document.querySelector(".auto_news");
let inp = document.querySelector("input.none");
let sls = document.querySelectorAll(".sls");
let s_btns = document.querySelectorAll(".s_btn");
let s_imgs = document.querySelectorAll(".s_img");
let show_list = document.querySelectorAll(".list-nav>li");
let second_list_box = document.querySelector("#second_list_box");
let goods_box_heads = document.querySelectorAll(".goods_box_head");
let top_banner = document.querySelector(".top-banner>a:nth-child(2)");
let last_top = document.querySelector("#last_top");
let cart_btn = document.querySelector(".cart_btn");
let fixed_list = document.querySelector(".fixed_list");
let gk = 0;
let ggk = 0;
let sk = 0;
let nk = 0;
let flag = true;
let newInterval = null;
if(document.cookie){//localstorage.getItem("name"),可以更换为本地存储登录，实现注销按钮功能
    //let uname = localstorage.getItem("name");
    $(".login_li").text("您好");
    $(".name_li").text(document.cookie.slice(5).slice(0,2)+"**")//uname.slice(0,2)
    $(".login_p").text("欢迎您,"+document.cookie.slice(5).slice(0,2)+"**")//uname.slice(0,2)
    $out = $("<li></li>")
    $out.text("退出")
    $(".login_li").before($out)
    $(".login_li").prev().click(function(){//退出弹出询问层
        layer.confirm(`您确定要退出吗？`, {
            icon:5,
            skin: 'layui-layer-lan',
            btn: ['残忍离开','再逛逛']
        },()=>{
            removeCookie("name")//localStorage.removeItem("name")
            $(".login_li").html("<a href='http://localhost/huaweishangcheng/src/login.html'>登录</a>");
            $(".name_li").html("<a href='http://localhost/huaweishangcheng/src/register.html'>注册</a>")
            $(".login_p").html('您好，请<a href="http://localhost/huaweishangcheng/src/login.html">登录 </a><span> / </span><a href="http://localhost/huaweishangcheng/src/register.html">注册</a>')
            $(this).remove();
            parent.layer.closeAll();
        },()=>{
            parent.layer.closeAll();
        });
        // var data = new Date();
        // data.setTime(data.getTime()-1000*60*60*8-1); // 当前时间的上一秒
        // document.cookie ='id=0;expires='+data+";path=/";
    })
}
//封装请求函数
function boxPromiseAjax(id,url,inurl,width,height = 290,moutherurl="http://localhost/huaweishangcheng/src/php/goods_box.php"){
    promiseAjax({
        url:moutherurl,
        data:{
            id:id
        }
    }).then(res=>{
        let div = document.createElement("div");
        let str = `<img src=${url} class="one"></img>`;
        div.className = "wrap"
        setStyle(div,{
           display:"flex",
           flexWrap:"wrap",
           justifyContent:"space-between"
        });
        for(let i = 0;i < res.length;i++){
            str+=`
            <div class="smallbox" index=${res[i].id}>
            <img src=${res[i].url}>
            <p>${res[i].name}</p>
            <p>${res[i].tip}</p>
            <p>￥${res[i].price}</p>
            </div>
            `;
        }
        div.innerHTML = str;
        document.body.insertBefore(div,inurl);
        let divs = div.querySelectorAll("div");
        divs.forEach(item=>{
            setStyle(item,{
                width:230+"px",
                height:290+"px",
                backgroundColor:"#eee",
                borderRadius:10+"px",
                textAlign:"center",
                lineHeight:"25px",
                marginBottom:"10px",
                cursor:"pointer"
            });
            item.onclick = function(){
                window.open(`http://localhost//huaweishangcheng/src/details.html?id=${item.getAttribute("index")}`);
            }
        });
        let imgs = div.querySelectorAll(".smallbox img");
        imgs.forEach(item=>{
            setStyle(item,{
                display:"inline-block",
                height:150+"px",
                width:150+"px",
                marginTop:30+"px",
                marginBottom:15+"px"
            });
        });
        let img = div.querySelector(".one")
        setStyle(img,{
            width:width + "px",
            height:height + "px",
            borderRadius:10+"px"
        })
        let p1 = div.querySelectorAll("div>p:nth-child(2)")
        p1.forEach(item=>{
            setStyle(item,{
                fontSize:14+"px"
            });
        });
        let p2 = div.querySelectorAll("div>p:nth-child(3)")
        p2.forEach(item=>{
            setStyle(item,{
                fontSize:12+"px",
                color:"#777"
            });
        });
        let p3 = div.querySelectorAll("div>p:nth-child(4)")
        p3.forEach(item=>{
            setStyle(item,{
                fontSize:12+"px",
                color:"red"
            });
        });
    });
}
//为阴影效果标签添加移出事件(可在css文件中设置)
shadows.forEach(item=>{
    item.onmouseout = function(){
        item.style.transition = 0.5 + "s";
    }
});
//顶部广告删除功能
top_banner.onclick = function(){
    this.parentElement.remove();
    document.querySelector(".user").style.top = 100 + "px";
}
//第一部分商品展示模块请求
promiseAjax({
    url:"http://localhost/huaweishangcheng/src/php/goods_list_one.php",
    data:{
        id:1
    }
}).then(res=>{
    for(let i = 0;i < res.length;i++){
        goods_list_one.innerHTML+=`
        <div>
        <img src=${res[i].url}>
        <p>${res[i].tip}</p>
        <p>${res[i].name}</p>
        <p>￥${res[i].price}</p>
        </div>
        `;
    }
    let divs = goods_list_one.querySelectorAll("div");
    let l = 0;
    for(let i = 0;i < divs.length;i++){
        setStyle(divs[i],{
            width:230 + "px",
            height:295 + "px",
            float:"left",
            backgroundColor:"#fff",
            margin:"0 2px",
            borderRadius:"10px",
            position:"absolute",
            top:0,
            left:l + "px",
            textAlign:"center"
        });
        l += 240;
    }
    let imgs = goods_list_one.querySelectorAll("img");
    imgs.forEach(item=>{
        setStyle(item,{
            width:150 + "px",
            height:150 + "px",
            marginTop:36 + "px",
            marginBottom:10 + "px"
        });
    });
    let p1 = goods_list_one.querySelectorAll("div>p:nth-child(2)");
    p1.forEach(item=>{
        setStyle(item,{
            width:"100%",
            fontSize:14 + "px",
            backgroundColor:"#eee",
            color:"#777",
            height:30 + "px",
            lineHeight: 30 + "px",
            borderBottomLeftRadius:10 + "px",
            borderBottomRightRadius:10 + "px"
        });
    });
    let p2 = goods_list_one.querySelectorAll("div>p:nth-child(3)");
    p2.forEach(item=>{
        setStyle(item,{
            width:"100%",
            fontSize:14 + "px",
            height:30 + "px",
            lineHeight: 30 + "px",
        });
    });
    let p3 = goods_list_one.querySelectorAll("div>p:nth-child(4)");
    p3.forEach(item=>{
        setStyle(item,{
            width:"100%",
            fontSize:12 + "px",
            color:"red",
            height:15 + "px",
            lineHeight: 15 + "px",
        });
    });
});
//热销推荐轮播图控制左右轮播按钮消失
if(gk === 0){
    lbtn.style.display = "none";
}
//热销推荐左右轮播按钮功能
rbtn.onclick = function(){
    if(!flag){
        return false;
    }
    flag = false;
    lbtn.style.display = "block"
    gk++;
    goods_list_one.style.left = (-1200 * gk) + "px";
    if(gk===3){
        rbtn.style.display = "none";
    }
    setTimeout(()=>{
        flag = true
    },500)
}
//热销推荐左右轮播按钮功能
lbtn.onclick = function(){
    if(!flag){
        return false;
    }
    flag = false;
    rbtn.style.display = "block";
    gk--;
    goods_list_one.style.left = (-1200 * gk) + "px";
    if(gk === 0){
        lbtn.style.display = "none";
    }
    setTimeout(()=>{
        flag = true
    },500)
}
//大轮播图左右按钮
show_rbtn.onclick = function(){
    sk++;
    for(let i = 0;i < show_pointers.length;i++){
        show_pointers[i].className = "";
        show_imgs[i].style.opacity = "0";
    }
    if(sk === 3){
        sk = 0
    }
    show_pointers[sk].className = "active";
    show_imgs[sk].style.opacity = "1";
}
//大轮播图左右按钮
show_lbtn.onclick = function(){
    sk--;
    for(let i = 0;i < show_pointers.length;i++){
        show_pointers[i].className = "";
        show_imgs[i].style.opacity = "0";
    }
    if(sk === -1){
        sk = 2
    }
    show_pointers[sk].className = "active";
    show_imgs[sk].style.opacity = "1";
}
//大轮播图底部白点
for(let num = 0;num < show_pointers.length;num++){
    show_pointers[num].index = num;
}
show_pointers.forEach(item=>{
    item.onmouseover = ()=>{
        sk = item.index;
        for(let i = 0;i < show_pointers.length;i++){
            show_pointers[i].className = "";
            show_imgs[i].style.opacity = "0";
        }
        show_pointers[sk].className = "active";
        show_imgs[sk].style.opacity = "1";
    }
});
//自动轮播
newInterval = setInterval(()=>{
    sk++;
    for(let i = 0;i < show_pointers.length;i++){
        show_pointers[i].className = "";
        show_imgs[i].style.opacity = "0";
    }
    if(sk === 3){
        sk = 0
    }
    show_pointers[sk].className = "active";
    show_imgs[sk].style.opacity = "1";
},2500);
hovers.forEach(item=>{
    item.onmouseover = ()=>{
        item.childNodes[1].style.display = "block";
    }
    item.onmouseout = ()=>{
        item.childNodes[1].style.display = "none";
    }
});
//轮播公告(奇形怪状)
setInterval(()=>{
    nk++;
    auto_new.style.top = -nk * 23 + "px"
    if(nk === 3){
        nk = 0;
        auto_new.style.top = -nk * 23 + "px"
    }
},2000);
//搜索框获取焦点热搜消失
inp.onfocus = ()=>{
    sls.forEach(item=>{
        item.style.display = "none";
    })
}
inp.onblur = ()=>{//热搜出现
    sls.forEach(item=>{
        item.style.display = "block";
    })
}
for(let i = 0;i < s_btns.length;i++){//首页中部简单轮播图
    s_btns[i].onmouseover = ()=>{
        for(let j = 0;j < s_btns.length;j++){
            s_btns[j].id = "";
            s_imgs[j].style.opacity = "0";
        }
        s_btns[i].id = "active_btn";
        s_imgs[i].style.opacity = "1";
    }
}
for(let i = 1;i <= show_list.length;i++){//二级菜单请求数据并渲染
    show_list[i-1].onmouseover = ()=>{
        second_list_box.style.display = "flex";
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
            second_list_box.innerHTML = str;
            let limgs = second_list_box.querySelectorAll("img");
            let llis = second_list_box.querySelectorAll("li");
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
            second_list_box.style.width = Math.ceil(res.length/5) * 250 + 'px';
        });
    }
    second_list_box.onmouseover = ()=>{
        second_list_box.style.display = "flex";
    }
    show_list[i -1].onmouseout = second_list_box.onmouseout =  ()=>{
        second_list_box.style.display = "none"
    }
}
promiseAjax({//热搜轮播请求数据并渲染
    url:"http://localhost/huaweishangcheng/src/php/goods_list_one.php",
    data:{
        id:2
    }
}).then(res=>{
    for(let i = 0;i < res.length;i++){
        goods_list_two.innerHTML+=`
        <div>
        <img src=${res[i].url}>
        <p>${res[i].tip}</p>
        <p>${res[i].name}</p>
        <p>￥${res[i].price}</p>
        </div>
        `;
    }
    let divs = goods_list_two.querySelectorAll("div");
    let l = 0;
    for(let i = 0;i < divs.length;i++){
        setStyle(divs[i],{
            width:230 + "px",
            height:295 + "px",
            float:"left",
            backgroundColor:"#fff",
            margin:"0 2px",
            borderRadius:"10px",
            position:"absolute",
            top:0,
            left:l + "px",
            textAlign:"center"
        });
        l += 240;
    }
    let imgs = goods_list_two.querySelectorAll("img");
    imgs.forEach(item=>{
        setStyle(item,{
            width:150 + "px",
            height:150 + "px",
            marginTop:36 + "px",
            marginBottom:10 + "px"
        });
    });
    let p1 = goods_list_two.querySelectorAll("div>p:nth-child(2)");
    p1.forEach(item=>{
        setStyle(item,{
            width:"100%",
            fontSize:14 + "px",
            backgroundColor:"#eee",
            color:"#777",
            height:30 + "px",
            lineHeight: 30 + "px",
            borderBottomLeftRadius:10 + "px",
            borderBottomRightRadius:10 + "px"
        });
    });
    let p2 = goods_list_two.querySelectorAll("div>p:nth-child(3)");
    p2.forEach(item=>{
        setStyle(item,{
            width:"100%",
            fontSize:14 + "px",
            height:30 + "px",
            lineHeight: 30 + "px",
        });
    });
    let p3 = goods_list_two.querySelectorAll("div>p:nth-child(4)");
    p3.forEach(item=>{
        setStyle(item,{
            width:"100%",
            fontSize:12 + "px",
            color:"red",
            height:15 + "px",
            lineHeight: 15 + "px",
        });
    });
});
//热搜轮播
if(ggk === 0){
    llbtn.style.display = "none";
}
rrbtn.onclick = function(){
    if(!flag){
        return false;
    }
    flag = false;
    llbtn.style.display = "block"
    gk++;
    goods_list_two.style.left = (-1200 * gk) + "px";
    if(gk===2){
        rrbtn.style.display = "none";
    }
    setTimeout(()=>{
        flag = true
    },500)
}
llbtn.onclick = function(){
    if(!flag){
        return false;
    }
    flag = false;
    rrbtn.style.display = "block";
    gk--;
    goods_list_two.style.left = (-1200 * gk) + "px";
    if(gk === 0){
        llbtn.style.display = "none";
    }
    setTimeout(()=>{
        flag = true
    },500)
}
//首页各商品模块请求并渲染
boxPromiseAjax(1,"https://res0.vmallres.com/pimages//frontLocation/content/96008994561619980069.png",goods_box_heads[1],230);
boxPromiseAjax(2,"https://res0.vmallres.com/pimages//frontLocation/content/11119171251617191111.jpg",goods_list_two
.parentElement.parentElement,472);
boxPromiseAjax(3,"https://res0.vmallres.com/pimages//frontLocation/content/10236136851613163201.png",goods_box_heads[3],472);
boxPromiseAjax(4,"https://res0.vmallres.com/pimages//frontLocation/content/92567261481616276529.png",goods_box_heads[4],472);
boxPromiseAjax(5,"https://res0.vmallres.com/pimages//frontLocation/content/06556351711615365560.png",goods_box_heads[5],230);
boxPromiseAjax(6,"https://res0.vmallres.com/pimages//frontLocation/content/96394395800619349369.jpg",goods_box_heads[6],230);
boxPromiseAjax(7,"https://res0.vmallres.com/pimages//frontLocation/content/44589709871610798544.jpg",active_img,472);
boxPromiseAjax(8,"https://res0.vmallres.com/pimages//frontLocation/content/29291553581615519292.png",goods_box_heads[8],472);
boxPromiseAjax(9,"https://res0.vmallres.com/pimages//frontLocation/content/41067571391617576014.jpg",goods_box_heads[9],472);
boxPromiseAjax(10,"https://res0.vmallres.com/pimages//frontLocation/content/35728252881615282753.png",active_img2,472);
//监听滚轮事件控制固定菜单出现
window.onscroll = function(){
    if(document.documentElement.scrollTop>= 600){
        last_top.style.display = "block";
    }else{
        last_top.style.display = "none";
    }
    if(document.documentElement.scrollTop>= 2000){
        fixed_list.style.display = "block"
    }else{
        fixed_list.style.display = "none"
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
$(".list-nav>li").click(function(){//二级菜单跳转列表页
    if($(this).index() == 13){
        return false;
    }
    window.open(`http://localhost//huaweishangcheng/src/list.html?id=${$(this).index()}`);
});
$(".fixed_list").on("click","li",function(){//楼层跳转
    if($(this).index()==0){
        $("html,body").animate({scrollTop:2520},500);
    }else if($(this).index()==1){
        $("html,body").animate({scrollTop:3480},500);
    }else if($(this).index()==2){
        $("html,body").animate({scrollTop:4160},500);
    }else if($(this).index()==3){
        $("html,body").animate({scrollTop:4840},500);
    }else if($(this).index()==4){
        $("html,body").animate({scrollTop:5500},500);
    }else if($(this).index()==5){
        $("html,body").animate({scrollTop:6170},500);
    }else if($(this).index()==6){
        $("html,body").animate({scrollTop:7000},500);
    }else if($(this).index()==7){
        $("html,body").animate({scrollTop:7670},500);
    }else if($(this).index()==8){
        $("html,body").animate({scrollTop:8350},500);
    }
})