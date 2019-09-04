var msgLen = 0;
var lastMsg = "";
var agvId = 1;
var taskGroup = {};
var ctrlInfo = [];

(function () {
	var errorInfo = "";

	var pt = function () {
		$(".black_overlay").show();
		jQuery.ajax({
			url: "/agvinfo.shtml?agvId=" + agvId,
			type: "post",
			dataType: "json",
			success: function (data) {
				if ($(".taskTr").length <= 0) {
					initTask();
				}
				getCtrlInfo();
				initAlloc();
				refresh(data);
			},
			complete: function (data) {
				$(".black_overlay").hide();
			},
			error: whenError,
			timeout: 10000
		});
	}

	var allDisabled = function () {
		$(".oneCtrlTr button").attr("disabled", "true");
		$(".taskTr button").attr("disabled", "true");
		$(".black_overlay").show();
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
				errorInfo = latestCommand.msg;
			} else {
				errorInfo = "";
				status = "waiting";
				opflag = "Over";
			}
		} else {
			status = currentTask[0].taskid;
			taskText = currentTask[0].taskText;
			opflag = currentTask[0].opflag;
		}

		allDisabled();

		addMsg(systemMsg, 2);
		addMsg(errorInfo, 1);
		if (isSystemRunning == "-1") {
			$(".oneCtrlTr button#CONTINUE").removeAttr("disabled");
			return;
		} else {
			$(".oneCtrlTr button#PAUSE_USER").removeAttr("disabled");
			if (status == "waiting") {
				$(".taskTr button").removeAttr("disabled");
			} else {
				if (opflag == "New") {
					addMsg("正在执行：" + taskText, 3);
				} else if (opflag == "Over") {
					addMsg("执行完毕：" + taskText, 3);
					$(".taskTr button").removeAttr("disabled");
				}
			}
		}

		if (currentTask != null && currentTask.length > 0
			&& isSystemRunning != "-1") {
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

	var addMsg = function (msg, level) {
		if (msg != "" && lastMsg != msg) {
			lastMsg = msg;
			var fontClass = (level == 1 ? "redFont" : (level == 2 ? "blueFont"
				: "yellowFont"));
			if ($("div#tips span").length > 6) {
				var rm = $("div#tips span").length - 6;
				$("div#tips span:lt(" + rm + ")").remove();
			}
			$("div#tips").append(
				"<span " + "class='tips " + fontClass + "' data-id='"
				+ msgLen + "'" + ">**" + msg + "**</span>");
			$("div#tips span[data-id!=" + (msgLen++) + "]")
				.addClass("greyFont");
		}
	}

	var initTask = function () {
		jQuery.ajax({
			url: "/getAllSingletask.shtml?agvId=" + agvId,
			type: "post",
			dataType: "json",
			async: false,
			success: function (data) {
				var taskStr;
				var dl = data.length;
				$.each(data, function (n, value) {
					var tmpStr = "<td><div><button id='" + value.taskCode + "'"
						+ " data-id='" + value.id + "' "
						+ " data-environmentId='" + value.environmentId + "' "
						+ " data-tasktype='" + value.tasktype + "' " + ">" + value.taskText
						+ "</button></div></td>";
					if (n % 2 == 1) {
						taskStr = "<tr class='taskTr'>" + taskStr + tmpStr
							+ "</tr>";
						$("table.task").append(taskStr);
					} else {
						taskStr = tmpStr;
						if (n == dl - 1) {
							taskStr = "<tr class='taskTr'>" + taskStr
								+ "<td></td>" + "</tr>";
							$("table.task").append(taskStr);
						}
					}
				});
			},
			error: whenError,
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
			error: whenError,
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
			error: whenError,
			timeout: 5000
		});
	}

	var initAlloc = function () {
		$("table.alloc").html("");
		jQuery.ajax({
			url: "/getAllocsBy.shtml",
			type: "post",
			dataType: "json",
			async: false,
			success: function (data) {
				var allAlloc = new Map();
				var maxColumn = 0;
				$.each(data, function (n, allocationInfo) {
					var rowAlloc = new Map();
					rowAlloc = allAlloc.get(allocationInfo.rowid);
					if (!rowAlloc) {
						rowAlloc = new Map();
						rowAlloc.set("maxColumn", 0);
					}
					rowAlloc.set(allocationInfo.colid, allocationInfo);
					rowAlloc.set("maxColumn", rowAlloc.get("maxColumn") + 1);
					allAlloc.set(allocationInfo.rowid, rowAlloc);
				});
				allAlloc.forEach(function (rowAlloc) {
					var tmpStr = "";
					rowAlloc.forEach(function (allocationInfo) {
						if (typeof allocationInfo == "number") {
							return;
						}
						if (allocationInfo.delflag == '0') {
							var disabled = "";
							var showInfo = "位" + allocationInfo.id;
							if (allocationInfo.status != 1) {
								disabled = " disabled='true' ";
								if (allocationInfo.status == 2) {
									showInfo = showInfo + "-锁";
								} else if (allocationInfo.status == 3) {
									showInfo = showInfo + "-有";
								} else if (allocationInfo.status == 4) {
									showInfo = showInfo + "-异";
								}
							} else {
								showInfo = showInfo + "-空";
							}
							tmpStr = tmpStr + "<td><div><button " + "data-id='"
								+ allocationInfo.id + "'" + "data-rowid='"
								+ allocationInfo.rowid + "'"
								+ "data-colid='" + allocationInfo.colid
								+ "'" + "data-status='"
								+ allocationInfo.status + "'" + disabled
								+ ">" + showInfo + "</button></div></td>";
						} else {
							tmpStr = tmpStr + "<td></td>";
						}
					});
					$("table.alloc").append(
						"<tr class='allocTr'>" + tmpStr + "</tr>");
				});
			},
			error: whenError,
			timeout: 5000
		});
	}

	var addTask = function (taskid) {
		allDisabled();
		jQuery.ajax({
			url: "/addTask.shtml?agvId=" + agvId,
			type: "post",
			data: {
				taskid: taskid
			},
			dataType: "json",
			success: function (data) {
				errorInfo = data.msg;
				addMsg(errorInfo, 1);
			},
			error: whenError,
			timeout: 5000
		});
	}

	var whenError = function () {
		addMsg("系统可能需要重新登录", 3);
		allDisabled();
	}

	var init = function () {
		$(".oneCtrlTr").delegate("button#PAUSE_USER", "click", function () {
			addMsg("执行暂停命令", 3);
			addTask("PAUSE_USER");
		});
		$(".oneCtrlTr button#CONTINUE").on("click", function () {
			addMsg("执行启动命令", 3);
			addTask("CONTINUE");
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
				addMsg("执行" + $(this).html(), 3);
				addTask($(this).attr("data-id"));
			} else {
				return;
			}
		});
		allDisabled();
		agvId = window.urlSearcher.param("agvId");
		if (!agvId) {
			agvId = 1;
		}
		initTask();
		initAlloc();
		initGroup();
		setInterval(pt, 3000);
	}

	init();
})(jQuery);
