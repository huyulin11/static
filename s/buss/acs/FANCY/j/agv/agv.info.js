import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";

var agvId = currentAgvId;

var currentTask = new Array();

var repeatFlag = false;
var container = function () {
	if ($(".oneCtrlTr").length == 0) {
		console.log("get oneCtrilTr err");
		if (!repeatFlag) {
			repeatFlag = true;
			setTimeout(init, 1000);
		}
	}
	return $(".oneCtrlTr");
}

var agvinfo = function () {
	jQuery.ajax({
		url: "/s/jsons/" + localStorage.projectKey + "/agv/agvInfo" + agvId + ".json",
		type: "GET",
		dataType: "json",
		cache: false,
		success: refresh,
		complete: function (data) {
			$("#title").html(agvId + "号AGV控制");
			$(".black_overlay").hide();
		},
		error: function (e) { console.log(e); },
		timeout: 3000
	});
}

var allDisabled = function () {
	container().find("button").attr("disabled", "true").css("background-color", "");
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
		container().find("button#CONTINUE").removeAttr("disabled");
		container().find("button#GOTO_INIT").removeAttr("disabled");
		container().find("button#RE_PATH").removeAttr("disabled");
	} else {
		container().find("button#PAUSE_USER").removeAttr("disabled");
		if (sitestatus == "INIT" && taskstatus == "FREE") {
			container().find("button#GOTO_CHARGE").removeAttr("disabled");
			container().find("button#TRANSPORT").removeAttr("disabled");
			container().find("button#DELIVER").removeAttr("disabled");
			container().find("button#FETCH").removeAttr("disabled");
		}
		if (sitestatus == "CHARGING" && taskstatus == "GOTO_CHARGE") {
			container().find("button#BACK_CHARGE").removeAttr("disabled");
		}
	}
	container().find("button#GOTO_INIT").removeAttr("disabled");
	container().find("button#RE_PATH").removeAttr("disabled");
	container().find("button#SHUTDOWN").removeAttr("disabled");
	$(".oneCtrlTr").find("button:enabled").each(function () {
		const backcolor = $(this).data("backcolor");
		if (backcolor) {
			$(this).css("background-color", backcolor);
		}
	});
}


var doTask = (agvId, task, targetSite) => {
	if (!targetSite || (isNaN(Number(targetSite)) && isNaN(Number(targetSite.replace(/#/g, ""))))) {
		layer.msg("请输入有效的目标站点编号！");
		return;
	}
	layer.msg(taskexe.addTaskTo(agvId, task, targetSite));
}

var init = function () {
	$(".oneCtrlTr").delegate("button[id!='TRANSPORT'][id!='DELIVER'][id!='FETCH']", "click", function () {
		allDisabled();
		if (!confirm('是否确认执行该操作?')) { return; }
		layer.msg(taskexe.addCtrlTask(agvId, $(this).attr("id")));
	});

	$(".oneCtrlTr").delegate("button[id='TRANSPORT']", "click", function () {
		allDisabled();
		if (!confirm('是否确认执行该操作?')) { return; }
		var targetSite = prompt("请输入有效的目标站点编号！");
		doTask(agvId, $(this).attr("id"), targetSite);
	});

	var deleverTaskLaoFoxiconn = function () {
		var indexOfTips = layer.confirm('请选择送货任务的目的地(点击变红色时为选中)', {
			btn: ['B04 1F', 'B04 2F', 'B04 3F', 'B08 3F'],
			btn1: function () {
				targetSite = 53;
				doTask(agvId, task, targetSite);
			},
			btn2: function () {
				targetSite = 89;
				doTask(agvId, task, targetSite);
			},
			btn3: function () {
				targetSite = 62;
				doTask(agvId, task, targetSite);
			},
			btn4: function () {
				targetSite = 105;
				doTask(agvId, task, targetSite);
			}
		});
	}

	$("html").delegate("div[id='targets'] button", "click", function () {
		var that = $(this);
		if (that.hasClass("choosed")) {
			that.removeClass("choosed");
		} else {
			that.addClass("choosed");
		}
	});

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
		var numInLine = 4;
		var tmpStr = "";
		var buttons = ``;
		for (var target of targets) {
			var tmpItemStr;
			if (typeof (target) == "number" || typeof (target) == "string") {
				tmpItemStr = `<td><button data-id='${target}'>${target}</button></td>`;
			} else {
				tmpItemStr = `<td><button data-id='${target.id}'>${target.name}-${target.id}</button></td>`;
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

	var deleverTaskTaikaiLinyi = function () {
		var agvbusstype = findIotInfo(agvId, "agvbusstype");
		var targets;
		if (agvbusstype == 'TON_1') {
			if (agvId == 5) {
				targets = [{ id: 12, name: "20号" }, { id: 13, name: "19号" }, { id: 14, name: "18号" }, { id: 15, name: "17号" },
				{ id: 16, name: "9号" }, { id: 17, name: "10号" }, { id: 18, name: "12号" }];
			} else if (agvId == 4) {
				targets = [{ id: 2, name: "22号" }, { id: 3, name: "21号" }, { id: 4, name: "13号" },
				{ id: 5, name: "14号" }, { id: 6, name: "15号" }, { id: 7, name: "16号" }];
			}
		} else if (agvbusstype == 'TON_2') {
			targets = [62, 61, 60, 65];
		}
		var buttons = getButtonsHtml(targets);
		var indexOfTips = layer.confirm('请选择送货任务的目的地(点击变红色时为选中)' + '<br/>' + buttons, {
			btn: ['确定送料'],
			btn1: function () {
				var arr = getTargets();
				if (!arr || arr.length == 0) {
					alert("无有效停车站点");
					return;
				} else if (arr.length > 1 && agvbusstype == 'TON_2') {
					alert("大车只能选择1个点");
					return;
				}
				var targetSite = arr.join("#");
				doTask(agvId, "DELIVER", targetSite);
			},
			btn2: function () {
				targetSite = 105;
				doTask(agvId, "DELIVER", targetSite);
			}
		});
	}

	$(".oneCtrlTr").delegate("button[id='DELIVER']", "click", function () {
		allDisabled();
		if (localStorage.projectKey == 'TAIKAI_LINYI') {
			deleverTaskTaikaiLinyi();
		} else if (localStorage.projectKey == 'LAO_FOXICONN') {
			deleverTaskLaoFoxiconn();
		}
	});

	$(".oneCtrlTr").delegate("button[id='FETCH']", "click", function () {
		allDisabled();
		var agvbusstype = findIotInfo(agvId, "agvbusstype");
		var targetSite = 0;
		if (agvbusstype == 'TON_1') {
			layer.msg("小车不支持取料任务");
		} else if (agvbusstype == 'TON_2') {
			var task = $(this).attr("id");
			var indexOfTips = layer.confirm('请选择送货任务的目的地', {
				btn: ['22号 (呼叫1)', '21号 (呼叫2)', '20号 (呼叫3)', '19号 (呼叫4)', '18号 (呼叫5)', '17号 (呼叫6)'],
				btn1: function () {
					targetSite = 83;
					doTask(agvId, task, targetSite);
				},
				btn2: function () {
					targetSite = 84;
					doTask(agvId, task, targetSite);
				},
				btn3: function () {
					targetSite = 95;
					doTask(agvId, task, targetSite);
				},
				btn4: function () {
					targetSite = 93;
					doTask(agvId, task, targetSite);
				},
				btn5: function () {
					targetSite = 97;
					doTask(agvId, task, targetSite);
				},
				btn6: function () {
					targetSite = 99;
					doTask(agvId, task, targetSite);
				}
			});
		}
	});

	var initBtns = jQuery.parseJSON(localStorage.getItem("agvControl"));
	for (var btn of initBtns) {
		container().append(`<td><div><button id='${btn.id}'`
			+ ((btn.color) ? (`data-backcolor='${btn.color}'`) : "")
			+ ((btn.to) ? (`data-to='${btn.to}'`) : "")
			+ `>${btn.name}</button></div></td>`);
	}

	allDisabled();
	resizeTable();
	setInterval(agvinfo, 1500);
}

init();
export { currentTask };