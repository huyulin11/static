export var showTaskexe = function (currentTask) {
	if (!currentTask) { return; }
	var value = currentTask.object;
	if (!currentTask.object) {
		$("div#path").html("");
		return;
	}
	$("div#path").html("<img src='/s/i/loading2.gif' style='width:14px;'/>");
	if (value.opflag == "NEW" || value.opflag == "SEND") {
		var details = value.detail;
		var path = new Array();
		var i = 1;
		var opflag = function (val) {
			if (val == "NEW") { return ""; }
			if (val == "SEND") { return "-<font style='color:red;'>执行中</font>"; }
			if (val == "LIFT_CLOSE") { return "-<font style='color:red;'>电梯中</font>"; }
			if (val == "NOTICED_PARTNER") { return "-<font style='color:red;'>完成协作</font>"; }
			if (val == "READY") { return "-<font style='color:red;'>准备就绪</font>"; }
			if (val == "REVOLVE") { return "-<font style='color:red;'>旋转中</font>"; }
			if (val == "START") { return "-<font style='color:red;'>启动中</font>"; }
			if (val == "OVER") { return "-过"; }
		}
		var arrivedact = function (val) {
			var data = jQuery.parseJSON(localStorage.dic)
				.filter(function (e) { return e.type == "ARRIVED_SITE_ACT_TYPE"; })
				.filter(function (e) { return e.key == val; });
			return data[0].value;
		}
		var color = function (val) {
			if (detail.opflag == "OVER") {
				return "rgb(221,221,221)";
			}
			if (val.indexOf("扫描") > 0) {
				return "blue";
			}
			if (val.indexOf("窗口") > 0 || val.indexOf("货位") > 0 || val.indexOf("放货") > 0 || val.indexOf("取货") > 0) {
				return "red";
			}
			return "black";
		}
		var addedinfo = function (val, addedinfo) {
			if (val.indexOf("扫描") > 0 || val.indexOf("窗口") > 0 || val.indexOf("货位") > 0 || val.indexOf("放货") > 0 || val.indexOf("取货") > 0) {
				if (addedinfo && val.indexOf("扫描") > 0) {
					return addedinfo.replace(new RegExp("\\$", "gm"), "<br/>");
				}
				return addedinfo;
			}
			return "";
		}

		var jointFun = function (detail) {
			var val = detail.siteid + opflag(detail.opflag) + "-" + arrivedact(detail.arrivedact);
			if (val.indexOf("扫描") > 0 || val.indexOf("窗口") > 0 || val.indexOf("货位") > 0 || val.indexOf("放货") > 0 || val.indexOf("取货") > 0) {
				val = "<br/>" + val;
			}
			return val;
		}
		$("div#path").html("");
		for (var detail of details) {
			var joint = jointFun(detail);
			$("div#path").append("<font style='font-size:10px;color:" + color(joint) + ";'>"
				+ joint + addedinfo(joint, detail.addedinfo) + "-></font>");
			if (i++ % 6 == 0) { $("div#path").append("<br/>"); }
		}
	} else {
		$("div#path").html("");
	}
}