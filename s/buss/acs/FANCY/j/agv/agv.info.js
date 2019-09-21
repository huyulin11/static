import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";

var agvId = currentAgvId;

var currentTask = new Array();

var _target;

var doTask = (agvId, task, targetSite) => {
	if (!targetSite || (isNaN(Number(targetSite)) && isNaN(Number(targetSite.replace(/#/g, ""))))) {
		layer.msg("请输入有效的目标站点编号！");
		return;
	}
	layer.msg(taskexe.addTaskTo(agvId, task, targetSite));
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
		$(_target).find("button#GOTO_INITS").removeAttr("disabled");
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
			$(_target).find("button#FETCH").removeAttr("disabled");
		}
		if (sitestatus == "CHARGING" && taskstatus == "GOTO_CHARGE") {
			$(_target).find("button#BACK_CHARGE").removeAttr("disabled");
		}
	}
	$(_target).find("button#CONFIRM").removeAttr("disabled");
	$(_target).find("button#GOTO_INIT").removeAttr("disabled");
	$(_target).find("button#GOTO_INITS").removeAttr("disabled");
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

var fetchHandler = function (that) {
	allDisabled();
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	var targetSite = 0;
	if (agvbusstype == 'TON_1') {
		layer.msg("小车不支持取料任务");
	} else if (agvbusstype == 'TON_2') {
		var task = $(that).attr("id");
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
}

var deliverHandler = function () {
	allDisabled();
	if (localStorage.projectKey == 'TAIKAI_JY') {
		deleverTaskTaikaiJy();
	} else if (localStorage.projectKey == 'LAO_FOXCONN') {
		deleverTaskLaoFoxconn();
	}
}

var deleverTaskLaoFoxconn = function () {
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

var deleverTaskTaikaiJy = function () {
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	var targets;
	if (agvbusstype == 'TON_1') {
		if (agvId == 5) {
			targets = [{ id: 12, name: "20号" }, { id: 13, name: "19号" }, { id: 14, name: "18号" }, { id: 15, name: "17号" }, { id: 16, name: "9号" }, { id: 17, name: "10号" }, { id: 18, name: "12号" }];
		} else if (agvId == 4) {
			targets = [{ id: 2, name: "22号" }, { id: 3, name: "21号" }, { id: 4, name: "13号" }, { id: 5, name: "14号" }, { id: 6, name: "15号" }, { id: 7, name: "16号" }];
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

var deleverInitHandler = function () {
	allDisabled();
	var targets = [];
	for (var i = 3012; i <= 3053; i++) {
		targets.push({ id: i, name: i - 3011 + "号" });
	}
	var buttons = getButtonsHtml(targets);
	var indexOfTips = layer.confirm('请选择送料任务的目的地(点击变红色时为选中)' + '<br/>' + buttons, {
		btn: ['确定送料'],
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
	var targetSite = 0;
	var indexOfTips = layer.confirm('请选择送料任务的目的地', {
		btn: ['袜机1号', '袜机2号', '袜机3号', '袜机4号', '袜机5号', '袜机6号', '袜机7号', '袜机8号', '袜机9号', '袜机10号', '定型1号', '定型2号', '定型3号', '定型4号'],
		btn1: function () {
			targetSite = 2001;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn2: function () {
			targetSite = 2002;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn3: function () {
			targetSite = 2003;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn4: function () {
			targetSite = 2004;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn5: function () {
			targetSite = 2005;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn6: function () {
			targetSite = 2006;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn7: function () {
			targetSite = 2007;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn8: function () {
			targetSite = 2008;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn9: function () {
			targetSite = 2009;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn10: function () {
			targetSite = 2010;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn10: function () {
			targetSite = 2054;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn11: function () {
			targetSite = 2055;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn12: function () {
			targetSite = 2056;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn13: function () {
			targetSite = 2057;
			doTask(agvId, "DELIVER", targetSite);
		}
	});
}

var deleverPackHandler = function () {
	allDisabled();
	var targetSite = 0;
	var indexOfTips = layer.confirm('请选择送料任务的目的地', {
		btn: ['定型区线尾1号', '定型区线尾2号', '定型区线尾3号', '定型区线尾4号', '包装区1号', '包装区2号', '包装区3号', '包装区4号', '包装区5号', '包装区6号', '包装区7号', '包装区8号', '包装区9号', '包装区10号', '包装区11号'],
		btn1: function () {
			targetSite = 2058;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn2: function () {
			targetSite = 2059;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn3: function () {
			targetSite = 2060;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn4: function () {
			targetSite = 2061;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn5: function () {
			targetSite = 2108;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn6: function () {
			targetSite = 2109;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn7: function () {
			targetSite = 2110;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn8: function () {
			targetSite = 2111;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn9: function () {
			targetSite = 2112;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn10: function () {
			targetSite = 2113;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn11: function () {
			targetSite = 2114;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn12: function () {
			targetSite = 2115;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn13: function () {
			targetSite = 2116;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn14: function () {
			targetSite = 2117;
			doTask(agvId, "DELIVER", targetSite);
		},
		btn15: function () {
			targetSite = 2118;
			doTask(agvId, "DELIVER", targetSite);
		}
	});
}

var gotoInitsHandler = function () {
	allDisabled();
	var targetSite = 0;
	var indexOfTips = layer.confirm('请选择返回原料库的目的地', {
		btn: ['原料库1号-3054', '原料库2号-3055'],
		btn1: function () {
			debugger
			targetSite = 3054;
			doTask(agvId, "TRANSPORT", targetSite);
		},
		btn2: function () {
			targetSite = 3055;
			doTask(agvId, "TRANSPORT", targetSite);
		}
	});
}

export var init = function (target) {
	_target = target;
	$("html").delegate("div[id='targets'] button", "click", function () {
		var that = $(this);
		if (that.hasClass("choosed")) {
			that.removeClass("choosed");
		} else {
			that.addClass("choosed");
		}
	});

	let items = [{
		id: 'TRANSPORT', handler: function () {
			transportHandler(this);
		}
	}, {
		id: 'DELIVER', handler: function () {
			deliverHandler();
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
		id: 'GOTO_INITS', handler: function () {
			gotoInitsHandler();
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
		layer.msg(taskexe.addCtrlTask(agvId, $(this).attr("id")));
	});

	var initBtns = jQuery.parseJSON(localStorage.getItem("agvControl"));
	for (var btn of initBtns) {
		$(_target).append(`<td><div><button id='${btn.id}'`
			+ ((btn.color) ? (`data-backcolor='${btn.color}'`) : "")
			+ ((btn.to) ? (`data-to='${btn.to}'`) : "")
			+ `>${btn.name}</button></div></td>`);
	}

	allDisabled();
	gf.resizeTable();
	setInterval(agvinfo, 1500);
}

export { currentTask };