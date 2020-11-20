import { gf } from "/s/buss/g/j/g.f.js";

let checkRes = (btn, myRes) => {
    return !myRes || !btn.resKey || myRes.filter(function (res) { return res.resKey == btn.resKey; }).length > 0;
}

class GFBTN {
    bindSimple(target, btns, myRes) {
        $.each(btns, function (i, btn) {
            if (!checkRes(btn, myRes)) {
            }
            let style = `${btn.style ? "style='" + btn.style + "'" : ""}`;
            let isHide = gf.yesOrNo(btn.hide) ? "hidden" : "";
            let color = (btn.color) ? (`data-backcolor='${btn.color}'`) : "";
            let to = (btn.to) ? (`data-to='${btn.to}'`) : "";
            $(target).append(`<button type="button" id="${btn.id}" 
                    class="btn marR10 ${btn.class} ${isHide}" ${style} ${color} ${to}>
                    ${btn.name}</button> `);
            $(target).find(`#${btn.id}`).click("click", function () {
                btn.bind();
            });
        });
    };
    bindByRes(target, btns) {
        let doBind = function (myRes) {
            gfbtn.bindSimple(target, btns, myRes);
        };
        gf.getMyRes(doBind);
    };
    renderToTableByRes(conf, callback) {
        gf.getMyRes(function (myRes) {
            let _conf = $.extend(conf, {
                display: function (btn) {
                    return checkRes(btn, myRes);
                },
            });
            callback(gfbtn.btnsTable(_conf));
        });
    };
    renderToTable(conf, callback) {
        callback(gfbtn.btnsTable(conf));
    };
    btnsTable(conf) {
        var _numInLine = conf.numInLine ? conf.numInLine : 7;

        var rtn = $(`<div id='targets'></div>`);
        var table = $(`<table ${conf.style ? conf.style : ""}></table>`);
        var trBtns = $(`<tr></tr>`);
        var index = 1;
        for (var value of conf.values) {
            var isChoosed = false;
            var isDisplay = true;
            if (conf.choose) {
                isChoosed = typeof conf.choose == 'function' ? (conf.choose(value)) : conf.choose;
            }
            if (conf.display) {
                isDisplay = typeof conf.display == 'function' ? (conf.display(value)) : conf.display;
            }
            if (!isDisplay) { continue; }
            if (value.hide) { continue; }
            var tdBtn = $("<td></td>");
            var btn = $("<button></button>");
            if (value.color) { $(btn).data(`backcolor`, value.color); };
            if (value.to) { $(btn).data(`to`, value.to); };
            if (isChoosed) $(btn).addClass('choosed');
            if (typeof (value) == "number" || typeof (value) == "string") {
                $(btn).attr("id", value);
                $(btn).data("id", value);
                $(btn).html(value);
            } else {
                for (let ii in value) {
                    if (typeof value[ii] == 'function') {
                        $(btn).bind(ii, value[ii]);
                    } else {
                        if (ii == 'url') {
                            $(btn).bind("click", function () {
                                window.location.href = $(this).data('url');
                            });
                        }
                        $(btn).data(ii, value[ii]);
                    }
                }
                $(btn).attr("id", value.id);
                $(btn).data("id", value.id);
                $(btn).html(`${value.name}${conf.showId ? "-" + value.id : ""}`);
                if (value.nameRenderFun && conf.dataSupport) {
                    let nameRenderFun = value.nameRenderFun;
                    let obj = btn;
                    let fun = () => {
                        if (typeof conf.dataSupport == 'function') {
                            conf.dataSupport((data) => {
                                nameRenderFun(obj, data);
                            });
                        } else {
                            let data = conf.dataSupport;
                            nameRenderFun(obj, data);
                        }
                    };
                    fun();
                    if (value.interval) { setInterval(fun, value.interval); }
                }
            }
            $(tdBtn).append(btn);
            if (index >= _numInLine) {
                $(trBtns).append(tdBtn);
                $(table).append(trBtns);
                trBtns = $(`<tr></tr>`);
                index = 1;
                tdBtn = "";
            } else {
                $(trBtns).append(tdBtn);
                index++;
            }
        }
        if (tdBtn) {
            $(trBtns).append(tdBtn);
            $(table).append(trBtns);
        }
        $(rtn).append(table);
        return rtn;
    };
}

var gfbtn = new GFBTN();
window.gfbtn = gfbtn;
export { gfbtn };