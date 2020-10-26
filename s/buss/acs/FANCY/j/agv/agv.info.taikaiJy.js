import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { getButtonsHtml, allDisabled } from '/s/buss/acs/FANCY/j/agv/agv.info.js';
import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { gf } from "/s/buss/g/j/g.f.js";

var agvId = currentAgvId;

var fetchTaskTaikaiJy = function (that) {
	allDisabled();
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	if (agvbusstype == 'TON_2') {
		gf.layer().msg("原料车不支持取料任务");
		return;
	} else if (agvbusstype == 'TON_1') {
		var task = $(that).attr("id");
		var indexOfTips = gf.layer().confirm('请选择取货任务的目的地', {
			btn: ['1号 (呼叫1)', '2号 (呼叫2)', '3号 (呼叫3)', '4号 (呼叫4)', '5号 (呼叫5)', '6号 (呼叫6)', '7号 (呼叫7)', '8号 (呼叫8)', '9号 (呼叫9)', '10号 (呼叫10)', '11号 (呼叫11)', '12号 (呼叫12)'],
			btn1: function () { taskexe.addTaskToSite(agvId, task, 153); },
			btn2: function () { taskexe.addTaskToSite(agvId, task, 154); },
			btn3: function () { taskexe.addTaskToSite(agvId, task, 156); },
			btn4: function () { taskexe.addTaskToSite(agvId, task, 157); },
			btn5: function () { taskexe.addTaskToSite(agvId, task, 160); },
			btn6: function () { taskexe.addTaskToSite(agvId, task, 161); },
			btn7: function () { taskexe.addTaskToSite(agvId, task, 164); },
			btn8: function () { taskexe.addTaskToSite(agvId, task, 165); },
			btn9: function () { taskexe.addTaskToSite(agvId, task, 168); },
			btn10: function () { taskexe.addTaskToSite(agvId, task, 169); },
			btn11: function () { taskexe.addTaskToSite(agvId, task, 171); },
			btn12: function () { taskexe.addTaskToSite(agvId, task, 172); }
		});
	}
}

var deleverTaskTaikaiJy = function () {
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	var targets;
	if (agvbusstype == 'TON_1') {
		gf.layer().msg("成品车不支持送料任务");
		return;
	} else if (agvbusstype == 'TON_2') {
		targets = [{ id: 21, name: "1号" }, { id: 22, name: "2号" }, { id: 25, name: "3号" }, { id: 26, name: "4号" }, { id: 29, name: "5号" }, { id: 30, name: "6号" }, { id: 33, name: "7号" }, { id: 34, name: "8号" }, { id: 37, name: "9号" }, { id: 38, name: "10号" }, { id: 41, name: "11号" }, { id: 42, name: "12号" }];
	}
	debugger
	var buttons = getButtonsHtml(targets);
	var indexOfTips = gf.layer().confirm('请选择送货任务的目的地(点击变红色时为选中)' + '<br/>' + buttons, {
		btn: ['确定送料'],
		btn1: function () {
			var arr = getTargets();
			if (!arr || arr.length == 0) {
				alert("无有效停车站点");
				return;
			}
			var targetSite = arr.join("#");
			taskexe.addTaskToSite(agvId, "DELIVER", targetSite);
		}
	});
}

export { fetchTaskTaikaiJy, deleverTaskTaikaiJy };
