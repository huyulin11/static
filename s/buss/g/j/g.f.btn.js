import { gf } from "/s/buss/g/j/g.f.js";

let checkRes = (value, myRes) => {
    return !value.resKey || myRes.filter(function (res) { return res.resKey == value.resKey; }).length > 0;
}

class GFBTN {
    doBindBtns(target, btns, myRes) {
        $.each(btns, function (i, btn) {
            if (!btn.resKey || myRes.filter(function (res) { return res.resKey == btn.resKey; }).length > 0) {
                let style = `${btn.style ? "style='" + btn.style + "'" : ""}`;
                $(target).append(`<button type="button" id="${btn.id}" 
                    class="btn marR10 ${btn.class} ${gf.yesOrNo(btn.hide) ? "hidden" : ""}" 
                    ${style}>${btn.name}</button> `);
                $(target).find(`#${btn.id}`).click("click", function () {
                    btn.bind();
                });
            }
        });
    };
    bindBtns(target, btns) {
        let doBind = function (myRes) {
            gfbtn.doBindBtns(target, btns, myRes);
        };
        gf.getMyRes(doBind);
    };
    buttonsByRes(conf, callback) {
        gf.getMyRes(function (myRes) {
            let _conf = $.extend(conf, {
                display: function (value) {
                    if (checkRes(value, myRes)) {
                        return true;
                    }
                    return false;
                },
            });
            callback(gfbtn.buttonsTable(_conf));
        });
    };
    buttonsDomByRes(conf, callback) {
        gf.getMyRes(function (myRes) {
            let _conf = $.extend(conf, {
                display: function (value) {
                    if (checkRes(value, myRes)) {
                        return true;
                    }
                    return false;
                },
            });
            callback(gfbtn.buttonsTableDom(_conf));
        });
    };
    buttonsTable(conf) {
        var _numInLine = conf.numInLine ? conf.numInLine : 7;

        var tmpStr = "";
        var buttons = ``;
        var index = 1;
        for (var value of conf.values) {
            var tmpItemStr;
            var isChoosed = false;
            var isDisplay = true;
            if (conf.choose) {
                isChoosed = typeof conf.choose == 'function' ? (conf.choose(value)) : conf.choose;
            }
            if (conf.display) {
                isDisplay = typeof conf.display == 'function' ? (conf.display(value)) : conf.display;
            }
            if (!isDisplay) { continue; }
            let choosedStr = isChoosed ? ("class='choosed'") : "";
            if (typeof (value) == "number" || typeof (value) == "string") {
                tmpItemStr = `<td><button data-id='${value}' id='${value}' ${choosedStr}>${value}</button></td>`;
            } else {
                let datas = "";
                for (let ii in value) {
                    datas += ` data-${ii}='${value[ii]}' `;
                }
                tmpItemStr = `<td><button ${datas} id='${value.id}' ${choosedStr}>${value.name}${conf.showId ? "-" + value.id : ""}</button></td>`;
            }
            tmpStr = tmpStr + tmpItemStr;
            if (index >= _numInLine) {
                buttons = `${buttons}<tr>${tmpStr}</tr>`;
                index = 1;
                tmpStr = "";
            } else {
                index++;
            }
        }
        if (tmpStr) {
            buttons = `${buttons}<tr>${tmpStr}</tr>`;
        }
        var rtn = `<div id='targets'><table ${conf.style ? conf.style : ""}>${buttons}</table></div>`;
        return rtn;
    };
    buttonsTableDom(conf) {
        var _numInLine = conf.numInLine ? conf.numInLine : 7;

        var rtn = $(`<div id='targets'></div>`);
        var table = $(`<table ${conf.style ? conf.style : ""}></table>`);
        var trBtns = $(`<tr></tr>`);
        var index = 1;
        for (var value of conf.values) {
            var tdBtn = $("<td></td>");
            var btn = $("<button></button>");
            var isChoosed = false;
            var isDisplay = true;
            if (conf.choose) {
                isChoosed = typeof conf.choose == 'function' ? (conf.choose(value)) : conf.choose;
            }
            if (conf.display) {
                isDisplay = typeof conf.display == 'function' ? (conf.display(value)) : conf.display;
            }
            if (!isDisplay) { continue; }
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