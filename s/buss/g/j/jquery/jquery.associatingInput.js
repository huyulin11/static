import { gf } from "/s/buss/g/j/g.f.js";

var _div_id = "a-i-container-id";
var _dataarea = `div#${_div_id}`;
var _target = "input.associating-input";
var _target_val = ".associating-input-val";

/**CSY_DAJ项目依赖*/
var getStatus = function (status) {
    var _tl = jQuery.parseJSON(localStorage.dic).filter(function (e) { return e.type == "ALLOC_ITEM_STATUS"; })
        .filter(function (e) { return e.key == status; });
    return _tl[0].value;
}

var _init = function () {
    if ($(_dataarea).length > 0) { return; }
    gf.quote("/s/buss/g/j/jquery/jquery.associatingInput.css");
    $("body").append(`<div id='${_div_id}' class='associating-input-container'></div>`);

    $("html").on("click", _dataarea, function (e) {
        e.stopPropagation();
    });

    $("html").on("click", `${_dataarea} ${_target_val}`, function (e) {
        var $target = $("#" + $(_dataarea).data("bindid"));
        var dataset = $(this).find("div");
        $.each(dataset.data(), function (that) {
            $target.data("vvvv-" + that, dataset.data(that));
        });
        $(_dataarea).hide();
        $target.val($(this).find("div").data("keyinfo")).trigger("blur");
        $target.focus();
        let id = $target.attr("id");
        var myEvent = new CustomEvent('ASSOCIATING_VAL_CHOOSED' + (id ? id : ""), {
            detail: { val: $target.val(), data: dataset.data(), },
        });
        if (window.dispatchEvent) { window.dispatchEvent(myEvent); } else { window.fireEvent(myEvent); }
    });

    $("html").on("click", function () {
        $(_dataarea).hide();
        clearTimeout(tout);
    });

    $("html").on("input", _target, function () {
        _showTipsContent(this);
        var myEvent = new CustomEvent('ASSOCIATING_VAL_CHANGED', {
            detail: { val: $(this).val() },
        });
        if (window.dispatchEvent) { window.dispatchEvent(myEvent); } else { window.fireEvent(myEvent); }
    });

    var flag = false;

    $("html").on("click", _target, function (e) {
        if (flag) return; flag = true;
        _focusShowTipsContent(this);
        e.stopPropagation();
        flag = false;
    });

    var _focusShowTipsContent = function (that) {
        var t = $(that).offset().top + $(that).height() * 1.6;
        var l = $(that).offset().left;
        $(_dataarea).css("width", $(that).css("width")).css("top", t).css("left", l).show();
        $(_dataarea).data("bindid", $(that).attr("id"));
        _showTipsContent(that);
    }

    var tout = null;

    var _showTipsContent = function (that) {
        var text = $(that).val(),
            nulltips = $(that).data("nulltips"),
            connectsecond = $(that).data("connectsecond"),
            searchUrl = $(that).data("searchurl"),
            showcol = $(that).data("showcol"),
            showtype = $(that).data("showtype"),
            keycol = $(that).data("keycol");
        clearTimeout(tout);

        var dataset = $(that);
        $.each(dataset.data(), function (v) {
            if (v.startsWith("vvvv")) {
                dataset.data(that, "");
            }
        });

        $(_dataarea).html("");
        if (!showcol) {
            $(_dataarea).html("<div>" + "需用showcol指定返回数据需要显示的字段" + "</div>");
            return;
        }
        if (!text && nulltips) {
            $(_dataarea).html("<div>" + nulltips + "</div>");
            return;
        }

        var dealdata = function (datas) {
            var color = 0;
            var tpDatas = null;
            if (!datas) {
                return;
            }
            if (!datas.records) {
                tpDatas = datas;
            } else {
                tpDatas = datas.records;
            }
            console.log(tpDatas.length);
            if (tpDatas.length == 0) {
                $(_dataarea).html("<div>未找到匹配关键字数据……</div>");
            }
            for (var tpData of tpDatas) {
                if (typeof tpData == "function") { continue; }
                var showcolList = showcol.split(",");
                var showInfo = "";
                var obj = $(`<div></div>`);
                $.each(showcolList, function (e, a) {
                    var valShow;
                    if (a.indexOf("(") > 0 && a.indexOf(")") > 0 && a.indexOf(")") > a.indexOf("(")) {
                        var tmpCol = a.substring(a.indexOf("(") + 1, a.length - 1);
                        var func = a.substring(0, a.indexOf("("));
                        valShow = eval(func)(tpData[tmpCol]);
                    } else {
                        valShow = tpData[a];
                    }
                    showInfo = showInfo + (!showInfo ? "" : ",") + (valShow ? valShow : "");
                });
                $(obj).html(showInfo);
                if (!keycol) {
                    keycol = showcolList[0];
                }
                var keyInfo = "";
                keyInfo = keyInfo + (!keyInfo ? "" : ",") + tpData[keycol];
                $(obj).data("keyinfo", showInfo);

                for (var key in tpData) {
                    $(obj).data(key, tpData[key]);
                }
                var wrapper;
                if (showtype == "button") {
                    wrapper = $(`<button class='associating-input-val'></button>`);
                } else {
                    $(obj).addClass((color++ % 2) == 0 ? "gray" : "white");
                    wrapper = $(`<div class='associating-input-val'></div>`);
                }
                $(wrapper).append(obj);
                $(_dataarea).append(wrapper);
            }
        }

        tout = setTimeout(() => {
            $.ajax({
                url: searchUrl + text,
                async: true,
                type: 'GET',
                dataType: 'json',
                timeout: 5000,
                cache: false,
                success: dealdata,
                error: function () {
                    $(_dataarea).html("<div>获取数据失败，请检查网络连接……</div>");
                    return;
                }
            });
        }, 1000 * (connectsecond ? 0.5 : connectsecond));
    }
}

_init();