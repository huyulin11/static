export var changePathSize = function () {
    var sysTitle = d3.select('body').append('div').attr('id', 'pbtnWidth');
    sysTitle.append('p').attr('id', 'numPathWidth').text(localStorage.pathwidth + 'px');
    sysTitle.append('button').attr('type', 'button').attr('id', 'addPathWidth').text('+');
    sysTitle.append('button').attr('type', 'button').attr('id', 'delPathWidth').text('-');
    sysTitle.append('button').attr('type', 'button').attr('id', 'resPathWidth').text('重置');
    d3.select('#addPathWidth').on('click', function () {
        if (localStorage.pathwidth < 13) {
            localStorage.pathwidth = parseFloat(localStorage.pathwidth) + 0.5;
            d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
            d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
        }else{
            d3.select('#numPathWidth').text('上限13PX');
        }
    })
    d3.select('#delPathWidth').on('click', function () {
        if (localStorage.pathwidth > 1) {
            localStorage.pathwidth = parseFloat(localStorage.pathwidth) - 0.5;
            d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
            d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
        }else{
            d3.select('#numPathWidth').text('下限1PX');
        }
    })
    d3.select('#resPathWidth').on('click', function () {
        localStorage.pathwidth = 5;
        d3.select('#numPathWidth').text(localStorage.pathwidth + 'px');
        d3.selectAll('path').attr('stroke-width', function () { return localStorage.pathwidth });
    });
}
