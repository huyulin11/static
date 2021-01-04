import { gv } from "/s/buss/g/j/g.v.js";
import { globalCss } from "/s/buss/g/j/g.css.js";

globalCss();

var defaultErr = function (XMLHttpRequest, textStatus, errorThrown) {
    let msg = XMLHttpRequest.responseText;
    msg = msg ? msg : "连接超时，请尝试重新登录！";
    gf.layerMsg(msg);
};

var checkLoginFunNo = (no) => {
    gf.loginFailEvent();
    if (no) { no(); }
}

class GF {
    defaultSucFun(data, whenSuccess) {
        if (typeof data == "string") {
            try {
                data = JSON.parse(data);
            } catch (error) {
                layer.msg("连接失败！");
                return;
            }
        }
        if (data.code >= 0) {
            gf.layerMsg(data.msg ? data.msg : "保存成功！");
            if (window.datagrid && window.datagrid.loadData) {
                window.datagrid.loadData();
            }
            if (whenSuccess) {
                whenSuccess();
            }
        } else {
            layer.msg(data.msg);
        }
        if (data.err) console.log(err);
    };
    bussEvent(name) {
        console.log(`trigger ${name} event`);
        var newEvent = new CustomEvent(name);
        window.dispatchEvent(newEvent);
        if (parent && parent != window) {
            parent.dispatchEvent(newEvent);
        }
    };
    refreshEvent() {
        gf.bussEvent("refresh");
    };
    loginSuccessEvent() {
        gf.bussEvent("loginSuccess");
    };
    loginFailEvent() {
        gf.bussEvent("loginFail");
    };
    layerOpenBak(confs) {
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
            area: gf.layerArea(),
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
        var timeStamp = localStorage.timeStamp;
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
            error: defaultErr,
            success: function (data) {
                gf.defaultSucFun(data, params.whenSuccess);
            },
            timeout: 5000
        };
        $.extend(pp, params);
        $.ajax(pp);
    };
    doAjaxSubmit(form, params) {
        var pp = {
            error: defaultErr,
            success: function (data) {
                gf.defaultSucFun(data, params.whenSuccess);
            },
            timeout: 5000
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
            async: true,
            cache: false,// 设置是否缓存，默认设置成为true，当需要每次刷新都需要执行数据库操作的话，需要设置成为false
            timeout: 5000,
            success: function (data) {
                html = data;
                if (callback) { callback(data); } else { gf.defaultSucFun(data); }
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
        if (!str) return "";
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
        return s;
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
            layer.msg("请至少选择一个操作目标！");
            return null;
        }
        return cbox;
    };
    checkOnlyOne(conf, notshowtips) {
        var cbox = this.getCheckedVal(conf);
        if (cbox.length > 1 || cbox == "") {
            if (!notshowtips) layer.msg("请选择一个操作目标！");
            return null;
        }
        return cbox[0];
    };
    urlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    };
    rowDisplay(rowdata, json) {
        let btns = "";
        let target = `tr[d-tree='${rowdata.dtee}']`;
        if ([rowdata.status, rowdata.mainstatus, rowdata.detailstatus].includes("EXECUTING")) {
            $(target).css("color", "red");
        }
        if (rowdata.sequence >= 3) {
            $(target).css("color", "orange");
        } else if (rowdata.sequence >= 2) {
            $(target).css("color", "blue");
        } else if (json) {
            if (json.sequence >= 3) {
                $(target).css("color", "orange");
            } else if (json.sequence >= 2) {
                $(target).css("color", "blue");
            }
        }
        if (rowdata.delflag == 1) {
            $(target).css("color", "#dedede");
            btns = "<br>已删除";
        } else if (rowdata.delflag == 2) {
            $(target).css("color", "red");
            btns = "<br>已提交撤销";
        }
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
    };
    yesOrNo(key) {
        if (typeof key == "boolean") return key;
        if (typeof key == "function") return key();
        return "";
    };
    getMyRes(callback) {
        $.ajax({
            type: "POST",
            url: '/resources/findMyRes.shtml',
            dataType: 'json',
            timeout: 5000,
            error: function () {
                location.assign("/s/buss/g/h/login.html");
            },
            success: function (myRes) {
                callback(myRes);
            }
        });
    };
    getTargets() {
        var arr = [];
        $("div#targets button.choosed").each(function () {
            var id = $(this).data("id");
            arr.push(id);
        });
        return arr;
    };
    isPc() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    };
    layer() {
        let layerCurrent = layer;
        if (parent && parent.layer) {
            layerCurrent = parent.layer;
        }
        return layerCurrent;
    };
    layerParentMsg(content) {
        gf.layer().msg(content);
    };
    layerMsg(content, end, conf) {
        conf = Object.assign({ time: 0, btn: ['关闭'], shade: 0.1, }, conf);
        layer.msg(content, conf, function () {
            if (end && typeof end == 'function') { end(); }
        });
    };
    checkLogin(yes, no) {
        gf.doAjax({
            url: "/checkLogin.shtml",
            timeout: 5000,
            dataType: "JSON",
            success: function (json) {
                try {
                    if (json) {
                        if (json.success) { if (yes) { yes(); } }
                        else { checkLoginFunNo(no); }
                    } else {
                        if (yes) { yes(); }
                    }
                } catch (error) {
                    checkLoginFunNo(no);
                }
            }, error: function () {
                checkLoginFunNo(no);
            }
        });
    };
    checkLoginSuccess(yes) {
        gf.checkLogin(yes, null);
    };
    checkLoginError(no) {
        if (!no) {
            no = () => {
                if (parent)
                    parent.location.href = "/s/buss/g/h/login.html";
                else
                    window.location.href = "/s/buss/g/h/login.html";
            };
        }
        gf.checkLogin(null, no);
    };
    currentRole(callback) {
        var role = '';
        jQuery.ajax({
            url: "/getRole.shtml",
            type: "post",
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        });
        return role;
    };
    currentUser(callback) {
        var role = '';
        jQuery.ajax({
            url: "/currentUser.shtml",
            type: "post",
            dataType: "json",
            success: function (data) {
                callback(data);
            }
        });
        return role;
    };
    layerOpen(conf) {
        let newConf = Object.assign({
            area: gf.layerArea(),
            shadeClose: true,
        }, conf);
        return layer.open(newConf);
    };
    layerOpenSmall(conf) {
        let newConf = Object.assign({
            area: gf.layerAreaSmall(),
            shadeClose: true,
        }, conf);
        return layer.open(newConf);
    };
    layerArea() {
        if (gf.isPc()) { return ["95%", "90%"]; }
        else { return ["99%", "70%"]; }
    };
    layerAreaSmall() {
        if (gf.isPc()) { return ["50%", "50%"]; }
        else { return ["99%", "70%"]; }
    };
    getArray(target) {
        var arr = [];
        $(target).each(function () {
            arr.push(this);
        });
        return arr;
    }
    changeFrameHeight(id) {
        var ifm = document.getElementById(id);
        ifm.height = document.documentElement.clientHeight;
    }
    suitFrameHeight(id) {
        let check = () => {
            gf.changeFrameHeight(id);
        }
        $("#" + id).on("load", check);
        window.οnresize = check;
    };
    htmlPiece(v) {
        return "<br/>" + "<span style='color:" +
            (v ? "yellow" : "pink") + "'>" +
            (v ? "已开启" : "已关闭") + "</span>-" +
            (v ? "点击关闭" : "点击开启");
    };
    join(list, fun, separator) {
        if (separator === null) {
            separator = ',';
        }
        if (list instanceof jQuery) {
            return list.map(fun).get().join(separator);
        }
        return null;
    };
    addChooseFlag(conf) {
        if ($("link#checkboxcss").length == 0) {
            $("head").append(`<link id="checkboxcss" rel="stylesheet" href="/s/buss/acs/g/c/checkbox.css">`);
        }
        let { container, id, name, click } = conf;
        let checkbox = $(`<input type="checkbox" id="${id}" class="checkbox">`);
        let chooseflag = $(`<div class='chooseflag'></div>`);
        if (click) { $(checkbox).on("click", function (e) { click(); }); }
        $(chooseflag).append(checkbox);
        $(chooseflag).append(`
            <label for="${id}" class="red" title="${name}"></label>
            <label>${name}</label>`);
        $(container).append(chooseflag);
    }
}

var gf = new GF();
window.gf = gf;
export { gf };