import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { started, draged, ended, createPoint } from "/s/buss/acs/location/BASE/render/drag.create.point.js";
import { updateID } from "/s/buss/acs/location/BASE/render/update.point.js";
import { createPath } from "/s/buss/acs/location/BASE/render/add.path.js";
import { dragedPath, endedPath, startedPath } from "/s/buss/acs/location/BASE/render/drag.path.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { deleteLocation } from "/s/buss/acs/location/BASE/render/s/siteinfo.url.js";
import { deleteLogic } from "/s/buss/acs/location/BASE/render/s/logic.url.js";
import { startedNewPath, dragedNewPath, endedNewPath } from "/s/buss/acs/location/BASE/path/new.path.drag.js";

export var mouseEvent = function (flag) {
    dragPoint(flag);

    dblclickAddPoint(flag);

    rightClickPoint(flag);

    dragPath(flag);

    rightClickPath(flag);

    bandBodyClick();
}
export var bandBodyClick = function () {
    conf.svg.on("contextmenu", function (d, i) {
        d3.event.preventDefault();
    })
}

var rightClickPath = function (flag) {
    if (flag) {
        conf.svg.selectAll(".clashLine")
            .on("contextmenu", function (d, i) {
                d3.event.preventDefault();
                if (d3.event.button == 2) {
                    var path = d3.select(this);
                    var wPath = d3.select("#w" + $(this).attr("from") + $(this).attr("to"));
                    var marPath = d3.select("#mar" + $(this).attr("from") + $(this).attr("to"));
                    var siteid = $(this).attr('from'), nextid = $(this).attr('to');
                    var value = { "siteid": siteid, "nextid": nextid };
                    let ii = layer.confirm('是否删除？', {
                        btn: ['是', '否']
                    }, function (index) {
                        if (siteid && nextid) {
                            deleteLogic(value, true);
                        }
                        path.remove();
                        wPath.remove();
                        marPath.remove();
                        layer.close(ii);
                    });
                }
            });
    } else {
        conf.svg.selectAll(".clashLine")
            .on("contextmenu", null)
    }
}

export var dragPath = function (flag) {
    if (flag) {
        conf.svg.selectAll(".clashLine").call(
            d3.drag()
                .on('start.a', startedPath)
                .on('drag.a', dragedPath)
                .on('end.a', endedPath)
        );
    } else {
        conf.svg.selectAll(".clashLine").call(
            d3.drag()
                .on('start.a', null)
                .on('drag.a', null)
                .on('end.a', null)
        )
    }
};

export var rightClickPoint = function (flag) {
    if (flag) {
        conf.svg.selectAll("circle")
            .on("contextmenu", function (d, i) {
                d3.event.preventDefault();
                if (d3.event.button == 2) {
                    var id = $(this).attr('id');
                    var tips = layer.tips('<input type="button" id="btn1" style="width: 76px;height: 30px" value="修改站点"><br><input type="button" id="btn2" style="width: 76px;height: 30px" value="新增路径"><br><input type="button" id="btn3" style="width: 76px;height: 30px" value="删除站点">',
                        '#' + id,
                        {
                            tips: [2, '#e6e6e6'],
                            time: 10000
                        });
                    d3.select("body").on("click", function () {
                        return layer.close(tips);
                    });
                    var x = $(this).attr('cx'), y = $(this).attr('cy');
                    var circle = d3.select(this);
                    d3.select("#btn1").on("click", function () {
                        updateID(circle, id, x, y);
                    });
                    d3.select("#btn2").on("click", function () {
                        createPath(id, x, y);
                        d3.selectAll(".newLine").call(
                            d3.drag()
                                .on("start", startedNewPath)
                                .on("drag", dragedNewPath)
                                .on("end", endedNewPath)
                        );
                        rightClickPath(true);
                    });
                    d3.select("#btn3").on("click", function () {
                        deleteLocation(id);
                        datas.init();
                        d3.select("#t" + id).remove();
                        conf.svg.selectAll("circle").filter(function (e) { return e && e[0] == id; }).remove();
                        conf.svg.selectAll("path").filter(function (e) { return e && e.to == id; }).remove();
                        conf.svg.selectAll("path").filter(function (e) { return e && e.from == id; }).remove();
                    });
                }
            });
    } else {
        conf.svg.selectAll("circle")
            .on("contextmenu", null)
    }
}

export var dragPoint = function (flag) {
    if (flag) {
        d3.selectAll("circle").call(
            d3.drag()
                .on('start', started)
                .on('end', ended)
                .on('drag', draged)
        )
    } else {
        d3.selectAll("circle").call(
            d3.drag()
                .on('start', null)
                .on('end', null)
                .on('drag', null)
        )
    }

}

export var dblclickAddPoint = function (flag) {
    if (flag) {
        d3.select("body")
            .select("#coordinate")
            .select("svg")
            .on("dblclick", createPoint);
    } else {
        d3.select("body")
            .select("#coordinate")
            .select("svg")
            .on("dblclick", null);
    }
}