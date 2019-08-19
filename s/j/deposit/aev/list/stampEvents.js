$(function() {
	
	if ($.browser.msie) {
		alert("强烈建议您：不要使用IE浏览器进行申请单的相关操作！");
	}
	
	var showCoinDetailFun = function(dataSrc) {
		var crtRow = $(dataSrc).parents("tr");
		var coinid = "";
		var hearStr = "";
		if ($("#tab4 tr:gt(0)").length == 0) {
			return false;
		} else if (crtRow.length == 0) {
			hearStr = "全部明细";
			$("#tab4 tr:gt(0)").chooseBackColor("bluebackground");
		} else {
			crtRow.parents("table").find("tr")
					.chooseBackColor("graybackground");
			crtRow.chooseBackColor("bluebackground");
			coinid = crtRow.find("td input[name*='coinid']").val();
			hearStr = "行号：" + crtRow.find("td:first").html() + "，名称："
					+ crtRow.find("td.fullsubject").html() + "";
		}
		$("#tabDetailHead tr th").html(hearStr);
		$("#tabDetail").find("tr:gt(0)").each(function() {
			if (coinid == "") {
				$(this).removeClass("hiddenThis");
			} else {
				if (coinid == $(this).find("td input[name*='.coinid']").val()) {
					$(this).removeClass("hiddenThis");
				} else {
					$(this).addClass("hiddenThis");
				}
			}
		});
		//$("#tab4 select[name*='stampjointype']").trigger("change");
		return true;
	};

	$("#tab4 tr:gt(0) td .coinDetail, #allDetail a").initTips({
		showType : "click",
		posType : "absolute",
		timeoutTime : 200,
		targetLabel : "#detailStampInfoTab",
		initDataFun : showCoinDetailFun
	});

	$("#tabDetail tr:gt(0) td").find("select[name*='coinboxid']," 
			+ "input[name*='coinevaluate']").live("change",function() {
		var coinid = $(this).parents("tr")
				.find("input[name*='coinid']").val();
		$("#tab4 tr:gt(0)").each(function() {
			if (coinid == $(this).find("input[name*='coinid']").val()) {
				getCostOfStamp($(this));
			}
		});
	});

	var saveCoinmottoSelectFun = function(dataSrc) {
		if ($(dataSrc).parents("tr").find("td.rowId").html() != $(
				"#coinmottolist").attr("data-crtrow")) {
			return;
		}
		$("#tabDetail tr:gt(0) td textarea[name*='coinmottoShow']").each(function() {
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
		$(dataSrc).parents("td").find("input[name*='.coinmotto']").val(listVal);
		$(dataSrc).val(listShow);
	};

	var showCoinmottoSelectFun = function(dataSrc) {
		$("#tmpcoinmottolist input[name='tmpcoinmotto']")
				.attr("checked", false);
		$("#coinmottolist").attr("data-crtrow",
				$(dataSrc).parents("tr").find("td.rowId").html());
		var mottoArr = [];
		mottoArr = $(dataSrc).parents("td").find("input[name*='.coinmotto']")
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

	$("#tabDetail tr:gt(0) td textarea[name*='coinmottoShow']").initTips({
		showType : "click",
		pointX : -1,
		pointY : -1,
		posType : "relative",
		timeoutTime : 20,
		father : "#tabDetail",
		closeEvent : function(dataSrc, options, timeid) {
			$("#detailInfo,#tabDetailHead").live("click", function(ev) {
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

	var stampjointypeChange = function(obj) {
		var crtrow = $(obj).parents("tr");
		var coinid = crtrow.find("td input[name*='coinid']").val();
		var optStr = $(obj).find("option:selected").text();
		var stampjointypeId = $(obj).val();
		var cntNum = "×" + crtrow.find("td#issuingquantity").text();
		if (stampjointypeId == 101) {
			cntNum = "1" + cntNum;
		} else if (stampjointypeId == 102) {
			cntNum = "2" + cntNum;
		} else if (stampjointypeId == 103) {
			cntNum = "4" + cntNum;
		} else if (stampjointypeId == 104) {
			cntNum = "8" + cntNum;
		} else if (stampjointypeId == 105) {
			cntNum = "9" + cntNum;
		} else if (stampjointypeId == 106) {
			cntNum = "0" + cntNum;
		} else if (stampjointypeId == 107) {
			cntNum = "1" + cntNum;
		} else {
			cntNum = stampjointypeId + cntNum;
		}
		$("#tabDetail").find("tr:gt(0)").each(function() {
			if (coinid == $(this).find("td input[name*='.coinid']").val()) {
				$(this).find("td.stampjointype").html(optStr);
				$(this).find("td input[name*='coinnum']").val(cntNum);
			}
		});
	};

	$("#tab4 select[name*='stampjointype']").live("change", function() {
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
		stampjointypeChange(this);
	});

	$("#stampjointypeN").live("blur",function() {
		var crtrowId = $(this).attr("data-crtrow");
		var crtSlt = null;
		var crtInputVal = $(this).val();
		$("#tab4").find("td.rowId").each(
				function() {
					if ($(this).html() == crtrowId) {
						crtSlt = $(this).parents("tr").find(
								"select[name*='stampjointype']");
						return false;
					}
				});
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
		stampjointypeChange(crtSlt);
	});

});
