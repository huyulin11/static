import { gp } from "/s/buss/g/j/g.p.js";

$(function () {
    $("[v-autofill]:not(title)").each(function () {
        $(this).html("<img src='/s/i/loading2.gif' style='width:14px;'/>");
    });
    var dssss = setInterval(function () {
        if (!(JSON.stringify(gp) == "{}") && gp.isReady()) {
            $("[v-autofill]").each(function () {
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