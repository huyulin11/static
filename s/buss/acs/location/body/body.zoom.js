export var closeZoom = function () {
    d3.select('#coordinate').select('svg').on('mousedown.zoom', null);
}

let flag = false;
export var restartZoom = function () {
    var svg = d3.select("body").select("#coordinate").select("svg")
        .call(d3.zoom().on("zoom", function () {
            if (!flag && localStorage.zoom) {
                var local_zoom = JSON.parse(localStorage.zoom);
                var trans = d3.zoomTransform(d3.select('svg').node());
                trans.k = local_zoom.k, trans.x = local_zoom.x, trans.y = local_zoom.y;
                flag = true;
            }
            svg.attr("transform", d3.event.transform);
            var transform = d3.event.transform, k = transform.k, x = transform.x, y = transform.y;
            localStorage.zoom = JSON.stringify({ "k": k, "x": x, "y": y });
        })).select('g');
}