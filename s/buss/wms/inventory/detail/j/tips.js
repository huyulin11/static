$(function () {
    var widthOfInput = $("#allocItem").css("width");
    $("div#tips").css("width", widthOfInput);

    var tout = null;

    $("div#panelBody").on("click", "input.form-control", function (e) {
        var t = $(this).offset().top + 35;
        var l = $(this).offset().left;
        $("div#tips").css("top", t).css("left", l).show();
        $("div#tips").data("bindid", $(this).attr("id"));
        showTipsContent($(this).val());
        e.stopPropagation();
    });

    var showTipsContent = function (text) {
        clearTimeout(tout);
        $("#tips").html("");

        if (!text) {
            $("#tips").html("<div>输入关键字查找货位……</div>");
            return;
        }

        tout = setTimeout(() => {
            $.ajax({
                url: '/alloc/item/findFirstPage.shtml?allocItemFormMap.text=' + text,
                async: true,
                type: 'GET',
                dataType: 'json',
                timeout: 2000,
                cache: false,
                success: function (data) {
                    var x;
                    var color = 0;
                    for (x in data.records) {
                        var tpData = data.records[x];
                        $("#tips").append("<a class='itemName'><div class='"
                            + ((color++ % 2) == 0 ? "bg-light" : "bg-white")
                            + "'>" + tpData["text"] + "</div></a>");
                    }
                }, error: function () {
                    $("#tips").html("<div>获取数据失败，请检查网络连接……</div>");
                    return;
                }
                // 成功执行方法
            });
        }, 700);
    }

    $("div#panelBody").on("input", "input.form-control", function () {
        showTipsContent($(this).val());
    });

    $("div#tips").on("click", function (e) {
        e.stopPropagation();
    });

    $("div#tips").on("click", "a.itemName", function (e) {
        $("#" + $("div#tips").data("bindid")).val($(this).find("div").html());
        $("div#tips").hide();
    });

    $("html").on("click", function () {
        $("div#tips").hide();
        clearTimeout(tout);
    });

});