function getStyle(ele,attr){
	if(window.getComputedStyle){
		return getComputedStyle(ele)[attr]
	}else{
		return ele.currentStyle[attr]
	}
}

function setStyle(ele,styleObj){
	for(var attr in styleObj){
		ele.style[attr] = styleObj[attr]
	}
}

function randomNum(max,min){
    if(max < min){
        var tmp = min;
        min = max;
        max = tmp;
    }
    var num = parseInt(Math.random()*(max - min) + min);
    return num;
}

function animate(ele,obj,fn){
    let k = 0
    let n = 0
    for(let attr in obj){
        k++
        let timerId = setInterval(function(){
            let target = obj[attr]
            let currentStyle = getStyle(ele,attr)
            if(attr === 'opacity'){
                target *= 100
                currentStyle *= 100
            }
            currentStyle = parseInt(currentStyle)
            let speed = (target-currentStyle)/30
            if(speed>0){
                speed = Math.ceil(speed)
            }else{
                speed = Math.floor(speed)
            }
            currentStyle += speed
            if(attr === 'opacity'){
                ele.style[attr] = currentStyle/100
            }else{
                ele.style[attr] = currentStyle + "px"
            }
            // 限制left
            if(currentStyle===target){
                currentStyle = target
                clearInterval(timerId)
                n++
                if(k===n){
                    fn()
                }
            }
        },10)
    }
}

function sport(ele,obj,fn=null){
    var timerObj = {}
    for(let attr in obj){
        let target = obj[attr]; // 0.5
        let currentStyle = parseInt(getStyle(ele,attr));  // 1
        if(attr == 'opacity'){
            currentStyle = currentStyle*100; // 100
            target = target*100;
        }
        timerObj[attr] = setInterval(function(){
            let speed = (target-currentStyle) / 1000;
            let percent;
            if(speed<0){ 
                percent = Math.floor(speed/10); 
            }else{
                percent = Math.ceil(speed/10); 
            }
            currentStyle += percent;
            if(currentStyle==target){
                clearInterval(timerObj[attr]);
                delete timerObj[attr]
                var k=0;
                for(var i in timerObj){
                    k++;
                }
                if(k==0){
                    if(fn){
                        fn()
                    }
                }
            }else{
                if(attr == "opacity"){
                    ele.style[attr] = currentStyle/100;
                }else{
                    ele.style[attr] = currentStyle + 'px';
                }
            }
        },1);

    }   
}

function getCookie(key){
    let arr = document.cookie.split("; ");
    for(let i = 0;i < arr.length;i++){
        let brr = arr[i].split("=");
        if(brr[0] === key){
            return brr[1];
        }
    }
}

function sCookie(key,value,second,path = "/"){
    let date = new Date();
    let time = date.getTime() - 8 * 3600 * 1000 + second * 1000;
    date.setTime(time);
    document.cookie = key + "=" + value + ";expires = " + date + ";path = " + path; 
}

function removeCookie(key,path = "/"){
    sCookie(key,null,-1,path);
}

// function sendAjax(obj){
//     // 判断dataType是否传入
//     if(!obj.dataType){
//         obj.dataType = 'json'
//     }
//     // 判断类型
//     if(obj.dataType.toLowerCase() !== 'xml' && obj.dataType!=='json' && obj.dataType!=='string'){
//         throw new Error('dataType必须是xml或string或json')
//     }
//     // 判断请求方式是否传入
//     if(!obj.method){
//         obj.method = 'get'
//     }
//     // 判断是否非get和post
//     if(obj.method.toLowerCase()!=='get' && obj.method.toLowerCase()!=='post'){
//         throw new Error('请求方式必须是get或post')
//     }
//     // 判断是否传入url
//     if(!obj.url){
//         throw new Error('地址必填')
//     }
//     // 地址是否在字符串
//     if(typeof obj.url !== 'string'){
//         throw new Error('请传入正确的地址')
//     }
//     // 判断是否传入async
//     if(obj.async === undefined){
//         obj.async = true
//     }
//     // 判断是否异步的参数必须是布尔值
//     if(typeof obj.async !== 'boolean'){
//         // 抛出自定义错误
//         throw new Error("async参数必须是布尔值")
//     }
//     // 定义最终数据变量
//     var str = '';
//     if(obj.data){
//         // 判断传入的数据是字符串还是object
//         if(typeof obj.data === 'object'){
//             // 判断是否传入data
//             if(obj.data){
//                 // 将data这个对象转为字符串
//                 var f = '';
//                 for(var attr in obj.data){
//                     str += f + attr + '=' + obj.data[attr]
//                     f = '&'
//                 }
//             }
//         }else if(typeof obj.data === 'string'){
//             str = obj.data
//         }else{
//             throw new Error('数据必须是对象或字符串')
//         }
//         // 判断请求方式是否是get
//         if(obj.method.toLowerCase() === 'get'){
//             obj.url += '?'+str
//         }
//     }
//     // 判断函数是否传入
//     if(!obj.success){
//         obj.success = function(){}
//     }
//     if(!obj.error){
//         obj.error = function(){}
//     }
//     // 判断传入的fn类型是否是函数
//     if(typeof obj.success !== 'function'){
//         throw new Error("success必须是函数")
//     }
//     if(typeof obj.error !== 'function'){
//         throw new Error("error必须是函数")
//     }
//     var xhr = new XMLHttpRequest()
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState === 4){
//             if(/^2\d{2}$/.test(xhr.status)){
//                 var res = '';
//                 switch(obj.dataType.toLowerCase()){
//                     case 'string':
//                         res = xhr.responseText;
//                     break;
//                     case 'json':
//                         res = xhr.responseText;
//                         res = JSON.parse(res)
//                     break;
//                     case "xml":
//                         res = xhr.responseXML;
//                     break;
//                 }
//                 obj.success(res)
//             }else{
//                 // 处理失败
//                 obj.error()
//             }
//         }
//     }
//     xhr.open(obj.method,obj.url,obj.async)
//     // 判断数据是否存在，再判断是否是post请求才能设置请求头
//     if(obj.data){
//         if(obj.method.toLowerCase() === 'post'){
//             // 设置请求头
//             xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
//             xhr.send(str)
//             return false;
//         }
//     }
//     xhr.send()
// }

function promiseAjax(obj){
    return new Promise(function(resolve,reject){
        // 发送ajax
        // 判断dataType是否传入
        if(!obj.dataType){
            obj.dataType = 'json'
        }
        // 判断类型
        if(obj.dataType.toLowerCase() !== 'xml' && obj.dataType!=='json' && obj.dataType!=='string'){
            throw new Error('dataType必须是xml或string或json')
        }
        // 判断请求方式是否传入
        if(!obj.method){
            obj.method = 'get'
        }
        // 判断是否非get和post
        if(obj.method.toLowerCase()!=='get' && obj.method.toLowerCase()!=='post'){
            throw new Error('请求方式必须是get或post')
        }
        // 判断是否传入url
        if(!obj.url){
            throw new Error('地址必填')
        }
        // 地址是否在字符串
        if(typeof obj.url !== 'string'){
            throw new Error('请传入正确的地址')
        }
        // 判断是否传入async
        if(obj.async === undefined){
            obj.async = true
        }
        // 判断是否异步的参数必须是布尔值
        if(typeof obj.async !== 'boolean'){
            // 抛出自定义错误
            throw new Error("async参数必须是布尔值")
        }
        // 定义最终数据变量
        var str = '';
        if(obj.data){
            // 判断传入的数据是字符串还是object
            if(typeof obj.data === 'object'){
                // 判断是否传入data
                if(obj.data){
                    // 将data这个对象转为字符串
                    var f = '';
                    for(var attr in obj.data){
                        str += f + attr + '=' + obj.data[attr]
                        f = '&'
                    }
                }
            }else if(typeof obj.data === 'string'){
                str = obj.data
            }else{
                throw new Error('数据必须是对象或字符串')
            }
            // 判断请求方式是否是get
            if(obj.method.toLowerCase() === 'get'){
                obj.url += '?'+str
            }
        }
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(/^2\d{2}$/.test(xhr.status)){
                    var res = '';
                    switch(obj.dataType.toLowerCase()){
                        case 'string':
                            res = xhr.responseText;
                        break;
                        case 'json':
                            res = xhr.responseText;
                            res = JSON.parse(res)
                        break;
                        case "xml":
                            res = xhr.responseXML;
                        break;
                    }
                    resolve(res)
                }else{
                    // 处理失败
                    reject()
                }
            }
        }
        xhr.open(obj.method,obj.url,obj.async)
        // 判断数据是否存在，再判断是否是post请求才能设置请求头
        if(obj.data){
            if(obj.method.toLowerCase() === 'post'){
                // 设置请求头
                xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
                xhr.send(str)
                return false;
            }
        }
        xhr.send()
    })
}
