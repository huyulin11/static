export var closeZoom = function () {
    d3.select('#coordinate').select('svg').on('mousedown.zoom', null);
}

export var restartZoom = function () {
    var svg = d3.select("body").select("#coordinate").select("svg")
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform);
            var transform = d3.event.transform, k = transform.k, x = transform.x, y = transform.y;
            localStorage.zoom = JSON.stringify({ "k": k, "x": x, "y": y });
        })).select('g');
}