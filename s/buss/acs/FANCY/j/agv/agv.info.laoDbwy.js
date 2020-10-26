import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { getButtonsHtml, allDisabled } from '/s/buss/acs/FANCY/j/agv/agv.info.js';
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


export { gotoInitLaoDbwy };
