import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { gf } from "/s/buss/g/j/g.f.js";

var agvId = currentAgvId;

var fetchTaskLaoFoxconn = function (that) {
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	if (agvbusstype == 'TON_2') {
		gf.layer().msg("此车不支持取货任务");
	} else if (agvbusstype == 'TON_1') {
		var task = $(that).attr("id");
		var indexOfTips = gf.layer().confirm('请选择取货任务的发料处', {
			btn: ['B05 1号', 'B05 2号', 'B05 3号', 'B05 4号', 'B05 5号'],
			btn1: function () { taskexe.addTaskToSite(agvId, task, 162); },
			btn2: function () { taskexe.addTaskToSite(agvId, task, 28); },
			btn3: function () { taskexe.addTaskToSite(agvId, task, 158); },
			btn4: function () { taskexe.addTaskToSite(agvId, task, 175); },
			btn5: function () { taskexe.addTaskToSite(agvId, task, 176); }
		});
	}
}

var deleverTaskLaoFoxconn = function (that) {
	var agvbusstype = findIotInfo(agvId, "agvbusstype");
	var task = $(that).attr("id");
	if (agvbusstype == 'TON_2') {
		var indexOfTips = gf.layer().confirm('请选择送货任务的目的地', {
			btn: ['B01 1F', '人工取货点', '叉车取货点'],
			btn1: function () { taskexe.addTaskToSite(agvId, task, 2013); },
			btn2: function () { taskexe.addTaskToSite(agvId, task, 2017); },
			btn3: function () { taskexe.addTaskToSite(agvId, task, 1); }
		});
	} else if (agvbusstype == 'TON_1') {
		var indexOfTips = gf.layer().confirm('请选择送货任务的目的地', {
			btn: ['B04 1F', 'B04 2F', 'B04 3F', 'B07 3F', 'B08 2F', 'B08 3F'],
			btn1: function () { taskexe.addTaskToSite(agvId, task, 56); },
			btn2: function () { taskexe.addTaskToSite(agvId, task, 89); },
			btn3: function () { taskexe.addTaskToSite(agvId, task, 62); },
			btn4: function () { taskexe.addTaskToSite(agvId, task, 148); },
			btn5: function () { taskexe.addTaskToSite(agvId, task, 145); },
			btn6: function () { taskexe.addTaskToSite(agvId, task, 106); }
		});
	}
}

export { fetchTaskLaoFoxconn, deleverTaskLaoFoxconn };
