import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";

let renderModel = (key, target) => {
	let style = $(`<style id='${key}HideDiv_style'></style>`);
	$(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}Close.png);}`)
		.append(`#${key}HideDiv.open {background-image: url(/s//i/icon/${key}Open.png);}`);
	$("head").append(style);
	$("#topCtrlContainer").prepend(`<div id='${key}HideDiv' class='close hideToggle' data-target='${target}'></div>`);
}

var container = function () {
	if ($("#allCtrlTable").length == 0) {
		$("#controlContainer").append("<fieldset><legend>综合控制</legend><div><table id='allCtrlTable' class='task'></table></div></fieldset>");
		renderModel('agvs', 'div#agvDiv');
		renderModel('setup', 'div#controlContainer');
		if (localStorage.projectKey == 'LAO_FOXCONN') {
			renderModel('lift', 'div#liftContainer');
			renderModel('door', 'div#autodoorContainer');
		} else if (localStorage.projectKey == 'TAIKAI_JY') {
		} else if (localStorage.projectKey == 'CSY_DAJ') {
			renderModel('charge', 'div#chargeContainer');
			renderModel('windowCenter', 'div#windowContainer');
			renderModel('window', 'div#windowContainer');
			renderModel('wms', 'div#wmsContainer');
		} else if (localStorage.projectKey == 'CSY_CDBP') {
		} else if (localStorage.projectKey == 'HONGFU_ZHENMU') {
		} else if (localStorage.projectKey == 'YZBD_NRDW') {
			renderModel('tongji', 'div#tongjiContainer');
			renderModel('search', 'div#searchContainer');
			renderModel('shipment', 'div#shipmentContainer');
			renderModel('receipt', 'div#receiptContainer');
		}
	}
	return $("#allCtrlTable");
}

var init = function () {
	var initBtns = jQuery.parseJSON(localStorage.acsControl);
	for (var btn of initBtns) {
		container().append("<tr><td><div><button id='" + btn.id + "'>" + btn.name + "</button></div></td></tr>");
	}
	container().delegate("button#PAUSE_USER", "click", function () {
		alert(taskexe.addCtrlTask(0, "PAUSE_USER"));
	});
	container().delegate("button#manager", "click", function () {
		window.open('/s/buss/g/h/manager.html');
	});
	container().delegate("button#CONTINUE", "click", function () {
		alert(taskexe.addCtrlTask(0, "CONTINUE"));
	});

	container().delegate("button#togglePiBtn", "click", function () {
		var open = $(this).data("open");
		var tips = "";
		var opType = "";
		if (open) {
			tips = '是否确定关闭交通管制？';
			opType = "stopPI";
		} else {
			tips = '是否确定开启交通管制？';
			opType = "openPI";
		}
		if (window.confirm(tips)) {
			alert(taskexe.addCtrlTask(0, opType));
		}
	});

	container().delegate("button#autoChargeBtn", "click", function () {
		var open = $(this).data("open");
		var tips = "";
		var opType = "";
		if (open) {
			tips = '是否确定关闭自动充电功能？';
			opType = "stopAutoCharge";
		} else {
			tips = '是否确定开启自动充电功能？';
			opType = "openAutoCharge";
		}
		if (window.confirm(tips)) {
			alert(taskexe.addCtrlTask(0, opType));
		}
	});

	container().delegate("button#errBackBtn", "click", function () {
		var open = $(this).data("open");
		var tips = "";
		var opType = "";
		if (open) {
			tips = '是否确定关闭脱轨重新规划功能？';
			opType = "stopErrBack";
		} else {
			tips = '是否确定开启脱轨重新规划功能？';
			opType = "openErrBack";
		}
		if (window.confirm(tips)) {
			alert(taskexe.addCtrlTask(0, opType));
		}
	});

	container().delegate("button#autoTaskBtn", "click", function () {
		var open = $(this).data("open");
		var tips = "";
		var opType = "";
		if (open) {
			tips = '是否确定关闭自动任务功能？';
			opType = "stopAutoTask";
		} else {
			tips = '是否确定开启自动任务功能？';
			opType = "openAutoTask";
		}
		if (window.confirm(tips)) {
			alert(taskexe.addCtrlTask(0, opType));
		}
	});

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
			if (target != thatTarget) {
				hideCtrl(this);
			}
		});
	}

	$("#topCtrlContainer").delegate("div.hideToggle", "click", function () {
		hideAllCtrl($(this).data("target"));
		if ($(this).hasClass("open")) {
			hideCtrl(this);
		} else {
			showCtrl(this);
		}
	});

	container().delegate("button#sysLocation", "click", function () {
		window.open("/s/buss/acs/location/" + localStorage.projectKey + "/location.html");
	});

	container().delegate("button#taskQuantityBtn", "click", function () {
		window.open("/s/buss/acs/" + localStorage.projectKey + "/h/task.quantity.html");
	});

	// if (localStorage.projectKey == "YZBD_NRDW") {
	// 	var height = $(window).height();
	// 	$("iframe#canvas").css("height", height).css("width", "100%").css("scrollbar", "false");
	// }

	// var agvsHideDivTipsTimes = localStorage.agvsHideDivTipsTimes;
	// if (!agvsHideDivTipsTimes || agvsHideDivTipsTimes == 'NaN') {
	// 	layer.tips('从此处切换AGV视图或查看所有AGV状态', '#agvsHideDiv', {
	// 		tips: [1, '#3595CC'],
	// 		time: 4000
	// 	});
	// 	localStorage.setItem("agvsHideDivTipsTimes", 1);
	// } else if (agvsHideDivTipsTimes < 10) {
	// 	layer.tips('从此处切换AGV视图或查看所有AGV状态', '#agvsHideDiv', {
	// 		tips: [1, '#3595CC'],
	// 		time: 4000
	// 	});
	// 	localStorage.setItem("agvsHideDivTipsTimes", 1 + parseInt(localStorage.agvsHideDivTipsTimes));
	// }
	//$("div#robotic").load("/s/buss/acs/h/lap.html");


	//js原生监听 滚动事件的---因为项目框架和jquery不兼容
	// var p = 0;
	// window.onscroll = function (e) {
	// 	var t = p;
	// 	p = $(this).scrollTop();
	// 	if (p < t) {
	// 		$("#topCtrlContainer").slideUp(300);
	// 	} else if (p > t) {
	// 		$("#topCtrlContainer").slideDown(300);
	// 	}
	// }
}

init();