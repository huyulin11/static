function hasUserMedia() {//判断是否支持调用设备api，因为浏览器不同所以判断方式不同哦  
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
if (hasUserMedia()) {
    //alert("浏览器支持")  
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getUserMedia({
        video: true,//开启视频  
        audio: false//先关闭音频，因为会有回响，以后两台电脑通信不会有响声  
    }, function (stream) {//将视频流交给video  
        var video = document.querySelector("video");
        video.src = window.URL.createObjectURL(stream);
    }, function (err) {
        alert("capturing-" + err)
    });
} else {
    alert("浏览器暂不支持")
}  
