export var svgstart = function () {
    d3.select(this).append('rect')
        .attr('id', 'selection')
        .attr('xx', event.offsetX)
        .attr('yy', event.offsetY)
        .attr('style', 'fill:rgb(30 178 206 / 34%);stroke:rgb(30 178 206 / 99%);stroke-width:2px;')
}

export var svgdrag = function () {
    let x1 = parseFloat($('#selection').attr('xx')),
        y1 = parseFloat($('#selection').attr('yy')),
        x2 = event.offsetX, y2 = event.offsetY;
    d3.select('#selection')
        .attr('x', x1 > x2 ? x2 : x1)
        .attr('y', y1 > y2 ? y2 : y1)
        .attr('width', x1 > x2 ? (x1 - x2) : (x2 - x1))
        .attr('height', y1 > y2 ? (y1 - y2) : (y2 - y1))
}

export var svgend = function () {
    var zoom = d3.select('svg').property('__zoom');
    var x = (parseFloat($('#selection').attr('x')) - zoom.x) / zoom.k;
    var y = (parseFloat($('#selection').attr('y')) - zoom.y) / zoom.k;
    var width = parseFloat($('#selection').attr('width')) / zoom.k;
    var height = parseFloat($('#selection').attr('height')) / zoom.k;
    choseC(x, y, width, height);
    choseR(x, y, width, height);
    choseP(x, y, width, height);
    d3.select('#coordinate').on('click', function () {
        $('#pathHome1 .selectelement').attr('stroke', '#113a7394').removeClass('selectelement');
        $('rect.selectelement').attr('fill', '#e0e053').removeClass('selectelement');
        $('circle.selectelement').attr('fill', 'red').removeClass('selectelement');
        $('#defs1 .selectelement').attr('fill', '#113a7394').removeClass('selectelement');
    })
    d3.select('#selection').remove();
}

var choseP = function (x, y, width, height) {
    var paths = d3.select('#pathHome1').selectAll('path').data();
    for (let i of paths) {
        var from = i.from;
        var to = i.to;
        let x1 = parseFloat($('#' + from).attr('cx')), y1 = parseFloat($('#' + from).attr('cy')),
            x2 = parseFloat($('#' + to).attr('cx')), y2 = parseFloat($('#' + to).attr('cy'));
        var bool1 = x1 > x && x1 < x + width && y1 > y && y1 < y + height;
        var bool2 = x2 > x && x2 < x + width && y2 > y && y2 < y + height;
        if (bool1 && bool2) {
            $('#p' + i.id).addClass('selectelement').attr('stroke', 'rgb(30 178 206 )');
            $('#mar' + i.id).addClass('selectelement');
            $('#mar' + i.id + " " + 'path').addClass('selectelement').attr('fill', 'rgb(30 178 206 )');
        }
    }
}
var choseC = function (x, y, width, height) {
    var circles = d3.select('#pointHome').selectAll('circle').nodes();
    for (let i of circles) {
        var cx = i.cx.animVal.value;
        var cy = i.cy.animVal.value;
        var bool = cx - 6.5 > x && cx + 6.5 < x + width && cy - 6.5 > y && cy + 6.5 < y + height;
        if (bool) {
            $('#' + i.id).addClass('selectelement').attr('fill', 'rgb(30 178 206 )');
        }
    }
}
var choseR = function (x, y, width, height) {
    var rects = d3.select('#rectHome').selectAll('rect').nodes();
    for (let i of rects) {
        var rx = i.x.animVal.value;
        var ry = i.y.animVal.value;
        var rh = i.height.animVal.value;
        var rw = i.width.animVal.value;
        var bool = rx + rw < x + width && ry + rh < y + height && rx > x && ry > y;
        if (bool) {
            $('#' + i.id).addClass('selectelement').attr('fill', 'rgb(30 178 206 )');
        }
    }
}

export var coorDrag = function (flag) {
    d3.select('#coordinate').select('svg').call(
        d3.drag()
            .on('start', flag ? svgstart : null)
            .on('drag', flag ? svgdrag : null)
            .on('end', flag ? svgend : null)
    );
}