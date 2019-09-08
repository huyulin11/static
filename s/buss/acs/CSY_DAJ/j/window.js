import { gf } from "/s/buss/g/j/g.f.js";

var container = function () {
    if ($("div#windowsDiv").length == 0) {
        $("#windowContainer").append("<fieldset><legend>窗口监控</legend><div id='windowsDiv' class='withBorder'></div></fieldset>");
    }
    return $("div#windowsDiv");
}

var doWork = function () {
    jQuery.ajax({
        url: "/s/jsons/CSY_DAJ/window/windowInfo.json",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            container().html("");
            var tables = "";
            for (var a of data) {
                var trs = "";
                if (!a.info) { continue; }
                for (var tt of a.info) {
                    trs = "<tr><td>" + (tt == 0 ? "空" : "<font style='color:red;'>有</font>") + "</td></tr>" + trs;
                }
                trs = "<td><table>" + trs + "</table><td>";
                tables += trs;
            }
            container().append("<table><td>" + tables + "</tr></table>");
            gf.resizeTable();
        },
        error: function () {
        }
    });
}

setInterval(() => {
    doWork();
}, 2000);