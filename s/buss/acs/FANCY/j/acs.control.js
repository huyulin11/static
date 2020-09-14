import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";

let checkLoginError = false;
if (localStorage.projectKey == 'YZBD_NRDW') { checkLoginError = true; }

let renderModel = (key, target) => {
	let style = $(`<style id='${key}HideDiv_style'></style>`);
	$(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}Close.png);}`)
		.append(`#${key}HideDiv.open {background-image: url(/s//i/icon/${key}Open.png);}`);
	$("head").append(style);
	$("#topCtrlContainer").prepend(`<div id='${key}HideDiv' class='close hideToggle' data-target='${target}'></div>`);
}

let renderLink = (key, url) => {
	let style = $(`<style id='${key}HideDiv_style'></style>`);
	$(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}.png);}`);
	$("head").append(style);
	$("#topCtrlContainer").prepend(`<div id='${key}HideDiv' class='close hideToggle' data-url='${url}'></div>`);
}

let taskReady = () => {
	let taskContainer = $(`<div id="taskContainer" class="fixed"></div>`);
	$(taskContainer).append("<iframe id='taskFrame'></iframe>");
	let url = "/s/buss/sys/conf/h/agv.cache.html";
	$(taskContainer).find("iframe#taskFrame").css("height", "500px").css("width", "500px").attr("src", url);
	$("body").append(taskContainer);
}

var container = function () {
	if ($("#allCtrlTable").length == 0) {
		$("#controlContainer").append("<div><table id='allCtrlTable' class='task'></table></div>");
		renderModel('agvs', 'div#agvDiv');
		if (![''].includes(localStorage.projectKey))
			renderModel('setup', 'div#controlContainer');
		if (localStorage.projectKey == 'LAO_FOXCONN') {
			renderModel('lift', 'div#liftContainer');
			renderModel('door', 'div#autodoorContainer');
		} else if (localStorage.projectKey == 'TAIKAI_JY') {
		} else if (localStorage.projectKey == 'CSY_DAJ') {
			renderModel('charge', 'div#chargeContainer');
			renderModel('windowCenter', 'div#windowCenterContainer');
			renderModel('window', 'div#windowContainer');
			renderModel('wms', 'div#wmsContainer');
		} else if (localStorage.projectKey == 'CSY_CDBP') {
			taskReady();
			renderModel('task', 'div#taskContainer');
		} else if (localStorage.projectKey == 'HONGFU_ZHENMU') {
		} else if (localStorage.projectKey == 'YZBD_NRDW') {
			renderModel('tongji', 'div#tongjiContainer');
			renderModel('search', 'div#searchContainer');
			renderModel('shipment', 'div#shipmentContainer');
			renderModel('receipt', 'div#receiptContainer');
			renderLink('manager', '/s/buss/g/h/manager.html');
		} else if (localStorage.projectKey == 'YZBD_QSKJ') {
			taskReady();
			renderModel('task', 'div#taskContainer');
		}
	}
	return $("#allCtrlTable");
}

var init = function () {
	var initBtns = jQuery.parseJSON(localStorage.acsControl);
	for (var btn of initBtns) {
		if (!btn.hide)
			container().append("<tr><td><div><button id='" + btn.id + "'>" + btn.name + "</button></div></td></tr>");
	}
	delegateEvent();

	var showCtrl = function (that) {
		var thatTarget = $(that).data("target");
		$(thatTarget).show(100);
		$(that).removeClass("close");
		$(that).addClass("open");
	}

	var hideCtrl = function (that) {
		var thatTarget = $(that).data("target");
		$(thatTarget).hide(100);
		$(that).removeClass("open");
		$(that).addClass("close");
	}

	var hideAllCtrl = function (thatTarget) {
		$("#topCtrlContainer").find("div.hideToggle").each(function () {
			var target = $(this).data("target");
			if (target && target != thatTarget) {
				hideCtrl(this);
			}
		});
	}

	$("#topCtrlContainer").delegate("div.hideToggle", "click", function () {
		if (checkLoginError) {
			gf.checkLoginError();
		}
		var target = $(this).data("target");
		if (target) {
			hideAllCtrl(target);
			if ($(this).hasClass("open")) {
				hideCtrl(this);
			} else {
				showCtrl(this);
			}
		} else {
			var url = $(this).data("url");
			if (url) { window.open(url, "_self"); }
		}
	});
}

let doCtrlTask = (that, tips, opType) => {
	var open = $(that).data("open");
	if (open) {
		tips = '是否确定关闭' + tips + '？';
		opType = "stop" + opType;
	} else {
		tips = '是否确定开启' + tips + '？';
		opType = "open" + opType;
	}
	if (window.confirm(tips)) {
		taskexe.addCtrlTask(0, opType);
	}
}

var delegateEvent = () => {
	container().delegate("button#togglePiBtn", "click", function () {
		var tips = "交通管制";
		var opType = "PI";
		doCtrlTask(this, tips, opType);
	});
	container().delegate("button#autoChargeBtn", "click", function () {
		var tips = "自动充电功能";
		var opType = "AutoCharge";
		doCtrlTask(this, tips, opType);
	});
	container().delegate("button#errBackBtn", "click", function () {
		var tips = "脱轨重新规划功能";
		var opType = "ErrBack";
		doCtrlTask(this, tips, opType);
	});
	container().delegate("button#autoTaskBtn", "click", function () {
		var tips = "自动任务功能";
		var opType = "AutoTask";
		doCtrlTask(this, tips, opType);
	});
	container().delegate("button#udfConfirmBtn", "click", function () {
		var tips = "确认信号";
		var opType = "UdfConfirm";
		doCtrlTask(this, tips, opType);
	});
	container().delegate("button#PAUSE_USER", "click", function () {
		taskexe.addCtrlTask(0, "PAUSE_USER");
	});
	container().delegate("button#manager", "click", function () {
		window.open('/s/buss/g/h/manager.html');
	});
	container().delegate("button#CONTINUE", "click", function () {
		taskexe.addCtrlTask(0, "CONTINUE");
	});
	container().delegate("button#sysLocation", "click", function () {
		window.open("/s/buss/acs/location/" + localStorage.projectKey + "/location.html");
	});
	container().delegate("button#taskQuantityBtn", "click", function () {
		window.open("/s/buss/acs/" + localStorage.projectKey + "/h/task.quantity.html");
	});
	container().delegate("button#callFromLathe", "click", function () {
		layer.prompt({ title: '输入磨床号码（1、2、3、4）', formType: 0 }, function (key, index) {
			if (!["1", "2", "3", "4"].includes(key)) {
				layer.msg("错误的磨床编号！");
				return;
			}
			layer.close(index);
			if (window.confirm(`确定呼叫AGV？磨床编号：${key}`)) {
				taskexe.addCtrlTask(0, "UDF_COMMAND", key);
			}
		});
	});
}

export var renderCtrlBtns = (value) => {
	let htmlPiece = (v) => {
		return "<br/>" + "<span style='color:" +
			(v ? "yellow" : "pink") + "'>" +
			(v ? "已开启" : "已关闭") + "</span>-" +
			(v ? "点击关闭" : "点击开启");
	}
	$("button#togglePiBtn").data("open", value.isOpenPi).html("交通管制" + htmlPiece(value.isOpenPi));
	$("button#autoTaskBtn").data('open', value.isAutoTask).html("自动任务" + htmlPiece(value.isAutoTask));
	$("button#udfConfirmBtn").data('open', value.isUdfConfirm).html("用户确认" + htmlPiece(value.isUdfConfirm));
	$("button#autoChargeBtn").data('open', value.isAutoCharge).html("自动充电" + htmlPiece(value.isAutoCharge));
	$("button#errBackBtn").data('open', value.isErrBack).html("脱轨重新规划" + htmlPiece(value.isErrBack));
}

init();