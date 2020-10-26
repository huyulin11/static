import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { fetchTaskTaikaiJy, deleverTaskTaikaiJy } from '/s/buss/acs/FANCY/j/agv/agv.info.taikaiJy.js';
import { fetchTaskLaoFoxconn, deleverTaskLaoFoxconn } from '/s/buss/acs/FANCY/j/agv/agv.info.laoFoxconn.js';
import { gotoInitLaoDbwy } from '/s/buss/acs/FANCY/j/agv/agv.info.laoDbwy.js';

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

export var getButtonsHtml = (targets) => {
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

var waitHandler = function (that) {
	allDisabled();
	if (!confirm('是否确认执行该操作?')) { return; }
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	if (agvbusstype == 'TON_1') {
		taskexe.addTaskToSite(agvId, "FETCH", 123);
	} else if (agvbusstype == 'TON_2') {
		taskexe.addTaskToSite(agvId, "DELIVER", 12);
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

var deleverInitHandler = function () {
	allDisabled();
	var targets = [];
	for (var i = 3012; i <= 3053; i++) {
		targets.push({ id: i });
	}
	var buttons = getButtonsHtml(targets);
	var indexOfTips = layer.confirm('请选择送料任务的目的地(点击变红色时为选中)' + '<br/>' + buttons, {
		btn: ['确定送料'],
		area: '386px',
		btn1: function () {
			var arr = getTargets();
			if (!arr || arr.length == 0) {
				alert("无有效停车站点");
				return;
			}
			var targetSite = arr.join("#");
			taskexe.addTaskToSite(agvId, "DELIVER", targetSite);
		},
	});
}

var deleverStereotypeHandler = function () {
	allDisabled();
	var task = "DELIVER";
	var indexOfTips = layer.confirm('请选择送料任务的目的地', {
		btn: ['袜机线尾1号-4001', '袜机线尾2号-4002', '袜机线尾3号-4003', '定型1号-2054', '定型2号-2055', '定型3号-2056', '定型4号-2057'],
		btn1: function () { taskexe.addTaskToSite(agvId, task, 4001); },
		btn2: function () { taskexe.addTaskToSite(agvId, task, 4002); },
		btn3: function () { taskexe.addTaskToSite(agvId, task, 4003); },
		btn4: function () { taskexe.addTaskToSite(agvId, task, 2054); },
		btn5: function () { taskexe.addTaskToSite(agvId, task, 2055); },
		btn6: function () { taskexe.addTaskToSite(agvId, task, 2056); },
		btn7: function () { taskexe.addTaskToSite(agvId, task, 2057); }
	});
}

var deleverPackHandler = function () {
	allDisabled();
	var task = "DELIVER";
	var indexOfTips = layer.confirm('请选择送料任务的目的地', {
		btn: ['定型区线尾1号', '定型区线尾2号', '定型区线尾3号', '定型区线尾4号', '包装区1号', '包装区2号', '包装区3号', '包装区4号', '包装区5号', '包装区6号', '包装区7号', '包装区8号', '包装区9号', '包装区10号', '包装区11号'],
		btn1: function () { taskexe.addTaskToSite(agvId, task, 2058); },
		btn2: function () { taskexe.addTaskToSite(agvId, task, 2059); },
		btn3: function () { taskexe.addTaskToSite(agvId, task, 2060); },
		btn4: function () { taskexe.addTaskToSite(agvId, task, 2061); },
		btn5: function () { taskexe.addTaskToSite(agvId, task, 2108); },
		btn6: function () { taskexe.addTaskToSite(agvId, task, 2109); },
		btn7: function () { taskexe.addTaskToSite(agvId, task, 2110); },
		btn8: function () { taskexe.addTaskToSite(agvId, task, 2111); },
		btn9: function () { taskexe.addTaskToSite(agvId, task, 2112); },
		btn10: function () { taskexe.addTaskToSite(agvId, task, 2113); },
		btn11: function () { taskexe.addTaskToSite(agvId, task, 2114); },
		btn12: function () { taskexe.addTaskToSite(agvId, task, 2115); },
		btn13: function () { taskexe.addTaskToSite(agvId, task, 2116); },
		btn14: function () { taskexe.addTaskToSite(agvId, task, 2117); },
		btn15: function () { taskexe.addTaskToSite(agvId, task, 2118); }
	});
}

var gotoStereotypeHandler = function () {
	allDisabled();
	var targets = [];
	for (var i = 2006; i <= 2053; i++) {
		if (i == 2042) continue;
		targets.push({ id: i });
	}
	var buttons = getButtonsHtml(targets);
	var indexOfTips = layer.confirm('请选择前往定型暂存区的目的地' + '<br/>' + buttons, {
		btn: ['确定前往'],
		area: '386px',
		btn1: function () {
			var arr = getTargets();
			if (!arr || arr.length == 0) {
				alert("无有效停车站点");
				return;
			} else if (arr.length > 1) {
				alert("只能选择1个点");
				return;
			}
			var targetSite = arr.join("#");
			taskexe.addTaskToSite(agvId, "DELIVER", targetSite);
		}
	});
}

var gotoPackHandler = function () {
	allDisabled();
	var targets = [];
	for (var i = 2062; i <= 2107; i++) {
		targets.push({ id: i });
	}
	var buttons = getButtonsHtml(targets);
	var indexOfTips = layer.confirm('请选择前往包装暂存区的目的地' + '<br/>' + buttons, {
		btn: ['确定前往'],
		area: '386px',
		btn1: function () {
			var arr = getTargets();
			if (!arr || arr.length == 0) {
				alert("无有效停车站点");
				return;
			} else if (arr.length > 1) {
				alert("只能选择1个点");
				return;
			}
			var targetSite = arr.join("#");
			taskexe.addTaskToSite(agvId, "DELIVER", targetSite);
		}
	});
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

	var initBtns = jQuery.parseJSON(localStorage.agvControl);
	for (var btn of initBtns) {
		if (!btn.hide) {
			$(_target).append(`<td><div><button id='${btn.id}'`
				+ ((btn.color) ? (`data-backcolor='${btn.color}'`) : "")
				+ ((btn.to) ? (`data-to='${btn.to}'`) : "")
				+ `>${btn.name}</button></div></td>`);
		}
	}

	allDisabled();
	gf.resizeTable();
	setInterval(agvinfo, 1500);
}

export { currentTask };