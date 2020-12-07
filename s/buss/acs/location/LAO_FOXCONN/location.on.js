import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { started, draged, ended, createPoint } from "/s/buss/acs/location/YZK/drag.create.point.js";
import { updateID } from "/s/buss/acs/location/YZK/update.point.js";
import { createLine } from "/s/buss/acs/location/YZK/add.drag.line.js";

export var move = function () {

    dragPoint();

    addPoint();

    updatePoint();

    addLine();
}

var addLine = function () {
    conf.svg.selectAll("circle")
        .on("mouseover", function () {
            var id = $(this).attr('id');
            var x = $(this).attr('cx'), y = $(this).attr('cy');
            createLine(id, x, y)
        }).on("mouseout", function () {
            d3.select("#p" + $(this).attr('id')).remove();
        });
}

export var updatePoint = function () {
    conf.svg.selectAll("circle")
        .on("contextmenu", function (d, i) {
            d3.event.preventDefault();
            if (d3.event.button == 2) {
                var id = $(this).attr('id');
                var x = $(this).attr('cx'), y = $(this).attr('cy');
                var circle = d3.select(this)
                updateID(circle, id, x, y);
            }
        });
}

export var dragPoint = function () {
    d3.selectAll("circle").call(
        d3.drag()
            .on('start', started)
            .on('end', ended)
            .on('drag', draged)
    );
}

export var addPoint = function () {
    d3.select("body")
        .select("#coordinate")
        .select("svg")
        .on("dblclick", createPoint);
}