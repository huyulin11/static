import { datas } from "/s/buss/acs/location/location.data.js";
import { addSite, getCircleID, createPoint } from "/s/buss/acs/location/point/point.add.js";

export var baseCircleMoudle = function () {
    var leftShape = d3.select('#shape_panel')
        .attr('style', "top:80px;left:0px;position:fixed;height: 836px; width: 187px;");
    var basePictrue = leftShape.append('div')
        .attr('id', 'panel_basic')
        .attr('class', 'content')
        .style('width', '164px');
    var pictrue = basePictrue.append('div')
        .attr('class', 'panel_box')
        .attr('shapename', 'site')
        .attr('style', 'top:0px;left:0px;display:inline;')
        .append('img')
        .attr('id', 'circleimg')
        .attr('src', '/s/buss/acs/location/redpoint.png')
        .attr('style', 'width:40px;height:40px;');
    var rect = basePictrue.append('div')
        .attr('class', 'panel_box')
        .attr('shapename', 'build')
        .attr('style', 'top:0px;left:0px;display:inline;')
        .append('img')
        .attr('id', 'rectimg')
        .attr('src', '/s/buss/acs/location/yellowrect.png')
        .attr('style', 'width:40px;height:40px;');
    d3.selectAll('.panel_box').call(
        d3.drag()
            .on('start', imgStart)
            .on('drag', imgDrag)
            .on('end', imgEnd)
    );
}

function imgStart() {
    datas.init();
    var name = d3.select(this).attr('shapename');
    var x = d3.event.x;
    var y = d3.event.y + 180;
    if (name == "site") {
        addSite(x, y);
    } else if (name == "build") {
    }
}

function imgDrag() {
    var id = getCircleID();
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select('#nc' + id)
        .attr('cx', x)
        .attr('cy', y + 180);
    d3.select('#nr' + id)
        .attr('x', x)
        .attr('y', y);
    d3.select('#nct' + id)
        .attr('x', x + 7)
        .attr('y', y + 173);
    d3.select('#nrt' + id)
        .attr('x', x)
        .attr('y', y);
}

function imgEnd() {
    var name = d3.select(this).attr('shapename');
    var id = getCircleID();
    var x = event.offsetX;
    var y = event.offsetY;
    d3.select('#nrt' + id).remove();
    if (name == "site") {
        createPoint(id, x, y);
    } else if (name == "build") {
    }
}