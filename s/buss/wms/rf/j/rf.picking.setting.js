var doInit = function (callback) {
    jQuery.ajax({
        url: "/sys/lap/findJsonList.shtml",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (laps) {
            container().html("");

            let tabs = new Map();
            for (var a of laps) {
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
                        <input type="radio" name="tab" class='chooseRadio' data-id='${obj.key}'>
                        <span>${obj.key == 'PICK' ? "按拣货点" : "按生产线"}</span>
                    </label>`);
            }
            for (let m of tabs) {
                let obj = m[1];
                let isChoosed = function (target) {
                    if (target.choosed == "ON") { return true; }
                    return false;
                }
                tabStrs += (`<div class='chooseDiv hidden' data-id='${obj.key}'>${gf.getButtonsHtml(obj.value, isChoosed)}</div>`);
            }
            var tables = "";
            tables = `<div class="wrap">${tabStrs}</div>`;
            container().append(tables);
            gf.resizeTable();
            if (callback) { callback(); }
        }
    });
}

var container = function () {
    if ($("div#settingMgr").length == 0) {
        $("#settingContainer").append(
            `<fieldset>
                <legend>过滤筛选操作<button id='save' style="min-height: 30px;width: 45px;">保存</button></legend>
                <div id='settingMgr' class='withBorder'></div>
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

container().delegate("input.chooseRadio", "change", function () {
    let choosed = $(this).data("id");
    container().find("div.chooseDiv").each(function () {
        if ($(this).data("id") != choosed) {
            $(this).addClass("hidden");
        } else {
            $(this).removeClass("hidden");
        }
    });
});

$("html").delegate("button#save", "click", function () {
    let _value = $("html").find(`input.chooseRadio:checked`).data("id");
    if (!_value) { return; }
    gf.ajax("/bd/setConf.shtml?table=conf_key", { key: "PICKED_TYPE", value: _value }, "json",
        function (data) {
            if (typeof data == "string") data = JSON.parse(data);
            if (data.code >= 0) {
                let arr = [];
                container().find(`div.chooseDiv[data-id='${_value}']`).find("button").each(function () {
                    arr.push({ id: $(this).data("id"), choosed: $(this).hasClass("choosed") ? "ON" : "OFF" });
                });
                gf.ajax("/sys/lap/editEntity.shtml", { arr: JSON.stringify(arr) }, "json", function () {
                    if (data.code >= 0) {
                        layer.msg("保存成功！", null, function () {
                            location.reload();
                        });
                    } else {
                        layer.msg(data.msg);
                    }
                });
            } else {
                layer.msg(data.msg);
            }
        });
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

var findChoosedType = function () {
    gf.ajax("/bd/conf.shtml?table=conf_key", { key: "PICKED_TYPE" }, "json", function (s) {
        if (!s || s.length == 0) { return; }
        if (s.length > 1) { layer.msg("配置数据异常！"); }
        var item = s[0];
        $("html").find(`input.chooseRadio[data-id='${item.value}']`).trigger("click");
    });
}

doInit(findChoosedType);