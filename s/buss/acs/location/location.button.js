import { gfbtn } from "/s/buss/g/j/g.f.btn.js";

var flag = false;
let tempBtns = [{
    id: "show", name: "隐藏", class: "btn-show",
    bind: function () {
        flag = !flag;
        if (flag) {
            hide();
            d3.select(".doc-buttons").select("#show").text("显示");
            return !flag;
        };
        show();
        d3.select(".doc-buttons").select("#show").text("隐藏");
        return !flag;
    }
}];

gfbtn.bindByRes("div.doc-buttons", tempBtns);