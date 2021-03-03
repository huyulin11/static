import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { initAgvList } from "/s/buss/acs/FANCY/j/agv.list.js";
import { addMsg } from "/s/buss/acs/g/j/agv.msg.js";
import { allAgvsInfo } from "/s/buss/acs/g/j/agv.msg.json.js";
import { refreshAcsInfo } from "/s/buss/acs/FANCY/j/acs.info.js";
import { agvRunningLogs } from "/s/buss/acs/FANCY/j/agv.running.logs.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { renderModelConfs } from "/s/buss/acs/FANCY/j/acs.control.conf.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js";

var container = function () {
	if ($("#allCtrlTable").length == 0) {
		$("#controlContainer").append("<div><table id='allCtrlTable' class='task'></table></div>");
		let confs = renderModelConfs();
		if (confs.length > 0) {
			renderModel(confs);
		}
	}
	return $("#allCtrlTable");
}

export var initAcsControl = function () {
	var initBtns = jQuery.parseJSON(localStorage.acsControl);
	for (var btn of initBtns) {
		if (!btn.hide) {
			container().append("<tr><td><div><button id='" + btn.id + "'>" + btn.name + "</button></div></td></tr>");
			if ("sysLocation" == btn.id) { $("#" + btn.id).append(`<span class='currenttip'>Beta</span>`); }
		}
	}
	delegateEvent();

	initAgvList();
	let refreshAgvsInfo = function (data) {
		$.each(data, function (n, value) {
			if (value.systemWarning) addMsg(value.systemWarning, 1, n);
			if (n > 0) {
				if (value.currentTask != null && value.currentTask.length > 0) {
					var msg = (value.currentTask[0].opflag == "OVER" ? "执行结束：" : "正在执行：") + value.currentTask[0].taskText;
					addMsg(msg, 3, n);
				}
			}
		});
	};
	allAgvsInfo(refreshAgvsInfo);
	setInterval(() => {
		refreshAcsInfo(renderCtrlBtns);
		allAgvsInfo(refreshAgvsInfo);
	}, 2000);

	setInterval(() => {
		agvRunningLogs((datas) => {
			if (!datas) { return; }
			for (let data of datas) {
				let title;
				if ($.isNumeric(data.key)) {
					title = data.key + "号车辆";
					if (data.key == '0') title = "系统消息";
				} else {
					title = data.key;
				}
				gflayer.msg(title + ':' + data.value, null, { offset: 'b', shade: 0.0, });
			}
		});
	}, 5000);
}

var delegateEvent = () => {
	container().delegate("button#togglePiBtn", "click", function () {
		var tips = "交通管制";
		var opType = "PI";
		taskexe.addCtrlTaskFromBtn(this, tips, opType);
	});
	container().delegate("button#autoChargeBtn", "click", function () {
		var tips = "自动充电功能";
		var opType = "AutoCharge";
		taskexe.addCtrlTaskFromBtn(this, tips, opType);
	});
	container().delegate("button#errBackBtn", "click", function () {
		var tips = "脱轨重新规划功能";
		var opType = "ErrBack";
		taskexe.addCtrlTaskFromBtn(this, tips, opType);
	});
	container().delegate("button#autoTaskBtn", "click", function () {
		var tips = "自动任务功能";
		var opType = "AutoTask";
		taskexe.addCtrlTaskFromBtn(this, tips, opType);
	});
	container().delegate("button#udfConfirmBtn", "click", function () {
		var tips = "确认信号";
		var opType = "UdfConfirm";
		taskexe.addCtrlTaskFromBtn(this, tips, opType);
	});
	container().delegate("button#PAUSE_USER", "click", function () {
		taskexe.addCtrlTask(0, "PAUSE_USER");
	});
	container().delegate("button#manager", "click", function () {
		window.open('/s/buss/g/h/manager.html');
	});
	container().delegate("button#CONTINUE", "click", function () {
		taskexe.addCtrlTask(0, "CONTINUE");
	});
	container().delegate("button#sysLocation", "click", function () {
		window.open("/s/buss/acs/" + localStorage.projectKey + "/h/location.html");
	});
	container().delegate("button#taskQuantityBtn", "click", function () {
		window.open("/s/buss/acs/" + localStorage.projectKey + "/h/task.quantity.html");
	});
	container().delegate("button#callFromLathe", "click", function () {
		layer.prompt({ title: '输入磨床号码（1、2、3、4）', formType: 0 }, function (key, index) {
			if (!["1", "2", "3", "4"].includes(key)) {
				layer.msg("错误的磨床编号！");
				return;
			}
			layer.close(index);
			if (window.confirm(`确定呼叫AGV？磨床编号：${key}`)) {
				taskexe.addCtrlTask(0, "UDF_COMMAND", key);
			}
		});
	});
}

export var renderCtrlBtns = (value) => {
	$("button#togglePiBtn").data("open", value.isOpenPi).html("交通管制" + gf.htmlPiece(value.isOpenPi));
	$("button#autoTaskBtn").data('open', value.isAutoTask).html("自动任务" + gf.htmlPiece(value.isAutoTask));
	$("button#udfConfirmBtn").data('open', value.IS_UDF_CONFIRM).html("用户确认" + gf.htmlPiece(value.IS_UDF_CONFIRM));
	$("button#autoChargeBtn").data('open', value.isAutoCharge).html("自动充电" + gf.htmlPiece(value.isAutoCharge));
	$("button#errBackBtn").data('open', value.isErrBack).html("脱轨重新规划" + gf.htmlPiece(value.isErrBack));
}