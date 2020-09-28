import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";

var agvId = currentAgvId;

var currentTask = new Array();

var _target;

var doTask = (agvId, task, targetSite) => {
	let checkSite = function () {
		if (localStorage.projectKey == "CSY_CDBP") { return false; }
		return (isNaN(Number(targetSite)) && isNaN(Number(targetSite.replace(/#/g, ""))));
	}
	if (!targetSite || checkSite()) {
		layer.msg("请输入有效的目标站点编号！");
		return;
	}
	taskexe.addTaskTo(agvId, task, targetSite);
}

var getTargets = function () {
	var arr = [];
	$("div#targets button.choosed").each(function () {
		var id = $(this).data("id");
		arr.push(id);
	});
	return arr;
}

var getButtonsHtml = (targets) => {
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

var allDisabled = function () {
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
	doTask(agvId, $(that).attr("id"), targetSite);
}

var fetchTaskTaikaiJy = function (that) {
	allDisabled();
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	if (agvbusstype == 'TON_2') {
		layer.msg("原料车不支持取料任务");
	} else if (agvbusstype == 'TON_1') {
		var task = $(that).attr("id");
		var indexOfTips = layer.confirm('请选择取货任务的目的地', {
			btn: ['1号 (呼叫1)', '2号 (呼叫2)', '3号 (呼叫3)', '4号 (呼叫4)', '5号 (呼叫5)', '6号 (呼叫6)', '7号 (呼叫7)', '8号 (呼叫8)', '9号 (呼叫9)', '10号 (呼叫10)', '11号 (呼叫11)', '12号 (呼叫12)'],
			btn1: function () { doTask(agvId, task, 153); },
			btn2: function () { doTask(agvId, task, 154); },
			btn3: function () { doTask(agvId, task, 156); },
			btn4: function () { doTask(agvId, task, 157); },
			btn5: function () { doTask(agvId, task, 160); },
			btn6: function () { doTask(agvId, task, 161); },
			btn7: function () { doTask(agvId, task, 164); },
			btn8: function () { doTask(agvId, task, 165); },
			btn9: function () { doTask(agvId, task, 168); },
			btn10: function () { doTask(agvId, task, 169); },
			btn11: function () { doTask(agvId, task, 171); },
			btn12: function () { doTask(agvId, task, 172); }
		});
	}
}

var deleverTaskTaikaiJy = function () {
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	var targets;
	if (agvbusstype == 'TON_1') {
		layer.msg("成品车不支持送料任务");
	} else if (agvbusstype == 'TON_2') {
		targets = [{ id: 21, name: "1号" }, { id: 22, name: "2号" }, { id: 25, name: "3号" }, { id: 26, name: "4号" }, { id: 29, name: "5号" }, { id: 30, name: "6号" }, { id: 33, name: "7号" }, { id: 34, name: "8号" }, { id: 37, name: "9号" }, { id: 38, name: "10号" }, { id: 41, name: "11号" }, { id: 42, name: "12号" }];
	}
	var buttons = getButtonsHtml(targets);
	var indexOfTips = layer.confirm('请选择送货任务的目的地(点击变红色时为选中)' + '<br/>' + buttons, {
		btn: ['确定送料'],
		btn1: function () {
			var arr = getTargets();
			if (!arr || arr.length == 0) {
				alert("无有效停车站点");
				return;
			}
			var targetSite = arr.join("#");
			doTask(agvId, "DELIVER", targetSite);
		}
	});
}

var fetchTaskLaoFoxconn = function (that) {
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	if (agvbusstype == 'TON_2') {
		layer.msg("此车不支持取货任务");
	} else if (agvbusstype == 'TON_1') {
		var task = $(that).attr("id");
		var indexOfTips = layer.confirm('请选择取货任务的发料处', {
			btn: ['B05 1号', 'B05 2号', 'B05 3号', 'B05 4号', 'B05 5号'],
			btn1: function () { doTask(agvId, task, 162); },
			btn2: function () { doTask(agvId, task, 28); },
			btn3: function () { doTask(agvId, task, 158); },
			btn4: function () { doTask(agvId, task, 175); },
			btn5: function () { doTask(agvId, task, 176); }
		});
	}
}

var deleverTaskLaoFoxconn = function (that) {
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	var task = $(that).attr("id");
	if (agvbusstype == 'TON_2') {
		var indexOfTips = layer.confirm('请选择送货任务的目的地', {
			btn: ['B01 1F', '人工取货点', '叉车取货点'],
			btn1: function () { doTask(agvId, task, 2013); },
			btn2: function () { doTask(agvId, task, 2017); },
			btn3: function () { doTask(agvId, task, 1); }
		});
	} else if (agvbusstype == 'TON_1') {
		var indexOfTips = layer.confirm('请选择送货任务的目的地', {
			btn: ['B04 1F', 'B04 2F', 'B04 3F', 'B07 3F', 'B08 2F', 'B08 3F'],
			btn1: function () { doTask(agvId, task, 56); },
			btn2: function () { doTask(agvId, task, 89); },
			btn3: function () { doTask(agvId, task, 62); },
			btn4: function () { doTask(agvId, task, 148); },
			btn5: function () { doTask(agvId, task, 145); },
			btn6: function () { doTask(agvId, task, 106); }
		});
	}
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
	doTask(agvId, "FETCH", 123);
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

var gotoInitLaoDbwy = function () {
	var task = "TRANSPORT";
	var indexOfTips = layer.confirm('请选择返回原料库的目的地', {
		btn: ['原料库1号-3054', '原料库2号-3055', '原料库3号-3056', '原料库4号-3057', '原料库5号-3058', '原料库6号-3059'],
		btn1: function () { doTask(agvId, task, 3054); },
		btn2: function () { doTask(agvId, task, 3055); },
		btn3: function () { doTask(agvId, task, 3056); },
		btn4: function () { doTask(agvId, task, 3057); },
		btn5: function () { doTask(agvId, task, 3058); },
		btn6: function () { doTask(agvId, task, 3059); }
	});
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
			doTask(agvId, "DELIVER", targetSite);
		},
	});
}

var deleverStereotypeHandler = function () {
	allDisabled();
	var task = "DELIVER";
	var indexOfTips = layer.confirm('请选择送料任务的目的地', {
		btn: ['袜机线尾1号-4001', '袜机线尾2号-4002', '袜机线尾3号-4003', '定型1号-2054', '定型2号-2055', '定型3号-2056', '定型4号-2057'],
		btn1: function () { doTask(agvId, task, 4001); },
		btn2: function () { doTask(agvId, task, 4002); },
		btn3: function () { doTask(agvId, task, 4003); },
		btn4: function () { doTask(agvId, task, 2054); },
		btn5: function () { doTask(agvId, task, 2055); },
		btn6: function () { doTask(agvId, task, 2056); },
		btn7: function () { doTask(agvId, task, 2057); }
	});
}

var deleverPackHandler = function () {
	allDisabled();
	var task = "DELIVER";
	var indexOfTips = layer.confirm('请选择送料任务的目的地', {
		btn: ['定型区线尾1号', '定型区线尾2号', '定型区线尾3号', '定型区线尾4号', '包装区1号', '包装区2号', '包装区3号', '包装区4号', '包装区5号', '包装区6号', '包装区7号', '包装区8号', '包装区9号', '包装区10号', '包装区11号'],
		btn1: function () { doTask(agvId, task, 2058); },
		btn2: function () { doTask(agvId, task, 2059); },
		btn3: function () { doTask(agvId, task, 2060); },
		btn4: function () { doTask(agvId, task, 2061); },
		btn5: function () { doTask(agvId, task, 2108); },
		btn6: function () { doTask(agvId, task, 2109); },
		btn7: function () { doTask(agvId, task, 2110); },
		btn8: function () { doTask(agvId, task, 2111); },
		btn9: function () { doTask(agvId, task, 2112); },
		btn10: function () { doTask(agvId, task, 2113); },
		btn11: function () { doTask(agvId, task, 2114); },
		btn12: function () { doTask(agvId, task, 2115); },
		btn13: function () { doTask(agvId, task, 2116); },
		btn14: function () { doTask(agvId, task, 2117); },
		btn15: function () { doTask(agvId, task, 2118); }
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
			doTask(agvId, "DELIVER", targetSite);
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
			doTask(agvId, "DELIVER", targetSite);
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

	let items = [{
		id: 'TRANSPORT', handler: function () {
			transportHandler(this);
		}
	}, {
		id: 'DELIVER', handler: function () {
			deliverHandler(this);
		}
	}, {
		id: 'FETCH', handler: function () {
			fetchHandler(this);
		}
	}, {
		id: 'DELIVER_INIT', handler: function () {
			deleverInitHandler();
		}
	}, {
		id: 'DELIVER_STEREOTYPE', handler: function () {
			deleverStereotypeHandler();
		}
	}, {
		id: 'DELIVER_PACK', handler: function () {
			deleverPackHandler();
		}
	}, {
		id: 'WAIT', handler: function () {
			waitHandler(this);
		}
	}, {
		id: 'GOTO_INIT', handler: function () {
			gotoInitHandler(this);
		}
	}, {
		id: 'GOTO_STEREOTYPE', handler: function () {
			gotoStereotypeHandler();
		}
	}, {
		id: 'GOTO_PACK', handler: function () {
			gotoPackHandler();
		}
	},];

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