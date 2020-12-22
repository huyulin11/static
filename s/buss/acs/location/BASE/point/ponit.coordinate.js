export var getPointByID = function (id) {
    var x = d3.select("#" + id).attr("cx");
    var y = d3.select("#" + id).attr("cy");
    return [x, y];
};