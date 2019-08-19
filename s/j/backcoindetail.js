function strlen(str){
        var len = 0;
        for (var i=0; i<str.length; i++) { 
         var c = str.charCodeAt(i); 
        //单字节加1 
         if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
           len++; 
         } 
         else { 
          len+=2; 
         } 
        } 
        return len;
    }
$(function() {
	$.fn.initTips = function(options) {
		var _timeid = null;
		var father = options["father"] == undefined ? document
				: options["father"];
				$(this)	.live(
						options["showType"],
						function(e) {
							if (!options["initDataFun"](this)) {
								return;
							}
							var pointX, pointY;
							if ((options["posType"] == undefined || options["posType"]) == "relative") {
								pointX = options["pointX"];
								pointY = options["pointY"];
								pointX = e.clientX
										+ (pointX == undefined ? 0 : pointX);
								pointY = e.clientY + (pointY == undefined ? 0 : pointY);
							} else {
								pointX = options["pointX"];
								pointY = options["pointY"];
							}
							if (pointX == null || pointX == undefined) {
								pointX = $(window).width()
										- $(options["targetLabel"]).css("width").replace("px", "")
										- 20;
							}
							if (pointY == null || pointY == undefined) {
								pointY = ($(window).height() - $(
										options["targetLabel"]).css("height")
										.replace("px", "")) / 2;
							}
							if (options["targetWidth"] == "auto") {
								$(options["targetLabel"]).css({
									width : $(window).width() / 3
								});
							}
							if (options["targetHeight"] == "auto") {
								$(options["targetLabel"]).css({
									height : $(window).height() / 3
								});
							}
							_timeid = setTimeout(
									function() {
										if (father == document) {
											$(".black_overlay").appendTo("html").show().css("height",$(document).height());
										}
										$(options["targetLabel"]).show(50).css({left : pointX,top : pointY});
									},(options["timeoutTime"] == undefined ? 200: options["timeoutTime"]));
							if (options["closeEvent"] == undefined
									|| options["closeEvent"] == "normal") {
								_initCloseEvent(options, _timeid);
							} else {
								options["closeEvent"](this, options, _timeid);
							}
							return false;
						});
		return _timeid;
	};
	var saveCoinmottoSelectFun = function(dataSrc) {
		$("#backdetail_table tr:gt(0) td textarea[name='coinmottoShow']").each(
				function() {
					if ($(dataSrc)[0] != $(this)[0]) {
						$(this).unbind("click");
					}
				});
		var listVal = "";
		var listShow = "";
		$("#tmpcoinmottolist input[name='tmpcoinmotto']").each(function() {
			if ($(this).attr("checked")) {
				listVal += $(this).val() + ",";
				listShow += $(this).attr("data-value") + ",";
			}
		});
		if (listShow.length > 0) {
			listShow = listShow.substring(0, listShow.length - 1);
		}
		$(dataSrc).parents("td").find("input[name='coinmottoShow']").val(listVal);
		$(dataSrc).val(listShow);
	};

	var showCoinmottoSelectFun = function(dataSrc) {
		$("#tmpcoinmottolist input[name='tmpcoinmotto']")
				.attr("checked", false);
		$("#coinmottolist").attr("data-crtrow",
				$(dataSrc).parents("tr").find("td.rowId").html());
		mottoArr = $(dataSrc).parents("td").find("input[name='coinmottoShow']")
		.val().split(",");
		$("#tmpcoinmottolist input[name='tmpcoinmotto']").each(function() {
			for ( var i = 0; i < mottoArr.length; i++) {
				if ($(this).val() == mottoArr[i]) {
					$(this).attr("checked", true);
				}
			}
		});
		return true;
	};

	$("#backdetail_table tr:gt(0) td textarea[name='coinmottoShow']").initTips(
			{
				showType : "click",
				pointX : -1,
				pointY : -1,
				posType : "relative",
				timeoutTime : 20,
				father : "#backdetail_table",
				closeEvent : function(dataSrc, options, timeid) {
					$("#backdetail_table").live("click", function(ev) {
						$(options["targetLabel"]).hide();
						try {
							clearTimeout(timeid);
						} catch (e) {
						}
					});
					$("#tmpcoinmottolist input[name='tmpcoinmotto']").live(
							"click", function(ev) {
								saveCoinmottoSelectFun(dataSrc);
								ev = ev || window.event;
								if (ev.stopPropagation) { // W3C阻止冒泡方法
									ev.stopPropagation();
								} else {
									ev.cancelBubble = true; // IE阻止冒泡方法
								}
							});
				},
				targetLabel : "#coinmottolist",
				initDataFun : showCoinmottoSelectFun
			});
	
	$(".stampjointype").live("change", function() {
		if ($(this).val() == "106") {
			var crtrow = $(this).parents("tr");
			var e = $(this).position();
			$("#stampjointypeN").show().css({
				left : e.left + "px",
				top : e.top + "px"
			}).attr("data-crtrow", crtrow.find("td.rowId").html()).select();
		} else {
			$("#stampjointypeN").hide();
		}
	});

	$("#stampjointypeN").live(
			"blur",
			function() {
				var crtSlt = $(".stampjointype");
				var crtInputVal = $("#stampjointypeN").val();
				if (crtInputVal > 0) {
					var hasVal = false;
					crtSlt.find("option").each(function() {
						if ($(this).val() == crtInputVal) {
							hasVal = true;
							return false;
						}
					});
					if (!hasVal) {
						crtSlt.append("<option value=" + crtInputVal + ">"
								+ crtInputVal + " 连</option>");
					}
					crtSlt.val(crtInputVal);
				} else {
					crtSlt.val(101);
				}
				$(this).hide();
			});
   var entitytype=$("#hidden_entitytype").val();
   var galleries = $('.ad-gallery').adGallery();
    $('#switch-effect').change(
      function() {
        galleries[0].settings.effect = $(this).val();
        return false;
      }
    );
    $('#toggle-slideshow').click(
      function() {
        galleries[0].slideshow.toggle();
        return false;
      }
    );
    $('#toggle-description').click(
      function() {
        if(!galleries[0].settings.description_wrapper) {
          galleries[0].settings.description_wrapper = $('#descriptions');
        } else {
          galleries[0].settings.description_wrapper = false;
        }
        return false;
      }
    );
    $('#products').slides({
		preload: true,
		//preloadImage: '/coin-portlet/images/coindisplay/loading.gif',
		effect: 'slide, fade',
		crossfade: true,
		slideSpeed: 350,
		fadeSpeed: 500,
		generateNextPrev: true,
		generatePagination: false
	});
    $("#features").focus(function(){
    	$(this).select();
		$(this).css("border-color","red");
    }).blur(function(){
    	var features=$("#features").val();
    	if(strlen(features)>26){
    		alert("特性长度不能超过13个字符");
    		return false;
    	}
    });
    $(".fullsubject").focus(function(){
    	$(this).select();
		$(this).css("border-color","red");
    }).blur(function(){
    	var fullsubject=$(this).val();
    	if(strlen(fullsubject)>22){
    		alert("名称不能超过11个字符");
    		return false;
    	}
    });
    $(".firstreview_score").focus(function(){
		$(this).select();
		ClearChecked();
		$(this).css("border-color","red");
	}).blur(function(){
		var firstScore = $(".firstreview_score").val();
		if(firstScore!=""){
			if(firstScore >= -2 && firstScore <= 100){
					if(/^[1-99]+\.?\d{0,2}$/.test(firstScore)||firstScore==-2||firstScore==-1||firstScore==0){
						if(entitytype=='3'){
							ancientCoinScorePass0(firstScore,"FirstNotRateScoreRes");
						}
						
//						else if(entitytype=='5'){
//							mechanismCoinScorePass0(firstScore,"FirstNotRateScoreRes");
//						}
						if(entitytype=='4'){
							if(firstScore == -1 || firstScore==0 || firstScore==20 ||firstScore==30 ||firstScore==40 || firstScore==50
								|| firstScore==60 || firstScore==65|| firstScore==70|| firstScore==75|| firstScore==80|| firstScore==85
								|| firstScore==90|| firstScore>=95&&firstScore<=100){
								if(firstScore == -2){
									$("#buzhuang").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").show();
								}
								if(firstScore == -1){
									$("#zhuanghe").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").show();
									$("#tl9").hide();
								}
								if(firstScore == 0){
									$("#zhenpin").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").show();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(firstScore == 20){
									$("#chapin").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").show();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(firstScore == 30 || firstScore == 40){
									$("#zhongxia").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").show();
									$("#tl5b").show();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(firstScore == 50 || firstScore == 60){
									$("#zhongpin").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").show();
									$("#tl4b").show();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(firstScore == 65 || firstScore == 70 || firstScore == 75){
									$("#shangzhong").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").show();
									$("#tl3b").show();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(firstScore == 80 || firstScore == 85 || firstScore == 90){
									$("#shangpin").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").show();
									$("#tl2b").show();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(firstScore >= 95 && firstScore <= 100){
									$("#quanpin").attr("checked","checked");
									$("#tl1").show();
									$("#tl1b").show();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								return true;
							}else{
								alert("输入错误");
								$(".firstreview_score").val("");
								return false;
							}
							return false;
						}else{
							return true;
						}
						return true;
					}else{
						alert("输入错误");
						$(".firstreview_score").val("");
						return false;
					}
				}else{
					alert("输入错误");
					$(".firstreview_score").val("");
					return false;
				}
		}else{
			return false;
		}
	});
$("#secondreview").focus(function(){
	$(this).select();
	ClearChecked();
	$(this).css("border-color","red");
}).blur(function(){
	var secondScore = $(".secondreview_score").val();
	if(secondScore!=""){
		if(secondScore >= -2 && secondScore <= 100){
			if(/^\d{0,2}$/.test(secondScore)||secondScore==-2||secondScore==-1||secondScore==0||secondScore==100){
				if(secondScore<=100&&secondScore>=-2){
						if(entitytype=='3'){
							ancientCoinScorePass0(secondScore,"secondNotRateScoreRes");
						}
//						else if(entitytype=='5'){
//							mechanismCoinScorePass0(secondScore,"secondNotRateScoreRes");
//						}
						if(entitytype=='4'){
							if(secondScore == -1 ||secondScore == -2|| secondScore==0 || secondScore==20 ||secondScore==30 ||secondScore==40 || secondScore==50
								|| secondScore==60 || secondScore==65|| secondScore==70|| secondScore==75|| secondScore==80|| secondScore==85
								|| secondScore==90|| secondScore>=95 && secondScore<=100){
								if(secondScore == -2){
									$("#buzhuang").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").show();
								}
								if(secondScore == -1){
									$("#zhuanghe").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").show();
									$("#tl9").hide();
								}
								if(secondScore == 0){
									$("#zhenpin").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").show();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(secondScore == 20){
									$("#chapin").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").show();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(secondScore == 30 || secondScore == 40){
									$("#zhongxia").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").show();
									$("#tl5b").show();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(secondScore == 50 || secondScore == 60){
									$("#zhongpin").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").show();
									$("#tl4b").show();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(secondScore == 65 || secondScore == 70 || secondScore == 75){
									$("#shangzhong").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").show();
									$("#tl3b").show();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(secondScore == 80 || secondScore == 85 || secondScore == 90){
									$("#shangpin").attr("checked","checked");
									$("#tl1").hide();
									$("#tl1b").hide();
									$("#tl2").show();
									$("#tl2b").show();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								if(secondScore >= 95 && secondScore <= 100){
									$("#quanpin").attr("checked","checked");
									$("#tl1").show();
									$("#tl1b").show();
									$("#tl2").hide();
									$("#tl2b").hide();
									$("#tl3").hide();
									$("#tl3b").hide();
									$("#tl4").hide();
									$("#tl4b").hide();
									$("#tl5").hide();
									$("#tl5b").hide();
									$("#tl6").hide();
									$("#tl7").hide();
									$("#tl8").hide();
									$("#tl9").hide();
								}
								return true;
							}else{
								alert("输入错误");
								$("#secondreview").val("");
								return false;
							}
						return true;
					}else{
						alert("输入错误");
						$("#secondreview").val("");
						return false;
					}			
			}else{
				alert("输入错误");
				$("#secondreview").val("");
				return false;
			}
			}else{
				alert("输入错误");
				$("#secondreview").val("");
				return false;
			}
	}else{
		return false;
	}
	}
});
var requestcoincode = $("#requestcoincode").val()*1;
var coinlist=$("#hidden_dataNum").val()*1;	
var employeeid=$("#hidden_employeeid").val();
var struts=$("#hidden_request_struts").val();
var imgtype=$("#hidden_imgtype").val();
$("#btn_last").click(function(){
	if(requestcoincode%1000>1){
		requestcoincode--;
		window.location.href=SearchCoinByCodeURL+"&coincode="+requestcoincode+'&level='+level+'&imgtype='+imgtype+'&dataNum='+coinlist+'&employeeid='+employeeid+'&struts='+struts+'&entitytype='+entitytype;
	}else{
		alert("已经是第一个了");
	}
});
$("#btn_next").click(function(){	
	if(requestcoincode%1000<coinlist){
		requestcoincode++;
		window.location.href=SearchCoinByCodeURL+"&coincode="+requestcoincode+'&level='+level+'&imgtype='+imgtype+'&dataNum='+coinlist+'&employeeid='+employeeid+'&struts='+struts+'&entitytype='+entitytype;
	}else{
		alert("已经是最后一个了");
	}
});
$("#back_win").click(function(){
	var url_string="";
	var level=$("#hidden_employee_level").val();
	var parm=$("#hidden_coininfolist_requestid").val();
	if(level=="1"){	
		url_string=draftingURL;
		url=url_string.substring(0,url_string.indexOf("?")+"?p_p_id=drawing_WAR_coinportlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_col_id=column-3&p_p_col_count=1");
		window.open(draftingURL + '&myaction=coinDrawing'+'&requestid=' + parm+'&entitytype='+entitytype,'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	}else if(level=="2"){
		window.open(seeURL +'&myaction=firstAssessment'+ '&requestid=' + parm+'&entitytype='+entitytype,'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	}else if(level=="3"){
		window.open(seeURL +'&myaction=secondAssessment'+ '&requestid=' + parm+'&entitytype='+entitytype,'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	}else if(level=="4"){
		window.open(packagURL +'&myaction=coinPackaged'+'&requestid=' + parm+'&entitytype='+entitytype,'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	}else if(level=="5"){
		window.open(chartURL +'&myaction=coinCharting'+'&requestid=' + parm+'&entitytype='+entitytype,'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	}
});
$("#div_greater0_score1 input[type='checkbox']").click(function(){
	if($(this).val()=="NET"){
		if($(this).attr("checked")){
			$("#div_greater0_score2").css("display","");
			$("#div_greater0_score1 input[type='checkbox']").eq(1).attr("checked",false);
		}
	}else if($(this).val()=="EPQ"){
		if($(this).attr("checked")){
			$("#div_greater0_score2").css("display","none");
			$("#div_greater0_score1 input[type='checkbox']").eq(0).attr("checked",false);
		}
	}
});
$("#requestcoincode").keypress(function(event){
	var requestcoincode =$(this).val();
	if(event.keyCode==13){
		if(requestcoincode.length!=0){
			var struts=$("#hidden_request_struts").val();
			var imgtype=$("#hidden_imgtype").val();
			window.location.href=SearchCoinByCodeURL+"&coincode="+requestcoincode+"&level="+level+'&imgtype='+imgtype+"&employeeid="+employeeid+'&struts='+struts+'&dataNum='+coinlist+'&entitytype='+$('#hidden_entitytype').val();
		}
	}
});
$("#scoremark").focus(function(){
	$(this).select();
	$(this).css("border-color","red");
});
$("#coinremark").focus(function(){
	$(this).select();
	$(this).css("border-color","red");
});
$("#firstreview").blur(function(){
	if($(this).val()=="0"){
		$("#div_zero_reason").css("display","");
		$("#div_negative1_reason").css("display","none");	
		$(".div_greater0_score").css("display","none");
		$("#sel-score-level").css("display","");
		$("#sel-score-level").val("");
	}else if($(this).val()=="-1"){
		$("#div_zero_reason").css("display","none");
		$("#div_negative1_reason").css("display","");	
		$(".div_greater0_score").css("display","none");
		$("#sel-score-level").css("display","");
		$("#sel-score-level").val("");
	}else{
		$("#div_zero_reason").css("display","none");
		$("#div_negative1_reason").css("display","none");	
		$(".div_greater0_score").css("display","");
		var firstScore = $(this).val();
    	if(entitytype=="5"){
    		$("#sel-score-level").css("display","");
			if(firstScore>=1 && firstScore<=15){
				$("#sel-score-level").val("弱品");
			}
			if(firstScore>=20 && firstScore<=35){
				$("#sel-score-level").val("普品");
			}
			if(firstScore>=40 && firstScore<=55){
				$("#sel-score-level").val("美品");
			}
			if(firstScore>=60 && firstScore<=65){
				$("#sel-score-level").val("极美品");
			}
			if(firstScore>=70 && firstScore<=85){
				$("#sel-score-level").val("近未使用品");
			}
			if(firstScore>=90 && firstScore<=100){
				$("#sel-score-level").val("未使用品");
			}
		}
    	if(entitytype=="3"){
    		$("#sel-score-level").css("display","");
			if(firstScore>=1 && firstScore<=5){
				$("#sel-score-level").val("弱品");
			}
			if(firstScore>=10 && firstScore<=25){
				$("#sel-score-level").val("普品");
			}
			if(firstScore>=30 && firstScore<=45){
				$("#sel-score-level").val("好品");
			}
			if(firstScore>=50 && firstScore<=65){
				$("#sel-score-level").val("美品");
			}
			if(firstScore>=70 && firstScore<=85){
				$("#sel-score-level").val("上美品");
			}
			if(firstScore>=90 && firstScore<=94){
				$("#sel-score-level").val("极美品");
			}
			if(firstScore>=95 && firstScore<=100){
				$("#sel-score-level").val("完美品");
			}
    	}
	}
});
$("#secondreview").blur(function(){
	var entitytype=$("#hidden_entitytype").val();
	if(entitytype!="4"){
	if($(this).val()=="0"){
		$("#div_zero_reason").css("display","");
		$("#div_negative1_reason").css("display","none");	
		$(".div_greater0_score").css("display","none");
		$("#sel-score-level").css("display","");
		$("#sel-score-level").val("");
	}else if($(this).val()=="-1"){
		$("#div_zero_reason").css("display","none");
		$("#div_negative1_reason").css("display","");	
		$(".div_greater0_score").css("display","none");
		$("#sel-score-level").css("display","");
		$("#sel-score-level").val("");
	}else{
		$("#div_zero_reason").css("display","none");
		$("#div_negative1_reason").css("display","none");	
		$(".div_greater0_score").css("display","");
		var secondScore = $(this).val();
    	if(entitytype=="5"){
    		$("#sel-score-level").css("display","");
			if(secondScore>=1 && secondScore<=15){
				$("#sel-score-level").val("弱品");
			}
			if(secondScore>=20 && secondScore<=35){
				$("#sel-score-level").val("普品");
			}
			if(secondScore>=40 && secondScore<=55){
				$("#sel-score-level").val("美品");
			}
			if(secondScore>=60 && secondScore<=65){
				$("#sel-score-level").val("极美品");
			}
			if(secondScore>=70 && secondScore<=85){
				$("#sel-score-level").val("近未使用品");
			}
			if(secondScore>=90 && secondScore<=100){
				$("#sel-score-level").val("未使用品");
			}
    	}
    	if(entitytype=="3"){
    		$("#sel-score-level").css("display","");
			if(secondScore>=1 && secondScore<=5){
				$("#sel-score-level").val("弱品");
			}
			if(secondScore>=10 && secondScore<=25){
				$("#sel-score-level").val("普品");
			}
			if(secondScore>=30 && secondScore<=45){
				$("#sel-score-level").val("好品");
			}
			if(secondScore>=50 && secondScore<=65){
				$("#sel-score-level").val("美品");
			}
			if(secondScore>=70 && secondScore<=85){
				$("#sel-score-level").val("上美品");
			}
			if(secondScore>=90 && secondScore<=94){
				$("#sel-score-level").val("极美品");
			}
			if(secondScore>=95 && secondScore<=100){
				$("#sel-score-level").val("完美品");
			}
    	}
	}
	}
});
$("#div_zero_reason input[name='chk_zero_reason']").change(function(){
	if(entitytype=="5"){
		if($(this).val()=="真品"){
			$("#sel-score-level").val("");
			$("#sel-score-level").attr("disabled","disabled");
		}else{
			$("#sel-score-level").removeAttr("disabled"); 
			
		}
	}
});
});
function checkVersion(entitytype,version){
	var flag=true;
	if(entitytype=="2"){
		 $.ajax({
			 url:checkVersionUrl,
			 async: false,
			 type: "POST",
			 data:{"entitytype":entitytype,"version":version},
			 success:function(data){
					data=eval("("+data+")"); 
					if(data.result=='success'){
						$("#hidden_difversioncode").val(data.id);
						flag=true;
					}else if(data.result=='false'){
						alert("版别不符合规范！");	
						flag=false;
					}else{
						alert("提交失败！");	
						flag=false;
					}
			 }
		});
	}
	return flag;
}

function dataVerification(entitytype,score){
	if(entitytype=='2'){
		var checkedObj=$("#div_greater0_score1 input[type='checkbox']:checked");
		if(score*1>0){
			if(checkedObj.length==2){
				alert("NET和EPQ不能同时选择！");
				return false;
			}else if(checkedObj.length==1){
				if(checkedObj.val()=='NET'){
					if($("#div_greater0_score2 input[type='checkbox']:checked").length==0){
						alert("至少选择一种评级原因！");
						return false;
					}
				}
			}else{
				if($("#div_greater0_score2 input[type='checkbox']:checked").length>0){
					alert("请选择NET");
					return false;
				}
			}
		}
		if(score=='0'){
			if($("#div_zero_reason input[type='checkbox']:checked").length==0){
				alert("至少选择一种评级原因！");
				return false;
			}
		}
		if(score=='-1'){
			if($("#div_negative1_reason input[type='checkbox']:checked").length==0){
				alert("至少选择一种评级原因！");
				return false;
			}
		}
//		if($('#ACSize').val().trim()==''){
//			alert("规格不能为空!");
//			return false;
//		}
//		if($('#blockNum').val().trim()==''){
//			alert("冠字号不能为空！");
//			return false;
//		}
	}else if(entitytype=='3'){
//		if($('#ACGrade').val().trim()==''){
//			alert("珍稀度不能为空！");
//			return false;
//		}
//		if($('#ACSize').val().trim()==''){
//			alert("规格不能为空!");
//			return false;
//		}
		/*if($('#ACWeight').val().trim()==''){
			alert("重量不能为空！");
			return false;
		}*/
		if(score=='0'){
			if($("#div_zero_reason input[type='checkbox']:checked").length==0){
				alert("至少选择一种评级原因！");
				return false;
			}
		}
		if(score=='-1'){
			if($("#div_negative1_reason input[type='checkbox']:checked").length==0){
				alert("至少选择一种评级原因！");
				return false;
			}
		}
	}
}
function submitModify(param){
	var score = "";
	var entitytype=$("#hidden_entitytype").val();
	var difversion=$("#difversion").val();
	if(param=="2"){ 	
		score = $("#firstreview").val();
		if(score==''){
			alert("评分不可为空！");	
			return false;
		}
	}else if(param=="3"){
		score = $("#secondreview").val();	
		if(score==''){
			alert("评分不可为空！");	
			return false;
		}
	}
	if(entitytype=='4'){
		if(strlen($(".fullsubject").val())>22){
			alert("名称长度不能超过11个字符！");
			return false;
		}
		if(strlen($("#features").val())>26){
			alert("名称长度不能超过13个字符！");
			return false;
		}
	}
	if($("#hidden_request_struts").val()=='3'){
		if(dataVerification(entitytype,score)==false){
			return false;
		}
	}
	var ratingreasondis="";
	if(score=="0"){
		$("#div_zero_reason input:checkbox").each(function(i) {
			if($(this).attr("checked")){
				ratingreasondis+=$(this).val()+";";
			}
		});
	}
	if(score=="-1"){
		$("#div_negative1_reason input:checkbox").each(function(i) {
			if($(this).attr("checked")){
				ratingreasondis+=$(this).val()+";";
			}
		});
	}
	if(entitytype=='2'){	
		if(score!="0" && score!="-1"){
			$("#div_greater0_score1 input:checkbox").each(function(i) {
				if($(this).attr("checked")){
					ratingreasondis+=$(this).val()+"-";
				}
			});
			$("#div_greater0_score2 input:checkbox").each(function(i) {
				if($(this).attr("checked")){
					ratingreasondis+=$(this).val()+";";
				}
			});
		}
//		if($("#hidden_request_struts").val()=='2'){
//			if($('#blockNum').val().trim()==''){
//				alert("冠字号不能为空！");
//				return false;
//			}
//		}
	}else if(entitytype=='5'){
		var selScoreLevel=$("#sel-score-level").val();
		if(selScoreLevel.trim()!=""){
			ratingreasondis=selScoreLevel+"-"+ratingreasondis;
		}
	}else if(entitytype=='3'){
		var selScoreLevel=$("#sel-score-level").val();
		if(selScoreLevel.trim()!=""){
			ratingreasondis=selScoreLevel+"-"+ratingreasondis;
		}
	}
	if(param=="2"){
		if(entitytype=='2' ||(entitytype=='1' && score*1<1)|| entitytype=='3' ||(entitytype=='4' && score*1<1)||entitytype=='5'){
			$("#FirstNotRateScoreRes").val(ratingreasondis);
		}
		ratingreasondis=$("#FirstNotRateScoreRes").val();
	}else if(param=="3"){
		if(entitytype=='2'||(entitytype=='1' && score*1<1)|| entitytype=='3' ||(entitytype=='4' && score*1<1)||entitytype=='5'){
			$("#secondNotRateScoreRes").val(ratingreasondis);
		}
		ratingreasondis=$("#secondNotRateScoreRes").val();
	}
	var struts=$("#hidden_request_struts").val();
	var coinremark = $("#coinremark").val();
	var scoremark = $("#scoremark").val();
	var requestcoinid = $("#requestcoinid").val();
	var blockNum=$("#blockNum").val();
	var whetherSample=$("input[name='radio_whetherSample']:checked").val();
	var requestid = $("#hidden_coininfolist_requestid").val();
	//古币
	var ACGrade=$("#ACGrade").val();
	var ACSize=$("#ACSize").val();
	var ACWeight=$("#ACWeight").val();
	var difversioncode=$("#hidden_difversioncode").val();
	//邮票
	var coinspecialtype=$("#specialtype").val();
	var coinprintingpaper=$("#printingpaper").val();
	var customsize=$("#size").val();
	var coinmotto=$("#motto").val();
	var coinseriesnum=$("#seriesnum").val();
	var coincover=$("#cover").val();
	var coincovernewold=$(".covernewold").val();
	var coinpostmark=$("#postmark").val();
	var coinplatemode=$("#platemode").val();
	var coinissuingquantity=$("#issuingquantity").val();
	var coinsummary=$("#summary").val();
	var coinhole=$("#hole").val();
	var coinstampjointype=$(".stampjointype").val();
	var coinfullsubject=$(".fullsubject").val();
	var coinfeatures = $("#features").val();
	if(entitytype=='4'){
		ratingreasondis=$(".ratingreasondis").val();
	}
//	if(checkVersion(entitytype,difversion)){
//		var difversioncode=$("#hidden_difversioncode").val();
		$.ajax({	
			type: "POST",
			url: submitModifyURL,
			data: "coinremark="+coinremark+"&scoremark="+scoremark+"&score="+score+"&requestcoinid="+requestcoinid+
					"&struts="+struts+"&level="+param+"&difversion="+difversion+"&ratingreasondis="+ratingreasondis+
					"&whetherSample="+whetherSample+"&blockNum="+blockNum+"&entitytype="+entitytype+"&difversioncode="+difversioncode+
					"&coinspecialtype="+coinspecialtype+"&coinprintingpaper="+coinprintingpaper+"&customsize="+customsize+"&coinmotto="+
					coinmotto+"&coinseriesnum="+coinseriesnum+"&coincover="+coincover+"&coincovernewold="+coincovernewold+"&coinpostmark="+
					coinpostmark+"&coinplatemode="+coinplatemode+"&coinissuingquantity="+coinissuingquantity+"&coinsummary="+coinsummary+
					"&coinhole="+coinhole+"&coinstampjointype="+coinstampjointype+"&coinfullsubject="+coinfullsubject+"&coinfeatures="+coinfeatures+
					"&guestWRGrade="+ACGrade+"&guestWRSize="+ACSize+"&guestWRWeight="+ACWeight+"&requestid="+requestid,
	//		data:{coinremark:coinremark,scoremark:scoremark,score:score,requestcoinid:requestcoinid,level:level,
	//			difversion:difversion,ratingreasondis:ratingreasondis,whetherSample:whetherSample,blockNum:blockNum,entitytype:entitytype},
			dataType:"text",
			success: function(data){
				if(data=="success"){
					$("#scoremark").css("border-color","#CCC");
					$("#coinremark").css("border-color","#CCC");
					$("#secondreview").css("border-color","#CCC");
					$(".firstreview_score").css("border-color","#CCC");
					alert("提交成功！");
					window.location.reload();
				}else{
					alert("提交失败！");
				}
			},
			error: function(data){
				alert("出错了！");
			}
		});
}
function ancientCoinScorePass0(score,id){
	if(score>0 && score<10){
		$("#"+id).val("弱品;");
	}else if(score>=10 && score<30){
		$("#"+id).val("普品;");
	}else if(score>=30 && score<50){
		$("#"+id).val("好品;");
	}else if(score>=50 && score<70){
		$("#"+id).val("美品;");
	}else if(score>=70 && score<90){
		$("#"+id).val("上美品;");
	}else if(score>=90 && score<95){
		$("#"+id).val("极美品;");
	}else if(score>=95 && score<=100){
		$("#"+id).val("完美品;");
	}
}
function mechanismCoinScorePass0(score,id){
	if(score>0 && score<20){
		$("#"+id).val("弱品;");
	}else if(score>=20 && score<40){
		$("#"+id).val("普品;");
	}else if(score>=40 && score<60){
		$("#"+id).val("美品;");
	}else if(score>=60 && score<70){
		$("#"+id).val("极美品;");
	}else if(score>=70 && score<90){
		$("#"+id).val("近未使用品;");
	}else if(score>=90 && score<=100){
		$("#"+id).val("未使用品;");
	}
}
function uploadImg(employeeid){
	var coincode = $("#hidden_coincode").val();	
	var requestcode = coincode.substring(0,coincode.length-3);
	var dataNum=$("#hidden_dataNum").val()*1;
	var level=$("#hidden_employee_level").val();
	var struts=$("#hidden_request_struts").val();
	var imgtype=$("#hidden_imgtype").val();
	var entitytype=$("#hidden_entitytype").val();
	window.open(uploadImgtURL+'&myaction=upload'+'&imgtype='+imgtype+'&num='+requestcode+'&employeeid='+employeeid+'&type=2&level='+level+'&struts='+struts+'&coincode='+coincode+'&coinsize=0'+'&dataNum='+dataNum+'&entitytype='+entitytype,'uploadPage');
}
function SearchCoinByCode(employeeid){
	var flag=true;
	var coinlist=$("#hidden_dataNum").val()*1;
	var requestcoincode = $("#requestcoincode").val();
	var coincode = $("#hidden_coincode").val();
	var employeeid=$("#hidden_employeeid").val();
	var imgtype=$("#hidden_imgtype").val();
	var struts=$("#hidden_request_struts").val();
	var entitytype=$("#hidden_entitytype").val();
	 $.ajax({
		 url:checkCoinCodeURL+"&coincode="+requestcoincode+"&level="+level+'&imgtype='+imgtype+"&employeeid="+employeeid+'&struts='+struts+'&dataNum='+coinlist+'&entitytype='+entitytype,
		 type: "POST",
		 data:{"coincode":coincode},
		 success:function(data){
				data=eval("("+data+")"); 
				if(data.flag=='true'){
					if(requestcoincode.substring(0,5)==coincode.substring(0,5)){
						flag=true;
					}else{
						alert("请输入正确的钱币编号！");
						flag=false;
					}
				}else if(data.flag=='false'){
					alert("请输入正确的钱币编号！");	
					flag=false;
				}
				if(flag==true){
					window.location.href=SearchCoinByCodeURL+"&coincode="+requestcoincode+"&level="+level+'&imgtype='+imgtype+"&employeeid="+employeeid+'&struts='+struts+'&dataNum='+coinlist+'&entitytype='+entitytype; 	
				 }
		 },
		 error:function(data){
		 		alert("出错了");
		 }
	});
	 
	return flag;
}
function closeBackCoinDeatilWin(){
	window.close();
	window.opener.location.href = window.opener.location.href;
}
function ClearChecked(){
	$("#tl1 tr td input").attr("checked",false);
	$("#tl2 tr td input").attr("checked",false);
	$("#tl3 tr td input").attr("checked",false);
	$("#tl4 tr td input").attr("checked",false);
	$("#tl5 tr td input").attr("checked",false);
	$("#tl8 tr td input").attr("checked",false);
	$("#tl9 tr td input").attr("checked",false);
	$(".ratingreasondiss").val("");
	$(".ratingreasondis").val("");
}
function cheRadio(obj){
	var value = obj.value;
	if(value == "全品"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("95");
		}else{
			$("#firstreview").val("95");
		}
		$("#tl1").show();
		$("#tl1b").show();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
		ClearChecked();
	}
	if(value == "上品"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("80");
		}else{
			$("#firstreview").val("80");
		}
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").show();
		$("#tl2b").show();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
		ClearChecked();
	}
	if(value == "上中品"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("65");
		}else{
			$("#firstreview").val("65");
		}
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").show();
		$("#tl3b").show();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
		ClearChecked();
	}
	if(value == "中品"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("50");
		}else{
			$("#firstreview").val("50");
		}
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").show();
		$("#tl4b").show();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
		ClearChecked();
	}
	if(value == "中下品"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("30");
		}else{
			$("#firstreview").val("30");
		}
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").show();
		$("#tl5b").show();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
		ClearChecked();
	}
	if(value == "差品"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("20");
		}else{
			$("#firstreview").val("20");
		}
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").show();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
		ClearChecked();
	}
	if(value == "真品"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("0");
		}else{
			$("#firstreview").val("0");
		}
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").show();
		$("#tl8").hide();
		$("#tl9").hide();
		ClearChecked();
	}
	if(value == "装盒不评"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("-1");
		}else{
			$("#firstreview").val("-1");
		}
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").show();
		$("#tl9").hide();
		ClearChecked();
	}
	if(value == "不装不评"){
		if($("#secondreview").val()!=null){
			$("#secondreview").val("-2");
		}else{
			$("#firstreview").val("-2");
		}
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").show();
		ClearChecked();
	}
}
$(function (){
	var secondscore=$("#secondreview").val();
	var firstscore=$("#firstreview").val(); 
	if(firstscore>=95 && secondscore==null || secondscore>=95){
		$("#quanpin").attr("checked","checked");
		$("#tl1").show();
		$("#tl1b").show();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
	}else if((firstscore==90 || firstscore ==80 || firstscore == 85)&& secondscore==null || secondscore==90 || secondscore ==80 || secondscore == 85){
		$("#shangpin").attr("checked","checked");
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").show();
		$("#tl2b").show();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
	}else if((firstscore == 75 || firstscore ==70 || firstscore == 65) && secondscore==null || secondscore == 75 || secondscore ==70 || secondscore == 65){
		$("#shangzhong").attr("checked","checked");
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").show();
		$("#tl3b").show();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
	}else if((firstscore == 60 || firstscore ==50) && secondscore==null || secondscore == 60 || secondscore ==50){
		$("#zhongpin").attr("checked","checked");
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").show();
		$("#tl4b").show();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
	}else if((firstscore == 40 || firstscore ==30) && secondscore==null || secondscore == 40 || secondscore ==30){
		$("#zhongxia").attr("checked","checked");
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").show();
		$("#tl5b").show();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
	}else if(firstscore == 20 && secondscore==null || secondscore == 20){
		$("#chapin").attr("checked","checked");
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").show();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").hide();
	}else if(firstscore == 0 && secondscore==null || secondscore == 0){
		$("#zhenpin").attr("checked","checked");
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").show();
		$("#tl8").hide();
		$("#tl9").hide();
	}else if(firstscore == -1 && secondscore==null || secondscore == -1){
		$("#zhuanghe").attr("checked","checked");
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").show();
		$("#tl9").hide();
	}else if(firstscore == -2 && secondscore==null || secondscore == -2){
		$("#buzhuang").attr("checked","checked");
		$("#tl1").hide();
		$("#tl1b").hide();
		$("#tl2").hide();
		$("#tl2b").hide();
		$("#tl3").hide();
		$("#tl3b").hide();
		$("#tl4").hide();
		$("#tl4b").hide();
		$("#tl5").hide();
		$("#tl5b").hide();
		$("#tl6").hide();
		$("#tl7").hide();
		$("#tl8").hide();
		$("#tl9").show();
	}
	GreasondisArr = $(".ratingreasondis").val().split(",");
	$("#ratingTab input").each(function() {
		for ( var i = 0; i < GreasondisArr.length; i++) {
			if ($(this).val() == GreasondisArr[i]) {
				$(this).attr("checked", true);
			}
		}
	});
	$("#ratingTab table tr td input").click(function(){
		var listVal="";
		var listShow="";
		$("#ratingTab input").each(function() {
			if ($(this).attr("checked")) {
				listVal += $(this).val() + ",";
				listShow += $(this).attr("data-value") + ",";
			}
		});
		$(".ratingreasondiss").val(listShow);
		$(".ratingreasondis").val(listVal);
	});
	var entitytype=$("#hidden_entitytype").val();
	if(entitytype==4){
		$(document).attr("title","邮票详情");
	}
});
