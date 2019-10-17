import { gv } from "/s/buss/g/j/g.v.js";

class GF {
    layerOpen(confs) {
        if ($(window).width() < 960) {
            if (confs.newTab) {
                window.open(confs.content);
            } else {
                window.location.href = confs.content;
            }
            return;
        }
        var initConf = {
            type: 2,
            shade: 0,
            maxmin: true,
            area: localStorage.layerArea.split(","),
            zIndex: layer.zIndex,
            success: function (layero) {
                layer.setTop(layero);
            }
        };
        var conf;
        if (typeof confs == "string") {
            conf = $.extend(initConf, { content: confs });
        } else {
            conf = $.extend(initConf, confs);
        }
        if (!conf.area) { conf.area = ['60%', '60%']; }
        if (!conf.offset) {
            conf.offset = [
                Math.random() * $(window).height() * 0.2,
                Math.random() * $(window).width() * 0.2
            ];
            conf.offset = 'cb';
        }
        window.pageii = layer.open(conf);
    };
    resizeTable() {
        $("table").each(function () {
            $(this).attr("cellspacing", '0px').attr("cellspadding", '1px');
            $(this).find("tr:first").each(function () {
                var agvs = $(this).find("td");
                agvs.css("width", 100 / (agvs.length) + "%");
            });
        });
    };
    param(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    };
    getTimeStamp() {
        var timeStamp = localStorage.getItem("timeStamp");
        if (!timeStamp) {
            console.error("后台设定的时间戳为空，使用前端时间戳");
            timeStamp = new Date();
        }
        return timeStamp;
    };
    quoteModule(url, target, callback) {
        $(target).attr("src", url);
    };
    quote(url, div, callback) {
        var timeStamp = this.getTimeStamp();
        if (url.includes(".css")) {
            $("head").append('<link rel="stylesheet" href="' + url + (url.endsWith(".css") ? '?' : "&") + timeStamp + '">');
            if (callback) { callback(); }
        } else if (url.includes(".js")) {
            $("head").append('<script src="' + url + (url.endsWith(".js") ? '?' : "&") + timeStamp + '"><\/script>');
        } else if (url.includes(".html")) {
            $(div).html(this.loadingImg()).load(url + (url.endsWith(".html") ? '?' : "&") + timeStamp, null, callback);
        } else if (url.includes(".shtml")) {
            $(div).html(this.loadingImg()).load(url);
        }
    };
    quoteJsModule(file, div) {
        var timeStamp = this.getTimeStamp();
        $("head").append('<script type="module" src="' + file + (file.endsWith(".js") ? '?' : "&") + timeStamp + '"><\/script>');
    };
    appOpen(file) {
        var timeStamp = this.getTimeStamp();
        window.open(file + (file.endsWith(".html") ? '?' : "&") + timeStamp);
    };
    randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        var maxPos = $chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    };
    loadingImg() {
        var html = `<div class="alert alert-warning">
            <button type="button" class="close" data-dismiss="alert">
            <i class="ace-icon fa fa-times"></i></button><div style="text-align:center">
            <img src="/s/i/loading2.gif"/><div>
            </div>`;
        return html;
    };
    doAjax(params) {
        var pp = {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.open({
                    type: 1,
                    title: "出错啦！",
                    area: ['95%', '95%'],
                    content: `<div id='layerError' style='color:red'>${XMLHttpRequest.responseText}</div>`
                });
            },
            success: function (data) {
                if (typeof data == "string") data = JSON.parse(data);
                if (data.code >= 0) {
                    layer.msg("保存成功！");
                } else {
                    layer.msg(data.msg);
                }
            }
        };
        $.extend(pp, params);
        $.ajax(pp);
    };
    doAjaxSubmit(form, params) {
        var pp = {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.open({
                    type: 1,
                    title: "出错啦！",
                    area: ['95%', '95%'],
                    content: `<div id='layerError' style='color:red'>${XMLHttpRequest.responseText}</div>`
                });
            }
        };
        $.extend(pp, params);
        $(form).ajaxSubmit(pp);
    };
    /**
     * ajax同步请求 返回一个html内容 dataType=html. 默认为html格式 如果想返回json.
     * this.ajax(url, data,"json")
     * 
     */
    ajax(targetUrl, params, dataType, callback) {
        if (!this.notNull(dataType)) {
            dataType = "html";
        }
        var html = '没有结果!';
        if (targetUrl.indexOf("?") > -1) {
            targetUrl = targetUrl + "&_t=" + new Date();
        } else {
            targetUrl = targetUrl + "?_t=" + new Date();
        }
        this.doAjax({
            type: "post",
            data: params,
            url: targetUrl,
            dataType: dataType,// 这里的dataType就是返回回来的数据格式了html,xml,json
            async: false,
            cache: false,// 设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false
            timeout: 3000,
            success: function (data) {
                html = data;
                if (callback) { callback(data); }
            }
        });
        return html;
    };
    notNull(obj) {
        if (obj === null) {
            return false;
        } else if (obj === undefined) {
            return false;
        } else if (obj === "undefined") {
            return false;
        } else if (obj === "") {
            return false;
        } else if (obj === "[]") {
            return false;
        } else if (obj === "{}") {
            return false;
        } else {
            return true;
        }

    };
    notEmpty(obj) {
        if (obj === null) {
            return "";
        } else if (obj === undefined) {
            return "";
        } else if (obj === "undefined") {
            return "";
        } else if (obj === "") {
            return "";
        } else if (obj === "[]") {
            return "";
        } else if (obj === "{}") {
            return "";
        } else {
            return obj;
        }

    };
    htmlspecialchars(str) {
        var s = "";
        if (str.length == 0)
            return "";
        for (var i = 0; i < str.length; i++) {
            switch (str.substr(i, 1)) {
                case "<":
                    s += "&lt;";
                    break;
                case ">":
                    s += "&gt;";
                    break;
                case "&":
                    s += "&amp;";
                    break;
                case " ":
                    if (str.substr(i + 1, 1) == " ") {
                        s += " &nbsp;";
                        i++;
                    } else
                        s += " ";
                    break;
                case "\"":
                    s += "&quot;";
                    break;
                case "\n":
                    s += "";
                    break;
                default:
                    s += str.substr(i, 1);
                    break;
            }
        }
    };
    inArray(array, string) {
        for (var s = 0; s < array.length; s++) {
            let thisEntry = array[s].toString();
            if (thisEntry == string) {
                return true;
            }
        }
        return false;
    };
    rootPath() {
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht = curWwwPath.substring(0, pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return (localhostPaht + projectName);
    };
    onloadurl() {
        var thisFun = this.loadingImg();
        $("[data-url]").each(function () {
            var tb = $(this);
            tb.html(thisFun);
            tb.load(tb.data("url"));
        });
    };
    getCheckedVal(conf) {
        var cbox;
        if (conf && conf.dataType && conf.dataType == 'json') {
            cbox = window.datagrid.getSelectedCheckboxObj();
        } else {
            cbox = window.datagrid.getSelectedCheckbox(
                conf && conf.key ? conf.key : (typeof conf == "string" ? conf : null));
        }
        return cbox;
    };
    checkNotNull(conf) {
        var cbox = this.getCheckedVal(conf);
        if (cbox == "") {
            layer.msg("至少需选中一个！");
            return null;
        }
        return cbox;
    };
    checkOnlyOne(conf) {
        var cbox = this.getCheckedVal(conf);
        if (cbox.length > 1 || cbox == "") {
            layer.msg("当且仅能选择一个");
            return null;
        }
        return cbox[0];
    };
    bindBtns(target, btns) {
        $.each(btns, function (i, btn) {
            $(target).append(`<button type="button" id="${btn.id}" class="btn marR10 ${btn.class}">${btn.name}</button> `);
            $(target).find(`#${btn.id}`).click("click", function () {
                btn.bind();
            });
        });
    };
    urlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    };
    getStatusDesc(rowindex, data, rowdata, column) {
        var btns = "";
        if (data == 3) {
            $(`tr[d-tree='${rowdata.dtee}]`).css("color", "red");
        }
        if (rowdata.delflag == 1) {
            $(`tr[d-tree='${rowdata.dtee}']`).css("color", "#dedede");
            btns = "-已删除";
        }
        btns = gv.get("ACS_STATUS", data) + btns;
        return btns;
    };
    ifThen(flag, callback) {
        if (flag) { callback(); }
    };
    jsonToLabelData(json) {
        let dataStr = "";
        if (json) {
            if (typeof json == "object") {
                for (let key in json) {
                    dataStr += ` data-${key}="${json[key]}" `;
                }
            }
        }
        return dataStr;
    }
}

var gf = new GF();
window.gf = gf;
export { gf };