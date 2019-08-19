$(document).ready(function(){
		var len=$(".tu>div").length;
		var i=0;
		var lunhuan;
		var kuan=$(window).width();
		$(".tu>div").css('width',kuan);
		/*$(".tu>a>img").css('width',kuan);*/
		/*$(".xu:eq(0)").css('backgroundImage','url(/coin-portlet/images/slide/demo_small.jpg)');*/

		function huan()
		{	
			$(".xu:eq("+i+")").css('margin-top','0px');
			$(".xu:eq("+i+")").siblings().css('margin-top','15px');
			$(".tu>div:eq("+i+")").siblings("div").fadeOut(500);
			$(".tu>div:eq("+i+")").fadeIn(1500);
			i=i+1
			if(i==len)
			{i=0}
		
		}
		lunhuan=setInterval(huan,4000);
		$("#hao").find(".xu").click(function(){
			j=$(this).index();
			$(".xu:eq("+j+")").css('margin-top','0');
			$(".xu:eq("+j+")").siblings().css('margin-top','15px');
			i=j;
			$(".tu>div:eq("+j+")").siblings("div").fadeOut(500);
			$(".tu>div:eq("+j+")").fadeIn(3000);
											  
		})
		
	})
