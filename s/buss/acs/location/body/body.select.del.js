import { undoStack } from "/s/buss/acs/location/location.stack.js";
import { deleteLogic } from "/s/buss/acs/location/url/logic.url.js";
import { delRect } from "/s/buss/acs/location/url/rect.url.js";
import { deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { updatetaskSiteLogic } from "/s/buss/acs/FANCY/j/acs.site.info.js";

export var selectElementMenu = function (stack) {
    delLogics(stack);
    delRects(stack);
    delPoints(stack);
    if (stack) {
        undoStack.push({ 'name': 'selectordel', 'value': stack });
    }
}

function delPoints(stack) {
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
            stack.push({ 'name': 'circledel', 'circle': point, 'path': path });
            d3.select('#pointTextHome').select("#t" + i.id).remove();
            delPath.remove();
            $('#' + i.id).remove();
        });
    }
}

function delLogics(stack) {
    for (let i of $('#pathHome1 .selectelement')) {
        var id = i.id;
        var siteid = $('#' + id).attr('from');
        var nextid = $('#' + id).attr('to');
        var value = { "siteid": siteid, "nextid": nextid };
        stack.push({ 'name': 'pathdel', 'value': value });
        deleteLogic(value, true);
        $('#' + id).remove();
    }
}

function delRects(stack) {
    for (let i of d3.select('#rectHome').selectAll('.selectelement').data()) {
        var key = i.id;
        stack.push({ 'name': 'rectdel', 'rect': i })
        delRect(key);
        d3.select("#retext" + key).remove();
        d3.selectAll('#dashC' + key).remove();
        d3.select('#rect' + key).remove();
    }
}