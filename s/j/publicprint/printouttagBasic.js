var iframe;

function getChoosedataUrl(page) {
	return choosedataUrl + "&myaction=choosedata&requestCode="
			+ $("#hidden_requestCode").val() + "&startcoincode="
			+ $("#txt_startCoincode").val() + "&endcoincode="
			+ $("#txt_endCoincode").val() + "&startposition="
			+ $("#hidden_startposition").val() + "&coinnum="
			+ $("#span_nowprintnum").html() + "&nowpage=" + page
			+ "&realEndCoincode=" + $("#hidden_realEndCoincode").val()
			+ "&country=" + $("input[name='language']:checked").val()
			+ "&tagSizeType=" + $("input[name='tagSizeType']:checked").val()
			+ "&billBack=" + $("input[name='billBack']:checked").val()
			+ "&XSeat=" + $("#input-xseat").val().replace('%', '') + "&YSeat="
			+ $("#input-yseat").val().replace('%', '');
}

function getCoinInfoUrlFun() {
	return getCoinInfoUrl + "&myaction=loadingdata&requestCode="
			+ $('#hidden_requestCode').val() + "&country="
			+ $("input[name='language']:checked").val() + "&colNum="
			+ $("#colNum").val() + "&tagSizeType="
			+ $("input[name='tagSizeType']:checked").val() + "&billBack="
			+ $("input[name='billBack']:checked").val();
}

function initPage() {
	$("title").html("外部标签打印--" + $("#hidden_requestCode").val());
	showbkg();
	$("#txt_startCoincode").focus(function() {
		$(this).select();
		$("#span_startCoincode").html("");
		$(this).css("border-color", "#CCC");
	}).blur(function() {
		checkstartcoincode();
	});
	$("#txt_endCoincode").focus(function() {
		$(this).select();
		$("#span_endCoincode").html("");
		$(this).css("border-color", "#CCC");
	}).blur(function() {
		checkendcoincode();
	});
	$("#txt_startposition").focus(function() {
		$(this).select();
		$("#span_startposition").html("");
		$(this).css("border-color", "#CCC");
	}).blur(function() {
		checkstartposition();
	});
	$("#btn_cancel").click(function() {
		window.close();
	});
	$("#btn_defineprint").click(function() {
		hidebkg();
		iframe.contentWindow.close();
		iframe.contentWindow.focus();
		iframe.contentWindow.print();
		showbkg();
	});
	$("#btn_definposition").click(
			function() {
				if (checkstartcoincode() && checkendcoincode()
						&& checkstartposition()) {
					var url = getChoosedataUrl($("#span_nowpage").text());
					window.location.href = url;
				}
			});
	$("#checkbox_showbkg").change(function() {
		if ($(this).attr("checked")) {
			showbkg();
		} else {
			hidebkg();
		}
	});
	$("#isFirstIssue").change(function() {
		isFirstIssue();
	});
	$("#firstIssueValue").live("blur", function() {
		isFirstIssue();
	});
	$("#a_lastpage").click(
			function() {
				if (checkstartcoincode() && checkendcoincode()
						&& checkstartposition()) {
					var lastpage = $("#span_nowpage").text() * 1 - 1;
					if (lastpage >= 1) {
						var url = getChoosedataUrl(lastpage);
						window.location.href = url;
					} else {
						alert("已经是第一页了");
					}
				}
			});
	$("#a_nextpage").click(
			function() {
				if (checkstartcoincode() && checkendcoincode()
						&& checkstartposition()) {
					var nextpage = $("#span_nowpage").text() * 1 + 1;
					if (nextpage <= $("#span_pagecount").text() * 1) {
						var url = getChoosedataUrl(nextpage);
						window.location.href = url;
					} else {
						alert("已经是最后一页了");
					}
				}
			});
	$("#a_gopage").click(
			function() {
				if (checkstartcoincode() && checkendcoincode()
						&& checkstartposition()) {
					var gopage = $("#txt_gopage").val() * 1;
					if (gopage <= $("#span_pagecount").text() * 1
							&& gopage >= 1) {
						var url = getChoosedataUrl(gopage);
						window.location.href = url;
					} else {
						alert("此页不存在！");
					}
				}
			});

	$("input[name='language']").change(function() {
		window.location.href = getCoinInfoUrlFun();
	});

	$("input[name='tagSizeType']").change(function() {
		window.location.href = getCoinInfoUrlFun();
	});

	$("input[name='billBack']").change(function() {
		window.location.href = getCoinInfoUrlFun();
	});

	$("#a-x-subtract").click(
			function() {
				var dobxseat = parseFloat(
						$("#input-xseat").val().substring(0,
								$("#input-xseat").val().indexOf("%")) * 1)
						.toFixed(2);
				dobxseat = dobxseat * 1 - 0.02;
				$("#input-xseat")
						.val(parseFloat(dobxseat * 1).toFixed(2) + "%");
				$("#input-xseat").css("border", "red solid 1px");
			});
	$("#a-x-add").click(
			function() {
				var dobxseat = parseFloat(
						$("#input-xseat").val().substring(0,
								$("#input-xseat").val().indexOf("%")) * 1)
						.toFixed(2);
				dobxseat = dobxseat * 1 + 0.02;
				$("#input-xseat")
						.val(parseFloat(dobxseat * 1).toFixed(2) + "%");
				$("#input-xseat").css("border", "red solid 1px");
			});

	$("#a-y-subtract").click(
			function() {
				var dobyseat = parseFloat(
						$("#input-yseat").val().substring(0,
								$("#input-yseat").val().indexOf("%")) * 1)
						.toFixed(2);
				dobyseat = dobyseat * 1 - 0.02;
				$("#input-yseat")
						.val(parseFloat(dobyseat * 1).toFixed(2) + "%");
				$("#input-yseat").css("border", "red solid 1px");
			});
	$("#a-y-add").click(
			function() {
				var dobyseat = parseFloat(
						$("#input-yseat").val().substring(0,
								$("#input-yseat").val().indexOf("%")) * 1)
						.toFixed(2);
				dobyseat = dobyseat * 1 + 0.02;
				$("#input-yseat")
						.val(parseFloat(dobyseat * 1).toFixed(2) + "%");
				$("#input-yseat").css("border", "red solid 1px");
			});
	var cssYSeat = $("#input-yseat").val() + " auto 0 "
			+ $("#input-xseat").val();
	$("#tab_printlist").css({
		"margin" : cssYSeat
	});
	$("#a_friendlytip").click(function() {
		$("#div_friendlytip").hide();
		$("#div_tipcontext").show(100);
	});
	$("#span_close").click(function() {
		$("#div_friendlytip").show();
		$("#div_tipcontext").hide(100);
	});
	$("#a_tag_pos_set").click(function() {
		$("#div_tag_pos_set").hide();
		$("#div_tag_pos_do").show(100);
	});
	$("#span_close_pos_set").click(function() {
		$("#div_tag_pos_set").show();
		$("#div_tag_pos_do").hide(100);
	});
	$(".td_with_tag_odd").click(function() {
		$("#div_tag_pos_set").hide();
		$("#div_tag_pos_do").show(100);
	});
	reloadPrintDiv();
}

function reloadPrintDiv() {
	hidebkg();
	iframe = $("#div_cointag").printReady();
	showbkg();
}

function showbkg() {
	try {
		showWhenNotPrint();// 写在各实体自身JS中
	} catch (e) {
	}
	showbkgBorder();
	$(".tr_bkg").show();
	$(".td_none_bkg_index").show();
	$(".td_none_bkg_head").show();
	$(".td_none_bkg_tag").removeClass("td_none_bkg_tag_print").addClass(
			"td_none_bkg_tag_no_print");
	$(".td_none_bkg_tag span").each(function() {
		$(this).show();
	});
}

function hidebkg() {
	try {
		hideWhenPrint();// 写在各实体自身JS中
	} catch (e) {
	}
	hidebkgBorder();
	$(".tr_bkg").hide();
	$(".td_none_bkg_index").hide();
	$(".td_none_bkg_head").hide();
	$(".td_none_bkg_tag").addClass("td_none_bkg_tag_print").removeClass(
			"td_none_bkg_tag_no_print");
	$(".td_none_bkg_tag span").each(function() {
		$(this).hide();
	});
}
function isFirstIssue(flag) {
	var isFirstIssue = $("#isFirstIssue").attr("checked");
	var firstContent = $("#firstIssueValue").val();
	if (isFirstIssue) {
		$(".td_tag_isfirstissue span").html(firstContent).show();
	} else {
		$(".td_tag_isfirstissue span").html("").hide();
	}
	reloadPrintDiv();
}
function showbkgBorder() {
	$(".td_none_bkg_index").removeClass("table_white_border").addClass(
			"table_gray_border");
	$(".td_none_bkg_head").removeClass("table_white_border").addClass(
			"table_gray_border");
	$(".td_none_bkg_tag").removeClass("table_white_border").addClass(
			"table_gray_border");
	$(".tab_printlist").removeClass("table_white_border").addClass(
			"table_gray_border");
	$(".td_bkg_letter").removeClass("table_white_border").addClass(
			"table_gray_border");
	$(".td_with_tag_odd").removeClass("table_white_border").addClass(
			"table_gray_border");
	$(".td_with_tag_even").removeClass("table_white_border").addClass(
			"table_gray_border");
	$(".td_with_tag").removeClass("table_white_border").addClass(
			"table_gray_border");
}

function hidebkgBorder() {
	$(".td_none_bkg_index").removeClass("table_gray_border").addClass(
			"table_white_border");
	$(".td_none_bkg_head").removeClass("table_gray_border").addClass(
			"table_white_border");
	$(".td_none_bkg_tag").removeClass("table_gray_border").addClass(
			"table_white_border");
	$(".tab_printlist").removeClass("table_gray_border").addClass(
			"table_white_border");
	$(".td_bkg_letter").removeClass("table_gray_border").addClass(
			"table_white_border");
	$(".td_with_tag_odd").removeClass("table_gray_border").addClass(
			"table_white_border");
	$(".td_with_tag_even").removeClass("table_gray_border").addClass(
			"table_white_border");
	$(".td_with_tag").removeClass("table_gray_border").addClass(
			"table_white_border");
}

function clickTag(flag, pos) {
	$("#tagid").val(flag);
	$("#tagidpos").val(pos);
}

function changePosTagId(tagId, position, type) {
	var nowPosition = $(".td_with_tag_even .table_with_tag:gt(2)").css(
			"margin-left");
	var nextPosition;
	if (type == "ADD") {
		nextPosition = (parseInt(nowPosition) + parseInt(position)) + "px";
	} else {
		nextPosition = (parseInt(nowPosition) - parseInt(position)) + "px";
	}
	$(".td_with_tag_even .table_with_tag:eq(2)").css("margin-left",
			nextPosition);
	reloadPrintDiv();
}

$(initPage);
