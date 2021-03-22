import { undoStack } from "/s/buss/acs/location/location.stack.js";

export var changePathSize = function () {
    if (!localStorage.pathwidth) {
        localStorage.pathwidth = 5;
        d3.select('#numPathWidth').attr('value', localStorage.pathwidth + 'px');
    }
    d3.select('#addPathWidth').on('click', function () {
        d3.event.stopPropagation();
        if (localStorage.pathwidth < 13) {
            undoStack.push({ 'size2': parseFloat(localStorage.pathwidth) + 0.5, 'name': 'pathchangesize', 'size': localStorage.pathwidth });
            localStorage.pathwidth = parseFloat(localStorage.pathwidth) + 0.5;
            d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
            layer.msg("当前路径宽：" + localStorage.pathwidth + "px");
        } else {
            layer.msg("路径宽上限：" + localStorage.pathwidth + "px");
        }
    })
    d3.select('#delPathWidth').on('click', function () {
        d3.event.stopPropagation();
        if (localStorage.pathwidth > 2) {
            undoStack.push({ 'size2': parseFloat(localStorage.pathwidth) - 0.5, 'name': 'pathchangesize', 'size': localStorage.pathwidth });
            localStorage.pathwidth = parseFloat(localStorage.pathwidth) - 0.5;
            d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
            layer.msg("当前路径宽：" + localStorage.pathwidth + "px");
        } else {
            layer.msg("路径宽下限：" + localStorage.pathwidth + "px");
        }
    })
    d3.select('#resPathWidth').on('click', function () {
        d3.event.stopPropagation();
        undoStack.push({ 'size2': 5, 'name': 'pathchangesize', 'size': localStorage.pathwidth });
        localStorage.pathwidth = 5;
        d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
        layer.msg("当前路径宽：" + localStorage.pathwidth + "px");
    });
}
