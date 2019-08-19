var msgLen = 0;
var lastMsg = "";
(function() {
	var errorInfo = "";

	var pt = function() {
		$(".black_overlay").show();
		jQuery.ajax({
			url : "/agvinfo.shtml",
			type : "post",
			dataType : "json",
			success : function(data) {
				if ($(".taskTr").length <= 0) {
					initTask();
				}
				initAlloc();
				refresh(data);
			},
			complete : function(data) {
				$(".black_overlay").hide();
			},
			error : whenError,
			timeout : 10000
		});
	}

	var allDisabled = function() {
		$(".oneCtrlTr button").attr("disabled", "true");
		$(".taskTr button").attr("disabled", "true");
		$(".black_overlay").show();
	}

	var refresh = function(data) {
		var currentTask, agvInfo, isSystemRunning, systemMsg, lastOverTask, latestCommand, systemWarning;

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

		$.each(data.currentTask, function(n, value) {
			if (value.opflag == "New" || value.opflag == "Send") {
				currentTask = value;
			} else {
				lastOverTask = value;
			}
		});

		if (currentTask == null) {
			if (latestCommand.code == "-1") {
				errorInfo = latestCommand.msg;
			} else {
				errorInfo = "";
				status = "waiting";
				opflag = "Over";
			}
		} else {
			status = currentTask.taskid;
			taskText = currentTask.taskText;
			opflag = currentTask.opflag;
		}

		allDisabled();

		addMsg(errorInfo, 1);
		addMsg(systemMsg, 2);
		if (isSystemRunning == "-1") {
			$(".oneCtrlTr button#CONTINUE").removeAttr("disabled");
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
	}

	var addMsg = function(msg, level) {
		if (msg != "" && lastMsg != msg) {
			lastMsg = msg;
			var fontClass = (level == 1 ? "redFont" : (level == 2 ? "blueFont"
					: "yellowFont"));
			if ($("div#tips span").length > 5) {
				var rm = $("div#tips span").length - 5;
				$("div#tips span:lt(" + rm + ")").fadeOut().remove();
			}
			$("div#tips").append(
					"<span " + "class='tips " + fontClass + "' data-id='"
							+ msgLen++ + "'" + ">**" + msg + "**</span>")
					.fadeIn();
		}
	}

	var initTask = function() {
		jQuery.ajax({
			url : "/getAllSingletask.shtml",
			type : "post",
			dataType : "json",
			async : false,
			success : function(data) {
				var taskStr;
				var dl = data.length;
				$.each(data, function(n, value) {
					var tmpStr = "<td><div><button id='" + value.taskCode + "'"
							+ "data-id='" + value.id + "'>" + value.taskText
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
			error : whenError,
			timeout : 5000
		});
	}
	var initAlloc = function() {
		$("table.alloc").html("");
		jQuery.ajax({
			url : "/getAllocsBy.shtml",
			type : "post",
			dataType : "json",
			async : false,
			success : function(data) {
				var allAlloc = new Map();
				var maxColumn = 0;
				$.each(data, function(n, allocationInfo) {
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
				allAlloc.forEach(function(rowAlloc) {
					var tmpStr = "";
					rowAlloc.forEach(function(allocationInfo) {
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
									if (allocationInfo.text) {
										showInfo = showInfo + "<br/>"
												+ allocationInfo.text;
									}
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
			error : whenError,
			timeout : 5000
		});
	}

	var addTask = function(taskid) {
		allDisabled();
		jQuery.ajax({
			url : "/addTask.shtml",
			type : "post",
			data : {
				taskid : taskid
			},
			dataType : "json",
			success : function(data) {
				errorInfo = data.msg;
				addMsg(errorInfo, 1);
			},
			error : whenError,
			timeout : 5000
		});
	}

	var whenError = function() {
		addMsg("系统可能需要重新登录", 3);
		allDisabled();
	}

	var init = function() {
		$(".oneCtrlTr").delegate("button#PAUSE_USER", "click", function() {
			addMsg("执行暂停命令", 3);
			addTask("PAUSE_USER");
		});
		$(".oneCtrlTr button#CONTINUE").on("click", function() {
			addMsg("执行启动命令", 3);
			addTask("CONTINUE");
		});
		$("table.task").delegate(".taskTr button", "click", function() {
			addMsg("执行" + $(this).html(), 3);
			addTask($(this).attr("data-id"));
		});
		allDisabled();
		initTask();
		initAlloc();
		setInterval(pt, 3000);
	}

	init();
})(jQuery);
