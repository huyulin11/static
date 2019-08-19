$(document).ready(
		function() {
			var data5 = [ [ 2, 1, 4, 2, 2, 2, ] ];
			var ticks = [ "90~100分", "65~89分", "65分", "1~65分", "不评分", "保真" ];
			var seriesColors = [ "#0085c2", "#0085c2", "#0085c2", "#0085c2",
					"#0085c2", "#0085c2", "#0085c2", "#0085c2", "#d8b83f",
					"#0085c2", "#0085c2" ];
			plot2b = $.jqplot('chartdiv', data5, {
				title : {
					text : "源泰金银币评分分布图",
					show : true,
					fontFamily : 'Hiragino Sans GB'
				},
				seriesDefaults : {
					renderer : $.jqplot.BarRenderer,
					pointLabels : {
						show : true,
						location : 'e',
						edgeTolerance : -15
					},
					show : true,
					xaxis : 'xaxis',
					yaxis : 'yaxis',
					color : '',
					lineWidth : 2.5,
					shadow : true,
					shadowAngle : 135,
					shadowOffset : 1.25,
					shadowDepth : 3,
					shadowAlpha : 0.1,
					showLine : true,
					showMarker : true,
					fill : false,
					fillAndStroke : false,
					fillColor : undefined,
					fillAlpha : undefined,
					rendererOptions : {
						barPadding : 8, // number of pixels between adjacent
						barMargin : 10, // number of pixels between adjacent
						barDirection : 'horizontal',
						barWidth : null, // width of the bars. null to
						shadowOffset : 2, // offset from the bar edge to
						shadowDepth : 15, // nuber of strokes to make for the
						shadowAlpha : 0.1, // transparency of the shadow.
					}, // options passed to the renderer. LineRenderer has no
					trendline : {
						show : true, // show the trend line
						color : '#666666', // CSS color spec for the trend
						label : '', // label for the trend line.
						type : 'linear', // 'linear', 'exponential' or 'exp'
						shadow : true, // show the trend line shadow.
						lineWidth : 1.5, // width of the trend line.
						shadowAngle : 45, // angle of the shadow. Clockwise
						shadowOffset : 1.5, // offset from the line of the
						shadowDepth : 3, // Number of strokes to make when
						shadowAlpha : 0.07
					},
				},
				seriesColors : seriesColors,
				stackSeries : false, // 如果置为true并且有多个分类（如果是折线图，就必须多于一条折线），
				useSeriesColor : true,
				grid : {
					drawGridLines : false, // wether to draw lines across the
					gridLineColor : '#cccccc', // *Color of the grid lines.
					background : '#fffdf6', // CSS color spec for background
					borderColor : '#999999', // CSS color spec for border
					borderWidth : 2.0, // pixel width of border around grid.
					shadow : false, // draw a shadow for grid.
					shadowAngle : 45, // angle of the shadow. Clockwise from x
					shadowOffset : 1.5, // offset from the line of the shadow.
					shadowWidth : 3, // width of the stroke for the shadow.
					shadowDepth : 3, // Number of strokes to make when
					shadowAlpha : 0.07, // Opacity of the shadow
					renderer : $.jqplot.CanvasGridRenderer, // renderer to use
					rendererOptions : {}
				},
				axesDefaults : {
					show : false, // wether or not to renderer the axis.
					min : 0, // minimum numerical value of the axis.
					max : null,
					tickInterval : 1,
					numberTicks : undefined,
					rendererOptions : {},
					tickOptions : {
						mark : 'outside',
						showMark : true,
						showGridline : true,
						markSize : 4,
						show : true,
						showLabel : true,
						formatString : '',
					},
				},
				axes : {
					yaxis : {
						renderer : $.jqplot.CategoryAxisRenderer,
						showTicks : true,
						ticks : ticks
					}
				},
			});
			/*
			 * $('#chartdiv').bind( 'jqplotDataHighlight', function(ev,
			 * seriesIndex, pointIndex, data) { $('#info2b').html( 'series: ' +
			 * seriesIndex + ', point: ' + pointIndex + ', data: ' + data + ',
			 * pageX: ' + ev.pageX + ', pageY: ' + ev.pageY); });
			 * $('#chartdiv').bind( 'jqplotDataClick', function(ev, seriesIndex,
			 * pointIndex, data) { $('#info2c').html( 'series: ' + seriesIndex + ',
			 * point: ' + pointIndex + ', data: ' + data + ', pageX: ' +
			 * ev.pageX + ', pageY: ' + ev.pageY); });
			 * 
			 * $('#chartdiv').bind('jqplotDataUnhighlight', function(ev) {
			 * $('#info2b').html('Nothing'); });
			 */
		});