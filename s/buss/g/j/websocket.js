if (window.location.href.indexOf("127.0.0.1") >= 0) {
    var websocket = null;
    if ('WebSocket' in window) {//buss.calculatedfun.com 127.0.0.1:180
        websocket = new WebSocket("ws://buss.calculatedfun.com/websocket");
    }
    else {
        alert('当前浏览器 Not support websocket')
    }

    //连接成功建立的回调方法
    websocket.onopen = function () {
        setMessageInnerHTML("今日计划：");
    }

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        setMessageInnerHTML(event.data);
    }

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        document.getElementById('message').innerHTML += innerHTML + '<br/>';
    }
}