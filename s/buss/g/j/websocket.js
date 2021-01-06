import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";

export var ws = (url, whenmsg, whenopen, whenclose) => {
    var o = null;
    if ('WebSocket' in window) {
        o = new WebSocket(url);//"ws://127.0.0.1:180/websocket"
    }
    else {
        alert('当前浏览器 Not support websocket');
        return null;
    }
    o.onopen = whenopen ? whenopen : () => {
        console.log("ws打开事件");
    }
    o.onmessage = whenmsg ? whenmsg : (event) => {
        console.log(event.data);
    }
    o.onclose = whenclose ? whenclose : () => {
        gflayer.msg("数据通道处于关闭状态，请确定连接成功后刷新界面！");
    }
    return o;
}