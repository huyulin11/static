import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	l_column: [{
		colkey: "id",
		name: "AGV编号",
	}, {
		colkey: "ip",
		name: "ip地址"
	}, {
		colkey: "port",
		name: "端口"
	}],
	jsonUrl: '/iotinfo/agv/findByPage.shtml',
	checkbox: true,
	serNumber: true
});
$("#search").on("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serialize();// 初始化传参数
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#add").click("click", function () {
	add();
});
$("#edit").click("click", function () {
	edit();
});
$("#del").click("click", function () {
	del();
});
$("#permissions").click("click", function () {
	permissions();
});

function edit() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: ["600px", "80%"],
		content: '/s/buss/iot/agv/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/s/buss/iot/agv/h/addAGVUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/iotinfo/agv/deleteEntity.shtml';
		var s = gf.ajax(url, {
			ids: cbox.join(",")
		}, "json");
		if (s == "success") {
			layer.msg('删除成功');
			window.datagrid.loadData();
		} else {
			layer.msg('删除失败');
		}
	});
}

