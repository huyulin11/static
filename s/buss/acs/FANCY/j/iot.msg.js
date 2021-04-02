import { ws } from "/s/buss/g/j/websocket.js";

export var initAgvList = function () {
    ws("ws://" + window.document.location.hostname + ":9080" + "/websocket/iotmsg", (event) => {
        let json = JSON.parse(event.data);
        console.log(json);
    }, null, () => {
        console.log("解析iotmsg异常");
    });
}
