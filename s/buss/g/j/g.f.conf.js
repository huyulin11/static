import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";

class GFCONF {
    setConf(key, target, callback) {
        gf.doAjax({
            url: `/app/conf/set.shtml`, type: "POST",
            data: { table: "CONF_KEY", key: key, value: target },
            success: function (data) {
                if (typeof data == "string") data = JSON.parse(data);
                if (data.code >= 0) {
                    if (callback) callback();
                } else {
                    layer.msg(data.msg);
                }
            }
        });
    }
    getConf(key, callback) {
        gf.doAjax({
            url: `/app/conf/get.shtml`, type: "POST",
            data: { table: "CONF_KEY", key: key },
            success: function (data) {
                if (typeof data == "string") data = JSON.parse(data);
                if (callback) {
                    if (!data || !data[0]) { callback(""); }
                    else { callback(data[0].value); }
                };
            }
        });
    }
}

var gfconf = new GFCONF();
window.gfconf = gfconf;
export { gfconf };