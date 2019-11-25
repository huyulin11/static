import { dataGrid } from "/s/j/kf.grid.js";

var dialog;
window.datagrid = dataGrid({
	id: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true
	}, {
		colkey: "cpuUsage",
		name: "cpu使用率",
		width: "85px"
	}, {
		colkey: "setCpuUsage",
		name: "预设cpu使用率",
		width: "115px"
	}, {
		colkey: "jvmUsage",
		name: "Jvm使用率",
		width: "90px"
	}, {
		colkey: "setJvmUsage",
		name: "预设Jvm使用率",
		width: "115px"
	}, {
		colkey: "ramUsage",
		name: "Ram使用率",
		width: "90px"
	}, {
		colkey: "setRamUsage",
		name: "预设Ram使用率",
		width: "115px"
	}, {
		colkey: "email",
		name: "发送的邮件"
	}, {
		colkey: "operTime",
		name: "发送的时间"
	}, {
		colkey: "mark",
		name: "备注"
	}],
	jsonUrl: '/monitor/findByPage.shtml',
	checkbox: true
});
$("#searchForm").click("click", function () {
	var searchParams = $("#searchForm").serializeObject();
	window.datagrid.setOptions({
		data: searchParams
	});
});