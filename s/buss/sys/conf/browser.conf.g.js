import { renderModel } from "/s/buss/g/j/g.banner.control.js";
import { gf } from "/s/buss/g/j/g.f.js";

let confs = [];
confs.push({
    url: "/s/buss/sys/conf/browser.conf.html",
    key: 'browser', target: '#browserContainer',
    position: { height: gf.isPc() ? "30%" : "60%", width: gf.isPc() ? "30%" : "90%", bottom: "80px", left: "10px" },
    container: "bottomCtrlContainer", init: true
});
renderModel(confs);