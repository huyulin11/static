import { gf } from "/s/buss/g/j/g.f.js";

class GFLAYER {
    openBak(confs) {
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
            area: gflayer.area(),
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
    obj() {
        let layerCurrent = layer;
        if (parent && parent.layer) {
            layerCurrent = parent.layer;
        }
        return layerCurrent;
    };
    parentMsg(content) {
        gflayer.obj().msg(content);
    };
    msg(content, end, conf) {
        conf = Object.assign({ time: 0, btn: ['关闭'], shade: 0.1, }, conf);
        layer.msg(content, conf, function () {
            if (end && typeof end == 'function') { end(); }
        });
    };
    open(conf) {
        let newConf = Object.assign({
            area: gflayer.area(),
            shadeClose: true,
        }, conf);
        return layer.open(newConf);
    };
    openSmall(conf) {
        let newConf = Object.assign({
            area: gflayer.areaSmall(),
            shadeClose: true,
        }, conf);
        return layer.open(newConf);
    };
    area() {
        if (gf.isPc()) { return ["95%", "90%"]; }
        else { return ["99%", "70%"]; }
    };
    areaSmall() {
        if (gf.isPc()) { return ["50%", "50%"]; }
        else { return ["99%", "70%"]; }
    };
}

var gflayer = new GFLAYER();
window.gflayer = gflayer;
export { gflayer };