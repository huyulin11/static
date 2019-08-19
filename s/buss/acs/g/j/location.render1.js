(function () {

  
    function testAxisA() {

    var height = $(window).height();
    var width = $(window).width() *0.7;
   //绘图区域定义
    var margin = 50,
        offset = 50,
        axisWidth = width - 2 * margin,
        axisHeight = height - 2 * margin,
        svg;

   //创建SVG
    svg = d3.select("#coordinate").append("svg")
            .attr("class", "axis")
            .attr("width", width);

    //定义坐标变换
    var scaleA = d3.scale.linear().domain([119795218, 119799365]).range([0, axisWidth]);
    var scaleB = d3.scale.linear().domain([31248757, 31253159]).range([axisHeight, 0]); 


    var orientA = "bottom";

   //定义坐标轴
    var axisX = d3.svg.axis()
            .scale(scaleA)
            .orient(orientA)
            .ticks(4);


    var axisY = d3.svg.axis()
            .scale(scaleB)
            .orient("left")
            .ticks(6);

    svg.append("g").attr("transform", "translate(" + 50 + "," + (axisHeight+50) + ")").call(axisX);
    svg.append("g").attr("transform", "translate(50, 50)").call(axisY);
    
    svg.append("g").attr("class","BuildGroup");
    svg.append("g").attr("class","TextGroup");
    svg.append("g").attr("class","ButtonGroup");
    
    var dataset = [/*[x轴偏移量，y轴偏移量，宽度，高度]*/
        [0.5,0.3,1,0.5],  /*  1   */
        [1.6,0.3,1,0.5], 
        [2.7,0.3,1,0.5],  
        [3.8,0.3,1,0.5],     
        [1.6,1,1,0.6],    /*   2   */
        [2.7,1,1,0.6],
        [3.8,0.9,1,0.5],  
        [0.6,2,1,0.4],    /*   3   */
        [2.1,1.8,1,0.4],
        [3.5,1.55,0.5,0.3],              
        [3.5,2,1,0.4],  
        [0.6,2.9,1,0.8],   /*   4   */
        [4,2.5,0.5,0.4],
        [3.5,2.9,0.9,0.3],
        [0.6,3.5,1,0.4],   /*  5  */
        [0.6,4.1,1,0.4],
        [2.1,3.8,1,0.4],
        [3.5,3.5,1,0.4],
        [3.5,4.1,1,0.4],
        [3.7,4.6,0.7,0.4]
    ];

    svg.select(".BuildGroup")
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("rx","5")
    .attr("ry","5")
    .attr("x",function(d) {
        return ((axisWidth/5)* d[0]);
    })
    .attr("y",function(d){ 
        return axisHeight-((axisHeight/5)*d[1]);
    })
    .attr("width",function(d){ 
        return (axisWidth/5)*d[2];
    })
    .attr("height",function(d){ 
        return (axisHeight/5)*d[3];
    }) 
    .attr("fill","white");


    svg.select(".TextGroup")
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("fill","blank")
    .attr("text-anchor","middle")
    .attr("font-size","14px")
    .attr("x",function(d) { 
        return (axisWidth/5)* d[0]+(axisWidth/5)*d[2]*0.4;
    })
    .attr("y",function(d){ 
        return axisHeight-((axisHeight/5)*d[1])+(axisHeight/5)*d[3]*0.4;
    })
    .attr("dy","1em")
    .attr("dx","15") 
    .text(function(d){
        return "习艺楼";
    })
    var circleSet  = [];  /*[x轴偏移量，y轴偏移量，额外的偏移量，视频url]*/
    var videoUrl = 'https://tianjinvideo.oss-cn-hangzhou.aliyuncs.com/video/regionvideo/227212.mp4?t=1467091409308';
    dataset.forEach((v,i) =>{
        circleSet.push([v[0],v[1],8,videoUrl]);
        circleSet.push([(v[0]+v[2]),v[1],-8,videoUrl]);
        circleSet.push([v[0],(v[1]-v[3]+0.1),8,videoUrl]);
        circleSet.push([(v[0]+v[2]),(v[1]-v[3]+0.1),-8,videoUrl]);
    })
   
    svg.select(".ButtonGroup")
    .selectAll("circle")
    .data(circleSet)
    .enter()
    .append("circle")
    .attr("fill","#CCC")
    .style("cursor","pointer")
    .attr("cx",function(d) {
        return ((axisWidth/5)* d[0]+d[2]);
    })
    .attr("cy",function(d){ 
        return axisHeight-((axisHeight/5)*d[1])+8;
    })
    .attr("r",8)
    .style("display","none")
    .attr("value", function(d) {
        return d[3];
    });

    svg.selectAll("circle").on("click", openVideo)

    function openVideo() {
        $('#monitor').show();
        var value = $(this).attr("value");
        $('#monitorVideo').attr('src',value);
        $('#monitorVideo')[0].play();
    }

    $('#monitor span').click(function(){
        $('#monitor').hide();
    })
    $("svg").mouseleave(function(){
        $("circle").hide();
    });
    $("svg").mouseover(function(){
        $("circle").show();
    });
    $("#monitor").mouseover(function(){
        $("circle").show();
    });
}
 testAxisA();
    
})(jQuery);