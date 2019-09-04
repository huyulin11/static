class GF {
    layerOpen(confs) {
        if ($(window).width() < 960) { window.open(confs.content); return; }

        if ($(window).width() < 960) { window.open(confs.content); return; }
        var initConf = {
            type: 2,
            shade: 0,
            maxmin: true,
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
        }
        layer.open(conf);
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
    quote(file, div, callback) {
        var timeStamp = this.getTimeStamp();
        if (file.includes(".css")) {
            $("head").append('<link rel="stylesheet" href="' + file + (file.endsWith(".css") ? '?' : "&") + timeStamp + '">');
        } else if (file.includes(".js")) {
            $("head").append('<script src="' + file + (file.endsWith(".js") ? '?' : "&") + timeStamp + '"><\/script>');
        } else if (file.includes(".html")) {
            $(div).html(CommnUtil.loadingImg()).load(file + (file.endsWith(".html") ? '?' : "&") + timeStamp, null, callback);
        } else if (file.includes(".shtml")) {
            $(div).html(CommnUtil.loadingImg()).load(file);
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
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    };
}

var gf = new GF();
window.gf = gf;
export { gf };