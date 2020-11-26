import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { bindSites, allDisabled } from '/s/buss/acs/FANCY/j/agv/agv.info.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { gf } from "/s/buss/g/j/g.f.js";

var agvId = currentAgvId;

var gotoInitLaoDbwy = function () {
	var task = "TRANSPORT";
	var indexOfTips = gf.layer().confirm('请选择返回原料库的目的地', {
		btn: ['原料库1号-3054', '原料库2号-3055', '原料库3号-3056', '原料库4号-3057', '原料库5号-3058', '原料库6号-3059'],
		btn1: function () { taskexe.addTaskToSite(agvId, task, 3054); },
		btn2: function () { taskexe.addTaskToSite(agvId, task, 3055); },
		btn3: function () { taskexe.addTaskToSite(agvId, task, 3056); },
		btn4: function () { taskexe.addTaskToSite(agvId, task, 3057); },
		btn5: function () { taskexe.addTaskToSite(agvId, task, 3058); },
		btn6: function () { taskexe.addTaskToSite(agvId, task, 3059); }
	});
}

var deleverInitHandler = function () {
	allDisabled();
	var targets = [];
	for (var i = 3012; i <= 3053; i++) {
		targets.push({ id: i });
	}
	var buttons = bindSites(targets);
	var indexOfTips = layer.confirm('请选择送料任务的目的地(点击变红色时为选中)' + '<br/>' + buttons, {
		btn: ['确定送料'],
		area: '386px',
		btn1: function () {
			var arr = gf.getTargets();
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
	var indexOfTips = gf.layer().confirm('请选择送料任务的目的地', {
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
	var indexOfTips = gf.layer().confirm('请选择送料任务的目的地', {
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
	var buttons = bindSites(targets);
	var indexOfTips = layer.confirm('请选择前往定型暂存区的目的地' + '<br/>' + buttons, {
		btn: ['确定前往'],
		area: '386px',
		btn1: function () {
			var arr = gf.getTargets();
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
	var buttons = bindSites(targets);
	var indexOfTips = layer.confirm('请选择前往包装暂存区的目的地' + '<br/>' + buttons, {
		btn: ['确定前往'],
		area: '386px',
		btn1: function () {
			var arr = gf.getTargets();
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

export { gotoInitLaoDbwy, deleverInitHandler, deleverStereotypeHandler, deleverPackHandler, gotoStereotypeHandler, gotoPackHandler };
