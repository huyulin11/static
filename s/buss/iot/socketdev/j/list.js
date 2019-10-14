import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "name",
		name: "设备名称"
	}, {
		colkey: "ip",
		name: "ip地址"
	}, {
		colkey: "port",
		name: "端口"
	}, {
		colkey: "devtype",
		name: "设备类型",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("SOCKET_DEV_TYPE", data);
		}
	}],
	jsonUrl: '/iotinfo/socketdev/findByPage.shtml',
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
		content: '/s/buss/iot/socketdev/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/s/buss/iot/socketdev/h/addSocketdevUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/iotinfo/socketdev/deleteEntity.shtml';
		var s = gf.ajax(url, {
			ids: cbox.join(",")
		}, "json");
		if (s.code >= 0) {
			layer.msg('删除成功');
			window.datagrid.loadData();
		} else {
			layer.msg('删除失败' + s.msg);
		}
	});
}

