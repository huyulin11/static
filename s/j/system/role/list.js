import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	id: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		width: "50px",
		hide: true
	}, {
		colkey: "rolename",
		name: "角色名"
	}, {
		colkey: "state",
		name: "状态",
		width: "100px",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("ISOK", data);
		},
		// }, {
		// 	colkey: "roleKey",
		// 	name: "角色键值"
	}, {
		colkey: "description",
		name: "描述"
	}],
	jsonUrl: '/role/findByPage.shtml',
	checkbox: true
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

$("#addRole").click("click", function () {
	addRole();
});
$("#editRole").click("click", function () {
	editRole();
});
$("#delRole").click("click", function () {
	delRole();
});
$("#permissions").click("click", function () {
	permissions();
});

function editRole() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/role/editUI.shtml?id=' + cbox
	});
}
function permissions() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("请选择一个对象！");
		return;
	}
	var url = '/resources/permissions.shtml?roleId=' + cbox;
	window.pageii = layer.open({
		title: "分配权限",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: url
	});
}
function addRole() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/role/addUI.shtml'
	});
}
function delRole() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/role/deleteEntity.shtml';
		gf.ajax(url, {
			ids: cbox.join(":")
		}, "json");
	});
}
