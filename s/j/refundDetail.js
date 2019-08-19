/** 进入退款单列表页面时，初始化详细页面的基础信息 */
var getDataURL;// 获取数据的地址
var disposeRefundURL;// 获取数据的地址
var confirmRefundURL;// 获取数据的地址
var cancelRefundURL;// 获取数据的地址
var tmpCurrentStatus;// 当前退款单对应状态
var userId;// 退款单用户编号
var amount;// 退款金额

function setURL(t1URL, t2URL, t3URL, t4URL) {
	getDataURL = t1URL;
	disposeRefundURL = t2URL;
	confirmRefundURL = t3URL;
	cancelRefundURL = t4URL;
};

/*
 * function initRefundDetail(refundNo) {// 防止重复绑定，先取消先前绑定的所有事件
 * $('#detailDispose').die().live("click", function() { disposeDetail(refundNo);
 * }); $('#detailConfirm').die().live("click", function() {
 * confirmDetail(refundNo); }); $('#detailCancel').die().live("click",
 * function() { cancelDetail(refundNo); }); };
 */

/** 查看退款单时，生成对应表格 */
function viewRefundDetail(arrData) {
	tmpCurrentStatus = $(arrData[1]).text();
	initBtn();
	amount = arrData[14];
	userId = $(arrData[13]).text();
	var isHideAmountInfo = (tmpCurrentStatus == 2 || tmpCurrentStatus == 3) ? true
			: false;// 是否隐藏退款前、后金额（当退款单状态为已到账或作废时，不显示退款前、后金额）

	var tmpAmount = Number(arrData[5].replace(',',''));// 用户当前钱包金额
	var tmpAmountRefund = Number(arrData[14].replace(',',''));// 退款金额
	var tmpAmountBeforeRefund = (tmpAmount + tmpAmountRefund).toFixed(2);// 退款前金额
	var tmpAmountAfterRefund = (tmpAmount).toFixed(2);// 退款后金额
	tmpAmountRefund = tmpAmountRefund.toFixed(2);
	jQuery("#refundDetailDiv").append(
			"<table class='tab5'>"
					+ "<tr><th>退款单号</th><td class='bold'>"
					+ arrData[0]
					+ "</td></tr>"
					+ "<tr><th>申请日期</th><td>"
					+ arrData[4]
					+ "</td></tr>"
					+ ((isHideAmountInfo) ? ""
							: ("<tr><th>退款前金额</th><td id='amountBeforeRefund'>"
									+ tmpAmountBeforeRefund + "</td></tr>"))
					+ "<tr><th>退款金额</th><td id='amountRefund'>"
					+ tmpAmountRefund
					+ "</td></tr>"
					+ ((isHideAmountInfo) ? ""
							: ("<tr><th>退款后金额</th><td id='amountAfterRefund'>"
									+ tmpAmountAfterRefund + "</td></tr>"))
					+ "<tr><th>退款方式</th><td>" + arrData[7] + "</td></tr>"
					+ "<tr><th>备注</th><td>" + arrData[8] + "</td></tr>"
					+ "<tr><th>状态</th><td id='currentStatus'>" + arrData[9]
					+ "</td></tr>" + "</table>");

	jQuery("#refundUserDetailDiv").append(
			"<table class='tab5'>" + "<tr><th>会员编号</th><td>" + arrData[2]
					+ "</td></tr>" + "<tr><th>姓名</th><td>" + arrData[3]
					+ "</td></tr>" + "<tr><th>证件</th><td>" + arrData[15]
					+ "</td></tr>" + "<tr><th>手机号码</th><td>" + arrData[17]
					+ "</td></tr>" + "<tr><th>电子邮件</th><td>" + arrData[16]
					+ "</td></tr>" + "<tr></tr>" + "</table>");
};

/** 获取页面需要的后台数据，并刷新页面 */
function refreshPage(refundNo) {
	$.getJSON(getDataURL + "&page=1&rp=1&refundno=" + refundNo, function(msg) {
		if (msg != "") {
			clearBufferData();
			viewRefundDetail(msg.rows[0].cell);
			initBtn();
			$("#flexRefund").flexReload();
		} else {
			alert("有错误发生,msg=" + msg);
		}
	});
}

/** 弹出详细信息处理页面 */
function dealRefund(refundNo) {
	$("html").css("overflow", "hidden");
	clearBufferData();
	// initRefundDetail(refundNo);
	$("#check").dialog({
		title : '退款单详细信息',
		modal : true,
		width : 720,
		height : 550,
		open : function() {
			$(".ui-dialog-titlebar-close", $(this).parent()).hide();
			refreshPage(refundNo);
		},
		buttons : [ {
			text : "处理",
			click : function() {
				disposeDetail(refundNo);
			}
		}, {
			text : "确认",
			click : function() {
				confirmDetail(refundNo);
			}
		}, {
			text : "作废",
			click : function() {
				cancelDetail(refundNo);
			}
		}, {
			text : "关闭",
			click : function() {
				// 恢复窗体滚动
				$("html").css("overflow", "scroll");
				$(this).dialog('close');
				$("#txt_startrow").val(0);
			}
		/*}, {
			text : "刷新",
			click : function() {
				clearBufferData();
				refreshPage(refundNo);
			}*/
		} ],
		close : function() {
		}
	});
};

/** 处理退款单 */
function disposeDetail(refundNo) {
	if (!validate("DISPOSE", tmpCurrentStatus, refundNo)) {
		return;
	}

	$.ajax({
		type : "POST",
		url : disposeRefundURL,
		data : "id=" + refundNo + "&status=" + tmpCurrentStatus,
		dataType : "text",
		success : function(msg) {
			if (msg != "0") {
				alert("成功处理该条记录！");
				refreshPage(refundNo);
			} else {
				alert("有错误发生,msg=" + msg);
			}
		},
		error : function(msg) {
			alert(msg);
		}
	});
};

/** 确认退款单 */
function confirmDetail(refundNo) {
	if (!validate("CONFIRM", tmpCurrentStatus, refundNo)) {
		return;
	}

	$.ajax({
		type : "POST",
		url : confirmRefundURL,
		data : "id=" + refundNo + "&status=" + tmpCurrentStatus,
		dataType : "text",
		success : function(msg) {
			if (msg != "0") {
				alert("成功确认该条记录！");
				refreshPage(refundNo);
			} else {
				alert("有错误发生,msg=" + msg);
			}
		},
		error : function(msg) {
			alert(msg);
		}
	});
};

/** 作废退款单 */
function cancelDetail(refundNo) {
	if (!validate("CANCEL", tmpCurrentStatus, refundNo)) {
		return;
	}

	$.ajax({
		type : "POST",
		url : cancelRefundURL,
		data : "id=" + refundNo + "&status=" + tmpCurrentStatus + "&userids="
				+ userId + "&amounts=" + amount,
		dataType : "text",
		success : function(msg) {
			if (msg != "0") {
				alert("成功作废该条记录！");
				refreshPage(refundNo);
			} else {
				alert("有错误发生,msg=" + msg);
			}
		},
		error : function(msg) {
			alert(msg);
		}
	});
};

/** 校验：退款单状态 */
function validate(type, statusvalue, ids) {
	// 处理时校验
	if (type == "DISPOSE") {
		if (statusvalue == "1") {
			alert("单号：" + ids + " 正在处理的退款不可再处理!");
			return false;
		} else if (statusvalue == "2") {
			alert("单号：" + ids + "已经到账的退款不可再处理!");
			return false;
		} else if (statusvalue == "3") {
			alert("单号：" + ids + "作废的退款记录不可再处理!");
			return false;
		}
	} else if (type == "CONFIRM") {
		if (statusvalue == "0") {
			alert("单号：" + ids + "未处理的退款不可进行确认已到账!");
			return false;
		} else if (statusvalue == "2") {
			alert("单号：" + ids + "已经到账的退款不需再确认!");
			return false;
		} else if (statusvalue == "3") {
			alert("单号：" + ids + "已经作废的退款不能进行确认!");
			return false;
		}
	} else if (type == "CANCEL") {
		if (statusvalue == "3") {
			alert("单号：" + ids + "已经作废的退款不可再作废!");
			return false;
		} else if (statusvalue == "2") {
			alert("单号：" + ids + "已经到账的退款不可作废!");
			return false;
		}
	}
	return true;
};

/** 清空数据容器 */
function clearBufferData() {
	jQuery("#refundUserDetailDiv").html("");
	jQuery("#refundDetailDiv").html("");
};

function closeDialog() {
};

/** 按照当前退款单的状态，设置按钮的状态 */
function initBtn() {
	initBtnEnabled();
	initBtnDisabled();
}

/** 初始化按钮 */
function initBtnEnabled() {
	$("div.ui-dialog button").eq(0).removeAttr('disabled');
	$("div.ui-dialog button").eq(1).removeAttr('disabled');
	$("div.ui-dialog button").eq(2).removeAttr('disabled');
	$('span.ui-button-text').eq(0).removeClass('ui-button-text-disabled');
	$('span.ui-button-text').eq(1).removeClass('ui-button-text-disabled');
	$('span.ui-button-text').eq(2).removeClass('ui-button-text-disabled');
}

/** 设置不合适的按钮的状态为不可用 */
function initBtnDisabled() {
	if (tmpCurrentStatus == 0) {// 未处理状态下，确认按钮不可用
		$("div.ui-dialog button").eq(1).attr('disabled', 'true');
		$('span.ui-button-text').eq(1).addClass('ui-button-text-disabled');
	} else if (tmpCurrentStatus == 1) {// 正在处理状态下，处理按钮不可用
		$("div.ui-dialog button").eq(0).attr('disabled', 'true');
		$('span.ui-button-text').eq(0).addClass('ui-button-text-disabled');
	} else if (tmpCurrentStatus == 2 || tmpCurrentStatus == 3) {// 作废、已到账状态下，处理、确认、作废按钮不可用
		$("div.ui-dialog button").eq(0).attr('disabled', 'true');
		$("div.ui-dialog button").eq(1).attr('disabled', 'true');
		$("div.ui-dialog button").eq(2).attr('disabled', 'true');
		$('span.ui-button-text').eq(0).addClass('ui-button-text-disabled');
		$('span.ui-button-text').eq(1).addClass('ui-button-text-disabled');
		$('span.ui-button-text').eq(2).addClass('ui-button-text-disabled');
	}

};