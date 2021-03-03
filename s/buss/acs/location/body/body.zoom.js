export var closeZoom = function () {
    d3.select('#coordinate').select('svg').on('mousedown.zoom', null);
}

export var restartZoom = function () {
    var svg = d3.select("body").select("#coordinate").select("svg")
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform);
            d3.select('svg').attr("transform", 'scale(' + d3.select('svg').property('__zoom').k + ")")
        })).select('g');
}