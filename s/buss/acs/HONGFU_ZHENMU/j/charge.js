$(function () {
    var container = function () {
        if ($("div#chargeMgr").length == 0) {
            $("#chargeContainer").append("<fieldset><legend>充电站指令</legend><div id='chargeMgr' class='withBorder'>" +
                "<table><tr><td><div><button id='open' data-chargeid='13'>1号充电站伸出</button></div></td>" +
                "<td><div><button id='close' data-chargeid='13'>1号充电站缩回</button></div></td></tr>" +
                "<tr><td><div><button id='open' data-chargeid='14'>2号充电站伸出</button></div></td>" +
                "<td><div><button id='close' data-chargeid='14'>2号充电站缩回</button></div></td>" +
                "</tr></table></div>" + "</fieldset>");
        }
        return $("div#chargeMgr");
    }

    container().delegate("button", "click", function () {
        $("div#chargeMgr button").attr("disabled", "disabled");
        setTimeout(() => {
            if (!confirm('是否确认执行该操作?')) { return; }
            doWork($(this).data("chargeid"), $(this).attr("id"));
        }, 500);
    });

    var doWork = function (chargeid, taskname) {
        jQuery.ajax({
            url: "/de/acs/test.shtml",
            type: "post",
            dataType: "json",
            data: {
                "type": taskname,
                "chargeid": chargeid,
                "testtype": "charge"
            },
            error: function (e) {
                layer.msg("数据中断，请刷新界面或重新登录！");
            },
            success: function (data) {
                alert(data);
                $("div#chargeMgr button").removeAttr("disabled");
            }
        });
    }

});
