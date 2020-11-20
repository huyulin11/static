import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { fetchTaskTaikaiJy, deleverTaskTaikaiJy, waitHandler } from '/s/buss/acs/FANCY/j/agv/agv.info.taikaiJy.js';
import { fetchTaskLaoFoxconn, deleverTaskLaoFoxconn } from '/s/buss/acs/FANCY/j/agv/agv.info.laoFoxconn.js';
import { gotoInitLaoDbwy, deleverInitHandler, deleverStereotypeHandler, deleverPackHandler, gotoStereotypeHandler, gotoPackHandler } from '/s/buss/acs/FANCY/j/agv/agv.info.laoDbwy.js';
import { initBtns } from '/s/buss/acs/FANCY/j/agv/agv.info.conf.js';

var agvId = currentAgvId;
var currentTask = new Array();
var _target;

var getTargets = function () {
	var arr = [];
	$("div#targets button.choosed").each(function () {
		var id = $(this).data("id");
		arr.push(id);
	});
	return arr;
}

export var bindSites = (targets) => {
	var index = 1;
	var numInLine = 7;
	if (localStorage.projectKey == 'TAIKAI_JY')
		numInLine = 6;
	var tmpStr = "";
	var buttons = ``;
	for (var target of targets) {
		var tmpItemStr;
		if (typeof (target) == "number" || typeof (target) == "string") {
			tmpItemStr = `<td><button data-id='${target}'>${target}</button></td>`;
		} else {
			if (target.name)
				tmpItemStr = `<td><button id=button data-id='${target.id}'>${target.name}-${target.id}</button></td>`;
			else
				tmpItemStr = `<td><button id=button data-id='${target.id}'>${target.id}</button></td>`;
		}
		tmpStr = tmpStr + tmpItemStr;
		if (index >= numInLine) {
			buttons = `${buttons}<tr>${tmpStr}</tr>`;
			index = 1;
			tmpStr = "";
		} else {
			index++;
		}
	}
	if (tmpStr) {
		buttons = `${buttons}<tr>${tmpStr}</tr>`;
	}
	var rtn = `<div id='targets'><table>${buttons}</table></div>`;
	return rtn;
}

var agvinfo = function () {
	jQuery.ajax({
		url: "/s/jsons/" + localStorage.projectKey + "/agv/agvInfo" + agvId + ".json",
		type: "GET",
		dataType: "json",
		cache: false,
		success: refresh,
		complete: function (data) {
			let name = findIotInfo(agvId, "name");
			$("#title").html(name + "控制");
			$(".black_overlay").hide();
		},
		error: function (e) { console.log(e); },
		timeout: 5000
	});
}

export var allDisabled = function () {
	$(_target).find("button").attr("disabled", "true").css("background-color", "");
	$(".taskTr button").attr("disabled", "true");
}

var refresh = function (data) {
	allDisabled();
	var agvInfo, systemMsg, lastOverTask, latestCommand, systemWarning;

	agvInfo = data.agvInfo;
	if (!agvInfo) { return; }
	currentTask = data.currentTask;

	systemWarning = data.systemWarning;
	latestCommand = data.latestCommand;

	if (systemWarning) {
		$("#warning").html(systemWarning);
	}
	auth(agvInfo);
}

var auth = (agvInfo) => {
	const { movestatus, sitestatus, taskstatus } = agvInfo;
	allDisabled();
	if (movestatus == "PAUSE_USER" || movestatus == "PAUSE_SYS" || movestatus == "PAUSE_SELF"
		|| movestatus == "PAUSE_OUT_ERR" || movestatus == "PAUSE_REPATH_ERR"
		|| movestatus == "PAUSE_CACHE_ERR") {
		$(_target).find("button#CONTINUE").removeAttr("disabled");
		$(_target).find("button#CONFIRM").removeAttr("disabled");
		$(_target).find("button#GOTO_INIT").removeAttr("disabled");
		$(_target).find("button#RE_PATH").removeAttr("disabled");
	} else {
		$(_target).find("button#PAUSE_USER").removeAttr("disabled");
		if (sitestatus == "INIT" && taskstatus == "FREE") {
			$(_target).find("button#GOTO_CHARGE").removeAttr("disabled");
			$(_target).find("button#TRANSPORT").removeAttr("disabled");
			$(_target).find("button#DELIVER").removeAttr("disabled");
			$(_target).find("button#DELIVER_INIT").removeAttr("disabled");
			$(_target).find("button#DELIVER_STEREOTYPE").removeAttr("disabled");
			$(_target).find("button#DELIVER_PACK").removeAttr("disabled");
			$(_target).find("button#GOTO_STEREOTYPE").removeAttr("disabled");
			$(_target).find("button#GOTO_PACK").removeAttr("disabled");
			$(_target).find("button#FETCH").removeAttr("disabled");
			$(_target).find("button#WAIT").removeAttr("disabled");
		}
		if (sitestatus == "CHARGING" && taskstatus == "GOTO_CHARGE") {
			$(_target).find("button#BACK_CHARGE").removeAttr("disabled");
		}
	}
	$(_target).find("button#CONFIRM").removeAttr("disabled");
	$(_target).find("button#GOTO_INIT").removeAttr("disabled");
	$(_target).find("button#RE_PATH").removeAttr("disabled");
	$(_target).find("button#SHUTDOWN").removeAttr("disabled");
	$(_target).find("button:enabled").each(function () {
		const backcolor = $(this).data("backcolor");
		if (backcolor) {
			$(this).css("background-color", backcolor);
		}
	});
}

var transportHandler = function (that) {
	allDisabled();
	if (!confirm('是否确认执行该操作?')) { return; }
	var targetSite = prompt("请输入有效的目标站点编号！");
	taskexe.addTaskToSite(agvId, $(that).attr("id"), targetSite);
}

var fetchHandler = function (that) {
	allDisabled();
	if (localStorage.projectKey == 'TAIKAI_JY') {
		fetchTaskTaikaiJy(that);
	} else if (localStorage.projectKey == 'LAO_FOXCONN') {
		fetchTaskLaoFoxconn(that);
	}
}

var deliverHandler = function (that) {
	allDisabled();
	if (localStorage.projectKey == 'TAIKAI_JY') {
		deleverTaskTaikaiJy();
	} else if (localStorage.projectKey == 'LAO_FOXCONN') {
		deleverTaskLaoFoxconn(that);
	}
}

var gotoInitHandler = function (that) {
	allDisabled();
	if (localStorage.projectKey == 'LAO_DBWY') {
		gotoInitLaoDbwy(that);
	} else {
		if (!confirm('是否确认执行该操作?')) { return; }
		taskexe.addCtrlTask(agvId, $(that).attr("id"));
	}
}

export var init = function (target) {
	_target = target;
	$("html").delegate("div[id='targets'] button", "click", function () {
		var that = this;
		if ($(that).hasClass("choosed")) {
			$(that).removeClass("choosed");
		} else {
			$(that).addClass("choosed");
		}
	});

	let items = [
		{ id: 'TRANSPORT', handler: function () { transportHandler(this); } },
		{ id: 'DELIVER', handler: function () { deliverHandler(this); } },
		{ id: 'FETCH', handler: function () { fetchHandler(this); } },
		{ id: 'DELIVER_INIT', handler: function () { deleverInitHandler(); } },
		{ id: 'DELIVER_STEREOTYPE', handler: function () { deleverStereotypeHandler(); } },
		{ id: 'DELIVER_PACK', handler: function () { deleverPackHandler(); } },
		{ id: 'WAIT', handler: function () { waitHandler(this); } },
		{ id: 'GOTO_INIT', handler: function () { gotoInitHandler(this); } },
		{ id: 'GOTO_STEREOTYPE', handler: function () { gotoStereotypeHandler(); } },
		{ id: 'GOTO_PACK', handler: function () { gotoPackHandler(); } },
	];

	let especial = "";
	for (let item of items) {
		$(_target).delegate(`button[id='${item.id}']`, "click", function () {
			item.handler();
		});
		especial += `[id!='${item.id}']`;
	}

	$(_target).delegate("button" + especial, "click", function () {
		allDisabled();
		if (!confirm('是否确认执行该操作?')) { return; }
		taskexe.addCtrlTask(agvId, $(this).attr("id"));
	});

	gfbtn.renderBtnsTable({ values: initBtns, numInLine: 4 }, function (btns) {
		$(_target).append(btns);
	});

	allDisabled();
	gf.resizeTable();
	setInterval(agvinfo, 1500);
}

export { currentTask };