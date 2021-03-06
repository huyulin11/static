import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "environment",
		name: "环境"
	}, {
		colkey: "taskText",
		name: "服务端任务名称"
	}, {
		colkey: "taskname",
		name: "AGV端任务名称",
	}, {
		colkey: "allocOpType",
		name: "任务类型",
	}, {
		colkey: "agvId",
		name: "对应AGV编号",
	}, {
		colkey: "lapId",
		name: "交接点编号",
	}, {
		colkey: "isSendToAGV",
		name: "是否发送到AGV执行",
	}, {
		colkey: "createtime",
		name: "记录时间",
		renderData: function (rowindex, data, rowdata, column) {
			return new Date(data).format("yyyy-MM-dd hh:mm:ss");
		}
	}],
	jsonUrl: '/agvtasks/findByPage.shtml',
	checkbox: true,
	serNumber: true
});

let doSearch = function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
}

$("#search").on("click", function () {
	doSearch();
});

$("#searchForm").on("submit", function () {
	doSearch();
	return false;
});

$("#addTask").click("click", function () {
	addTask();
});
$("#editTask").click("click", function () {
	editTask();
});
$("#delTask").click("click", function () {
	delTask();
});
function editTask() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: ["600px", "80%"],
		content: '/s/h/agvtasks/editUI.html?id=' + cbox
	});
}
function addTask() {
	window.pageii = gflayer.open({
		title: "新增",
		type: 2,
		content: '/s/agvtasks/h/addDairyTaskUI.html'
	});
}
function delTask() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/agvtasks/deleteEntity.shtml';
		gf.ajax(url, { ids: cbox.join(":") }, "json");
	});
}