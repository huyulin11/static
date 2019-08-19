$(function () {
	window.datagrid = lyGrid({
		pagId: 'paging',
		l_column: [{
			colkey: "taskexesid",
			name: "任务号",
		}, {
			colkey: "tasktype",
			name: "任务类型",
			renderData: function (rowindex, data, rowdata, column) {
				if (data === "RECEIPT") {
					return "入库";
				} else if (data === "SHIPMENT") {
					return "出库";
				} else if (data === "GOTO_CHARGE") {
					return "前往充电";
				} else if (data === "BACK_CHARGE") {
					return "充电返回";
				}
			}
		}, {
			colkey: "opflag",
			name: "任务状态",
			renderData: function (rowindex, data, rowdata, column) {
				if (data === "NEW") {
					return "新建";
				}
			}
		}, {
			colkey: "json",
			name: "任务信息",
			renderData: function (rowindex, data, rowdata, column) {
				var taskid = JSON.parse(data).taskid;
				for (var val of singletaskjson) {
					if (taskid == val.id) {
						return val.tasktext;
					}
				}
			}
		}, {
			colkey: "agvId",
			name: "AGV编号",
		}, {
			colkey: "json",
			name: "优先级",
			renderData: function (rowindex, data, rowdata, column) {
				if (data == "") {
					if (rowdata.opflag == "NEW") {
						return "<div class='changable'>" + "<span>0</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
							+ "<a class='editTaskSeq'><img src='/s/i/edit.png'/></a>" + "</div>";
					} else {
						return 0;
					}
				}
				var seq = JSON.parse(data).seq;
				if (!seq) seq = '0';
				if (rowdata.opflag == "NEW") {
					return "<div class='changable'>" + "<span>" + seq + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
						+ "<a class='editTaskSeq'><img src='/s/i/edit.png'/></a>" + "</div>";
				} else {
					return "<div class='changable'>" + "<span>" + seq + "</span>" + "</div>";
				}
			}
		}, {
			colkey: "delflag",
			name: "是否删除",
		}, {
			colkey: "time",
			name: "创建时间",
			renderData: function (rowindex, data, rowdata, column) {
				return new Date(data).format("yyyy-MM-dd hh:mm:ss");
			}
		}, {
			colkey: "overtime",
			name: "结束时间",
			renderData: function (rowindex, data, rowdata, column) {
				return new Date(data).format("yyyy-MM-dd hh:mm:ss");
			}
		}],
		jsonUrl: '/agvImmediateTask/findByPage.shtml',
		checkbox: true,
		serNumber: true
	});
});