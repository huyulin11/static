$(function () {
    var doInit = function () {
        jQuery.ajax({
            url: "/s/jsons/" + localStorage.projectKey + "/light/light.json",
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (data) {
                var tables = "";
                container().html("");
                for (var a of data) {
                    var trs = "";
                    trs = trs + "<tr><td><button id='red' " + "data-devid='" + a.id + "' " + "data-rev='false'" + ">红灯</button></td></tr>";
                    trs = trs + "<tr><td><button id='green' " + "data-devid='" + a.id + "' " + "data-rev='false'" + ">绿灯</button></td></tr>";
                    trs = trs + "<tr><td><button id='yellow' " + "data-devid='" + a.id + "' " + "data-rev='false'" + ">黄灯</button></td></tr>";
                    trs = trs + "<tr><td><button id='close' " + "data-devid='" + a.id + "' " + "data-rev='false'" + ">关灯</button></td></tr>";
                    trs = trs + "<tr><td><button id='red' " + "data-devid='" + a.id + "' " + "data-rev='true'" + ">B面红灯</button></td></tr>";
                    trs = trs + "<tr><td><button id='green' " + "data-devid='" + a.id + "' " + "data-rev='true'" + ">B面绿灯</button></td></tr>";
                    trs = trs + "<tr><td><button id='yellow' " + "data-devid='" + a.id + "' " + "data-rev='true'" + ">B面黄灯</button></td></tr>";
                    trs = trs + "<tr><td><button id='close' " + "data-devid='" + a.id + "' " + "data-rev='true'" + ">B面关灯</button></td></tr>";
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
        if ($("div#lightMgr").length == 0) {
            $("#lightContainer").append(
                "<fieldset><legend>交通灯控制</legend>" +
                "<div id='lightMgr' class='withBorder'>" +
                "</tr></table>" + "</div>" + "</fieldset>");
        }
        return $("div#lightMgr");
    }

    container().delegate("button", "click", function () {
        $("div#lightMgr button").attr("disabled", "disabled");
        setTimeout(() => {
            if (!confirm('是否确认执行该操作?')) { return; }
            doWork($(this).data("devid"), $(this).attr("id"), $(this).data("rev"));
        }, 500);
    });

    var doWork = function (devid, taskname, rev) {
        jQuery.ajax({
            url: "/de/acs/test.shtml",
            type: "post",
            dataType: "json",
            data: {
                "type": taskname,
                "devid": devid,
                "rev": rev,
                "testtype": "light"
            },
            error: function (e) {
                layer.msg("数据中断，请刷新界面或重新登录！");
            },
            success: function (data) {
                alert(data);
                $("div#lightMgr button").removeAttr("disabled");
            }
        });
    }

    setInterval(() => {
        doInit();
    }, 2000);
});
