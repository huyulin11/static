import { undoStack } from "/s/buss/acs/location/location.stack.js";

export var changePathSize = function () {
    var sysTitle = d3.select('body').append('div')
        .attr('id', 'pbtnWidth')
        .attr('style', 'width:200px;height:20px;top:10px;left:0px;position:fixed;');
    sysTitle.append('p')
        .attr('id', 'numPathWidth')
        .attr('style', 'display:inline;top:0px;float:left;')
        .text(localStorage.pathwidth + 'px');
    sysTitle.append('button')
        .attr('type', 'button')
        .attr('id', 'resPathWidth')
        .attr('style', 'display:inline;height:10px;width:50px;top:0px;float:right;')
        .text('重置');
    sysTitle.append('button')
        .attr('type', 'button')
        .attr('id', 'delPathWidth')
        .attr('style', 'display:inline;height:10px;width:30px;top:0px;float:right;')
        .text('-');
    sysTitle.append('button')
        .attr('type', 'button')
        .attr('id', 'addPathWidth')
        .attr('style', 'display:inline;width:30px;height:10px;top:0px;float:right;')
        .text('+');
    if (!localStorage.pathwidth) {
        localStorage.pathwidth = 5;
        d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
    }
    d3.select('#addPathWidth').on('click', function () {
        if (localStorage.pathwidth < 13) {
            undoStack.push({ 'size2': parseFloat(localStorage.pathwidth) + 0.5, 'name': 'pathchangesize', 'size': localStorage.pathwidth });
            localStorage.pathwidth = parseFloat(localStorage.pathwidth) + 0.5;
            d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
            d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
        } else {
            d3.select('#numPathWidth').text('上限13PX');
        }
    })
    d3.select('#delPathWidth').on('click', function () {
        if (localStorage.pathwidth > 3.5) {
            undoStack.push({ 'size2': parseFloat(localStorage.pathwidth) - 0.5, 'name': 'pathchangesize', 'size1': localStorage.pathwidth });
            localStorage.pathwidth = parseFloat(localStorage.pathwidth) - 0.5;
            d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
            d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
        } else {
            d3.select('#numPathWidth').text('下限3.5PX');
        }
    })
    d3.select('#resPathWidth').on('click', function () {
        undoStack.push({ 'size2': 5, 'name': 'pathchangesize', 'size': localStorage.pathwidth });
        localStorage.pathwidth = 5;
        d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
        d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
    });
}
