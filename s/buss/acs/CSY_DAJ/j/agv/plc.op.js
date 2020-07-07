import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
var agvId = currentAgvId;

var keyVal = ["allow", "type", "agvLayer", "window", "windowLayer", "robot", "frame", "fork", "piece"];
var formHtml = "<form id='details'></form>";
var sendButton = '<button id="type" name="type">' + '发送指令' + '</button > ';
var allowSelectStr = '<select id="allow" name="allow" data-key=1>'
    + '<option value ="1">允许动作</option>'
    + '<option value="2">不允许动作</option>'
    + '<option value ="3">异常情况处理</option>'
    + '</select > ';
var typeSelectStr = '<select id="type" name="type" data-key=2>'
    + '<option value ="1">窗口→档案→AGV</option>'
    + '<option value="2">AGV→档案→档案架</option>'
    + '<option value="3">档案架→档案→AGV</option>'
    + '<option value="4">AGV→档案→窗口</option>'
    + '<option value="5">机器人扫描</option>'
    + '<option value="6">PLC契合</option>'
    + '</select > ';
var agvLayerSelectStr = '<select id="agvLayer" name="agvLayer" data-key=3>'
    + '<option value ="1">agv缓存1层</option>'
    + '<option value="2">agv缓存2层</option>'
    + '<option value="3">agv缓存3层</option>'
    + '<option value="4">agv缓存4层</option>'
    + '<option value="5">agv缓存5层</option>'
    + '<option value="6">agv缓存6层</option>'
    + '</select > ';
var windowSelectStr = '<select id="window" name="window" data-key=4>'
    + '<option value ="1">1号窗口</option>'
    + '<option value="2">2号窗口</option>'
    + '<option value="3">3号窗口</option>'
    + '</select > ';
var windowLayerSelectStr = '<select id="windowLayer" name="windowLayer" data-key=5>'
    + '<option value="1">窗口1层</option>'
    + '<option value="2">窗口2层</option>'
    + '<option value="3">窗口3层</option>'
    + '<option value="4">窗口4层</option>'
    + '<option value="5">窗口5层</option>'
    + '<option value="6">窗口6层</option>'
    + '<option value="7">窗口7层</option>'
    + '<option value="8">窗口8层</option>'
    + '</select > ';
var robotSelectStr = '<select id="robot" name="robot" data-key=6>'
    + '<option value="1">机器人向左转（相对行驶方向）</option>'
    + '<option value="2">机器人向右转（相对行驶方向）</option>'
    + '</select > ';
var forkSelectStr = '<select id="fork" name="fork" data-key=7>'
    + '<option value="1">货叉向左转（相对档案柜方向）</option>'
    + '<option value="2">货叉向右转（相对档案柜方向）</option>'
    + '</select > ';
var frameSelectStr = '<select id="frame" name="frame" data-key=8>'
    + '<option value ="1">档案架大格1层</option>'
    + '<option value="2">档案架大格2层</option>'
    + '<option value="3">档案架大格3层</option>'
    + '<option value="4">档案架大格4层</option>'
    + '</select > ';
var pieceSelectStr = '<select id="piece" name="piece" data-key=9>'
    + '<option value ="1">小格1层</option>'
    + '<option value="2">小格2层</option>'
    + '<option value="3">小格3层</option>'
    + '<option value="4">小格4层</option>'
    + '<option value="5">小格5层</option>'
    + '<option value="6">小格6层</option>'
    + '<option value="7">小格7层</option>'
    + '<option value="8">小格8层</option>'
    + '<option value="9">小格9层</option>'
    + '<option value="10">小格10层</option>'
    + '<option value="11">小格11层</option>'
    + '</select > ';
var pieceOption12Str = '<option value="12">小格12层</option>';

var addButton = function () {
    if ($("div#plcMgr").find("button").length == 0) {
        $("div#plcMgr").find("form#details").append(sendButton);
    }
}

var reChoose = function (val) {
    $("div#plcMgr").find("button").remove();
    $("div#plcMgr").find("select").each(function () {
        if ($(this).data("key") > val) {
            $(this).remove();
        }
    });
}

var showAgvLayer = function () { }

var allowChange = function (val) {
    reChoose(1);
    if (val == '1') {
        $("div#plcMgr").find("form#details").append(typeSelectStr);
        typeChange('1');
    } else {
        addButton();
    }
};

var typeChange = function (val) {
    reChoose(2);
    if (val == '1' || val == '2' || val == '3' || val == '4') {
        $("div#plcMgr").find("form#details").append(agvLayerSelectStr);
        agvLayerChange('1');
    } else if (val == '6') {
        addButton();
    } else if (val == '5') {
        $("div#plcMgr").find("form#details").append(robotSelectStr);
        robotChange('1');
    }
};

var agvLayerChange = function (val) {
    reChoose(3);
    var type = $("div#plcMgr").find("select#type").val();
    if (type == '1' || type == '4') {
        $("div#plcMgr").find("form#details").append(windowSelectStr);
        windowChange('1');
    } else {
        $("div#plcMgr").find("form#details").append(robotSelectStr);
        robotChange('1');
    }
};

var windowChange = function (val) {
    reChoose(4);
    $("div#plcMgr").find("form#details").append(windowLayerSelectStr);
    windowLayerChange('1');
};

var windowLayerChange = function (val) {
    addButton();
};

var robotChange = function (val) {
    reChoose(6);
    $("div#plcMgr").find("form#details").append(forkSelectStr);
    forkChange(val);
};

var forkChange = function (val) {
    reChoose(7);
    $("div#plcMgr").find("form#details").append(frameSelectStr);
    frameChange(val);
};

var frameChange = function (val) {
    reChoose(8);
    var type = $("div#plcMgr").find("select#type").val();
    if (type == '5') {
        addButton();
    } else {
        $("div#plcMgr").find("form#details").append(pieceSelectStr);
        var frame = $("select#frame").val();
        if (frame == '4') {
            $("div#plcMgr").find("form#details select#piece").append(pieceOption12Str);
        }
        pieceChange(val);
    }
};

var pieceChange = function (val) {
    addButton();
};

var doWork = function (taskname) {
    jQuery.ajax({
        url: "/de/acs/test.shtml",
        type: "post",
        dataType: "json",
        data: $("div#plcMgr").find("form#details").serialize() + "&agvId=" + agvId + "&testtype=PLCWORK",
        async: false,
        success: function (data) {
            alert(data);
            $("div#plcMgr button").removeAttr("disabled");
        },
        error: function (e) {
        },
    });
}

export var init = function () {
    $("div#plcMgr").append(formHtml);
    $("div#plcMgr").find("form#details").append(allowSelectStr);
    allowChange("1");
    $("div#plcMgr").delegate("select#allow", "change", function () {
        allowChange($(this).val());
    });
    $("div#plcMgr").delegate("select#type", "change", function () {
        typeChange($(this).val());
    });
    $("div#plcMgr").delegate("select#agvLayer", "change", function () {
        agvLayerChange($(this).val());
    });
    $("div#plcMgr").delegate("select#window", "change", function () {
        windowChange($(this).val());
    });
    $("div#plcMgr").delegate("select#windowLayer", "change", function () {
        windowLayerChange($(this).val());
    });
    $("div#plcMgr").delegate("select#robot", "change", function () {
        robotChange($(this).val());
    });
    $("div#plcMgr").delegate("select#fork", "change", function () {
        forkChange($(this).val());
    });
    $("div#plcMgr").delegate("select#frame", "change", function () {
        frameChange($(this).val());
    });
    $("div#plcMgr").delegate("select#piece", "change", function () {
        pieceChange($(this).val());
    });
    $("div#plcMgr").delegate("button", "click", function () {
        if (!confirm('是否确认执行该操作?')) { return; }
        $("div#plcMgr button").attr("disabled", "disabled");
        setTimeout(() => {
            doWork();
        }, 500);
    });
}