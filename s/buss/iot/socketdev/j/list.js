import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
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
		name: "IP"
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

let doSearch = function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
}

$("#searchForm").on("submit", function () {
	doSearch();
	return false;
});

$("#search").on("click", function () { doSearch(); });
$("#add").click("click", function () { add(); });
$("#edit").click("click", function () { edit(); });
$("#del").click("click", function () { del(); });

function add() {
	window.pageii = gflayer.open({
		title: "新增",
		type: 2,
		content: '/s/buss/iot/socketdev/h/addSocketdevUI.html'
	});
}

function edit() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = gflayer.open({
		title: "编辑",
		type: 2,
		content: '/s/buss/iot/socketdev/editUI.html?id=' + cbox
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
		gf.ajax(url, { ids: cbox.join(":") }, "json");
	});
}