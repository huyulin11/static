(function () {
    function rect() {
        $(".clashLine").remove();
        $(".mainRoad").remove();

        for (var a in yfc) {
            var area = yfc[a];
            var points = [[area.leftXaxis, area.upYaxis], [area.rightXaxis, area.upYaxis],
            [area.rightXaxis, area.downYaxis], [area.leftXaxis, area.downYaxis]];

            for (var i = 0; i < points.length; i++) {
                var point1 = points[i];
                var point2 = i + 1 >= points.length ? points[0] : points[i + 1];

                svg.append("line")
                    .attr("x1", padding.left + xScale(point1[0]))
                    .attr("y1", height - padding.bottom - yScale(point1[1]))
                    .attr("x2", padding.left + xScale(point2[0]))
                    .attr("y2", height - padding.bottom - yScale(point2[1]))
                    .attr("class", "clashLine")
                    .style("stroke", area.color)
                    .style("stroke-width", "2px");
            }
            svg.append("text")
                .attr("x", padding.left + xScale((area.leftXaxis + area.rightXaxis) / 2)-35)
                .attr("y", height - padding.bottom - yScale((area.downYaxis + area.upYaxis) / 2)+10)
                .attr("class", "clashLine")
                .style("stroke", "red")
                .style("font-size", "22px")
                .style("stroke-width", "1px")
                .text(area.title);
        }

        // for (var a in clashArea) {
        //     var area = clashArea[a];

        //     $("line.clashLine").remove();
        //     $("line.mainRoad").remove();

        //     var points = [[area.leftXaxis, area.upYaxis], [area.rightXaxis, area.upYaxis],
        //     [area.rightXaxis, area.downYaxis], [area.leftXaxis, area.downYaxis]];

        //     for (var i = 0; i < points.length; i++) {
        //         var point1 = points[i];
        //         var point2 = i + 1 >= points.length ? points[0] : points[i + 1];

        //         svg.append("line")
        //             .attr("x1", padding.left + xScale(point1[0]))
        //             .attr("y1", height - padding.bottom - yScale(point1[1]))
        //             .attr("x2", padding.left + xScale(point2[0]))
        //             .attr("y2", height - padding.bottom - yScale(point2[1]))
        //             .attr("class", "clashLine")
        //             .style("stroke", "red")
        //             .style("stroke-width", "2px");
        //     }
        // }

        svg.append("line")
            .attr("x1", padding.left + xScale(-90000))
            .attr("y1", height - padding.bottom - yScale(-2600))
            .attr("x2", padding.left + xScale(20000))
            .attr("y2", height - padding.bottom - yScale(-2600))
            .style("stroke", "#333")
            .attr("class", "mainRoad")
            .style("stroke-width", "1px");

        svg.append("line")
            .attr("x1", padding.left + xScale(-90000))
            .attr("y1", height - padding.bottom - yScale(1500))
            .attr("x2", padding.left + xScale(20000))
            .attr("y2", height - padding.bottom - yScale(1500))
            .style("stroke", "#333")
            .attr("class", "mainRoad")
            .style("stroke-width", "1px");
    }

    function drawCircle(dataset) {
        xScale = d3.scale.linear().domain(domainXVal).range([0, xAxisWidth]);
        yScale = d3.scale.linear().domain(domainYVal).range([0, yAxisWidth]);

        var circleUpdate = svg.selectAll("circle").data(dataset);

        var circleEnter = circleUpdate.enter();
        var circleExit = circleUpdate.exit();
        //update部分的处理方法  
        circleUpdate.transition()//更新数据时启动过渡  
            .duration(500).attr("cx", function (d) {
                return padding.left + xScale(d[0]);
            }).attr("cy", function (d) {
                return height - padding.bottom - yScale(d[1]);
            }).attr("fill", function (d) {
                return getColor(d);
            }).attr("r", function (d) {
                return (inUdp(d)) ? 14 : (inTaskPath(d) ? 4 : 2);
            });

        circleEnter.append("circle")
            .attr("fill", "red")
            .attr("r", 20).transition().duration(500)
            .attr("class", function (d) {
                return inAgv1(d) ? "agv1" : "agv2";
            })
            .attr("cx", function (d) {
                return padding.left + xScale(d[0]);
            }).attr("cy", function (d) {
                return height - padding.bottom - yScale(d[1]);
            }).attr("fill", function (d) {
                return getColor(d);
            }).attr("r", function (d) {
                return (inUdp(d)) ? 14 : 5;
            });

        circleExit.transition().duration(500).attr("fill", "white").remove();

        rect();
    }

    //绘制坐标轴  
    function drawAxis() {
        var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
        var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

        yScale.range([yAxisWidth, 0]);

        //绘制x轴  
        var svggx;
        var svggy;
        if (svg.selectAll("g").size() > 0) {
            svggx = svg.selectAll("g.xaxis");
            svggy = svg.selectAll("g.yaxis");
        } else {
            svggx = svg.append("g").attr("class", "xaxis");
            svggy = svg.append("g").attr("class", "yaxis");
        }
        svggx.attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")").call(xAxis);
        svggy.attr("transform", "translate(" + padding.left + "," + (height - padding.bottom - yAxisWidth) + ")").call(yAxis);

        //绘制完坐标轴将值域变回去  
        yScale.range([0, yAxisWidth]);

    }

    var renderSvg = function () {
        if (document.hidden) { return; }
        renderSvgFunc();
    };

    var isRunning = false;

    var datasss = [].concat(udp);

    var renderSvgFunc = function () {
        if (isRunning) { return; }

        isRunning = true;

        for (var i in datasetMap) {
            if (i != 9999) {
                if ((i != 9999 && datasetMap[i] && datasetMap[i].length > 5000) || svg.selectAll("circle").size() == 0) {
                    datasss = [].concat(udp);
                    datasetDetaMap = {};
                    datasetMap[i] = [];
                }
            }
        }

        for (var currentAgvNum in datasetMap) {

            if (currentAgvNum == 9999) {
                lastTaskPath = datasetMap[9999];
            } else {
                if (datasetDetaMap[currentAgvNum] && datasetDetaMap[currentAgvNum].length > 0) {
                    datasss = datasss.concat(datasetDetaMap[currentAgvNum]);
                    datasetDetaMap[currentAgvNum] = [];
                }
            }
        }

        render(lastTaskPath.concat(datasss));
        isRunning = false;
    }

    var render = function (datasss) {
        drawCircle(datasss);
        drawAxis();
    }

    var equals = function (arr1, arr2) {
        if (arr1 == null || arr2 == null) {
            return false;
        }
        if (arr1.length != arr2.length) {
            return false;
        }
        for (var i = 0; i < arr1.length; i++) {
            if (arr1 != arr2) {
                return false;
            }
        }
        return true;
    }

    var randomColor = function () {
        return '#' +
            (function (color) {
                return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                    && (color.length == 6) ? color : arguments.callee(color);
            })('');
    };

    setInterval(renderSvg, 1000);
})(jQuery);