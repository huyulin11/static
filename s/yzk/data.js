export var moment = function(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1))
    var date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate())
    var hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours())
    var minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes())
    var second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds())
    var YmdHis = year + '/' + month + '/' + date + ' ' + hour + ':' + minute + ':' + second;
    return YmdHis;
}