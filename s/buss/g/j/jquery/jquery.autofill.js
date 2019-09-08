import { gp } from "/s/buss/g/j/g.p.js";

$(function () {
    $("[data-autofill]:not(title)").each(function () {
        $(this).html("<img src='/s/i/loading2.gif' style='width:14px;'/>");
    });
    var dssss = setInterval(function () {
        if (!(JSON.stringify(gp) == "{}") && gp.isReady()) {
            $("[data-autofill]").each(function () {
                var autokey = $(this).data("autokey");
                if (!autokey) {
                    return;
                }
                var ll = autokey.split('.');
                var val = gp;
                for (var v of ll) {
                    val = val[v];
                }
                if (!val) { val = ""; }
                $(this).html(val);
            });
            clearInterval(dssss);
        }
    }, 1000);
});