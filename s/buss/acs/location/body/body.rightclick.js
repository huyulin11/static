import { changePathSize } from "/s/buss/acs/location/path/path.changesize.js";

export var rightClickBody = function (flag) {
    d3.select('#coordinate').select('svg').on('contextmenu', !flag ? null : function () {
        if (d3.event.button == 2) {
            d3.event.preventDefault();
            layer.msg("当前路径宽：" + localStorage.pathwidth + "px");
            d3.selectAll('#tipsloc').remove();
            let x = event.offsetX,
                y = event.offsetY;
            d3.select(this).append('circle')
                .attr('id', 'tipsloc')
                .attr('cx', x)
                .attr('cy', y)
                .attr('fill', 'none')
                .attr('r', 4)
            var width = localStorage.pathwidth;
            var tips = layer.tips('<input type="button" id="addPathWidth" style="width: 75px;height: 30px" value="增加路宽"><br>'
                + '<input type="button" id="delPathWidth" style="width: 75px;height: 30px" value="减小路宽"><br>'
                + '<input type="button" id="resPathWidth" style="width: 75px;height: 30px" value="重置路宽"></div>',
                '#tipsloc', { tips: [2, '#e6e6e6'], time: 40000 });
            d3.select("body").on("click", function () {
                return layer.close(tips);
            });
            changePathSize();
        }
    })
}