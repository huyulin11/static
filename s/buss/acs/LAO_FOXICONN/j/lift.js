$(function () {
    var doInit = function () {
        jQuery.ajax({
            url: "/s/jsons/" + localStorage.projectKey + "/lift/lift.json",
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (data) {
                var tables = "";
                container().html("");
                for (var a of data) {
                    var trs = "";
                    trs = trs + "<tr><td><button id='close' data-devid='" + a.id + "'>关门</button></td></tr>";
                    trs = trs + "<tr><td><button id='layer1' data-devid='" + a.id + "'>到一楼开门</button></td></tr>";
                    trs = trs + "<tr><td><button id='layer2' data-devid='" + a.id + "'>到二楼开门</button></td></tr>";
                    trs = trs + "<tr><td><button id='layer3' data-devid='" + a.id + "'>到三楼开门</button></td></tr>";
                    trs = trs + "<tr><td><button id='search' data-devid='" + a.id + "'>询问</button></td></tr>";
                    trs = "<table>" + trs + "</table>";
                    trs = "<fieldset><legend>" + a.id + "-" + a.name + "-" + a.ip + "<br/>" + a.info + "</legend>" + trs + "</fieldset>";
                    tables += "<td>" + trs + "</td>";
                }
                container().append("<table><tr>" + tables + "</tr></table>");
                resizeTable();
            }
        });
    }

    var container = function () {
        if ($("div#liftMgr").length == 0) {
            $("#liftContainer").append(
                "<fieldset><legend>升降机控制</legend>" +
                "<div id='liftMgr' class='withBorder'>" +
                "</tr></table>" + "</div>" + "</fieldset>");
        }
        return $("div#liftMgr");
    }

    container().delegate("button", "click", function () {
        $("div#liftMgr button").attr("disabled", "disabled");
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
                "testtype": "lift"
            },
            error: function (e) {
                layer.msg("数据中断，请刷新界面或重新登录！");
            },
            success: function (data) {
                alert(data);
                $("div#liftMgr button").removeAttr("disabled");
            }
        });
    }

    setInterval(() => {
        doInit();
    }, 2000);
});
