import { undoStack } from "/s/buss/acs/location/location.stack.js";
import { deleteLogic } from "/s/buss/acs/location/url/logic.url.js";
import { delRect } from "/s/buss/acs/location/url/rect.url.js";
import { deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { updatetaskSiteLogic } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export var selectElementMenu = function () {
    d3.selectAll('body').on('keydown', function () {
        if (d3.event.keyCode == 46 || d3.event.keyCode == 8) {
            let ii = layer.confirm('是否删除？', function (index) {
                var datas = [];
                delLogics(datas);
                delRects(datas);
                delPoints(datas);
                console.log(datas);
                layer.close(ii);
            });
        }
    })
}

function delPoints(datas) {
    for (let i of $('#pointHome .selectelement')) {
        var id = i.id;
        var point = { 'id': id, 'x': i.cx.animVal.value, 'y': i.cy.animVal.value };
        var path = [];
        deleteLocation(i.id, () => {
            var delPath = d3.select('#pathHome1').selectAll(".clashLine").filter(function (e) { return e && (e.from == i.id || e.to == i.id); });
            delPath.attr('id', function (d) {
                updatetaskSiteLogic(d.from, d.to, '', true);
                path.push({ 'd': d });
                return d.id;
            });
            datas.push({ 'name': 'circledel', 'circle': point, 'path': path });
            d3.select('#pointTextHome').select("#t" + i.id).remove();
            delPath.remove();
            $('#' + i.id).remove();
        });
    }
}

function delLogics(datas) {
    for (let i of $('#pathHome1 .selectelement')) {
        var id = i.id;
        var siteid = $('#' + id).attr('from');
        var nextid = $('#' + id).attr('to');
        var value = { "siteid": siteid, "nextid": nextid };
        datas.push({ 'name': 'pathdel', 'value': value });
        deleteLogic(value, true);
        $('#' + id).remove();
    }
}

function delRects(datas) {
    for (let i of d3.select('#rectHome').selectAll('.selectelement').data()) {
        var key = i.id;
        datas.push({ 'name': 'rectdel', 'rect': i })
        delRect(key);
        d3.select("#retext" + key).remove();
        d3.selectAll('#dashC' + key).remove();
        d3.select('#rect' + key).remove();
    }
}