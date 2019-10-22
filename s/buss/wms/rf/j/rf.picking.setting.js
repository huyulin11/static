var doInit = function () {
    jQuery.ajax({
        url: "/sys/lap/findJsonList.shtml",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            container().html("");

            let tabs = new Map();
            for (var a of data) {
                if (a.type != 'PICK' && a.type != 'PROD_LINE') { continue; }
                let tab = tabs.get(a.type);
                if (!tab) {
                    tab = {};
                    tab.key = a.type;
                    let tmp = [];
                    tab.value = tmp;
                }
                tab.value.push(a);
                tabs.set(a.type, tab);
            }
            let tabStrs = "";
            for (let m of tabs) {
                let obj = m[1];
                tabStrs += (
                    `<label>
                        <input type="radio" name="tab">
                        <span>${obj.key == 'PICK' ? "按拣货点" : "按生产线"}</span>
                        <div>${gf.getButtonsHtml(obj.value)}</div>
                    </label>`);
            }
            var tables = "";
            tables = `<div class="wrap">${tabStrs}</div>`;
            container().append(tables);
            gf.resizeTable();
        }
    });
}

var container = function () {
    if ($("div#settingMgr").length == 0) {
        $("#settingContainer").append(
            `<fieldset>
                <legend>过滤筛选操作<button id='save' style="min-height: 30px;width: 45px;">保存</button></legend>
                <div id='settingMgr' class='withBorder'>
                </tr></table></div>
            </fieldset>`);
    }
    return $("div#settingMgr");
}

container().delegate("div[id='targets'] button", "click", function () {
    var that = $(this);
    if (that.hasClass("choosed")) {
        that.removeClass("choosed");
    } else {
        that.addClass("choosed");
    }
});

var doWork = function (devid, taskname) {
    jQuery.ajax({
        url: "/de/acs/test.shtml",
        type: "post",
        dataType: "json",
        data: {
            "type": taskname,
            "devid": devid,
            "testtype": "setting"
        },
        error: function (e) {
            layer.msg("数据中断，请刷新界面或重新登录！");
        },
        success: function (data) {
            alert(data);
            $("div#settingMgr button").removeAttr("disabled");
        }
    });
}

doInit();