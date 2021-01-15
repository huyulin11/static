import { gf } from "/s/buss/g/j/g.f.js";

let checkRes = (div, myRes) => {
    return !myRes || !div.resKey || myRes.filter(function (res) { return res.resKey == div.resKey; }).length > 0;
}

class GFDIV {
    bindSimple(target, divs, myRes) {
        $.each(divs, function (i, div) {
            if (!checkRes(div, myRes)) {
            }
            let style = `${div.style ? "style='" + div.style + "'" : ""}`;
            let isHide = gf.yesOrNo(div.hide) ? "hidden" : "";
            let color = (div.color) ? (`data-backcolor='${div.color}'`) : "";
            let to = (div.to) ? (`data-to='${div.to}'`) : "";
            $(target).append(`<button type="button" id="${div.id}" 
                    class="div marR10 ${div.class} ${isHide}" ${style} ${color} ${to}>
                    ${div.name}</button> `);
            $(target).find(`#${div.id}`).click("click", function () {
                div.bind();
            });
        });
    };
    bindByRes(target, divs) {
        let doBind = function (myRes) {
            gfdiv.bindSimple(target, divs, myRes);
        };
        gf.getMyRes(doBind);
    };
    renderToDivsByRes(conf, callback) {
        gf.getMyRes(function (myRes) {
            let _conf = $.extend(conf, {
                display: function (div) {
                    return checkRes(div, myRes);
                },
            });
            callback(gfdiv.divsDivs(_conf));
        });
    };
    renderToDivs(conf, callback) {
        callback(gfdiv.divsDivs(conf));
    };
    divsDivs(conf) {
        var _numInLine = conf.numInLine ? conf.numInLine : 7;

        var rtn = $(`<div id='targets'></div>`);
        var trDivs = $(`<div class='tr'></div>`);
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
            var tdDiv = $("<div class='td'></div>");
            var div = $("<button></button>");
            if (value.color) { $(div).data(`backcolor`, value.color); };
            if (value.to) { $(div).data(`to`, value.to); };
            if (isChoosed) $(div).addClass('choosed');
            if (typeof (value) == "number" || typeof (value) == "string") {
                $(div).attr("id", value);
                $(div).data("id", value);
                $(div).html(value);
            } else {
                for (let ii in value) {
                    if (typeof value[ii] == 'function') {
                        $(div).bind(ii, value[ii]);
                    } else {
                        if (ii == 'url') {
                            $(div).bind("click", function () {
                                window.location.href = $(this).data('url');
                            });
                        }
                        $(div).data(ii, value[ii]);
                    }
                }
                $(div).attr("id", value.id);
                $(div).data("id", value.id);
                $(div).html(`${value.name}${conf.showId ? "-" + value.id : ""}`);
                if (value.nameRenderFun && conf.dataSupport) {
                    let nameRenderFun = value.nameRenderFun;
                    let obj = div;
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
            $(tdDiv).append(div);
            if (index >= _numInLine) {
                $(trDivs).append(tdDiv);
                $(rtn).append(trDivs);
                trDivs = $(`<div class='tr'></div>`);
                index = 1;
                tdDiv = "";
            } else {
                $(trDivs).append(tdDiv);
                index++;
            }
        }
        if (tdDiv) {
            $(trDivs).append(tdDiv);
            $(rtn).append(trDivs);
        }
        return rtn;
    };
    renderDivs(conf) {
        var dealData = function (data, numInPage) {
            if (data.records.length > numInPage) {
                return data.records.slice(0, numInPage);
            }
            return data.records;
        }
        var renderOne = conf.render, numInLine = conf.numInLine ? conf.numInLine : 4,
            _numInPage = conf.numInPage ? conf.numInPage : 1000, clickFun = conf.click;
        var target = conf.target;
        if (conf.data.records && conf.data.rowCount) {
            let desc = $(`<span class='datatabledesc'>本页${conf.data.records.length}条,共${conf.data.rowCount}条</span>`);
            $(target).append(desc);
        }
        var index = 1;
        var trObj = $(`<div class='tr'></div>`);
        let datas = dealData(conf.data, _numInPage);
        for (var item of datas) {
            var tmpItemStr = renderOne(item);
            if (!tmpItemStr) continue;
            let tdObj = $("<div class='td'></div>");
            $(tdObj).append(tmpItemStr);
            if (clickFun) { $(tdObj).find('button').bind("click", clickFun); }
            $(trObj).append(tdObj);
            if (index >= numInLine) {
                $(target).append(trObj);
                trObj = $(`<div class='tr'></div>`);
                index = 1;
            } else {
                index++;
            }
        }
        if ($(trObj).find('.td').length > 0) {
            $(target).append(trObj);
        }
        if (conf.callback) conf.callback();
    };
}

var gfdiv = new GFDIV();
window.gfdiv = gfdiv;
export { gfdiv };