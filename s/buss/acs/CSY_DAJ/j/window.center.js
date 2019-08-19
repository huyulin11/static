$(function () {
    var container = function () {
        if ($("div#windowsCenterDiv").length == 0) {
            $("#windowCenterContainer").append("<fieldset><legend>窗口对中</legend><div id='windowsCenterDiv' class='withBorder'>" +
                "<table><tr><div><button data-windowid='15'>1号窗口对中</button></div>" +
                "<tr><div><button data-windowid='16'>2号窗口对中</button></div>" +
                "<tr><div><button data-windowid='17'>3号窗口对中</button></div>" +
                "</tr></table></div>" + "</fieldset>");
        }
        return $("div#windowsCenterDiv");
    }

    container().delegate("button", "click", function () {
        $("div#windowsCenterDiv button").attr("disabled", "disabled");
        setTimeout(() => {
            if (!confirm('是否确认执行该操作?')) { return; }
            doWork($(this).data("windowid"));
        }, 500);
    });

    var doWork = function (windowid) {
        jQuery.ajax({
            url: "/de/acs/test.shtml",
            type: "post",
            dataType: "json",
            data: {
                "windowid": windowid,
                "testtype": "windowcenter"
            },
            error: function (e) {
                layer.msg("数据中断，请刷新界面或重新登录！");
            },
            success: function (data) {
                alert(data);
                $("div#windowsCenterDiv button").removeAttr("disabled");
            }
        });
    }

});
