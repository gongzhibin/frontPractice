// require('./css/main.css');
var EventUtil = require('./EventUtil.js');
var $ = require('jquery');
window.addEventListener('load', function () {
    //测试canvas
    // var runCanvas = document.getElementById('run-canvas');
    var runCanvas = $('#run-canvas');
    runCanvas.bind('click', function (event) {
        var canvas = document.getElementById('test-canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 300, 300); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
        ctx.fillStyle = '#ccff99'; // 设置颜色
        ctx.fillRect(10, 10, 130, 130); // 把(10,10)位置大小为130x130的矩形涂色
        // 利用Path绘制复杂路径:
        var path = new Path2D();
        path.arc(75, 75, 50, 0, Math.PI * 2, true);
        path.moveTo(110, 75);
        path.arc(75, 75, 35, 0, Math.PI, false);
        path.moveTo(65, 65);
        path.arc(60, 65, 5, 0, Math.PI * 2, true);
        path.moveTo(95, 65);
        path.arc(90, 65, 5, 0, Math.PI * 2, true);
        ctx.strokeStyle = '#e62e00';
        ctx.stroke(path);
        canvas.scrollIntoView();
        EventUtil.stopPropagation(event);
    });


    //返回顶部
    var returnTop = document.getElementById('return-top');
    // 获取视界高度；
    var winH = document.documentElement.clientHeight;
    // 定义计时器；
    var timer = null;
    // 定义是否抵达顶部布尔值判断；
    var isTop = true;
    // 设置滚动事件；
    window.onscroll = function () {
        var toTop = document.body.scrollTop || document.documentElement.scrollTop;
        // 判断是否到了第二屏，若是，显示按钮；
        if (toTop >= winH) {
            returnTop.style.display = 'block';
        } else {
            returnTop.style.display = 'none';
        }
        // 判断是否抵达顶部，若否，停止计时器；
        if (!isTop) {
            clearInterval(timer);
        }
        // 重置布尔值判断；
        isTop = false;
    }
    //返回顶部事件
    var returnToTop = function () {
        // 设置计时器，50毫秒间隔；
        timer = setInterval(function () {
            var toTop = document.body.scrollTop || document.documentElement.scrollTop;
            // 设置速度，用等式而不用具体数值是为了产生缓动效果；
            var speed = Math.ceil(toTop / 5);
            // 作差，产生缓动效果；
            document.documentElement.scrollTop = document.body.scrollTop = toTop - speed;
            // 重置布尔值判断；
            isTop = true;
            // 判断是否抵达顶部，若是，停止计时器；
            if (toTop == 0) {
                clearInterval(timer);
            }
        }, 50);
    };
    // 设置按钮单击事件；
    returnTop.onclick = returnToTop;

    //测试contains()方法
    var testContains = document.getElementById('test-contains');
    testContains.onclick = function (event) {
        var isContains = document.documentElement.contains(document.body);
        alert('document.documentElement.contains(document.body)=' + isContains);
        event.stopPropagation();
        // alert(event.eventPhase);

    };
    //测试事件对象
    var testEvent = document.getElementById('test-event');
    testEvent.addEventListener('click', function (event) {
        var out = '';
        for (var item in event) {
            out += item + '=' + event[item] + '\n';
        }
        alert(out);
        EventUtil.stopPropagation(event);
    }, false)

    //测试一个函数添加多个事件对象
    var testEventType = document.querySelector('#test-event-type');
    var handler = function (event) {
        switch (event.type) {
            case 'click':
                alert('通过type属性处理多个事件,本事件为click');
                break;

            case 'mouseover':
                event.target.style.backgroundColor = '#ffff66';
                alert('通过type属性处理多个事件,本事件为mouseOver');
                break;
            case 'mouseout':
                this.style.backgroundColor = '#66c2ff';
                alert('通过type属性处理多个事件,本事件为mouseOut');
                break;
        }
    }
    testEventType.onclick = handler;
    testEventType.onmouseover = handler;
    testEventType.onmouseout = handler;

    //测试事件冒泡
    var testBubbles = document.getElementById('test-bubbles');
    testBubbles.onclick = function (event) {
        alert('test-babbles clicked,不添加event.stopPropagation()');
        // event.stopPropagation();
    };
    var someOperations = document.getElementById('some-operations');
    someOperations.onclick = function () {
        alert('some-operations clicked');
    }
    //UI事件
    //1.load事件，包括window,script元素，图片元素
    //2.unload事件，还没实现
    //3.resize事件
    //4.scroll事件

    //测试resize事件
    window.addEventListener('resize', function (event) {
        alert('window resized!')
    }, false)
    //测试scroll事件
    window.addEventListener('scroll', function (event) {
        var thisTop = document.body.scrollTop;
        console.log(thisTop);
        // if (thisTop > 2500) {
        //     alert('距离顶部大于2500，准备上天吧！');
        //     //触发返回顶部事件
        //     returnToTop();
        // }
    }, false);

    // 焦点事件
    // 1.blur事件       元素失去焦点时触发，不会冒泡
    // 2.focus事件      元素获得焦点时触发，不会冒泡
    // 3.focusin事件    元素获得焦点时触发
    // 4.focusout事件   元素失去焦点时触发

    // 鼠标和滚轮事件
    // 1.click事件                    单击和回车触发
    // 2.dbclick事件                  双击触发
    // 3.mousedown/mouseup事件        按下鼠标/释放鼠标触发
    // 4.mouseenter事件               鼠标首次移动到元素范围内触发
    // 5.mouseleave事件               鼠标移动到元素范围外触发
    // 6.mousemove事件                鼠标在元素内部移动时重复地触发
    // 7.mouseout事件                 一个元素移动到另一个元素时触发
    // 8.mouseover事件                首次移入另一个元素边界时触发

    //9.mousewheel事件                鼠标滚轮事件

    //1.获取客户区鼠标的坐标位置,视口的水平和垂直坐标
    var testXY = document.querySelector('#test-xy');
    testXY.onclick = function (event) {
        alert('视口的水平坐标:' + event.clientX + '\n' + '视口的水平和垂直坐标:' + event.clientY);
        alert('页面的水平坐标:' + event.pageX + '\n' + '页面的垂直坐标:' + event.pageY);
        alert('页面没有滚动时，两值相等；滚动之后，会发生变化');
        alert('屏幕的水平坐标:' + event.screenX + '\n' + '屏幕的垂直坐标:' + event.screenY);
        event.stopPropagation();
    }



    //测试Jquery的Ajax请求
    var testAjax = $('#test-ajax');
    testAjax.click(function (event) {
        $.ajax({
            method: 'POST',
            url: '/about',
            cache: false,
            success: function (res) {
                alert('使用jquery发送ajax请求成功，返回为：' + res);
            },
            error: function (res) {
                console.log(res);
                alert('ajax出错');
            }
        });
    });

    // 测试XMLHTTPRequest请求
    var testXMLHttpRequest = $('#test-XMLHttpRequest');
    testXMLHttpRequest.on('click', function () {
        var xhr = new XMLHttpRequest();//支持IE7+,兼容方法位js高级程序编程P572
        // xhr.onreadystatechange = function () {//readyState属性由一个值变成另外一个值都会触发readystatechange事件
        //     //0表示未初始化，尚未调用open()方法
        //     //1表示启动，已经调用open()方法，但是尚未调用send()方法
        //     //2表示发送，已经调用send()方法，但是尚未收到响应
        //     //3表示接收，表明已经接收到部分响应数据
        //     //4表示完成，已经接收到全部响应数据，可以在客户端使用
        //     if (this.readyState == 4)
        //         if ((this.status >= 200 && this.status < 300) || xhr.status == 304) {
        //             alert("responseText:" + this.responseText + "\nresponseXML:" + this.responseXML + "\nstatus:" + this.status + "\nstatusText:" + this.statusText);
        //         } else {
        //             alert("XMLHttpRequest请求不成功：" + this.status)
        //         }
        // };
        xhr.onload = function () {//XMLHttpRequest2级使用方法 无需检查readyState状态
            if ((this.status >= 200 && this.status < 300) || this.status == 304) {
                alert("responseText:" + this.responseText + "\nresponseXML:" + this.responseXML + "\nstatus:" + this.status + "\nstatusText:" + this.statusText);
            } else {
                alert("XMLHttpRequest请求不成功：" + this.status)
            }
        };
        xhr.onprogress = function (event) {
            var divStatus = $('#status');
            if (event.lengthComputable) {
                divStatus.append('received ' + event.loaded + ' of ' + event.total + ' bytes');//怎样实时显示数据
            }
        }
        xhr.open('GET', '/xhttp', true);
        xhr.setRequestHeader('xj', 'sb');
        xhr.send(null);
    })

    //XMLHttpRequest CORS请求
    var testCORS = $('#test-cors');
    testCORS.on('click', function () {
        var xhrCORS = new XMLHttpRequest();//支持IE7+,兼容方法位于：js高级程序编程P572
        // xhrCORS.onreadystatechange = function () {//readyState属性由一个值变成另外一个值都会触发readystatechange事件
        //     //0表示未初始化，尚未调用open()方法
        //     //1表示启动，已经调用open()方法，但是尚未调用send()方法
        //     //2表示发送，已经调用send()方法，但是尚未收到响应
        //     //3表示接收，表明已经接收到部分响应数据
        //     //4表示完成，已经接收到全部响应数据，可以在客户端使用
        //     if (this.readyState == 4) {
        //         if ((this.status >= 200 && this.status < 300) || this.status == 304) {
        //             alert("responseText:" + this.responseText + "\nresponseXML:" + this.responseXML + "\nstatus:" + this.status + "\nstatusText:" + this.statusText);
        //         } else {
        //             alert("XMLHttpRequest请求不成功：" + this.status)
        //         }
        //     }
        // };
        xhrCORS.onload = function () {//XMLHttpRequest2级使用方法 无需检查readyState状态
            if ((this.status >= 200 && this.status < 300) || this.status == 304) {
                alert("responseText:" + this.responseText + "\nresponseXML:" + this.responseXML + "\nstatus:" + this.status + "\nstatusText:" + this.statusText);
            } else {
                alert("XMLHttpRequest请求不成功：" + this.status)
            }
        };
        xhrCORS.open('post', 'http://127.0.0.1:3001/cors', true);//该跨域请求位于E:/CORS/文件夹中
        //需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名
        //同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。
        xhrCORS.withCredentials = true;
        xhrCORS.send(null);
    })

    // //JSONP跨域 jquery实现
    // var testJsonp = $('#test-jsonp');
    // testJsonp.on('click', function () {
    //     $.getJSON("http://freegeoip.net/json/?callback=?",function (res) {
    //         alert("ip address:" + res.ip + "\ncity:" + res.city + "\nregion" + res.region_name);
    //     })
    //     EventUtil.stopPropagation(event);
    // })

    //JSONP跨域 javascript实现
    var testJsonp = document.querySelector("#test-jsonp");
    testJsonp.addEventListener("click", function () {
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.src = 'http://freegeoip.net/json/?callback=handleJsonpResponse';
        document.body.appendChild(script);
        //handleJsonpResponse({"ip":"113.57.176.179","country_code":"CN","country_name":"China","region_code":"42","region_name":"Hubei","city":"Wuhan","zip_code":"","time_zone":"Asia/Shanghai","latitude":30.5801,"longitude":114.2734,"metro_code":0});
    });
    //通过socket.io实现websocket
    var testWebsocket = document.querySelector("#test-websocket");
    //不管是服务器还是客户端，socket.io提供两个核心方法：emit方法用于发送消息，on方法用于监听对方发送的消息。
    testWebsocket.addEventListener('click', function (event) {
        alert('event.type: ' + event.type);
        var socket = io.connect('http://127.0.0.1:3000');
        //on方法用于监听对方发送的消息
        socket.on('news', function (data) {
            alert("serverToClient: " + data.serverToClient);
        })
        //用emit方法向服务器端发送信号，触发服务器端的anotherNews事件
        socket.emit('anotherNews', {clientToServer: 'this news ig from client to server'});
    }, false);

    console.log("欢迎加入LOL地表最强战队 %c NorthernWolf", "color:red");
    console.log("有意者请将简历发送至 %c zxlg1993@gmail.com（ 邮件标题请以“姓名-应聘XX位置-来自console”命名）", "color:blue");
}, false)
// $(document).ready(
//     function () {
//         //测试canvas
//         // var runCanvas = document.getElementById('run-canvas');
//         var runCanvas = $('#run-canvas');
//         runCanvas.bind('click', function (event) {
//             var canvas = document.getElementById('test-canvas');
//             var ctx = canvas.getContext('2d');
//             ctx.clearRect(0, 0, 300, 300); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
//             ctx.fillStyle = '#ccff99'; // 设置颜色
//             ctx.fillRect(10, 10, 130, 130); // 把(10,10)位置大小为130x130的矩形涂色
//             // 利用Path绘制复杂路径:
//             var path = new Path2D();
//             path.arc(75, 75, 50, 0, Math.PI * 2, true);
//             path.moveTo(110, 75);
//             path.arc(75, 75, 35, 0, Math.PI, false);
//             path.moveTo(65, 65);
//             path.arc(60, 65, 5, 0, Math.PI * 2, true);
//             path.moveTo(95, 65);
//             path.arc(90, 65, 5, 0, Math.PI * 2, true);
//             ctx.strokeStyle = '#e62e00';
//             ctx.stroke(path);
//             canvas.scrollIntoView();
//             EventUtil.stopPropagation(event);
//         });
//
//
//         //返回顶部
//         var returnTop = document.getElementById('return-top');
//         // 获取视界高度；
//         var winH = document.documentElement.clientHeight;
//         // 定义计时器；
//         var timer = null;
//         // 定义是否抵达顶部布尔值判断；
//         var isTop = true;
//         // 设置滚动事件；
//         window.onscroll = function () {
//             var toTop = document.body.scrollTop || document.documentElement.scrollTop;
//             // 判断是否到了第二屏，若是，显示按钮；
//             if (toTop >= winH) {
//                 returnTop.style.display = 'block';
//             } else {
//                 returnTop.style.display = 'none';
//             }
//             // 判断是否抵达顶部，若否，停止计时器；
//             if (!isTop) {
//                 clearInterval(timer);
//             }
//             // 重置布尔值判断；
//             isTop = false;
//         }
//         // 设置按钮单击事件；
//         returnTop.onclick = function () {
//             // 设置计时器，50毫秒间隔；
//             timer = setInterval(function () {
//                 var toTop = document.body.scrollTop || document.documentElement.scrollTop;
//                 // 设置速度，用等式而不用具体数值是为了产生缓动效果；
//                 var speed = Math.ceil(toTop / 5);
//                 // 作差，产生缓动效果；
//                 document.documentElement.scrollTop = document.body.scrollTop = toTop - speed;
//                 // 重置布尔值判断；
//                 isTop = true;
//                 // 判断是否抵达顶部，若是，停止计时器；
//                 if (toTop == 0) {
//                     clearInterval(timer);
//                 }
//             }, 50);
//         };
//
//
//         //测试contains()方法
//         var testContains = document.getElementById('test-contains');
//         testContains.onclick = function (event) {
//             var isContains = document.documentElement.contains(document.body);
//             alert('document.documentElement.contains(document.body)=' + isContains);
//             event.stopPropagation();
//             // alert(event.eventPhase);
//
//         };
//         //测试事件对象
//         var testEvent = document.getElementById('test-event');
//         testEvent.addEventListener('click', function (event) {
//             var out = '';
//             for (var item in event) {
//                 out += item + '=' + event[item] + '\n';
//             }
//             alert(out);
//             EventUtil.stopPropagation(event);
//         }, false)
//
//         //测试一个函数添加多个事件对象
//         var testEventType = document.querySelector('#test-event-type');
//         var handler = function (event) {
//             switch (event.type) {
//                 case 'click':
//                     alert('通过type属性处理多个事件,本事件为click');
//                     break;
//
//                 case 'mouseover':
//                     event.target.style.backgroundColor = '#ffff66';
//                     alert('通过type属性处理多个事件,本事件为mouseOver');
//                     break;
//                 case 'mouseout':
//                     this.style.backgroundColor = '#66c2ff';
//                     alert('通过type属性处理多个事件,本事件为mouseOut');
//                     break;
//             }
//         }
//         testEventType.onclick = handler;
//         testEventType.onmouseover = handler;
//         testEventType.onmouseout = handler;
//
//         //测试事件冒泡
//         var testBubbles = document.getElementById('test-bubbles');
//         testBubbles.onclick = function (event) {
//             alert('test-babbles clicked,不添加event.stopPropagation()');
//             // event.stopPropagation();
//         };
//         var someOperations = document.getElementById('some-operations');
//         someOperations.onclick = function () {
//             alert('some-operations clicked');
//         }
//         //UI时间
//         //1.load事件，包括window,script元素，图片元素
//         //2.unload事件
//
//         var testUnload = document.querySelector('#test-unload');
//
//         //测试Jquery的Ajax请求
//         var testAjax = $('#test-ajax');
//         testAjax.click(function (event) {
//             $.ajax({
//                 method: 'POST',
//                 url: '/about',
//                 cache: false,
//                 success: function (res) {
//                     alert('使用jquery发送ajax请求成功，返回为：' + res);
//                 },
//                 error: function (res) {
//                     console.log(res);
//                     alert('ajax出错');
//                 }
//             });
//         });
//
//         // 测试XMLHTTPRequest请求
//         var testXMLHttpRequest = $('#test-XMLHttpRequest');
//         testXMLHttpRequest.on('click', function () {
//             var xhr = new XMLHttpRequest();//支持IE7+,兼容方法位js高级程序编程P572
//             // xhr.onreadystatechange = function () {//readyState属性由一个值变成另外一个值都会触发readystatechange事件
//             //     //0表示未初始化，尚未调用open()方法
//             //     //1表示启动，已经调用open()方法，但是尚未调用send()方法
//             //     //2表示发送，已经调用send()方法，但是尚未收到响应
//             //     //3表示接收，表明已经接收到部分响应数据
//             //     //4表示完成，已经接收到全部响应数据，可以在客户端使用
//             //     if (this.readyState == 4)
//             //         if ((this.status >= 200 && this.status < 300) || xhr.status == 304) {
//             //             alert("responseText:" + this.responseText + "\nresponseXML:" + this.responseXML + "\nstatus:" + this.status + "\nstatusText:" + this.statusText);
//             //         } else {
//             //             alert("XMLHttpRequest请求不成功：" + this.status)
//             //         }
//             // };
//             xhr.onload = function () {//XMLHttpRequest2级使用方法 无需检查readyState状态
//                 if ((this.status >= 200 && this.status < 300) || this.status == 304) {
//                     alert("responseText:" + this.responseText + "\nresponseXML:" + this.responseXML + "\nstatus:" + this.status + "\nstatusText:" + this.statusText);
//                 } else {
//                     alert("XMLHttpRequest请求不成功：" + this.status)
//                 }
//             };
//             xhr.onprogress = function (event) {
//                 var divStatus = $('#status');
//                 if (event.lengthComputable) {
//                     divStatus.append('received ' + event.loaded + ' of ' + event.total + ' bytes');//怎样实时显示数据
//                 }
//             }
//             xhr.open('GET', '/xhttp', true);
//             xhr.setRequestHeader('xj', 'sb');
//             xhr.send(null);
//         })
//
//         //XMLHttpRequest CORS请求
//         var testCORS = $('#test-cors');
//         testCORS.on('click', function () {
//             var xhrCORS = new XMLHttpRequest();//支持IE7+,兼容方法位于：js高级程序编程P572
//             // xhrCORS.onreadystatechange = function () {//readyState属性由一个值变成另外一个值都会触发readystatechange事件
//             //     //0表示未初始化，尚未调用open()方法
//             //     //1表示启动，已经调用open()方法，但是尚未调用send()方法
//             //     //2表示发送，已经调用send()方法，但是尚未收到响应
//             //     //3表示接收，表明已经接收到部分响应数据
//             //     //4表示完成，已经接收到全部响应数据，可以在客户端使用
//             //     if (this.readyState == 4) {
//             //         if ((this.status >= 200 && this.status < 300) || this.status == 304) {
//             //             alert("responseText:" + this.responseText + "\nresponseXML:" + this.responseXML + "\nstatus:" + this.status + "\nstatusText:" + this.statusText);
//             //         } else {
//             //             alert("XMLHttpRequest请求不成功：" + this.status)
//             //         }
//             //     }
//             // };
//             xhrCORS.onload = function () {//XMLHttpRequest2级使用方法 无需检查readyState状态
//                 if ((this.status >= 200 && this.status < 300) || this.status == 304) {
//                     alert("responseText:" + this.responseText + "\nresponseXML:" + this.responseXML + "\nstatus:" + this.status + "\nstatusText:" + this.statusText);
//                 } else {
//                     alert("XMLHttpRequest请求不成功：" + this.status)
//                 }
//             };
//             xhrCORS.open('post', 'http://127.0.0.1:3001/cors', true);//该跨域请求位于E:/CORS/文件夹中
//             //需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名
//             //同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。
//             xhrCORS.withCredentials = true;
//             xhrCORS.send(null);
//         })
//
//         // //JSONP跨域 jquery实现
//         // var testJsonp = $('#test-jsonp');
//         // testJsonp.on('click', function () {
//         //     $.getJSON("http://freegeoip.net/json/?callback=?",function (res) {
//         //         alert("ip address:" + res.ip + "\ncity:" + res.city + "\nregion" + res.region_name);
//         //     })
//         //     EventUtil.stopPropagation(event);
//         // })
//
//         //JSONP跨域 javascript实现
//         var testJsonp = document.querySelector("#test-jsonp");
//         testJsonp.addEventListener("click", function () {
//             var script = document.createElement('script');
//             script.setAttribute("type", "text/javascript");
//             script.src = 'http://freegeoip.net/json/?callback=handleJsonpResponse';
//             document.body.appendChild(script);
//             //handleJsonpResponse({"ip":"113.57.176.179","country_code":"CN","country_name":"China","region_code":"42","region_name":"Hubei","city":"Wuhan","zip_code":"","time_zone":"Asia/Shanghai","latitude":30.5801,"longitude":114.2734,"metro_code":0});
//         });
//         //通过socket.io实现websocket
//         var testWebsocket = document.querySelector("#test-websocket");
//         //不管是服务器还是客户端，socket.io提供两个核心方法：emit方法用于发送消息，on方法用于监听对方发送的消息。
//         testWebsocket.addEventListener('click', function (event) {
//             alert('event.type: ' + event.type);
//             var socket = io.connect('http://127.0.0.1:3000');
//             //on方法用于监听对方发送的消息
//             socket.on('news', function (data) {
//                 alert("serverToClient: " + data.serverToClient);
//             })
//             //用emit方法向服务器端发送信号，触发服务器端的anotherNews事件
//             socket.emit('anotherNews', {clientToServer: 'this news ig from client to server'});
//         }, false);
//
//         console.log("欢迎加入LOL地表最强战队 %c NorthernWolf", "color:red");
//         console.log("有意者请将简历发送至 %c zxlg1993@gmail.com（ 邮件标题请以“姓名-应聘XX位置-来自console”命名）", "color:blue");
//     });

// var body = document.querySelector('body');
// body.addEventListener('unload', function (event) {
//     console.log('unloaded')
// }, false);
