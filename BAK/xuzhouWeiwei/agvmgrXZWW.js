var taskGroup = {};
var ctrlInfo = [];

(function () {
	var agvId = 1;

	var agvinfo = function () {
		jQuery.ajax({
			url: "/agvinfo.shtml?agvId=" + agvId,
			type: "post",
			dataType: "json",
			success: function (data) {
				if ($(".taskTr").length <= 0) {
					initTask();
				}
				getCtrlInfo();
				refresh(data);
			},
			complete: function (data) {
				$(".black_overlay").hide();
			},
			timeout: 10000
		});
	}

	var allDisabled = function () {
		$(".oneCtrlTr button").attr("disabled", "true");
		$(".taskTr button").attr("disabled", "true");
	}

	var refresh = function (data) {
		var currentTask = new Array();
		var agvInfo, isSystemRunning, systemMsg, lastOverTask, latestCommand, systemWarning;

		var status;
		var taskText;
		var opflag;

		agvInfo = data.agvInfo;
		isSystemRunning = agvInfo.code;
		systemMsg = agvInfo.msg;
		systemWarning = data.systemWarning;

		latestCommand = data.latestCommand;

		if (systemWarning) {
			$("#warning").html(systemWarning);
		}

		$.each(data.currentTask, function (n, value) {
			if (value.opflag == "New" || value.opflag == "Send") {
				currentTask.push(value);
			} else {
				lastOverTask = value;
			}
		});

		if (currentTask == null || currentTask.length <= 0) {
			if (latestCommand.code == "-1") {
			} else {
				status = "waiting";
				opflag = "Over";
			}
		} else {
			status = currentTask[0].taskid;
			taskText = currentTask[0].taskText;
			opflag = currentTask[0].opflag;
		}

		allDisabled();

		if (isSystemRunning == "-1" || isSystemRunning == "-2") {
			$(".oneCtrlTr button#CONTINUE").removeAttr("disabled");
			return;
		} else {
			$(".oneCtrlTr button#PAUSE_USER").removeAttr("disabled");
			if (status == "waiting") {
				$(".taskTr button").removeAttr("disabled");
			} else {
				if (opflag == "New") {
				} else if (opflag == "Over") {
					$(".taskTr button").removeAttr("disabled");
				}
			}
		}

		if (currentTask != null && currentTask.length > 0
			&& isSystemRunning != "-1" && isSystemRunning != "-2") {
			var exTask = new Map();
			var parentTaskId;
			var tmpList = [];
			var pList = [];
			var ctList = [];
			$.each(currentTask, function (n, value) {
				ctList.push("" + value.id);
				if (tmpList.length == 0) {
					for (var a in taskGroup) {
						if (taskGroup[a].taskId == value.id) {
							pList.push(taskGroup[a].parentTaskId);
							tmpList.push(taskGroup[a].parentTaskId);
						}
					}
				} else {
					pList = [];
					for (var a in taskGroup) {
						if (taskGroup[a].taskId == value.id) {
							if (tmpList.includes(taskGroup[a].parentTaskId)) {
								pList.push(taskGroup[a].parentTaskId);
							}
						}
					}
				}
			});

			for (var pId in pList) {
				for (var a in taskGroup) {
					if (taskGroup[a].parentTaskId == pList[pId]
						&& !ctList.includes(taskGroup[a].taskId)) {
						$("div tr.taskTr").find(
							"button[data-id='" + taskGroup[a].taskId
							+ "']").removeAttr("disabled");
					}
				}
			}
		}
		{
			var currentEnvId;
			var currentTaskexeStatus;
			for (var a in ctrlInfo) {
				if (ctrlInfo[a].type == 'CURRENT_ENVIRONMENT_ID') {
					currentEnvId = ctrlInfo[a].value;
				}
				if (ctrlInfo[a].type == 'CURRENT_TASKEXE_STATUS') {
					currentTaskexeStatus = ctrlInfo[a].value;
				}
			}
			if (currentTaskexeStatus == -1) {
				$("div tr.taskTr").find("button[data-tasktype!='" + 1 + "']").attr("disabled", "true");
				$("div tr.taskTr").find("button[data-tasktype='" + 0 + "']").removeAttr("disabled");
			} else if (currentTaskexeStatus == 0) {
				$("div tr.taskTr").find("button[data-tasktype!='" + 1 + "']").attr("disabled", "true");
				$.each(currentTask, function (n, value) {
					$("div tr.taskTr").find("button[data-id='" + value.id + "']").attr("disabled", "true");
				});
			} else {
				if (currentTaskexeStatus == 2) {
					$("div tr.taskTr").find("button[data-tasktype!='" + 2 + "']").attr("disabled", "true");
				} else if (currentTaskexeStatus == 4) {
					$("div tr.taskTr").find("button[data-tasktype!='" + 3 + "']").attr("disabled", "true");
				}
				$("div tr.taskTr").find("button[data-environmentId!='" + currentEnvId + "']").attr("disabled", "true");
			}
		}
	}

	var initTask = function () {
		jQuery.ajax({
			url: "/getAllSingletask.shtml?agvId=" + agvId,
			type: "post",
			dataType: "json",
			async: false,
			success: function (data) {
				var taskStr = "";
				var tmpLine = "";
				var dl = data.length;
				$.each(data, function (n, value) {
					var tmpStr = "<td><div><button id='" + value.taskCode + "'"
						+ " data-id='" + value.id + "' "
						+ " data-environmentId='" + value.environmentId + "' "
						+ " data-tasktype='" + value.tasktype + "' " + ">" + value.taskText
						+ "</button></div></td>";
					tmpLine = tmpLine + tmpStr;
					if ((n + 1) % 4 == 0 || n == dl - 1) {
						taskStr = taskStr + "<tr class='taskTr'>" + tmpLine
							+ "</tr>";
						tmpLine = "";
					}
					if (n == dl - 1) {
						$("table.task").append(taskStr);
					}
				});
			},
			timeout: 5000
		});
	}

	var initGroup = function () {
		jQuery.ajax({
			url: "/getTaskGroupInfo.shtml",
			type: "post",
			dataType: "json",
			async: false,
			success: function (data) {
				taskGroup = data;
			},
			timeout: 5000
		});
	}

	var getCtrlInfo = function () {
		jQuery.ajax({
			url: "/getControlInfo.shtml",
			type: "post",
			dataType: "json",
			async: false,
			success: function (data) {
				ctrlInfo = data;
			},
			timeout: 5000
		});
	}

	var init = function () {
		$(".oneCtrlTr").delegate("button#PAUSE_USER", "click", function () {
			allDisabled();
			agv.addCtrlTask(agvId, "PAUSE_USER");
		});
		$(".oneCtrlTr button#CONTINUE").on("click", function () {
			allDisabled();
			agv.addCtrlTask(agvId, "CONTINUE");
		});
		$("table.task").delegate(".taskTr button", "click", function () {
			var confirmMsg = "";
			if ($(this).html().endsWith('上料')) {
				confirmMsg = "上料需保证送料工序已经执行完毕，";
			} else if ($(this).html().endsWith('送光轴')) {
				confirmMsg = "送光轴需保证上料工序已经执行完毕，";
			} else if ($(this).html().endsWith('叫料')) {
				confirmMsg = "叫料需保证agv已回到起始位置，";
			} else if ($(this).html().endsWith('送料')) {
				confirmMsg = "送料需保证agv已回到起始位置，";
			}

			if (window.confirm(confirmMsg + '你确定要' + "执行:" + $(this).html() + '吗？')) {
				allDisabled();
				alert(agv.addTask(agvId, $(this).attr("data-id")));
			} else {
				return;
			}
		});
		allDisabled();
		agvId = url.param("agvId");
		if (!agvId) {
			agvId = 1;
		}
		initTask();
		initGroup();
		setInterval(agvinfo, 1500);
	}

	init();
})(jQuery);
