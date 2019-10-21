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
                tabStrs += (`<label>
                    <span>${obj.key}</span>
                    <input type="radio" name="tab">
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
                <legend>过滤筛选操作</legend>
                <div id='settingMgr' class='withBorder'>
                </tr></table></div>
                </fieldset>`);
    }
    return $("div#settingMgr");
}

container().delegate("button", "click", function () {
    $("div#settingMgr button").attr("disabled", "disabled");
    setTimeout(() => {
        if (!confirm('是否确认执行该操作?')) { return; }
        doWork($(this).data("devid"), $(this).attr("id"));
    }, 500);
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