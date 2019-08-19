import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
var agvId = currentAgvId;

$(function () {
    var doWork = function (taskname) {
        jQuery.ajax({
            url: "/s/jsons/CSY_DAJ/plc/plcInfo" + agvId + ".json",
            type: "GET",
            dataType: "json",
            async: true,
            cache: false,
            error: function (e) { console.log(e); },
            success: function (data) {
                $("div#plcMsg").html("");
                var lastMsg;
                for (var a of data) {
                    if (a != lastMsg) {
                        lastMsg = a;
                        $("div#plcMsg").append("<span>" + a + "</span><br/>");
                    }
                }
            }
        });
    }

    setInterval(() => {
        doWork();
    }, 2000);
});
