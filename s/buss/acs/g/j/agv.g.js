var areaInfoInitOver = 1;//不包含WMS的项目初始值为1,否则为0
var timeLength = 1200;
var updateMgrPosition = function () {
    $("#fadeIndex").hide();
    return;
}
var updateHeight = function () {
    var height = 60;
    $(".area td button").each(function () {
        if ($(this).height() > height) {
            height = $(this).height();
        }
    });
    $(".area td button").css("height", height + "px");
}
var intervalVal = setInterval(function () {
    if (areaInfoInitOver == 1) {
        resizeTable();
        areaInfoInitOver = 2;
    } else if (areaInfoInitOver == 2) {
        updateHeight();
        areaInfoInitOver = 3;
    } else if (areaInfoInitOver == 3) {
        updateMgrPosition();
        clearInterval(intervalVal);
    }
}, 300);